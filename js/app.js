var FAKE_SEARCH = false; // toggle actual vs. fake online image search results

var searchField   = document.querySelector('.search-panel input');
var searchButton  = document.querySelector('.search-panel button');
var imageList     = document.querySelector('.image-list');


searchField.addEventListener( 'input', function(e) {
  searchButton.disabled = (searchField.value.length === 0);
}, false);

searchField.addEventListener( 'keyup', function(e) {
  e.preventDefault();
  if( e.keyCode == 13 ) {
    searchButton.click();
    searchButton.focus();
  }
}, false );

searchButton.addEventListener( 'click', function() {
  
  imageList.empty(); // remove currently-displayed images
  lightbox.empty();

  if( FAKE_SEARCH ) // work-around Google CSE 100 query/day limit
    getImages_LoremPixelAPI();
  else
    getImages_GoogleCustomSearchAPI( searchField.value );

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
  for( var num = 41; num < 51; num += 10 ) {

    utils.callAjax( query + '&start=' + num, function(results) {

      var fragment = document.createDocumentFragment();
      var i = 0; // can't use forEach index, since we just count VALID images

      results.items.forEach( function( item ) {

        var validImage = extractImageData( item.pagemap );

        if( validImage ) { // Client receives thumbnails, full-size images go to lightbox
          console.log( 'thumbnail, full-size, i:', validImage.urlThumbnail, validImage.urlFullSize, i );
          fragment.appendChild( createImageListElement( validImage.urlThumnail, i++ ) );
          lightbox.addImageRef( validImage.urlFullSize, item.title );          
        }
      });

      imageList.appendChild( fragment ); // update DOM as a single operation

    });

  }
}


function extractImageData( data ) {
  // keep it simple for now, but we could get fancy,
  // substituting full-size image for missing thumbnail & vis-versa...
  if( data && data.cse_thumbnail && data.cse_image ) {
    return {
      urlThumnail: data.cse_thumbnail[0].src,
      urlFullSize: data.cse_image[0].src
    };
  }
}


function getImages_LoremPixelAPI( searchTerms ) {

  var fragment = document.createDocumentFragment();
  
  for( var i = 0; i < 40; i++ ) {

    // Random height & width between 100-300px
    var imageHeight = Math.floor(Math.random() * 200) + 100;
    var imageWidth = Math.floor(Math.random() * 200) + 100;

    var randomImageUrl = [
      'http://lorempixel.com', imageHeight, imageWidth, 'animals'
    ].join('/');
    
    fragment.appendChild( createImageListElement( randomImageUrl, i ) );
    lightbox.addImageRef( randomImageUrl, 'fake animal caption!' );
  }

  imageList.appendChild( fragment ); // update DOM as a single operation
}


function createImageListElement( urlImage, i ) {

  var img = document.createElement('img');
  img.setAttribute( 'src', urlImage );
  img.dataset.index = imageList.getElementsByTagName('li').length + i;
  
  var div = document.createElement('div');
  div.className = 'img-container';
  div.appendChild(img);

  var li = document.createElement('li');
  li.appendChild(div);
  
  return li;
}