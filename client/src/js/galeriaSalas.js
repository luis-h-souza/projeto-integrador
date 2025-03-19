import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

let galerias = {};

galerias.event = {
  init: () => {
    AOS.init();

    
  }
}

galerias.method = {

}