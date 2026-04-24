export declare class UbicacionService {
    getRegiones(): string[];
    getProvincias(region: string): string[];
    getComunas(region: string, provincia: string): string[];
}
