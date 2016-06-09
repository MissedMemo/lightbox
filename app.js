// init overlay...
var overlay = document.querySelector('#overlay');
var closeButton = document.querySelector('.close-button');
var searchButton = document.querySelector('.search-button');
var imageList = document.querySelector('.image-list');

closeButton.addEventListener( 'click', function() {
  overlay.style.display = 'none';
}, false );


searchButton.addEventListener( 'click', function() {
  displayImages( document.querySelector( 'input' ).value );
}, false );


// ONE listener (on parent container) handles click on ANY image!
imageList.addEventListener( 'click', function(e) {
  if( e.target.src !== undefined ) {
    overlay.style.display = 'block';
    overlay.style.backgroundImage = 'url( ' + e.target.src + ')';
  }
  e.stopPropagation();
}, false );


// Duplicate jQuery method to clear list elements
imageList.empty = function() {
  while( this.firstChild ) {
    this.removeChild( this.firstChild );
  }
};


function displayImages( searchTerms ) {
  if( searchTerms !== null ) {
    var query = 'https://www.googleapis.com/customsearch/v1?'
              + 'key=AIzaSyDRNg12al500nvBg4w9vXxHxqMt4iVPgLA'
              + '&cx=013785967554816369765:m8ndxwd7vzw'
              + '&q=' + searchTerms;

    callAjax( query, function(results) {
      imageList.empty(); // remove all displayed images
      results.items.forEach( function(item) {
        insertImage( item.pagemap.cse_thumbnail[0].src );
      });
    });
  }
}


function insertImage( url ) {
  var li = document.createElement('li');
  var img = document.createElement('img');
  img.setAttribute( 'src', url );
  li.appendChild(img);
  imageList.appendChild(li);
}
