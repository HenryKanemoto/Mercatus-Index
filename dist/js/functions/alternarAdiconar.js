export default function alternarAdicionar(secaoMain, secaoFooter, secaoAdicionar) {
    secaoMain.classList.toggle('flex');
    secaoMain.classList.toggle('hidden');
    secaoFooter.classList.toggle('hidden');
    secaoAdicionar.classList.toggle('flex');
    secaoAdicionar.classList.toggle('hidden');
}
