function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

 async function renderImage(imageData) {
  document.getElementById('image-wrap').href = imageData.url;
  document.getElementById('image').src = imageData.image_original_url;
  // document.getElementById('source').src = imageData.image_mp4_url;
  // document.getElementById('video').load();
  // document.getElementById('video').play();
  
}

async function getBoobsUrl() {
  let url = 'https://api.giphy.com/v1/gifs/random?api_key=a89c66e48519481ab448a3f8356e635c&tag=animals';
  let result = await fetch(url);
  let jsonResult = await result.json();
  renderImage(jsonResult.data)
}


document.addEventListener('DOMContentLoaded', async () => {
   setInterval(async () => {
    renderStatus('Đang tìm vếu ...');
    await getBoobsUrl();
    renderStatus('');
  }, 5000)
});
