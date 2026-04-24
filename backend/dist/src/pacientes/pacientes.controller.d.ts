import { PacientesService } from './pacientes.service';
import { CrearPacienteDto } from './dtos/crear-paciente.dto';
export declare class PacientesController {
    private pacientesService;
    constructor(pacientesService: PacientesService);
    crear(crearDto: CrearPacienteDto, req: any): Promise<import("../entities").PacienteEntity>;
    obtenerTodos(pagina?: number, limite?: number): Promise<{
        datos: import("../entities").PacienteEntity[];
        total: number;
        pagina: number;
        totalPaginas: number;
    }>;
    buscar(termino: string, pagina?: number, limite?: number): Promise<{
        datos: import("../entities").PacienteEntity[];
        total: number;
        pagina: number;
        totalPaginas: number;
    }>;
    exportarCSV(): Promise<{
        data: string;
        filename: string;
    }>;
    obtenerPorId(id: string): Promise<import("../entities").PacienteEntity>;
    actualizar(id: string, actualizarDto: Partial<CrearPacienteDto>, req: any): Promise<import("../entities").PacienteEntity>;
    eliminar(id: string, req: any): Promise<void>;
}
