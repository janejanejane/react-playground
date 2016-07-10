;(function( global ) {
  'use strict';

  var axisColor = 'gray',
      circleRadius = 3,
      columnClassColor = 'column-color',
      data,
      graphXRange,
      graphYRange,
      height = 200,
      initialPosition = 48,
      innerAxisLength = 35,
      line = d3.svg.line().interpolate( 'linear' ),
      margin = {
        bottom: 20,
        left: 45,
        right: 15,
        top: 20
      },
      svg,
      tickInterval = 3,
      width = 400,
      wrapper,
      x = d3.scale.linear(),
      xAxis = d3.svg.axis(),
      xAxisSpace = 0.5,
      xBottom = [ '1', '2', '3', '4', '5', '6', '7' ],
      y = d3.scale.linear(),
      yAxis = d3.svg.axis();


  var charter = {

    line: function( container ) {

    // register events to dispatch
    var dispatch = d3.dispatch( 'mouseoverOutside' );

    var lineInternals = Object.create( internals );

    function self( selection ) {
      selection.each( function( d, i ) {
        graphXRange = width - margin.left - margin.right;
        graphYRange = height - margin.top - margin.bottom;
        data = d;

        lineInternals.buildSVG( this );
        lineInternals.buildScales();
        lineInternals.buildAxis();
        lineInternals.buildLine();
        lineInternals.drawAxis();
        lineInternals.drawLines();
        lineInternals.drawCircles();
        lineInternals.drawBars();
        lineInternals.dispatch = dispatch;

      });
    }


    return d3.rebind( self, dispatch, 'on' );
  }
};

var internals = {
    dispatch: null,

    buildSVG: function( container ) {
      // if ( !svg ) {
        svg = d3.select( container )
          .append( 'svg' );

          this.buildGroups();
      // }

      svg.transition()
        .attr( 'width', width )
        .attr( 'height',  height );

    },

    buildGroups: function() {

          var wrapper = svg.append( 'g' )
            .attr( 'class', 'wrapper' )
            .attr( 'transform', 'translate(' + margin.left + ', 0 )' );

          // x-axis group element
          wrapper.append( 'g' ).attr( 'class', 'x axis' );

          // y-axis group element
          wrapper.append( 'g' ).attr( 'class', 'y axis' );

          // background rects to enable column colors
          wrapper.append( 'g' ).attr( 'class', 'columns');

          // the actual data line will be placed in this group
          wrapper.append( 'g' ).attr( 'class', 'lines' );

          // all the circles will be here
          wrapper.append( 'g' ).attr( 'class', 'circles' );

          // this contains the rect elements that will respond to hover events
          wrapper.append( 'g' ).attr( 'class', 'hover' );
    },

    buildScales: function() {
        // set the domain and range for the x-axis
        this.setScale({
          axis: x,
          domain: [ 0 , xBottom.length ],
          range: [ 0, graphXRange ]
        });

        // set the domain and range for the y-axis
        this.setScale({
          axis: y,
          domain: d3.extent( d3.merge( data ).filter( function( i ) { return typeof i === 'number'; } ) ),
          range: [ graphYRange, 0 ]
        });
    },

    buildAxis: function() {

      xAxis.scale( x )
        .tickValues( xBottom.map( function( d, i ) {
          return i;
        }))
        .tickFormat( function( d, i ) {
          return xBottom[ d ];
        })
        .orient( 'bottom' );

      yAxis.scale( y )
        // .tickValues( d3.extent( data[ 0 ].slice( 1 ) ) )
        .tickFormat( function( d, i ) {
          return d;
        })
        .ticks( 7 )
        .orient( 'left' );
    },

    buildLine: function() {
      // define the line
      line.x( function( d, i ) {
          return x( i + xAxisSpace );
        })
        .y( function( d, i ) {
          return y( d );
        });
    },

    drawAxis: function() {
      var wrapper = svg.select( '.wrapper' )
      wrapper.select( '.x.axis' )
        .attr( 'transform', 'translate( 0, ' + graphYRange + ')' )
        .style( 'fill', axisColor )
        .call( xAxis );

      wrapper.select( '.y.axis' )
        .style( 'fill', axisColor )
        .call( yAxis );
    },

    drawBars: function() {

      // add a hover area, a rect tag
      var bars = svg.select( '.hover' )
        .selectAll( '.hover-rect' )
          .data( xBottom );
      var bgBars = svg.select( '.columns' );
      var wrapper = svg.select( '.wrapper' );

      // draw the graph column backgrounds
      bgBars.selectAll( '.graph-columns' )
        .data( xBottom )
      .enter().append( 'rect' )
        .attr( 'x', function( d, i ) {
          return i * ( graphXRange / xBottom.length );
        })
        .attr( 'y', 0 )
        .attr( 'width', ( graphXRange / xBottom.length - 1 ) )
        .attr( 'height', graphYRange )
        .attr( 'fill', function( d, i ) {

          // no column color needed
          if ( !columnClassColor ) {
            return 'transparent';
          }

          // separate every x-axis by transparent and column color specified
          return ( ( i + 1 ) % 2 === 0 ) ? 'transparent' : null;
        })
        .attr( 'class', function( d, i ) {
      	  return ( ( i + 1 ) % 2 === 0 ) ? null : columnClassColor;
        });

      // add the bars that will handle the hover event of the graph,
      // these bars are transparent
      bars.enter().append( 'rect' )
        .attr( 'x', function( d, i ) {
          return i * ( graphXRange / xBottom.length );
        })
        .attr( 'y', 0 )
        .attr( 'width', ( graphXRange / xBottom.length - 1 ) )
        .attr( 'height', graphYRange + 20 )
        .attr( 'fill', 'transparent' )
        .attr( 'class', 'hover-rect' );

      bars.on( 'mouseover', this.mouseOver( wrapper ).bind( this ) );
    },

    drawCircles: function() {
      // include the lines and circle now
      for ( var val in data ) {
        var values = data[ val ].slice( 1 );
    	  initialPosition = ( values.length < initialPosition ) ? values.length : initialPosition;
      }

      for ( var val in data ) {
        var record = data[ val ];
        this.setCircle( {
          data: record.slice( 1 ),
          dataset: val,
          initialPosition: initialPosition - 1,
          className: record[ 0 ]
        } );
      }
    },

    drawLines: function() {
      for ( var val in data ) {
        var record = data[ val ];
        this.setLine( {
          data: record.slice( 1 ),
          className: record[ 0 ]
        } );
      }
    },

    setScale: function( props ) {
      props.axis.domain( props.domain )
        .range( props.range );
    },

    setLine: function( props ) {
      svg.select( '.lines' )
        .append( 'path' )
          .datum( props.data )
          .attr( 'd', line( props.data ) )
          .attr( 'class', props.className )
          .style( 'fill', 'transparent' );
    },

    setCircle: function( props ) {
      svg.select( '.circles' )
        .append( 'g' )
          .append( 'circle' )
          .attr( 'cx', x( props.initialPosition + xAxisSpace ) )
          .attr( 'cy', y( props.data[ props.initialPosition ] + 10 ) )
          .attr( 'r', circleRadius )
          .attr( 'class', props.className + props.dataset );
    },

    mouseOver: function( container ) {
      console.log( 'here?', container );

      return function( d, i ) {
        console.log( 'mouseover!!!' );

        this.dispatch.mouseoverOutside( d, i );
      }
    }
}

  global.charter = charter;

}( window ));

var reuse = window.charter.line();
var reuseData = [
  [ 'data1', 12, 34, 56, 78, 91, 23, -45 ],
  [ 'data2', 89, 54, 46, 76, 48 ]
];

console.log( reuse );

d3.select(  '#reuser'  )
  .datum( reuseData )
  .call( reuse );

reuse.on( 'mouseoverOutside', function( d, i ) {
  console.log( 'i should have this!!!', d, i );
});


var reuse2 = window.charter.line();
var reuseData2 = [
  [ 'data1', 12, 87, 56, 78, 43, 23, -45 ],
  [ 'data2', 89, 32, 46, 76, 88 ]
];

d3.select(  '#reuser2'  )
  .datum( reuseData2 )
  .call( reuse2 );

reuse2.on( 'mouseoverOutside', function( d, i ) {
  console.log( 'i should have this 2!!!', d, i );
});
