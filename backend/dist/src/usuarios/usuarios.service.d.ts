import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entities';
import { AuditService } from '../audit/audit.service';
import { CrearUsuarioDto, ActualizarUsuarioDto, CambiarContrasenaDto, EliminarUsuarioDto, RestablecerContrasenaDto } from './dtos';
export declare class UsuariosService {
    private usuarioRepository;
    private auditService;
    constructor(usuarioRepository: Repository<UsuarioEntity>, auditService: AuditService);
    obtenerTodos(): Promise<UsuarioEntity[]>;
    obtenerPorId(id: string): Promise<UsuarioEntity>;
    crear(crearDto: CrearUsuarioDto, usuarioAdmin: string): Promise<{
        id: string;
        username: string;
        nombre: string;
        rol: string;
        email: string | undefined;
        telefono: string | undefined;
        region: string | undefined;
        provincia: string | undefined;
        comuna: string | undefined;
    }>;
    actualizar(id: string, actualizarDto: ActualizarUsuarioDto, usuarioAdmin: string): Promise<{
        id: string;
        username: string;
        nombre: string;
        rol: string;
    }>;
    restablecerContrasena(id: string, restablecerDto: RestablecerContrasenaDto, usuarioAdmin: string): Promise<{
        mensaje: string;
    }>;
    cambiarContrasena(usuarioId: string, cambiarDto: CambiarContrasenaDto, username: string): Promise<{
        mensaje: string;
    }>;
    eliminar(id: string, eliminarDto: EliminarUsuarioDto, usuarioAdmin: string, passwordAdmin: string): Promise<{
        mensaje: string;
    }>;
    private hashPassword;
}
