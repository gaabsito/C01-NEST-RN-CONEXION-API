export declare class JuegosService {
    private juegos;
    findAll(genero?: string): {
        id: number;
        nombre: string;
        genero: string;
    }[];
}
