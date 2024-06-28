import ItemCompra from "../ItemCompra";

export default function adicionarTarefa(valorInputNome: string, valorInputQuantidade: number, lista: ItemCompra[], push: boolean): void {
    const novoItem: ItemCompra = { 
        'nome': valorInputNome,
        'quantidade': valorInputQuantidade,
        'id': null,
        'check': false
    }
    
    if(push){
        lista.push(novoItem);
    }
    else{
        lista.unshift(novoItem)
    }
}