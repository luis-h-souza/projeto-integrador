import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})


const login = document.getElementById('criarLogin');
login.addEventListener('click', () => {
  main.method.login();
  main.method.mensagem('logar', 'green')
})


// const criarLogin = document.getElementById('criarLogin');
// criarLogin = addEventListener('click', () => {
  
// })
