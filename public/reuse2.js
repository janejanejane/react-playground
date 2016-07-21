;(function( global ) {
  'use strict';

  var axisColor = 'gray',
      circleRadius = 3,
      columnClassColor = 'column-color',
      height = 200,
      initialPosition = 48,
      innerAxisLength = 35,
      margin = {
        bottom: 20,
        left: 45,
        right: 15,
        top: 20
      },
      tickInterval = 3,
      width = 400,
      xAxisSpace = 0.5;


  var charter = {

    line: function( container ) {

    // register events to dispatch
    var dispatch = d3.dispatch( 'mouseoverOutside' );

    var lineInternals = Object.create( internals );

    var that = this;

    function self( selection ) {
      selection.each( function( d, i ) {
        lineInternals.graphXRange = width - margin.left - margin.right;
        lineInternals.graphYRange = height - margin.top - margin.bottom;
        lineInternals.data = d;

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

    self.xBottom = function( value ) {
      if ( !arguments.length ) {
        return lineInternals.xBottom;
      }

      lineInternals.xBottom = value;
      return self;
    };

    return d3.rebind( self, dispatch, 'on' );
  }
};

var internals = {
    dispatch: null,

    data: null,
    graphXRange: null,
    graphYRange: null,
    lineLeft: d3.svg.line().interpolate( 'linear' ),
    lineRight: d3.svg.line().interpolate( 'linear' ),
    svg: null,
    x: d3.scale.linear(),
    xAxis: d3.svg.axis(),
    xBottom: [ '1', '2', '3', '4', '5', '6', '7' ],
    y0: d3.scale.linear(),
    y1: d3.scale.linear(),
    yAxisLeft: d3.svg.axis(),
    yAxisRight: d3.svg.axis(),

    buildSVG: function( container ) {
      // if ( !svg ) {
        this.svg = d3.select( container )
          .append( 'svg' );

          this.buildGroups();
      // }

      this.svg.transition()
        .attr( 'width', width )
        .attr( 'height',  height );

    },

    buildGroups: function() {

        var wrapper = this.svg.append( 'g' )
          .attr( 'class', 'wrapper' )
          .attr( 'transform', 'translate(' + margin.left + ', 0 )' );

        // x-axis group element
        wrapper.append( 'g' ).attr( 'class', 'x axis' );

        // y-axis group element
        wrapper.append( 'g' ).attr( 'class', 'y y-left axis' );
        wrapper.append( 'g' ).attr( 'class', 'y y-right axis' );

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
          axis: this.x,
          domain: [ 0 , this.xBottom.length ],
          range: [ 0, this.graphXRange ]
        });

        // set the domain and range for the y-axis
        this.setScale({
          axis: this.y0,
          domain: this.adjustExtent( d3.extent( d3.merge( this.data ).filter( function( i ) { return typeof i === 'number'; } ) ) ),
          range: [ this.graphYRange, 0 ]
        });

        // set the domain and range for the y-axis
        this.setScale({
          axis: this.y1,
          domain: this.adjustExtent( d3.extent( d3.merge( this.data ).filter( function( i ) { return typeof i === 'number'; } ) ) ),
          range: [ this.graphYRange, 0 ]
        });
        console.log( 'this.data:', this.data );
    },

    buildAxis: function() {
      var that = this;

      this.xAxis.scale( this.x )
        .tickValues( this.xBottom.map( function( d, i ) {
          return i;
        }))
        .tickFormat( function( d, i ) {
          return that.xBottom[ d ];
        })
        .orient( 'bottom' );

      this.yAxisLeft.scale( this.y0 )
        .tickValues( this.adjustYAxisValues( this.y0.domain() ) )
        .tickFormat( function( d, i ) {
          return parseFloat( d ).toFixed( 2 );
        })
        .ticks( 7 )
        .orient( 'left' );

      this.yAxisRight.scale( this.y1 )
        .tickValues( this.adjustYAxisValues( this.y1.domain() ) )
        .tickFormat( function( d, i ) {
          return parseFloat( d ).toFixed( 2 );
        })
        .ticks( 7 )
        .orient( 'right' );
    },

    buildLine: function() {
      var that = this;

      // define the line
      this.lineLeft.x( function( d, i ) {
          return that.x( i + xAxisSpace );
        })
        .y( function( d, i ) {
          return that.y0( d );
        });


      // define the line
      this.lineRight.x( function( d, i ) {
          return that.x( i + xAxisSpace );
        })
        .y( function( d, i ) {
          return that.y1( d );
        });
    },

    drawAxis: function() {
      var wrapper = this.svg.select( '.wrapper' )
      wrapper.select( '.x.axis' )
        .attr( 'transform', 'translate( 0, ' + this.graphYRange + ')' )
        .style( 'fill', axisColor )
        .call( this.xAxis );

      wrapper.select( '.y.y-left.axis' )
        .style( 'fill', axisColor )
        .call( this.yAxisLeft );


      wrapper.select( '.y.y-right.axis' )
        .style( 'fill', axisColor )
        .call( this.yAxisRight )
        .call( this.customYAxisRight.bind( this ) );
    },

    drawBars: function() {

      // add a hover area, a rect tag
      var bars = this.svg.select( '.hover' )
        .selectAll( '.hover-rect' )
          .data( this.xBottom );
      var bgBars = this.svg.select( '.columns' );
      var wrapper = this.svg.select( '.wrapper' );

      var that = this;

      // draw the graph column backgrounds
      bgBars.selectAll( '.graph-columns' )
        .data( this.xBottom )
      .enter().append( 'rect' )
        .attr( 'x', function( d, i ) {
          return i * ( that.graphXRange / that.xBottom.length );
        })
        .attr( 'y', 0 )
        .attr( 'width', ( that.graphXRange / that.xBottom.length - 1 ) )
        .attr( 'height', that.graphYRange )
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
          return i * ( that.graphXRange / that.xBottom.length );
        })
        .attr( 'y', 0 )
        .attr( 'width', ( that.graphXRange / that.xBottom.length - 1 ) )
        .attr( 'height', that.graphYRange + 20 )
        .attr( 'fill', 'transparent' )
        .attr( 'class', 'hover-rect' );

      bars.on( 'mouseover', this.mouseOver( wrapper ) );
    },

    drawCircles: function() {
      // include the lines and circle now
      for ( var val in this.data ) {
        var values = this.data[ val ].slice( 1 );
    	  initialPosition = ( values.length < initialPosition ) ? values.length : initialPosition;
      }

      for ( var val in this.data ) {
        var record = this.data[ val ];
        this.setCircle( {
          data: record.slice( 1 ),
          dataset: val,
          initialPosition: initialPosition - 1,
          className: record[ 0 ]
        } );
      }
    },

    drawLines: function() {
      for ( var val in this.data ) {
        var record = this.data[ val ];
        this.setLine( {
          data: record.slice( 1 ),
          dataset: val,
          className: record[ 0 ]
        } );
      }
    },

    setScale: function( props ) {
      props.axis.domain( props.domain ).nice()
        .range( props.range );

      console.log( 'domain:', props.axis, props.axis.domain(), props.axis.ticks() );

      this.adjustYAxisValues( props.axis.domain() );
    },

    adjustExtent: function( extent ) {
      var min = Math.floor( extent[ 0 ] ), max = Math.ceil( extent[ 1 ] );

      return [ min, max ];
    },

    adjustYAxisValues: function( extent ) {
      var blockSize = Math.abs( extent[ 0 ] - extent[ 1 ] ) / 6;
      var blocks = [];
      for ( var i = 1; i < 6; i++ ) {
        blocks.push( extent[ 0 ] + blockSize * i );
      }

      console.log( 'blocks:', [ extent[ 0 ] ].concat( blocks ).concat( [ extent[ 1 ] ] ) );

      return blocks;
    },

    setLine: function( props ) {

      var line = this.lineLeft( props.data );

      if ( +props.dataset === 1 ) {
        line = this.lineRight( props.data );
      }

      this.svg.select( '.lines' )
        .append( 'path' )
          .datum( props.data )
          .attr( 'd', line )
          .attr( 'class', props.className )
          .style( 'fill', 'transparent' );
    },

    setCircle: function( props ) {

      var cy = this.y0( props.data[ props.initialPosition ] );

      if ( +props.dataset === 1 ) {
        cy = this.y1( props.data[ props.initialPosition ] );
      }

      this.svg.select( '.circles' )
        .append( 'g' )
          .append( 'circle' )
          .attr( 'cx', this.x( props.initialPosition + xAxisSpace ) )
          .attr( 'cy', cy )
          .attr( 'r', circleRadius )
          .attr( 'class', props.className + props.dataset );
    },

    customYAxisRight: function( g ) {
      var that = this;

      g.selectAll( 'line' )
        .attr( 'x2', function( d, i ) {
          console.log( 'LOOK!', that.graphXRange, innerAxisLength );
          if ( i % tickInterval !== 0 ) {
            return that.graphXRange + innerAxisLength;
          }

          return that.graphXRange;
        })

      g.selectAll( 'text' )
        .attr( 'dy', function( d, i ) {

          if ( i % tickInterval === 0 ) {
            return i;
          }

          d3.select( this ).remove();
        })
        .attr( 'dx', function( d, i ) {

        	return that.graphXRange;
        })
    },

    mouseOver: function( container ) {
      console.log( 'here?', container );
      var that = this;

      return function( d, i ) {
        console.log( 'mouseover!!!' );

        that.dispatch.mouseoverOutside( d, i );
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

reuse.xBottom( [ 1,2,3,4,5,6,7,8,9,10 ] );

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
