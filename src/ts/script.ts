import ItemCompra from "./ItemCompra.js";
import adicionarTarefa from "./functions/adicionarTarefa.js";
import alternarAdicionar from "./functions/alternarAdiconar.js";
import criarItemLi from "./functions/criarItemLi.js";
import criarItemRecente from "./functions/criarItemRecente.js";
import identificaId from "./functions/identificaId.js";

let listaGeral: ItemCompra[] = [];
let listaDeItens: ItemCompra[] = [];
let listaDeComprados: ItemCompra[] = [];
let listaRecentes: ItemCompra[] = [];

let labelEdit: string;
let idEdit: string;
let statusEdit: boolean = false


if( localStorage.getItem('listaGeral')){
    listaGeral = JSON.parse(localStorage.getItem('listaGeral')!);
}
if( localStorage.getItem('listaRecentes')){
    listaRecentes = JSON.parse(localStorage.getItem('listaRecentes')!);
}

function render(): void {
    const btnAdd = document.querySelector('.cabecalho__div-add__div__btn');
    const btnRemove = document.querySelector('.cabecalho__div-btn-remover');
    const formAdicionar = document.querySelector<HTMLFormElement>('.article-add__form-add');
    const ulCompras = document.querySelector<HTMLUListElement>('.side1__lista');
    const ulComprados = document.querySelector<HTMLUListElement>('.side2__lista');
    const ulRecentes = document.querySelector<HTMLUListElement>('.item-recente__lista');
    if (ulComprados) {  
        ulComprados.innerHTML = '';
    }
    if (ulCompras) {
        ulCompras.innerHTML = '';
    }
    if (ulRecentes) {
        ulRecentes.innerHTML = '';
    }

    listaGeral = listaGeral.filter(item => item.nome !== '');
    listaDeItens = listaGeral.filter(item => !item.check);
    listaDeComprados = listaGeral.filter(item => item.check);

    identificaId(listaDeItens);
    identificaId(listaDeComprados);
    identificaId(listaRecentes);

    listaDeItens.forEach(item => {
        ulCompras!.innerHTML += criarItemLi(item.nome, item.quantidade, item.id!, 'side1__item');
    });

    listaDeComprados.forEach(item => {
        ulComprados!.innerHTML += criarItemLi(item.nome, item.quantidade, item.id!, 'side2__item');
    });

    listaRecentes.forEach(item => {
        ulRecentes!.innerHTML += criarItemRecente(item.nome, item.id? item.id : 0);
    });
    const recentes = document.querySelectorAll<HTMLLIElement>('.item-recente__item')

    if (btnAdd) {
        btnAdd.removeEventListener('click', handleBtnAddClick);
        btnAdd.addEventListener('click', handleBtnAddClick);
    }
    if(btnRemove){
        btnRemove.removeEventListener('click', handleBtnRemoveClick);
        btnRemove.addEventListener('click', handleBtnRemoveClick);
    }

    if (formAdicionar) {
        formAdicionar.removeEventListener('submit', handleFormSubmit);
        formAdicionar.addEventListener('submit', handleFormSubmit);
    }
    if(recentes){
        recentes.forEach(item => {
            item.removeEventListener('click', handleRecentes);
            item.addEventListener('click', handleRecentes);
        })
    }


    document.querySelectorAll('.side1__item-text-label').forEach(item => {
        item.removeEventListener('click', handleEditItem);
        if(!statusEdit){
            item.addEventListener('click', handleEditItem);
        }
    })

    document.querySelectorAll('.side1__item-text-checkbox').forEach(checkbox => {
        checkbox.removeEventListener('click', handleCheckboxClick);
        checkbox.addEventListener('click', handleCheckboxClick);
    });
    document.querySelectorAll('.side2__item-text-checkbox').forEach(checkbox => {
        checkbox.removeEventListener('click', handleCheckboxClick);
        checkbox.addEventListener('click', handleCheckboxClick);
    });

    localStorage.setItem('listaGeral', JSON.stringify(listaGeral));
    localStorage.setItem('listaRecentes', JSON.stringify(listaRecentes));
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////HANDLES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleBtnAddClick() {
    const secaoPrincipal = document.querySelector<HTMLElement>('.principal');
    const secaoRecente = document.querySelector<HTMLElement>('.item-recente');
    const secaoAdicionar = document.querySelector<HTMLElement>('.article-add');
    if (secaoPrincipal && secaoRecente && secaoAdicionar) {
        alternarAdicionar(secaoPrincipal, secaoRecente, secaoAdicionar);
    }
}

