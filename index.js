//scroll header
const slider = document.getElementById("header")
let isDown = false;
let startX;
let scrollLeft;
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseup', () => {
  isDown = false;
});
document.addEventListener('mouseup', () => {
  isDown = false;
});
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);

});

//guardar datos
let completadasValue = 0;
const completadas = document.getElementById("completadas");
const checkBoxes = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < checkBoxes.length; i++) {
  const checkBox = checkBoxes[i];
  checkBox.addEventListener("click", function () {
    if (this.checked) {
      completadasValue++
      localStorage.setItem(i, true);
    } else {
      completadasValue--
      localStorage.removeItem(i);
    }
    completadas.innerHTML = completadasValue;
  });
  if (localStorage.getItem(i)) {
    checkBox.checked = true;
    completadasValue++
  }
}
completadas.innerHTML = completadasValue;

//cambiar titulo de notas
const notas = document.getElementById("notas");
const notaTitulo = document.getElementById("nota-titulo");
const openNotas = (nodo, i) => {
  const nombre = nodo.parentNode.children[3].innerHTML
  notas.classList.remove("hidden")
  notaTitulo.innerHTML = `Notas <b>${nombre}</b>`;
  document.getElementById("nota-texto").value = localStorage.getItem(nombre);
}
const closeNotas = () => {
  notas.classList.add("hidden")
}

//guardar notas
const guardarNotas = () => {
  const notaTitulo = document.getElementById("nota-titulo").lastChild.innerHTML;
  localStorage.setItem(notaTitulo, document.getElementById("nota-texto").value);
}