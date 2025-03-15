export default function darkMode() {        

  // referência ao campo checkbox do html
  const ck_toogle = document.getElementById("toggle")     //cria variável com a referência do ID no html

  // Verificar se o modo dark está gravado
  const modoArmazenado = localStorage.getItem("modo")
  if (modoArmazenado == "dark") {
      // se o modo dark estiver armazenado, ativa modoescuro
      document.body.classList.add("dark-mode")

      // Ativar o botão checkbox
      ck_toogle.checked = true
  }

  ck_toogle.addEventListener("change", () => {      //adiciona monitoramento (ouvinte) no campo (toogle) com o evento change (mudança)
      // console.log(ck_toogle.checked);
      document.body.classList.toggle("dark-mode")   //método utilizado para criar aternância de estado

      // operador ternário => modo simplificado para escrever o IF - (condição ? verdadeiro : falso)
      let modoSelecionado = ck_toogle.checked ? "dark" : "ligth"

      // cria o armazenamento local
      localStorage.setItem("modo", modoSelecionado)  //localStorage usado para grava informações na máquina (navegador)

      //  console.log(localStorage.getItem("modo"))
  })
}