import React from 'react';
import { Container, Header, Content } from 'rsuite';
import Hook from '@root/Context';
import TokoMasSuryaKencana_Client from '@root/views/toko-mas-surya-kencana/client';
import TokoMasSuryaKencana_Server from '@root/views/toko-mas-surya-kencana/server';
import TokoMasSuryaKencana_BasicInfo from '@root/views/toko-mas-surya-kencana/basic-info';

const titleStyle = { textAlign: 'center' };

const headerStyle = {
  paddingTop: 20,
  paddingBottom: 20,
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  alignItems: 'center',
  justifyContent: 'center',
};

const Routes = {
  'SuryaKencana-Client': TokoMasSuryaKencana_Client,
  'SuryaKencana-Server': TokoMasSuryaKencana_Server,
  'SuryaKencana-BasicInfo': TokoMasSuryaKencana_BasicInfo,
};

function Router() {
  let { activeKey } = Hook.useNavState();
  let Show = Routes[activeKey] || null;
  console.log(Show);
  return (
    <Container>
      <Header>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{activeKey}</h2>
        </div>
      </Header>
      <Content style={{ display: 'flex' }}>
        <div style={contentStyle}>{Show && <Show></Show>}</div>
      </Content>
    </Container>
  );
}

export default Router;
