// init overlay...
var overlay = document.querySelector('#overlay');
var closeButton = document.querySelector('.close-button');

closeButton.addEventListener( 'click', function() {
  overlay.style.display = 'none';
}, false );

var searchButton = document.querySelector('.search-button');

searchButton.addEventListener( 'click', function() {
  displayImages( document.querySelector( 'input' ).value );
}, false );


function displayImages( searchTerms ) {
  if( searchTerms !== null ) {
    var query = 'https://www.googleapis.com/customsearch/v1?'
              + 'key=AIzaSyDRNg12al500nvBg4w9vXxHxqMt4iVPgLA'
              + '&cx=013785967554816369765:m8ndxwd7vzw'
              + '&q=' + searchTerms;

    callAjax( query, function(results) {
      results.items.forEach( function(item) {
        insertImage( item.pagemap.cse_thumbnail[0].src );
      });
    });
  }
}


// init image list...
var imageList = document.querySelector('.image-list');
imageList.addEventListener( 'click', handleImageClick, false );


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