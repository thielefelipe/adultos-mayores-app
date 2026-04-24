export declare class UsuarioEntity {
    id: string;
    username: string;
    nombre: string;
    password: string;
    rol: string;
    activo: boolean;
    creado: Date;
    ultimoAcceso?: Date;
    actualizado: Date;
}
