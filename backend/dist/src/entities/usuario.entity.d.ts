export declare class UsuarioEntity {
    id: string;
    username: string;
    nombre: string;
    password: string;
    rol: string;
    email?: string;
    telefono?: string;
    region?: string;
    provincia?: string;
    comuna?: string;
    activo: boolean;
    creado: Date;
    ultimoAcceso?: Date;
    actualizado: Date;
}
