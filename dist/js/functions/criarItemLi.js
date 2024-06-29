export default function criarItemLi(nome, quantidade, id, side) {
    return `
                <li class="${side} flex justify-between gap-3 border-b-2 lg:text-2xl lg:px-8" id="${id}">
                    <div class="${side}-text flex items-center gap-2 overflow-auto w-3/5">
                        <button id="btn-id-item-${id}" class="hidden item__btn-confirm"><img  src="../dist/image/btn-confirm-icon.png" alt="Confirmar"></button>
                        <input type="checkbox" class="${side}-text-checkbox "  ${side === 'side1__item' ? '' : 'checked'} id="checkbox-id-item-${id}">
                        <input type="text" class="${side}-text-nome hidden item__input" id="id-item-${id}" disabled></input>
                        <label for="id-item-${id}" class="${side}-text-label">${nome}</label>
                    </div>
                    <div class="${side}-qtd flex w-2/5 justify-end gap-1">
                        <p class="overflow-auto">${quantidade}</p>
                        <p>x</p>
                    </div>
                    </li>
    `;
}

