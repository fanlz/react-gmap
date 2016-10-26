import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import GMap from './src/GMap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  componentWillUnmount() {}

  render() {
    return (
      <div style={{width: '500px', height: '500px'}} >
        <GMap />
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('container')
);
