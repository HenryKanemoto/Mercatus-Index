import ItemCompra from "../ItemCompra";

export default function identificaId(lista: ItemCompra[]): void {
    for (let i = 0; i < lista.length; i++) {
        lista[i].id = i;
    }
}