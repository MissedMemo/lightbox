var FAKE_SEARCH = true; // toggle actual vs. fake online image search results

var searchButton   = document.querySelector('.search-button');
var searchField    = document.querySelector('.search-panel input');
var imageList      = document.querySelector('.image-list');
var overlay        = document.querySelector('#overlay');
var overlayImage   = document.querySelector('#overlay .image-area');
var overlayCaption = document.querySelector('#overlay .caption-bar span');
var closeButton    = document.querySelector('#overlay .close-button');

searchButton.disabled = true; // init to disabled

closeButton.addEventListener( 'click', function() {
  overlay.style.display = 'none';
}, false );


searchField.addEventListener('input', function(e) {
  searchButton.disabled = (searchField.value.length === 0);
}, false);


searchButton.addEventListener( 'click', function() {

  imageList.empty(); // remove currently-displayed images

  if( FAKE_SEARCH ) // work-around Google CSE 100 query/day limit
    getImages_LoremPixelAPI();
  else
    getImages_GoogleCustomSearchAPI( searchField.value );

}, false );


// ONE listener (on parent container) handles click on ANY image!
imageList.addEventListener( 'click', function(e) {
  if( e.target.src !== undefined ) {
    overlay.style.display = 'block';
    overlayImage.style.backgroundImage = 'url( ' + e.target.dataset.largeImage + ')';
    overlayCaption.textContent = e.target.dataset.caption;
  }
  e.stopPropagation();
}, false );


// Duplicate jQuery method to clear list elements
imageList.empty = function() {
  while( this.firstChild ) {
    this.removeChild( this.firstChild );
  }
};


function getImages_GoogleCustomSearchAPI( searchTerms ) {
  var query = 'https://www.googleapis.com/customsearch/v1?'
            + 'key=AIzaSyDRNg12al500nvBg4w9vXxHxqMt4iVPgLA'
            + '&cx=013785967554816369765:m8ndxwd7vzw'
            + '&safe=medium'
            + '&q=' + searchTerms;
  
  // Google API limits results to 10 per query, so issue multiple queries to fill page
  for( var page = 41; page < 51; page += 10 ) {

    callAjax( query + '&start=' + page, function(results) {
      results.items.forEach( function(item) {
        //console.log( 'item:', item );
        if( item.pagemap && item.pagemap.cse_thumbnail ) {
          insertImage( item.pagemap.cse_thumbnail[0].src,
                       item.pagemap.cse_image[0].src,
                       item.title );
        }
      });
    });

  }
}

function getImages_LoremPixelAPI( searchTerms ) {
  
  for( var i = 0; i < 40; i++ ) {

    // Random height & width between 100-300px
    var imageHeight = Math.floor(Math.random() * 200) + 100;
    var imageWidth = Math.floor(Math.random() * 200) + 100;

    var randomImageUrl = [
      'http://lorempixel.com', imageHeight, imageWidth, 'animals'
    ].join('/');
    
    insertImage( randomImageUrl, randomImageUrl, 'fake animal caption!' );
  }
}


function insertImage( urlThumbnail, urlActual, caption ) {

  var img = document.createElement('img');
  img.setAttribute( 'src', urlThumbnail );
  img.dataset.caption = caption;
  img.dataset.largeImage = urlActual;

  var div = document.createElement('div');
  div.className = 'img-container';
  div.appendChild(img);

  var li = document.createElement('li');
  li.appendChild(div);
  imageList.appendChild(li);
}
