import { Repository } from 'typeorm';
import { PacienteEntity } from '../entities';
import { CrearPacienteDto } from './dtos/crear-paciente.dto';
import { AuditService } from '../audit/audit.service';
export declare class PacientesService {
    private pacienteRepository;
    private auditService;
    constructor(pacienteRepository: Repository<PacienteEntity>, auditService: AuditService);
    crear(crearDto: CrearPacienteDto, usuarioId: string, username: string): Promise<PacienteEntity>;
    obtenerTodos(pagina?: number, limite?: number): Promise<{
        datos: PacienteEntity[];
        total: number;
        pagina: number;
        totalPaginas: number;
    }>;
    obtenerPorId(id: string): Promise<PacienteEntity>;
    buscar(termino: string, pagina?: number, limite?: number): Promise<{
        datos: PacienteEntity[];
        total: number;
        pagina: number;
        totalPaginas: number;
    }>;
    actualizar(id: string, actualizarDto: Partial<CrearPacienteDto>, username: string): Promise<PacienteEntity>;
    eliminar(id: string, username: string): Promise<void>;
    exportarCSV(): Promise<string>;
}
