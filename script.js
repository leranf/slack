var httpRequest;

document.querySelector('#search').addEventListener('click', function() {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = renderImages;
  httpRequest.open('GET', `https://api.flickr.com/services/rest?api_key=${API_KEY}&method=flickr.photosets.getPhotos&user_id=${USER_ID}&photoset_id=72157631585502446&format=json&per_page=18`);
  httpRequest.send(null);
});

var photoUrls = {
  row_1: [],
  row_2: [],
  row_3: [],
};

function renderImages() {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      document.querySelector('#images').innerHTML = '';
      var results = JSON.parse(httpRequest.responseText.slice(14).slice(0,-1)).photoset.photo;
      var count = 0;
      var currentRow = 1;
      
      results.forEach(function(result) {
        if (count < 6) {
          photoUrls[`row_${currentRow}`].push(`https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`);
          count++;
        } else {
          photoUrls[`row_${++currentRow}`].push(`https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`);
          count = 1;
        }
      });
      
      if ('content' in document.createElement('template')) {
        var t = document.querySelector('#imageRow');
        var td = t.content.querySelectorAll('td');
        Object.keys(photoUrls).forEach(function(row) {
          photoUrls[row].forEach(function(url, i) {
            td[i].innerHTML = `<img id='${row}.${i}' src='${url}'>`;
          });
          var table = document.querySelector('#images');
          var clone = document.importNode(t.content, true);
          table.appendChild(clone);
        });
      }
      
      document.querySelectorAll('img').forEach(function(image) {
        image.addEventListener('click', function() {
          document.querySelector('#selectedImage').src = image.src;
          document.querySelector('#lightbox').style.display = 'inline';
        });
      });
    }
  }
}

document.querySelector('#lightbox').addEventListener('click', function() {
  this.style.display = 'none';
});

document.querySelector('#previous').addEventListener('click', function() {

});

document.querySelector('#next').addEventListener('click', function() {

});