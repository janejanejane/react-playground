var p = new Polyglot( { phrases: { "hello": "Hello!" } } );

console.log( p.t( 'hello' ) );

$.get( 'phrases.json', function( result ) {
    console.log( 'result:', result );

    var p2 = new Polyglot( { phrases: result } );
    console.log( p2.t( 'hello' ) );
});
