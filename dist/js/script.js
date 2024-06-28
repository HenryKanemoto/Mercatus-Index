import adicionarTarefa from "./functions/adicionarTarefa.js";
import alternarAdicionar from "./functions/alternarAdiconar.js";
import criarItemLi from "./functions/criarItemLi.js";
import criarItemRecente from "./functions/criarItemRecente.js";
import identificaId from "./functions/identificaId.js";
let listaGeral = [];
let listaDeItens = [];
let listaDeComprados = [];
let listaRecentes = [];
let labelEdit;
let idEdit;
let statusEdit = false;
if (localStorage.getItem('listaGeral')) {
    listaGeral = JSON.parse(localStorage.getItem('listaGeral'));
}
if (localStorage.getItem('listaRecentes')) {
    listaRecentes = JSON.parse(localStorage.getItem('listaRecentes'));
}
function render() {
    const btnAdd = document.querySelector('.cabecalho__div-add__div__btn');
    const btnRemove = document.querySelector('.cabecalho__div-btn-remover');
    const formAdicionar = document.querySelector('.article-add__form-add');
    const ulCompras = document.querySelector('.side1__lista');
    const ulComprados = document.querySelector('.side2__lista');
    const ulRecentes = document.querySelector('.item-recente__lista');
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
        ulCompras.innerHTML += criarItemLi(item.nome, item.quantidade, item.id, 'side1__item');
    });
    listaDeComprados.forEach(item => {
        ulComprados.innerHTML += criarItemLi(item.nome, item.quantidade, item.id, 'side2__item');
    });
    listaRecentes.forEach(item => {
        ulRecentes.innerHTML += criarItemRecente(item.nome, item.id ? item.id : 0);
    });
    const recentes = document.querySelectorAll('.item-recente__item');
    if (btnAdd) {
        btnAdd.removeEventListener('click', handleBtnAddClick);
        btnAdd.addEventListener('click', handleBtnAddClick);
    }
    if (btnRemove) {
        btnRemove.removeEventListener('click', handleBtnRemoveClick);
        btnRemove.addEventListener('click', handleBtnRemoveClick);
    }
    if (formAdicionar) {
        formAdicionar.removeEventListener('submit', handleFormSubmit);
        formAdicionar.addEventListener('submit', handleFormSubmit);
    }
    if (recentes) {
        recentes.forEach(item => {
            item.removeEventListener('click', handleRecentes);
            item.addEventListener('click', handleRecentes);
        });
    }
    document.querySelectorAll('.side1__item-text-label').forEach(item => {
        item.removeEventListener('click', handleEditItem);
        if (!statusEdit) {
            item.addEventListener('click', handleEditItem);
        }
    });
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
    const secaoPrincipal = document.querySelector('.principal');
    const secaoRecente = document.querySelector('.item-recente');
    const secaoAdicionar = document.querySelector('.article-add');
    if (secaoPrincipal && secaoRecente && secaoAdicionar) {
        alternarAdicionar(secaoPrincipal, secaoRecente, secaoAdicionar);
    }
}
function handleBtnRemoveClick() {
    listaGeral = listaGeral.filter(item => !item.check);
    render();
}
function handleFormSubmit(e) {
    e.preventDefault();
    const secaoPrincipal = document.querySelector('.principal');
    const secaoRecente = document.querySelector('.item-recente');
    const secaoAdicionar = document.querySelector('.article-add');
    const inputNome = document.getElementById('input-nome');
    const inputQuantidade = document.getElementById('input-qtd');
    let existeRecente = false;
    listaRecentes.forEach(item => {
        if (item.nome === inputNome.value) {
            existeRecente = true;
        }
    });
    adicionarTarefa(inputNome.value, parseInt(inputQuantidade.value), listaGeral, true);
    if (!existeRecente) {
        adicionarTarefa(inputNome.value, parseInt(inputQuantidade.value), listaRecentes, false);
    }
    if (listaRecentes.length > 6) {
        listaRecentes.splice(-1, 1);
    }
    if (secaoPrincipal && secaoRecente && secaoAdicionar) {
        alternarAdicionar(secaoPrincipal, secaoRecente, secaoAdicionar);
    }
    inputNome.value = '';
    inputQuantidade.value = '';
    render();
}
function handleCheckboxClick(e) {
    const checkbox = e.target;
    const idliCheckbox = parseInt(checkbox.parentElement.parentElement.id);
    const ulSelecionada = checkbox.parentElement.parentElement.parentElement;
    if (ulSelecionada.classList.contains('side1__lista')) {
        listaDeItens[idliCheckbox].check = true;
    }
    else {
        listaDeComprados[idliCheckbox].check = false;
    }
    render();
}
function handleEditItem(e) {
    var _a, _b, _c;
    const labelSelecionado = e.target;
    const idSelecionado = labelSelecionado.getAttribute('for');
    const inputSelecionado = document.getElementById(idSelecionado);
    const btnConfirmar = document.getElementById(`btn-${idSelecionado}`);
    const checkboxSelecionado = (_a = inputSelecionado.parentElement) === null || _a === void 0 ? void 0 : _a.children[1];
    if (idEdit !== '') {
        (_b = document.getElementById(`btn-${idEdit}`)) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
        (_c = document.getElementById(`checkbox-${idEdit}`)) === null || _c === void 0 ? void 0 : _c.classList.remove('hidden');
    }
    if (!statusEdit && idEdit !== idSelecionado) {
        inputSelecionado.classList.toggle('hidden');
        inputSelecionado.disabled = !inputSelecionado.disabled;
        inputSelecionado.value = labelSelecionado.textContent;
        inputSelecionado.focus;
        btnConfirmar.classList.toggle('hidden');
        checkboxSelecionado === null || checkboxSelecionado === void 0 ? void 0 : checkboxSelecionado.classList.toggle('hidden');
        labelEdit = labelSelecionado.textContent;
        labelSelecionado.classList.toggle('hidden');
        idEdit = idSelecionado;
        statusEdit = true;
    }
    else {
        idEdit = '';
        statusEdit = false;
        render();
    }
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', () => {
            const idLiSelecionado = parseInt(labelSelecionado.parentElement.parentElement.id);
            listaDeItens[idLiSelecionado].nome = inputSelecionado.value;
            statusEdit = false;
            idEdit = '';
            render();
        });
    }
}
function handleRecentes(e) {
    const itemClicado = e.target;
    const idItemClicado = parseInt(itemClicado.id.match(/-(\d+)/)[1]);
    const itemRecente = listaRecentes[idItemClicado];
    let existeNaLista = false;
    let idDoExistente = -1;
    listaDeItens.forEach(item => {
        if (item.nome === itemRecente.nome) {
            existeNaLista = true;
            idDoExistente = item.id;
        }
    });
    if (existeNaLista) {
        listaDeItens[idDoExistente].quantidade += 1;
    }
    else {
        adicionarTarefa(itemRecente.nome, itemRecente.quantidade, listaGeral, true);
    }
    render();
}
render();
