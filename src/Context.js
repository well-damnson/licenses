import React from 'react';
import * as SizeContext from './context/size';
import * as NavContext from './context/nav';

let imported = { ...SizeContext, ...NavContext };
let keys = Object.keys(imported);

let Provider = [];
const providerKey = 'Provider';

let Hook = {};
const hookKey = 'use';

for (const key of keys) {
  if (key.includes(providerKey)) {
    Provider.push(imported[key]);
  }
  if (key.includes(hookKey)) {
    Hook[key] = imported[key];
  }
}

function ProvideLoop(params) {
  let { props, children } = params;
  // console.log(props, children);
  const ExtractContext = props.pop();
  if (props.length === 0) {
    return <ExtractContext>{children}</ExtractContext>;
  } else {
    return (
      <ExtractContext>
        <ProvideLoop props={props}>{children}</ProvideLoop>
      </ExtractContext>
    );
  }
}

class Provide extends React.Component {
  render() {
    return <ProvideLoop props={Provider}>{this.props.children}</ProvideLoop>;
  }
}

export { Provide };
export default Hook;
