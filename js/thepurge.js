var instagramLoaded = false,
    twitterLoaded = false,
    $instagram,
    instTemplate;

function loadTwitterData( response ) {
  twitterLoaded = true;
  twitterData = response.data;
}

function loadInstagramData( response ) {
  var data = response.data;

  for ( var i = 0, length = data.length, pic; i < length; i++ ) {
    pic = data[i];

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

  $(window).on('hashchange',function() {
    var id = window.location.toString().match(/(#.*)$/)[0];
    $('.section').hide();
    $(id).show();
    if ( id == '#instagram' && $(id).find('.posts').html() == '' ) {
      inst.run();
    }
    if ( id =='#twitter' ) {
      $('#twitter iframe' ).css( 'width', '100%' );
    }
  });
}

window.onload = function() {
  init();
}
