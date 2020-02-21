import React from 'react';

let SizeStateContext = React.createContext(null);


class SizeProvider extends React.Component {
  state = { height: 0, width: 0 };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  render() {
    return (
      <SizeStateContext.Provider value={this.state}>
        {this.props.children}
      </SizeStateContext.Provider>
    );
  }
}

function useSizeState() {
  const context = React.useContext(SizeStateContext);
  if (context === undefined) {
    throw new Error('useSizeState must be used within a SizeProvider');
  }
  return context;
}

export {SizeProvider, useSizeState}