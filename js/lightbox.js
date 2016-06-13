( function( API ) {

  var imageData = [];
  var imageIndex = 0;

  // inject ourselves on top of underlying page elements...
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  // HTML5 'template' feature suport still lacking, so we'll hack it...
  overlay.innerHTML = '<div id="lightbox">'
                    +   '<a href="#" class="close-button">X</a>'
                    +   '<div class="image-area">'
                    +     '<button class="nav-arrow arrow-previous">&lsaquo;</button>'
                    +     '<button class="nav-arrow arrow-next">&rsaquo;</button>'
                    +   '</div>'
                    +   '<div class="caption-bar">'
                    +     '<span>( no caption )</span>'
                    +   '</div>'
                    + '</div>';

  document.body.appendChild( overlay );

  var parentContainer = document.querySelector('.lightbox-image-container');

  // ONE listener to handle ALL image clicks
  parentContainer.addEventListener( 'click', function(e) {
    if( e.target.src !== undefined ) {
      overlay.style.display = 'block';
      document.body.classList.add('disable-scrolling');
      displayImage( +e.target.dataset.index );
    }
    e.stopPropagation();
  }, false );

  /* Note:  There may be a potential for some overlay elements not to be fully
     appended to the DOM before acquiring references below. A production-quality
     implementation might want to use some element-level equivalent to 'onload',
     or even explicitly add each individual element, attribute, etc. -- but the
     ability to view & edit the lightbox as a 'teamplate' is a huge convenience.
     see: http://stackoverflow.com/a/16726669
  */
  var closeButton  = document.querySelector('#lightbox .close-button');
  var lightbox     = document.querySelector('#lightbox');
  var imageArea    = document.querySelector('#lightbox .image-area');
  var previous     = document.querySelector('#lightbox .arrow-previous');
  var next         = document.querySelector('#lightbox .arrow-next');
  var imageCaption = document.querySelector('#lightbox .caption-bar span');


  closeButton.addEventListener( 'click', function() {
    overlay.style.display = 'none';
    document.body.classList.remove('disable-scrolling');
  }, false );

  next.addEventListener( 'click', function() {
    traverse( +1 );
  }, false );

  previous.addEventListener( 'click', function() {
    traverse( -1 );
  }, false );

  setMargins( parentContainer.dataset.lightboxMargins );

  
  function setMargins( marginString ) {
    if( marginString ) {
      var margins = marginString.split(' ');
      lightbox.style.top = margins[0];
      lightbox.style.right = margins[1];
      lightbox.style.bottom = margins[2];
      lightbox.style.left = margins[3];
    }
  }

  function traverse( direction ) {

    var index = imageIndex + direction;

    if( index > -1 && index < imageData.length ) {
      displayImage( index );
    }
  }

  function displayImage( index ) {
    imageIndex = index;
    var image = imageData[ imageIndex ];
    imageArea.style.backgroundImage = 'url( ' + image.url + ')';
    imageCaption.textContent = image.caption;
  }


  /////////////////  Public API  ///////////////////

  API.empty = function() {
    imageData = [];
    imageIndex = 0;
  };

  API.addImageRef = function( url, caption ) {
    imageData.push({
      url: url,
      caption: caption
    });
  };

  window.lightbox = API;

}( {} ));