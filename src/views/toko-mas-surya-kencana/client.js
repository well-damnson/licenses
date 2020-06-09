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

let option = {
  alnum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  mIdShift: 3,
  insertFormat: 'aabaab',
  twistFormat: [9, 2, 5, 8, 1, 10, 3, 0, 7, 4, 11, 6],
};

let licenseDebug = (activationCode) => {
  let toNumber = (str) => {
    let { alnum } = option;
    let result =
      '' +
      str
        .split('')
        .map((chr) => {
          let index = alnum.indexOf(chr);
          if (index < 10) {
            return '0' + index;
          } else {
            return '' + index;
          }
        })
        .join('');
    return result;
  };

  let toAlnum = (nums) => {
    let { alnum } = option;
    let result = '';
    for (let index = 0; index < nums.length / 2; index++) {
      const numberInStr = nums.slice(index * 2, (index + 1) * 2);
      let number = parseInt(numberInStr, 10) % alnum.length;
      result += '' + alnum[number];
    }
    return result;
  };

  let createSecret = (length = 8) => {
    let { alnum } = option;
    let result = '';
    for (let index = 0; index < length; index++) {
      result += alnum[Math.floor(Math.random() * alnum.length)];
    }
    return result;
  };

  let secret = createSecret();

  let array4char = activationCode.split('-');
  let array6char = array4char.map((chars, i) => {
    let format = option.insertFormat;
    let A = chars;
    let B = secret.slice(i * 2, (i + 1) * 2);
    let indexA = 0;
    let indexB = 0;
    let result = '';
    for (let index = 0; index < format.length; index++) {
      const condition = format[index];
      if (condition === 'a') {
        result += A[indexA];
        indexA++;
      } else if (condition === 'b') {
        result += B[indexB];
        indexB++;
      }
    }
    return result;
  });
  let array6charTwisted = array6char.map((chars, i) => {
    let numbers = toNumber(chars);
    let arrayNumbers = numbers.split('');
    let format = option.twistFormat;
    let twisted = format
      .map((arrayIndex) => {
        return arrayNumbers[arrayIndex];
      })
      .join('');
    return toAlnum(twisted);
  });
  let licenseJoined = array6charTwisted.join('');
  let license = [
    licenseJoined.slice(0, 4),
    licenseJoined.slice(4, 8),
    licenseJoined.slice(8, 12),
    licenseJoined.slice(12, 16),
    licenseJoined.slice(16, 20),
    licenseJoined.slice(20, 24),
  ].join('-');

  // DONE CREATING LICENSE
  console.log('License:', license);
  console.log('Secret:', secret);
  return { license, secret };
};

function View(params) {
  const [formValue, setFormValue] = useState({
    serialNumber: '',
    secret: '',
    license: '',
  });

  let onSubmit = () => {
    let ls = licenseDebug(formValue.serialNumber);
    console.log(ls);
    setFormValue({ ...formValue, ...ls });
  };
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
          <Button appearance="primary" onClick={onSubmit}>
            Submit
          </Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>
  );
}

export default View;
