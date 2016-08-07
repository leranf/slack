var httpRequest;

document.querySelector('#search').addEventListener('click', function() {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = renderImages;
  httpRequest.open('GET', `https://api.flickr.com/services/rest?api_key=${API_KEY}&method=flickr.photosets.getPhotos&user_id=${USER_ID}&photoset_id=72157631585502446&format=json&per_page=18`);
  httpRequest.send(null);
});

var photoUrls = [ [], [], [] ];
var gridPosition;

function renderImages() {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      document.querySelector('#images').innerHTML = '';
      var results = JSON.parse(httpRequest.responseText.slice(14).slice(0,-1)).photoset.photo;
      var count = 0;
      var currentRow = 0;
      
      results.forEach(function(result) {
        if (count < 6) {
          photoUrls[currentRow].push(`https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`);
          count++;
        } else {
          photoUrls[++currentRow].push(`https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`);
          count = 1;
        }
      });
      
      if ('content' in document.createElement('template')) {
        var t = document.querySelector('#imageRow');
        var td = t.content.querySelectorAll('td');
        photoUrls.forEach(function(row, rowIndex) {
          row.forEach(function(url, columnIndex) {
            td[columnIndex].innerHTML = `<img id='${rowIndex}_${columnIndex}' class='flickrImage' src='${url}'>`;
          });
          var table = document.querySelector('#images');
          var clone = document.importNode(t.content, true);
          table.appendChild(clone);
        });
      }
      
      document.querySelectorAll('.flickrImage').forEach(function(image) {
        image.addEventListener('click', function() {
          gridPosition = image.id.split('_');
          updateSelectedImage(image);
          document.querySelector('#lightbox').style.display = 'inline';
        });
      });
    }
  }
}

function updateSelectedImage(newSelectedImage) {
  document.querySelector('.selectedImage').src = newSelectedImage.src;
  document.querySelector('.selectedImage').id = newSelectedImage.id;
}

document.querySelector('.selectedImage').addEventListener('click', function() {
  document.querySelector('#lightbox').style.display = 'none';
});

document.querySelector('#previous').addEventListener('click', function() {
  if (Number(gridPosition[1]) > 0) {
    gridPosition[1] = String(Number(gridPosition[1] - 1));
    updateSelectedImage(document.getElementById(gridPosition.join('_')));
  } else {
    if (Number(gridPosition[0]) > 0) {
      gridPosition[0] = `${Number(gridPosition[0] - 1)}`;
      gridPosition[1] = '5';
      updateSelectedImage(document.getElementById(gridPosition.join('_')));
    }
  }
});

document.querySelector('#next').addEventListener('click', function() {
  if (Number(gridPosition[1]) < 5) {
    gridPosition[1] = String(Number(gridPosition[1]) + 1);
    updateSelectedImage(document.getElementById(gridPosition.join('_')));
  } else {
    if (Number(gridPosition[0]) < 2) {
      gridPosition[0] = `${Number(gridPosition[0]) + 1}`;
      gridPosition[1] = '0';
      updateSelectedImage(document.getElementById(gridPosition.join('_')));
    }
  }
});