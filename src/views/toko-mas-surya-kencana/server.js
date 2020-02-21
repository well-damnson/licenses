import React, { useState, useRef, useEffect } from 'react';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'rsuite';
import {
  randomString,
  encrypt,
  isValidUUID,
  isValidIpv4Addr,
} from '@root/utils';
import {} from '@root/utils';

function parseSerialNumber(sn) {
  let parsed = sn.split('-');
  parsed = [parsed[1], parsed[2], parsed[0], parsed[4], parsed[3]].join('-');
  console.log(parsed);
  return parsed;
}

function validateSerialNumber(sn) {
  const parsed = parseSerialNumber(sn);
  return isValidUUID(parsed);
}

function makeLicense(sn, secret) {
  return encrypt(parseSerialNumber(sn), secret);
}

function validateIPv4(ip) {
  return isValidIpv4Addr(ip);
}

async function makeRequest(secret, license, ip) {
  return new Promise((resolve) => {
    fetch(`http://${ip}:3030/license`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ license, secret }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        resolve();
      });
  });
}

function View(params) {
  const [formValue, setFormValue] = useState({
    serialNumber: '',
    ip: '',
    secret: '',
    license: '',
    loading: false,
  });

  const componentIsMounted = useRef(true);
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []); // Using an empty dependency array ensures this only runs on unmount

  console.log(formValue);

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
        <FormControl name="secret" plaintext />
      </FormGroup>
      <FormGroup>
        <ControlLabel>License</ControlLabel>
        <FormControl name="license" plaintext />
      </FormGroup>
      <FormGroup>
        <Button
          disabled={
            !validateSerialNumber(formValue.serialNumber) ||
            formValue.license.length > 0
          }
          appearance="primary"
          onClick={() => {
            const secret = randomString(10);
            const { serialNumber } = formValue;
            setFormValue({
              ...formValue,
              secret,
              license: makeLicense(serialNumber, secret),
            });
          }}
        >
          Submit
        </Button>
      </FormGroup>
      <FormGroup>
        <ControlLabel>IP</ControlLabel>
        <FormControl name="ip" />
      </FormGroup>
      <FormGroup>
        <Button
          appearance="default"
          loading={formValue.loading}
          disabled={
            !(validateIPv4(formValue.ip) && formValue.license.length > 0)
          }
          onClick={async () => {
            const { secret, license, ip } = formValue;
            setFormValue({
              ...formValue,
              loading: true,
            });
            await makeRequest(secret, license, ip);
            if (componentIsMounted.current) {
              setFormValue({
                ...formValue,
                loading: false,
              });
            }
          }}
        >
          Register
        </Button>
      </FormGroup>
    </Form>
  );
}

export default View;
