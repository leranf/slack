var PHOTOSET_ID = '72157671032461750';

document.querySelector('#search').addEventListener('click', function() {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = renderImages;
  httpRequest.open('GET', `https://api.flickr.com/services/rest?api_key=${API_KEY}&method=flickr.photosets.getPhotos&user_id=${USER_ID}&photoset_id=${PHOTOSET_ID}&format=json&per_page=18`);
  httpRequest.send(null);
  document.querySelector('#search').style.display = 'none';
});

document.querySelector('.selected_image').addEventListener('click', function() {
  document.querySelector('#lightbox').style.display = 'none';
});

document.querySelector('#previous').addEventListener('click', function() {
  var selectedId = document.querySelector('.selected_image').id;
  if (selectedId === String(photoInfo.length - 1)) {
    document.querySelector('#next').style.display = 'inline';
  } else if (selectedId === '1') {
    document.querySelector('#previous').style.display = 'none';
  }
  var newSelectedId = Number(selectedId) - 1;
  updateSelectedImage(document.getElementById(String(newSelectedId)));
});

document.querySelector('#next').addEventListener('click', function() {
  var selectedId = document.querySelector('.selected_image').id;
  if (selectedId === '0') {
    document.querySelector('#previous').style.display = 'inline';
  } else if (selectedId === String(photoInfo.length - 2)) {
    document.querySelector('#next').style.display = 'none';
  }
  var newSelectedId = Number(selectedId) + 1;
  updateSelectedImage(document.getElementById(String(newSelectedId)));
});

function addThumbnailImageEventListener(image) {
  image.addEventListener('click', function() {
    updateSelectedImage(image);
    document.querySelector('#lightbox').style.display = 'inline';
    if (image.id === '0') {
      document.querySelector('#previous').style.display = 'none';
      document.querySelector('#next').style.display = 'inline';
    } else if (image.id === String(photoInfo.length - 1)) {
      document.querySelector('#previous').style.display = 'inline';
      document.querySelector('#next').style.display = 'none';
    } else {
      document.querySelector('#previous').style.display = 'inline';
      document.querySelector('#next').style.display = 'inline';
    }
  });
}
