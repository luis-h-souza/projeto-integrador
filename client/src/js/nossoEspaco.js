// Main functionality for custom carousel
const initCustomCarousel = () => {
    const carousel = document.querySelector('.custom-carousel');
    if (!carousel) return;

    const nextBtn = document.querySelector('.arrows .next');
    const prevBtn = document.querySelector('.arrows .prev');
    const list = carousel.querySelector('.list');
    const runningTime = carousel.querySelector('.timeRunning');

    if (!nextBtn || !prevBtn || !list || !runningTime) return;

    let timeRunning = 3000;
    let timeAutoNext = 7000;
    let runTimeOut;
    let runNextAuto;

    function resetTimeAnimation() {
        runningTime.style.animation = 'none';
        runningTime.offsetHeight; /* trigger reflow */
        runningTime.style.animation = null;
        runningTime.style.animation = 'runningTime 7s linear 1 forwards';
    }

    function showSlider(type) {
        let sliderItemsDom = list.querySelectorAll('.item');
        if (type === 'next') {
            list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');
        } else {
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carousel.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        resetTimeAnimation();
    }

    nextBtn.onclick = () => showSlider('next');
    prevBtn.onclick = () => showSlider('prev');

    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation();
};

initCustomCarousel();

// função arrow - CARROSSEL
const galeria = () => {
  // Seleciona todas as imagens miniatura
const miniaturas = document.querySelectorAll(".galeria_miniaturas img");

  // iterar sobre o miniaturas
miniaturas.forEach((miniatura) => {
    console.log(miniatura);

    // em cada imagem adicionar uma imagem
    miniatura.addEventListener("click", function () {
      // console.log(this.src) //this é utilizado para quando se quer utilizar o alguma coisa dentro do objeto (src, algun atributo e etc)

      // substitui o caminho e o nome da imagem em destaque
    document.getElementById("foto_grande").src = this.src;
    });
});
};

galeria();
