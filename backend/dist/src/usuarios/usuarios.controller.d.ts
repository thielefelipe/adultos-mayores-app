import { UsuariosService } from './usuarios.service';
import { UbicacionService } from '../services/ubicacion.service';
import { CrearUsuarioDto, ActualizarUsuarioDto, CambiarContrasenaDto, EliminarUsuarioDto, RestablecerContrasenaDto } from './dtos';
export declare class UsuariosController {
    private usuariosService;
    private ubicacionService;
    constructor(usuariosService: UsuariosService, ubicacionService: UbicacionService);
    getRegiones(): string[];
    getProvincias(region: string): string[];
    getComunas(region: string, provincia: string): string[];
    cambiarContrasena(cambiarDto: CambiarContrasenaDto, req: any): Promise<{
        mensaje: string;
    }>;
    obtenerTodos(): Promise<import("../entities").UsuarioEntity[]>;
    crear(crearDto: CrearUsuarioDto, req: any): Promise<{
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
