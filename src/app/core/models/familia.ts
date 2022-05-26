import { IntegranteFamiliar } from "./integrante-familiar";

export class Familia {
    id!: number;
    nombre!: string;
    celular!: string;
    zona!: string;
    nombreZona!: string;
    tipoVia!: string;
    nombreTipoVia!: string;
    referencia!: string;
    integrantesFamiliar: IntegranteFamiliar[] = [];
}
