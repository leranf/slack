var httpRequest;
var photoInfo = [ [], [], [] ];
var gridPosition;

function renderImages() {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      var results = JSON.parse(httpRequest.responseText.slice(14).slice(0,-1)).photoset.photo;
      var count = 0;
      var currentRow = 0;
      
      results.forEach(function(result) {
        if (count < 6) {
          photoInfo[currentRow].push({
            url: `https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`,
            title: result.title
          });
          count++;
        } else {
          photoInfo[++currentRow].push({
            url: `https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`,
            title: result.title
          });
          count = 1;
        }
      });
      
      if ('content' in document.createElement('template')) {
        var t = document.querySelector('#image_row');
        var td = t.content.querySelectorAll('td');
        console.log('from template', td);
        photoInfo.forEach(function(row, rowIndex) {
          row.forEach(function(item, columnIndex) {
            td[columnIndex].innerHTML = `<img id='${rowIndex}_${columnIndex}_${item.title}' class='flickr_image' src='${item.url}'>`;
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
  document.querySelector('.title').innerHTML = newSelectedImage.id.split('_')[2];
}