function handleBtnRemoveClick() {
    listaGeral = listaGeral.filter(item => !item.check)
    render();
}

function handleFormSubmit(e: Event) {
    e.preventDefault();
    const secaoPrincipal = document.querySelector<HTMLElement>('.principal');
    const secaoRecente = document.querySelector<HTMLElement>('.item-recente');
    const secaoAdicionar = document.querySelector<HTMLElement>('.article-add');
    const inputNome = document.getElementById('input-nome') as HTMLInputElement;
    const inputQuantidade = document.getElementById('input-qtd') as HTMLInputElement;

    let existeRecente: boolean = false;

    listaRecentes.forEach(item => {
        if(item.nome === inputNome.value){
            existeRecente = true
        }
    })
    adicionarTarefa(inputNome.value, parseInt(inputQuantidade.value), listaGeral, true);
    if(!existeRecente){
        adicionarTarefa(inputNome.value, parseInt(inputQuantidade.value), listaRecentes, false);

    }
    if(listaRecentes.length > 6){
        listaRecentes.splice(-1, 1);
    }

    if (secaoPrincipal && secaoRecente && secaoAdicionar) {
        alternarAdicionar(secaoPrincipal, secaoRecente, secaoAdicionar);
    }
    inputNome.value = '';
    inputQuantidade.value = '';
    render();
}

function handleCheckboxClick(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const idliCheckbox: number = parseInt(checkbox.parentElement!.parentElement!.id);
    const ulSelecionada: HTMLElement = checkbox.parentElement!.parentElement!.parentElement!;

    if (ulSelecionada.classList.contains('side1__lista')) {
        listaDeItens[idliCheckbox].check = true;
    } else {
        listaDeComprados[idliCheckbox].check = false;
    }
    render();
}

function handleEditItem(e: Event){
    const labelSelecionado = e.target as HTMLInputElement;
    const idSelecionado = labelSelecionado.getAttribute('for') as string;
    const inputSelecionado = document.getElementById(idSelecionado!) as HTMLInputElement;
    const btnConfirmar = document.getElementById(`btn-${idSelecionado}`) as HTMLButtonElement;
    const checkboxSelecionado = inputSelecionado.parentElement?.children[1] as HTMLInputElement;

    if(idEdit !== ''){
        document.getElementById(`btn-${idEdit}`)?.classList.add('hidden');
        document.getElementById(`checkbox-${idEdit}`)?.classList.remove('hidden');
    }

 
    if(!statusEdit && idEdit !== idSelecionado){
        inputSelecionado!.classList.toggle('hidden');
        inputSelecionado.disabled = !inputSelecionado.disabled;
        inputSelecionado.value = labelSelecionado.textContent!
        inputSelecionado.focus;

        btnConfirmar!.classList.toggle('hidden');   
        checkboxSelecionado?.classList.toggle('hidden');

        labelEdit = labelSelecionado.textContent!;
        labelSelecionado.classList.toggle('hidden');

        idEdit = idSelecionado
        statusEdit = true;
    } else{
        idEdit = '';
        statusEdit = false;
        render();
    }

    if(btnConfirmar){
        btnConfirmar.addEventListener('click', () =>{
            const idLiSelecionado: number = parseInt(labelSelecionado.parentElement!.parentElement!.id!);
            listaDeItens[idLiSelecionado].nome = inputSelecionado.value;
            statusEdit = false;
            idEdit = '';               
            render();
        }) 
    }
}

function handleRecentes(e: Event){
    const itemClicado = e.target as HTMLLIElement;
    const idItemClicado: number = parseInt(itemClicado.id.match(/-(\d+)/)![1]);
    const itemRecente = listaRecentes[idItemClicado];
    
    let existeNaLista = false;
    let idDoExistente: number = -1

    listaDeItens.forEach(item => {
        if(item.nome === itemRecente.nome){
            existeNaLista = true;
            idDoExistente = item.id!;
        }
    })

    if(existeNaLista){
        listaDeItens[idDoExistente].quantidade += 1
    } else{
        adicionarTarefa(itemRecente.nome, itemRecente.quantidade, listaGeral, true);
    }
    render();
}

render();
