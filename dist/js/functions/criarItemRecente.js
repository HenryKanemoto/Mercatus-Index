export default function criarItemRecente(nome, id) {
    return `
            <li class="item-recente__item w-full bg-slate-100 text-black font-semibold rounded-3xl px-3 py-1 flex justify-center items-center self-center" id="recente-${id}">
                ${nome}
            </li>
    `;
}
