import React from 'react';
import { Sidenav, Nav, Icon, Dropdown } from 'rsuite';
import Hook from '@root/Context';
function Navbar() {
  let [state, dispatch] = Hook.useNav();
  return (
    <Sidenav
      activeKey={state.activeKey}
      onSelect={(key) => {
        dispatch({ type: 'select', payload: key });
      }}
      style={{ flexDirection: 'column', flex: 1 }}
    >
      <Sidenav.Body>
        <Nav>
          <Nav.Item
            eventKey="Dashboard"
            active
            icon={<Icon icon="dashboard" />}
          >
            Dashboard
          </Nav.Item>
          <Dropdown
            eventKey="SuryaKencana"
            title="Toko Mas Surya Kencana"
            icon={<Icon icon="hashtag" />}
          >
            <Dropdown.Item eventKey="SuryaKencana-Client">Client</Dropdown.Item>
            <Dropdown.Item eventKey="SuryaKencana-Server">Server</Dropdown.Item>
            <Dropdown.Item eventKey="SuryaKencana-BasicInfo">
              Basic Info
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
}

export default Navbar;
