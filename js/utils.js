( function( API ) {

  API.callAjax = function( url, callback ) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if( xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200 ) {
        callback( JSON.parse( xmlhttp.responseText ) );
      }
    };
    xmlhttp.open( 'GET', url, true );
    xmlhttp.send();
  };

  if( typeof(module) !== 'undefined' )
    module.exports = API; // node support
  else
    window.utils = API;

}( {} ));