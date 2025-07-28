const menu_treebar = document.querySelector('.icon')
const menu_treebar_icon = document.querySelector('.bx.bx-menu')
const menu_close_icon = document.querySelector('.bx.bx-chevron-right')
const menu_itens = document.querySelector('.itens')
const exemplo = document.querySelectorAll('.exemple1')
const player = document.querySelector('.player')

menu_treebar_icon.addEventListener('click', (e)=>{
  if(e.target == menu_treebar_icon && window.getComputedStyle(menu_treebar_icon).display == 'block'){
      console.log('yasss')
      menu_treebar_icon.classList.remove('return')
          menu_treebar_icon.classList.add('animation')
          player.style.left = '25%' 
          
          exemplo.forEach((echo) =>{
            echo.style.display = 'flex'
          })

          setTimeout(() => {
           menu_itens.style.display = 'flex'
           menu_itens.style.marginRight = '0' 
           

              menu_treebar_icon.style.display = 'none'
              menu_close_icon.style.display = 'block'
              
              menu_treebar_icon.classList.remove('animation')
          }, 500);
  }
})
menu_close_icon.addEventListener('click', (e)=>{
  if(e.target == menu_close_icon && window.getComputedStyle(menu_close_icon).display == 'block'){
    menu_close_icon.classList.add('reverse')
    menu_itens.style.marginRight = '-100vw'
    player.style.left = '50%' 
    setTimeout(() => {
      menu_itens.style.display = 'none'
        menu_close_icon.style.display = 'none'
        menu_treebar_icon.style.display = 'block'
        menu_treebar_icon.classList.add('return')

        menu_close_icon.classList.remove('reverse')
    }, 500);
  }
})