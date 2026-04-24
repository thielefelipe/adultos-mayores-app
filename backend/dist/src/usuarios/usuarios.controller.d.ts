import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto, ActualizarUsuarioDto, CambiarContrasenaDto, EliminarUsuarioDto, RestablecerContrasenaDto } from './dtos';
export declare class UsuariosController {
    private usuariosService;
    constructor(usuariosService: UsuariosService);
    cambiarContrasena(cambiarDto: CambiarContrasenaDto, req: any): Promise<{
        mensaje: string;
    }>;
    obtenerTodos(): Promise<import("../entities").UsuarioEntity[]>;
    crear(crearDto: CrearUsuarioDto, req: any): Promise<{
        id: string;
        username: string;
        nombre: string;
        rol: string;
    }>;
    obtenerPorId(id: string): Promise<import("../entities").UsuarioEntity>;
    actualizar(id: string, actualizarDto: ActualizarUsuarioDto, req: any): Promise<{
        id: string;
        username: string;
        nombre: string;
        rol: string;
    }>;
    restablecerContrasena(id: string, restablecerDto: RestablecerContrasenaDto, req: any): Promise<{
        mensaje: string;
    }>;
    eliminar(id: string, eliminarDto: EliminarUsuarioDto, req: any): Promise<{
        mensaje: string;
    }>;
}
