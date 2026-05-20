import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { PacienteEntity, UsuarioEntity } from '../entities';
import { CrearPacienteDto } from './dtos/crear-paciente.dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(PacienteEntity)
    private pacienteRepository: Repository<PacienteEntity>,
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private auditService: AuditService,
  ) {}

  async crear(
    crearDto: CrearPacienteDto,
    usuarioId: string,
    username: string,
  ): Promise<PacienteEntity> {
    // Validar RUT único
    const rutExistente = await this.pacienteRepository.findOne({
      where: { rut: crearDto.rut, dv: crearDto.dv, eliminado: false },
    });

    if (rutExistente) {
      throw new BadRequestException('RUT ya existe en el sistema');
    }

    const paciente = this.pacienteRepository.create({
      ...crearDto,
      creadoPor: username,
    });

    const resultado = await this.pacienteRepository.save(paciente);

    // Auditoría
    await this.auditService.registrar(
      username,
      'CREATE',
      'paciente',
      resultado.id,
      { rut: crearDto.rut, nombre: crearDto.nombre },
    );

    return resultado;
  }

  async obtenerTodos(
    pagina: number = 1,
    limite: number = 20,
    filtros?: {
      region?: string;
      provincia?: string;
      comuna?: string;
      anio?: number;
      semestre?: number;
      operador_id?: string;
      rolUsuario?: string;
      usernameUsuario?: string;
    },
  ) {
    try {
      const skip = (pagina - 1) * limite;
      const rolUsuario = filtros?.rolUsuario;
      const usernameUsuario = filtros?.usernameUsuario;
      const esAdmin = rolUsuario === 'admin';

      const baseWhere: any = {};
      if (!esAdmin) {
        baseWhere.eliminado = false;
        if (usernameUsuario) baseWhere.creadoPor = usernameUsuario;
      }
      // Admins ven activos y pendiente_eliminacion (not eliminado permanente)
      if (esAdmin) baseWhere.eliminado = false;

      if (filtros?.region) baseWhere.region = filtros.region;
      if (filtros?.provincia) baseWhere.provincia = filtros.provincia;
      if (filtros?.comuna) baseWhere.comuna = filtros.comuna;
      if (filtros?.anio) baseWhere.anio = filtros.anio;
      if (filtros?.semestre) baseWhere.semestre = filtros.semestre;
      if (filtros?.operador_id) baseWhere.creadoPor = filtros.operador_id;

      // Para admin: incluir también pendiente_eliminacion en un segundo where
      const where: any = esAdmin
        ? [{ ...baseWhere, estado: 'activo' }, { ...baseWhere, estado: 'pendiente_eliminacion' }, { ...baseWhere, estado: 'dado_de_alta' }]
        : baseWhere;

      const [pacientes, total] = await this.pacienteRepository.findAndCount({
        where,
        skip,
        take: limite,
        order: { fechaRegistro: 'DESC' },
      });

      // Resolver nombres de operadores a partir de sus usernames
      const usernames = [...new Set(pacientes.map((p) => p.creadoPor).filter(Boolean))];
      const usuarios = usernames.length
        ? await this.usuarioRepository.find({
            where: { username: In(usernames) },
            select: ['username', 'nombre'],
          })
        : [];
      const nombrePorUsername = Object.fromEntries(usuarios.map((u) => [u.username, u.nombre]));

      const datos = pacientes.map((p) => ({
        ...p,
        creadoPorNombre: nombrePorUsername[p.creadoPor] ?? p.creadoPor,
      }));

      return {
        datos,
        total,
        pagina,
        totalPaginas: Math.ceil(total / limite),
      };
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  async obtenerPorId(id: string): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id, eliminado: false },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return paciente;
  }

  async buscar(termino: string, pagina: number = 1, limite: number = 20) {
    const skip = (pagina - 1) * limite;

    // Buscar por nombre o RUT
    const [pacientes, total] = await this.pacienteRepository.findAndCount({
      where: [
        { nombre: Like(`%${termino}%`), eliminado: false },
        { rut: Like(`%${termino}%`), eliminado: false },
      ],
      skip,
      take: limite,
      order: { fechaRegistro: 'DESC' },
    });

    return {
      datos: pacientes,
      total,
      pagina,
      totalPaginas: Math.ceil(total / limite),
    };
  }

  async actualizar(
    id: string,
    actualizarDto: Partial<CrearPacienteDto>,
    username: string,
  ): Promise<PacienteEntity> {
    const paciente = await this.obtenerPorId(id);

    // Guardar valores anteriores para auditoría
    const cambios = {};
    for (const key in actualizarDto) {
      if (paciente[key] !== actualizarDto[key]) {
        cambios[key] = {
          anterior: paciente[key],
          nuevo: actualizarDto[key],
        };
      }
    }

    Object.assign(paciente, actualizarDto, {
      modificadoPor: username,
      modificadoEn: new Date(),
    });

    const resultado = await this.pacienteRepository.save(paciente);

    // Auditoría
    await this.auditService.registrar(
      username,
      'UPDATE',
      'paciente',
      id,
      cambios,
    );

    return resultado;
  }

  async eliminar(id: string, username: string): Promise<void> {
    const paciente = await this.obtenerPorId(id);

    paciente.eliminado = true;
    paciente.estado = 'pendiente_eliminacion';
    paciente.fechaEliminacion = new Date();
    paciente.modificadoPor = username;
    paciente.modificadoEn = new Date();

    await this.pacienteRepository.save(paciente);

    await this.auditService.registrar(username, 'DELETE', 'paciente', id, {
      motivo: 'eliminación con período de gracia 30 días',
    });
  }

  async reintegrar(id: string, username: string): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');

    const diasTranscurridos = paciente.fechaEliminacion
      ? (Date.now() - new Date(paciente.fechaEliminacion).getTime()) / (1000 * 60 * 60 * 24)
      : 0;

    if (diasTranscurridos > 30) {
      throw new BadRequestException('El plazo de 30 días para reintegrar ha vencido');
    }

    paciente.eliminado = false;
    paciente.estado = 'activo';
    paciente.fechaEliminacion = undefined;
    paciente.motivoEliminacion = undefined;
    paciente.modificadoPor = username;
    paciente.modificadoEn = new Date();

    const resultado = await this.pacienteRepository.save(paciente);
    await this.auditService.registrar(username, 'REINTEGRAR', 'paciente', id, {});
    return resultado;
  }

  async darDeAlta(id: string, username: string): Promise<PacienteEntity> {
    const paciente = await this.obtenerPorId(id);

    paciente.estado = 'dado_de_alta';
    paciente.fechaAlta = new Date();
    paciente.modificadoPor = username;
    paciente.modificadoEn = new Date();

    const resultado = await this.pacienteRepository.save(paciente);
    await this.auditService.registrar(username, 'DAR_DE_ALTA', 'paciente', id, {});
    return resultado;
  }

  async restaurarTodos(username: string): Promise<{ restaurados: number }> {
    const eliminados = await this.pacienteRepository.find({
      where: { eliminado: true },
    });

    console.log(`[RESTAURAR] Encontrados ${eliminados.length} pacientes para restaurar`);

    for (const paciente of eliminados) {
      paciente.eliminado = false;
      paciente.estado = 'activo';
      paciente.fechaEliminacion = null;
      paciente.motivoEliminacion = null;
      paciente.modificadoPor = username;
      paciente.modificadoEn = new Date();

      const resultado = await this.pacienteRepository.save(paciente);
      console.log(`[RESTAURAR] Paciente ${paciente.id} restaurado:`, { eliminado: resultado.eliminado, estado: resultado.estado });

      await this.auditService.registrar(username, 'RESTAURAR', 'paciente', paciente.id, {
        razon: 'Restauración masiva de pacientes eliminados',
      });
    }

    console.log(`[RESTAURAR] Proceso completado: ${eliminados.length} pacientes restaurados`);
    return { restaurados: eliminados.length };
  }

  async exportarCSV(): Promise<string> {
    const pacientes = await this.pacienteRepository.find({
      where: { eliminado: false },
    });

    if (pacientes.length === 0) {
      return 'No hay pacientes para exportar';
    }

    const headers = [
      'ID',
      'RUT',
      'DV',
      'Nombre',
      'Edad',
      'Sexo',
      'Teléfono',
      'Escolaridad',
      'Comuna',
      'Dependencia',
      'Barthel1',
      'Barthel2',
      'Pfeiffer1',
      'Pfeiffer2',
      'Lawton1',
      'Lawton2',
      'TUG1',
      'TUG2',
      'Minimental1',
      'Minimental2',
      'Yesavage1',
      'Yesavage2',
      'EQ1',
      'EQ2',
      'T1_Punt',
      'T2_Punt',
      'T3_Punt',
      'T4_Punt',
      'Fecha Registro',
      'Creado Por',
    ];

    const rows = pacientes.map((p) => [
      p.id,
      p.rut,
      p.dv,
      p.nombre,
      p.edad,
      p.sexo,
      p.telefono,
      p.escolaridad,
      p.comuna,
      p.dependencia,
      p.barthel1,
      p.barthel2,
      p.pfeiffer1,
      p.pfeiffer2,
      p.lawton1,
      p.lawton2,
      p.tug1,
      p.tug2,
      p.mini1,
      p.mini2,
      p.yesa1,
      p.yesa2,
      p.eq1,
      p.eq2,
      p.t1_punt,
      p.t2_punt,
      p.t3_punt,
      p.t4_punt,
      p.fechaRegistro,
      p.creadoPor,
    ]);

    const csv =
      headers.join(',') +
      '\n' +
      rows.map((row) => row.map((cell) => `"${cell || ''}"`).join(',')).join('\n');

    return csv;
  }
}
