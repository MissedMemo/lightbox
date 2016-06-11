( function( API ) {

  var imagesContainer = document.querySelector('.lightbox-image-container');
  var body = document.querySelector('body');

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

  body.appendChild(overlay);

  var closeButton  = document.querySelector( '#lightbox .close-button' );
  var lightbox  = document.querySelector( '#lightbox' );

  // ONE listener (on parent container) handles click on ANY image!
  imagesContainer.addEventListener( 'click', function(e) {
    if( e.target.src !== undefined ) {
      overlay.style.display = 'block';
      body.classList.add('disable-scrolling');
      //overlayImage.style.backgroundImage = 'url( ' + e.target.dataset.largeImage + ')';
      //overlayCaption.textContent = e.target.dataset.caption;
    }
    e.stopPropagation();
  }, false );


  closeButton.addEventListener( 'click', function() {
    overlay.style.display = 'none';
    body.classList.remove('disable-scrolling');
  }, false );


  /////////////////  Public API  ///////////////////

  API.setStyle_Margins = function( marginString ) {
    var margins = marginString.split(' ');
    lightbox.style.top = margins[0];
    lightbox.style.right = margins[1];
    lightbox.style.bottom = margins[2];
    lightbox.style.left = margins[3];
  };

  window.lightbox = API;

}( {} ));