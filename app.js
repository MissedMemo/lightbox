// init overlay...
var overlay = document.getElementById('overlay');
var closeButton = document.getElementById('closeButton');

closeButton.addEventListener( 'click', function() {
  overlay.style.display = 'none';
}, false );

// init image list...
var imageList = document.getElementById('image-list');
imageList.addEventListener( 'click', handleImageClick, false );

function handleImageClick(e) {
  console.log( 'target & current.target:', e.target, e.currentTarget );
  if( e.target.src !== undefined ) {
    console.log( 'src:', e.target.src );
    overlay.style.display = 'block';
  }
  e.stopPropagation();
}