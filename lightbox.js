( function( _ ) {

  // inject ourselves on top of underlying page elements...
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  document.querySelector('body').appendChild(overlay);

  _.test = function test() {
    return "module reference working ok...";
  };

  window.lightbox = _;

}( {} ));