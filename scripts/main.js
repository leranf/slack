var httpRequest;
var photoUrls = [ [], [], [] ];
var gridPosition;

function renderImages() {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
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
        var t = document.querySelector('#image_row');
        var td = t.content.querySelectorAll('td');
        console.log('from template', td);
        photoUrls.forEach(function(row, rowIndex) {
          row.forEach(function(url, columnIndex) {
            td[columnIndex].innerHTML = `<img id='${rowIndex}_${columnIndex}' class='flickr_image' src='${url}'>`;
          });
          var table = document.querySelector('#images');
          var clone = document.importNode(t.content, true);
          table.appendChild(clone);
        });
      }
      
      document.querySelectorAll('.flickr_image').forEach(function(image) {
        addThumbnailImageEventListener(image);
      });
    }
  }
}

function updateSelectedImage(newSelectedImage) {
  document.querySelector('.selected_image').src = newSelectedImage.src;
  document.querySelector('.selected_image').id = newSelectedImage.id;
}
