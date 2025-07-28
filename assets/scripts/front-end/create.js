const simple_modal = document.querySelector('.simple_modal');
const menos = document.querySelector('.bx.bx-minus');
const mais = document.querySelector('.bx.bx-plus');

mais.addEventListener('click', (e) => {
  if (e.target == mais) {
    simple_modal.style.animation = 'cir 0.7s ease-in-out forwards'
    simple_modal.style.display = 'flex'
    mais.style.display = 'none'
    menos.style.display = 'block'
  }else{
    simple_modal.style.animation = 'outcir 0.7s ease-in-out forwards'
    setTimeout(() => {
      simple_modal.style.display = 'none'

    }, 700);
    mais.style.display = 'block'
    menos.style.display = 'none'
  }
})
menos.addEventListener('click', (e) => {
  if (e.target == menos) {
    simple_modal.style.animation = 'outcir 0.7s ease-in-out forwards'
    setTimeout(() => {
      simple_modal.style.display = 'none'

    }, 700);
    mais.style.display = 'block'
    menos.style.display = 'none'
  }
})