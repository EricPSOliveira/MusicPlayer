const container = document.querySelector('.container');
let items = Array.from(container.children);
const totalItems = items.length;

// Configura as posições iniciais para os 5 itens visíveis
function initialize() {
    for (let i = 0; i < totalItems; i++) {
        updatePosition(i);
    }
}

// Calcula a posição vertical de cada item na lista
function updatePosition(index) {
    const visibleItems = 5;
    const middle = Math.floor(visibleItems / 2);
    const item = items[index];

    let relativeIndex = (index - middle) % totalItems;
    if (relativeIndex < 0) relativeIndex += totalItems;

    item.style.transform = `translateY(${relativeIndex * 70}px)`;  // Move 70px por item
    item.classList.toggle('center', relativeIndex === 2);
}

// Evento de rolagem
document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        container.appendChild(container.firstElementChild);
    } else {
        container.prepend(container.lastElementChild);
    }
    items = Array.from(container.children);
    initialize();
});

// Inicializa com o item centralizado
initialize();
