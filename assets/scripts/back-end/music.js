const play_button = document.querySelector('.bx.bx-play')
const left_button = document.querySelector('.bx.bxs-chevrons-left')
const right_button = document.querySelector('.bx.bxs-chevrons-right')
let all_sound = new Array();

all_sound.push([
  { 'id': '4', 'link': "./assets/test1/test.mp3", 'nome': "carnificina", 'autor': "Luisa sonza" }
])






//  = [, { 'link': "./assets/test1/test2 (2).mp3", 'nome': "Feulle d'amor ", 'autor': "Indila", 'id': '3' }, { 'link': "./assets/test1/test2 .mp3", 'nome': "way you", 'autor': "Luisa sonza", 'id': '2' }, { 'id': '1', 'link': "./assets/test1/sao paulo/São Paulo.mp3", 'nome': "São Paulo", 'autor': "Anitta", 'img': './assets/test1/sao paulo/saopaulo_anitta.png' }];

let index = 0;

let musica;
let sec = 0;


const volumeControl = document.querySelector('#volumeControl');
const time_inline = document.querySelector('.timeline')
const real_time_inline = document.querySelector('.real_time_inline')
const img_reference = document.querySelector('#img_reference')

let time;
let duracao;
let url


const duracao_html = document.querySelector('#duracao');
const cTime_html = document.querySelector('#cTime')


const autorrae = document.querySelector('#autorrae')
const musca = document.querySelector('#musica')

let formation;






volumeControl.addEventListener('input', function () {
  const activeColor = formation;
  const inactiveColor = "transparent";

  const ratio = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = `linear-gradient(0deg, rgb(${activeColor}) ${ratio}%, ${inactiveColor} ${ratio}%)`;
})


play_button.addEventListener('click', (e) => {
  if (e.target == play_button && play_button.classList.contains('bx-play') == true) {
    play_button.classList.remove('bx-play')
    play_button.classList.add('bx-pause')
    console.log(sec)

    url = all_sound[0].link;
    autorrae.innerHTML = all_sound[index].autor
musca.innerHTML = all_sound[index].nome



    if (sec == 0) {
      onSound(url, 0, e)
    } else {
      sec = musica.currentTime
      onSound(url, sec, e)
    }


  } else {
    play_button.classList.remove('bx-pause')
    play_button.classList.add('bx-play')

    offSound()
  }
})

function audioCreate(url) {
  url = all_sound[index].link
  musica = new Audio(url)
  return musica;
}

function onSound(url, sec, event) {
  if (sec > 0) {
    audioCreate(url)
    musica.currentTime = sec
  } else {
    audioCreate(url)
  }


  musica.play()

  setTimeout(() => {
    duracao = musica.duration.toFixed(0);
    duracao_html.textContent = formatarTempo(musica.duration.toFixed(0))
    if (all_sound[index].img) {
      img_reference.src = all_sound[index].img
    } else {
      img_reference.src = './assets/test1/no_image.png'
    }
    console.log(img_reference.src)
    autorrae.innerHTML = all_sound[index].autor
    musca.innerHTML = all_sound[index].nome


    const rect = img_reference.getBoundingClientRect();
    const x = rect.left + 50
    const y = rect.top + 50


    const cThf = new ColorThief();
    img_reference.onload = () => {
      let dominantColor = cThf.getColor(img_reference);
      console.log(`Cor dominante: RGB(${dominantColor.join(", ")})`);
      document.querySelector('body').style.backgroundColor = `rgb(${dominantColor.join(", ")})`

      for(let k = 0; k < dominantColor.length; k++){
        dominantColor[k] = dominantColor[k] + 50
      }
      console.log(dominantColor)
      document.querySelector('.player').style.backgroundColor = `rgba(${dominantColor.join(", ")}, 0.384)`
      document.querySelector('.player').style.boxShadow = `0px 0px 20px rgba(${dominantColor.join(", ")}, 0.384)`
      for(let k = 0; k < dominantColor.length; k++){
        dominantColor[k] = dominantColor[k] + 50
        
      }
      formation = dominantColor
      document.querySelector('#volumeControl').style.background = `linear-gradient(0deg, rgba(${dominantColor.join(", ")}, 0.384) 50%, transparent 50%)`



    };



  }, 300);


  time_inline.addEventListener('click', (e) => {
    if (e.target == time_inline) {
      let x = e.offsetX;
      let lT = time_inline.offsetWidth

      const total = (x / lT) * 100
      console.log(total)

      const tempototal = (total / 100) * musica.duration
      console.log(tempototal)



      musica.currentTime = tempototal
    }
  })



  musica.addEventListener('timeupdate', () => {

    sec = Math.round(musica.currentTime);
    const porcentagem = (musica.currentTime / musica.duration) * 100

    console.log(sec, duracao)
    cTime_html.textContent = formatarTempo(sec)
    real_time_inline.style.width = porcentagem + '%'

    alternar(sec)

  })


  volumeControl.addEventListener('input', (e) => {
    const volume = e.target.value;
    musica.volume = volume; // Ajusta o volume do áudio
    console.log(`Volume ajustado para: ${volume}`);




  });

  console.log()





  return musica;
  return sec;



}


