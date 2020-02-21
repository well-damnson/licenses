import React, { useState } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Toggle } from 'rsuite';

function View(params) {
  let [formValue, setFormValue] = useState({
    username: 'supervisor',
    password: 'wdsSuperAdmin',
    defaultUsername: 'admin',
    defaultPassword: 'admin',
    default: false,
  });
  return (
    <Form formValue={formValue}>
      <FormGroup>
        <ControlLabel>UserName</ControlLabel>
        <FormControl
          name={formValue.default ? 'username' : 'defaultUsername'}
          plaintext
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          name={formValue.default ? 'password' : 'defaultPassword'}
          plaintext
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Default</ControlLabel>
        <Toggle
          onChange={(checked) => {
            setFormValue({ ...formValue, default: checked });
          }}
          checked={formValue.default}
        />
      </FormGroup>
    </Form>
  );
}

export default View;
