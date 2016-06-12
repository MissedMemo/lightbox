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
                    +     '<button class="imagePrevious">&lsaquo;</button>'
                    +     '<button class="imageNext">&rsaquo;</button>'
                    +   '</div>'
                    +   '<div class="caption-bar">'
                    +     '<span>( no caption )</span>'
                    +   '</div>'
                    + '</div>';

  document.body.appendChild( overlay );

  var parentContainer = document.querySelector('.lightbox-image-container');

  var closeButton  = document.querySelector( '#lightbox .close-button' );
  var lightbox  = document.querySelector( '#lightbox' );
  var imageArea   = document.querySelector('#lightbox .image-area');
  var imageCaption = document.querySelector('#lightbox .caption-bar span');

  // ONE listener to handle all image clicks
  parentContainer.addEventListener( 'click', function(e) {
    if( e.target.src !== undefined ) {
      overlay.style.display = 'block';
      document.body.classList.add('disable-scrolling');
      display( imageData[0] );
    }
    e.stopPropagation();
  }, false );


  closeButton.addEventListener( 'click', function() {
    overlay.style.display = 'none';
    document.body.classList.remove('disable-scrolling');
  }, false );


  function display( image ) {
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

  API.setStyle_Margins = function( marginString ) {
    var margins = marginString.split(' ');
    lightbox.style.top = margins[0];
    lightbox.style.right = margins[1];
    lightbox.style.bottom = margins[2];
    lightbox.style.left = margins[3];
  };

  window.lightbox = API;

}( {} ));