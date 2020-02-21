import React from 'react';

const NavStateContext = React.createContext();
const NavDispatchContext = React.createContext();

function reducer(state, action) {
  console.log(state, action)
  switch (action.type) {
    case 'select': {
      return { ...state, activeKey: action.payload };
    }
    case 'decrement': {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function NavProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    activeKey: 'Dashboard',
  });
  return (
    <NavStateContext.Provider value={state}>
      <NavDispatchContext.Provider value={dispatch}>
        {children}
      </NavDispatchContext.Provider>
    </NavStateContext.Provider>
  );
}

function useNavState() {
  const context = React.useContext(NavStateContext);
  if (context === undefined) {
    throw new Error('useNavState must be used within a NavProvider');
  }
  return context;
}
function useNavDispatch() {
  const context = React.useContext(NavDispatchContext);
  if (context === undefined) {
    throw new Error('useNavDispatch must be used within a NavProvider');
  }
  return context;
}

function useNav() {
  return [useNavState(), useNavDispatch()];
}

export { NavProvider, useNavState, useNavDispatch, useNav };
