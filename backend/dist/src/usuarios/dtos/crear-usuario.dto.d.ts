export declare class CrearUsuarioDto {
    username: string;
    nombre: string;
    password: string;
    rol: 'admin' | 'operador' | 'analista';
    email?: string;
    telefono?: string;
    region?: string;
    provincia?: string;
    comuna?: string;
}
