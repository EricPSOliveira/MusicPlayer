const sender = document.querySelector('.bx.bx-send');

simple_modal.addEventListener('submit', async (e) => {
  e.preventDefault();

  let input_music = document.querySelector('#music').value;
  let input_autor = document.querySelector('#autor').value;
  const input_img = document.querySelector('#file'); // Imagem
  const music_url = document.querySelector('#music_url'); // Arquivo MP3

  const formData = new FormData(simple_modal);
  formData.append('input_music', input_music);
  formData.append('input_autor', input_autor);

  if (input_img?.files[0]) {
    formData.append('input_img', input_img.files[0]);
  }

  if (music_url?.files[0]) {
    formData.append('music_url', music_url.files[0]); // Adiciona o arquivo MP3
  }

  // Debug: Ver os valores do FormData
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await fetch('./assets/scripts/back-end/php/criar.php', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log('Success:', data);

    setTimeout(() => {
      document.querySelector('#music').value = ''
      document.querySelector('#autor').value = ''
      window.location.reload()
    }, 1000);
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);

    setTimeout(() => {
      document.querySelector('#music').value = ''
      document.querySelector('#autor').value = ''
      window.location.reload()
    }, 1000);
  }



});
