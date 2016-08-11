// import 'babel-polyfill'
// import React from 'react'
// import { render } from 'react-dom'
// import { browserHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
// import configureStore from 'store/configureStore'
// import Root from 'containers/Root'
//
// const store = configureStore()
// const history = syncHistoryWithStore( browserHistory, store )
//
// render(
//   <Root store={store} history={history}/>,
//   document.getElementById( 'root' )
// )

import React, { Component } from 'react';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';

export class App extends Component {
  constructor(props){
        super(props);

        this.state = {
            itemsCount : 10
        };
    }

    render() {
        var itemElements = [];

        for( var i = 0; i< this.state.itemsCount; i++){
            itemElements.push(<li className="item" key={i}>item {i}</li>);
        }

        let scrollbarStyles = {borderRadius: 5};

        return (
            <div>
                <ScrollArea
                  className="area"
                  contentClassName="content"
                  vertical={false}
                  verticalScrollbarStyle={scrollbarStyles}
                  verticalContainerStyle={scrollbarStyles}
                  horizontalScrollbarStyle={scrollbarStyles}
                  horizontalContainerStyle={scrollbarStyles}
                  smoothScrolling= {true}
                  minScrollSize={40}
                  >

                  <ul>
                    {itemElements}
                  </ul>
                </ScrollArea>

            </div>
        );
    }
}

render( <App/>, document.getElementById( 'root' ) );
