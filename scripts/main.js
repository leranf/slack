var httpRequest;
var photoInfo = [];

function renderImages() {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      var results = JSON.parse(httpRequest.responseText.slice(14).slice(0,-1)).photoset.photo;
      
      results.forEach(function(result) {
        photoInfo.push({
          url: `https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`,
          title: result.title
        });
      });
      
      var list = document.querySelector('#images');
      photoInfo.forEach(function(photo, i) {
        var li = document.createElement('li');
        li.innerHTML = `<img id='${i}' class='flickr_image' src='${photo.url}' alt='${photo.title}'>`;
        list.appendChild(li);
      }); 
      
      document.querySelectorAll('.flickr_image').forEach(function(image) {
        addThumbnailImageEventListener(image);
      });
    }
  }
}

function updateSelectedImage(newSelectedImage) {
  document.querySelector('.selected_image').src = newSelectedImage.src;
  document.querySelector('.selected_image').id = newSelectedImage.id;
  document.querySelector('.title').innerHTML = newSelectedImage.alt;
}
