import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
} from 'rsuite';

function View(params) {
  const [formValue, setFormValue] = useState({ serialNumber: '' });
  return (
    <Form
      formValue={formValue}
      onChange={(formValue) => setFormValue(formValue)}
    >
      <FormGroup>
        <ControlLabel>Serial Number</ControlLabel>
        <FormControl name="serialNumber" />
        <HelpBlock>Required</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Secret</ControlLabel>
        <FormControl name="secret" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>License</ControlLabel>
        <FormControl name="license" />
      </FormGroup>
      <FormGroup>
        <ButtonToolbar>
          <Button appearance="primary">Submit</Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>
  );
}

export default View;