function alternar(sec) {
  if (sec == duracao) {
    musica.pause();
    musica.currentTime = 0
    sec = 0

    index = index + 1;
    if (index == all_sound.length) {
      index = 0
      console.log(index, all_sound.length)
    }
    url = all_sound[index].link

    onSound(url)
  } else {
    sec = musica.currentTime
  }
}

function formatarTempo(segundos) {
  const minutos = Math.floor(segundos / 60); 
  const segundosRestantes = segundos % 60; 
  return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
}





const offSound = () => {
  sec = musica.currentTime
  musica.pause()
}

left_button.addEventListener('click', (e) => {
  if (e.target == left_button) {
    if (sec > 0 && play_button.classList.contains('bx-pause') && musica) {
      musica.pause();
      musica.currentTime = 0
      setTimeout(() => {
        musica.play()
        autorrae.innerHTML = all_sound[index].autor
        musca.innerHTML = all_sound[index].nome
      }, 500);
    } else if (sec > 0 && play_button.classList.contains('bx-play') && musica) {
      musica.pause();
      musica.currentTime = 0
      sec = 0

      let index = all_sound.findIndex(item => item.link === url);
      if (index == 0) {
        index = all_sound.length - 1;
        url = all_sound[index].link
        play_button.classList.remove('bx-play')
        play_button.classList.add('bx-pause')
        if (sec == 0) {
          onSound(url)
        } else {
          onSound(url, sec)
        }
        console.log(index)
      } else {
        musica.currentTime = 0
        sec = 0
        index = index - 1
        console.log(index)
        url = all_sound[index].link
        play_button.classList.remove('bx-play')
        play_button.classList.add('bx-pause')
        if (sec == 0) {
          onSound(url)
        } else {
          onSound(url, sec)
        }
      }

    } else {
      if (musica) {
        musica.pause();
        musica.currentTime = 0
        sec = 0
      }


      index = all_sound.findIndex(item => item.link === url);
      if (index == 0) {
        index = all_sound.length - 1;
        url = all_sound[index].link
        play_button.classList.remove('bx-play')
        play_button.classList.add('bx-pause')
        if (sec == 0) {
          onSound(url)
        } else {
          onSound(url, sec)
        }
        console.log(index)
      } else {
        musica.currentTime = 0
        sec = 0
        index = index - 1
        console.log(index)
        url = all_sound[index].link
        play_button.classList.remove('bx-play')
        play_button.classList.add('bx-pause')
        if (sec == 0) {
          onSound(url)
        } else {
          onSound(url, sec)
        }
      }
    }
  }
})


right_button.addEventListener("click", (e) => {
  if (e.target == right_button) {
    index = all_sound.findIndex(item => item.link === url);
    console.log(index.length)
    if (sec >= 0 && index < all_sound.length && musica) {

      musica.pause();
      musica.currentTime = 0
      sec = 0


      index = index + 1;
      if (index == all_sound.length) {
        index = 0
        console.log(index, all_sound.length)
      }
      url = all_sound[index].link
      play_button.classList.remove('bx-play')
      play_button.classList.add('bx-pause')
      console.log(all_sound.length)
      if (sec == 0) {
        onSound(url)
      } else {
        onSound(url, sec)
      }



    } else {
      index = index + 1;
      if (index == all_sound.length) {
        index = 0
        console.log(index, all_sound.length)
      }
      url = all_sound[index].link
      play_button.classList.remove('bx-play')
      play_button.classList.add('bx-pause')
      console.log(all_sound.length)
      if (sec == 0) {
        onSound(url)
      } else {
        onSound(url, sec)
      }
      console.log('euu')
    }
  }
})






function getPixelColorFromImage(img_reference, x, y) {

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img_reference.width;
  canvas.height = img_reference.height;

  ctx.drawImage(img_reference, 0, 0, img_reference.width, img_reference.height);

  const imageData = ctx.getImageData(x, y, 1, 1);
  const [r, g, b, a] = imageData.data;

  console.log(canvas, ctx, imageData, r, g, b, a)
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}