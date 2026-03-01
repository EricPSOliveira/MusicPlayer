const sel = document.querySelectorAll('.sel')
const itens_for_menu = document.querySelector('.itens')


window.addEventListener('load', async () => {
  increase()


  
})








async function increase() {
  const response = await fetch('./assets/scripts/back-end/php/menu.php');

  console.log(response)


  const data = await response.json()
  console.log(data)

  if (data.status === 'success') {
    let fontaine = data.data

    console.log(fontaine)

    fontaine.forEach(obj => {
      if (obj.link) {
        obj.link = obj.link.replace(/\\/g, '/');  
        obj.link = obj.link.replace("C:/xampp/htdocs/Eric/Music player", ".");
      }
      if (obj.img) {
        obj.img = obj.img.replace(/\\/g, '/'); 
        obj.img = obj.img.replace("C:/xampp/htdocs/Eric/Music player", ".");
      }
    });

    all_sound.push(...fontaine)
    console.log(all_sound)
  }




  sel.forEach((e) => {
    e.src = './assets/test1/no_image.png'
  })


  let number = [];

  for (let i = 0; i < all_sound.length; i++) {
    const sound = all_sound[i];
    let minutos;
    let segundos;

    const usar = new Audio(sound.link);
    usar.addEventListener('loadedmetadata', () => {
      const duracao = usar.duration;
      minutos = Math.floor(duracao / 60);
      segundos = Math.floor(duracao % 60);

      const existing = number.find(item => item.id === sound.id);
      if (existing && existing.lopus) {
        console.log(sound.id);
        return;
      } else {

        const imgSrc = sound.img ? sound.img : './assets/test1/no_image.png';
        const div = `
      <div class="exemple1">
        <figure>
          <img class="sel" src="${imgSrc}" alt="exemple1">
          <div class="play"><i class="bx bx-play"></i></div>
        </figure>
        <div class="music_menu_info">
          <p>${sound.autor}</p>
          <h3 id='${sound.id}'>${sound.nome}</h3>
        </div>
        <div class="timr">
          <p>${minutos}:${segundos.toString().padStart(2, '0')}</p>
        </div>
      </div>`;

        itens_for_menu.innerHTML += div;

        number.push({ id: sound.id, lopus: true });
      }
    });
  }


  url = all_sound[0].link;
  autorrae.innerHTML = all_sound[index].autor
  musca.innerHTML = all_sound[index].nome

  onSound(url, 0)
  musica.pause()
}