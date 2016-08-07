document.querySelector('#search').addEventListener('click', function() {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = renderImages;
  httpRequest.open('GET', `https://api.flickr.com/services/rest?api_key=${API_KEY}&method=flickr.photosets.getPhotos&user_id=${USER_ID}&photoset_id=72157671032461750&format=json&per_page=18`);
  httpRequest.send(null);
});

document.querySelector('.selected_image').addEventListener('click', function() {
  document.querySelector('#lightbox').style.display = 'none';
});

document.querySelector('#previous').addEventListener('click', function() {
  if (gridPosition[0] === '2' && gridPosition[1] === '5') {
    document.querySelector('#next').style.display = 'inline';
  }
  if (Number(gridPosition[1]) > 0) {
    gridPosition[1] = String(Number(gridPosition[1] - 1));
    updateSelectedImage(document.getElementById(gridPosition.join('_')));
    if (gridPosition[0] === '0' && gridPosition[1] === '0') {
      document.querySelector('#previous').style.display = 'none';
    }
  } else {
    if (Number(gridPosition[0]) > 0) {
      gridPosition[0] = `${Number(gridPosition[0] - 1)}`;
      gridPosition[1] = '5';
      updateSelectedImage(document.getElementById(gridPosition.join('_')));
    }
  }
});

document.querySelector('#next').addEventListener('click', function() {
  if (gridPosition[0] === '0' && gridPosition[1] === '0') {
    document.querySelector('#previous').style.display = 'inline';
  }
  if (Number(gridPosition[1]) < 5) {
    gridPosition[1] = String(Number(gridPosition[1]) + 1);
    updateSelectedImage(document.getElementById(gridPosition.join('_')));
    if (gridPosition[0] === '2' && gridPosition[1] === '5') {
      document.querySelector('#next').style.display = 'none';
    }
  } else {
    if (Number(gridPosition[0]) < 2) {
      gridPosition[0] = `${Number(gridPosition[0]) + 1}`;
      gridPosition[1] = '0';
      updateSelectedImage(document.getElementById(gridPosition.join('_')));
    }
  }
});

function addThumbnailImageEventListener(image) {
  image.addEventListener('click', function() {
    gridPosition = image.id.split('_');
    updateSelectedImage(image);
    document.querySelector('#lightbox').style.display = 'inline';
    if (gridPosition[0] === '0' && gridPosition[1] === '0') {
      document.querySelector('#previous').style.display = 'none';
    } else if (gridPosition[0] === '2' && gridPosition[1] === '5') {
      document.querySelector('#next').style.display = 'none';
    }
  });
}