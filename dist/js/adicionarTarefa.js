export default function adicionarTarefa(valorInputNome, valorInputQuantidade, lista, push) {
    const novoItem = {
        'nome': valorInputNome,
        'quantidade': valorInputQuantidade,
        'id': null,
        'check': false
    };
    if (push) {
        lista.push(novoItem);
    }
    else {
        lista.unshift(novoItem);
    }
}
