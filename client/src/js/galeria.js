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
