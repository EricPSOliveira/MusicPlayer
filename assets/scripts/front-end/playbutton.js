
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('.sel')) {
    const imgsource = e.target.closest('.sel')
    const play = imgsource.nextElementSibling
    play.style.display = 'flex'
    play.addEventListener('mouseleave', ()=>{
       play.style.display = 'none'
    })
  } 
})





