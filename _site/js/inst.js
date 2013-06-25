var instagramLoaded = false,
    twitterLoaded = false,
    instagramData,
    $instagram,
    instTemplate,
    $loading = $('#loading');

function loadTwitterData( response ) {
  twitterLoaded = true;
  twitterData = response.data;
}

function loadInstagramData( response ) {
  $loading.hide();
  var data = response.data;
  instagramData = data;

  console.log(response);
  for ( var i = 0, length = data.length, pic; i < length; i++ ) {
    pic = data[i];

    console.log(pic);
    $instagram.append( Mustache.render( instTemplate, pic ) );

  }
  $instagram.find( '.post .caption' ).each( function() {
    var text = $( this ).text();

    text = text.replace( /(\@(\S*))/g, '<a href="http://instagram.com/$2">$1</a>' );

    $( this ).html( text );
  });
  $instagram.find('img').load(function() {
    $instagram.masonry({
      itemSelector: '.well',
      gutter: 30
    });
  });
}

function init() {
  instTemplate = $( '#instagram-post-template' ).text();
  $instagram = $( '#instagram .posts' );

  var inst = new Instafeed({
    get: 'tagged',
    tagName: 'thepurge209',
    clientId: '9144b57fd3bf4eb383a4bfe95f9badf1',
    resolution: 'low_resolution',
    success: loadInstagramData
  });

  inst.run();
}

window.onload = function() {
  init();
}