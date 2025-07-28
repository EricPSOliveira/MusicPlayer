document.addEventListener('click', (e) => {
  if (e.target.closest('.play')) {

    play_button.classList.remove('bx-play')
    play_button.classList.add('bx-pause')
    if(musica != null){
      offSound()
      sec = 0
      musica.duration = 0
    }

    
    let frier = e.target.closest('.play')
    const jon = frier.parentElement.nextElementSibling
    const jen = jon.querySelector('h3').id
    console.log(jen)
    const rum = all_sound.findIndex(obj => obj.id == jen)
    console.log(rum)
    index = rum


    console.log(index)

    if (sec == 0) {
      onSound(url, 0)
    } else {
      sec = musica.currentTime
      onSound(url, sec)
    }

  }
})