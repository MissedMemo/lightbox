// init overlay...
var overlay = document.getElementById('overlay');
var closeButton = document.getElementById('closeButton');

closeButton.addEventListener( 'click', function() {
  overlay.style.display = 'none';
}, false );

// init image list...
var imageList = document.getElementById('image-list');
imageList.addEventListener( 'click', handleImageClick, false );

var keywords = 'kittens dogs';

var query = 'https://www.googleapis.com/customsearch/v1?'
          + 'key=AIzaSyDRNg12al500nvBg4w9vXxHxqMt4iVPgLA'
          + '&cx=013785967554816369765:m8ndxwd7vzw'
          + '&q=' + keywords;

callAjax( query, function(results) {
  results.items.forEach( function(item) {
    insertImage( item.pagemap.cse_thumbnail[0].src );
  });
});


function insertImage( url ) {
  var li = document.createElement('li');
  var img = document.createElement('img');
  img.setAttribute( 'src', url );
  li.appendChild(img);
  imageList.appendChild(li);
}


function handleImageClick(e) {
  //console.log( 'target & current.target:', e.target, e.currentTarget );
  if( e.target.src !== undefined ) {
    overlay.style.display = 'block';
    overlay.style.backgroundSize = 'cover';
    overlay.style.backgroundPosition = 'center';
    overlay.style.backgroundImage = 'url( ' + e.target.src + ')';
  }
  e.stopPropagation();
}