import { H2, styled } from '../UIKit';
import { SidebarSimple, Rows, Table, IconContext } from 'phosphor-react';

const Item = styled('div', {
  width: '100%',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
});

// this is just a placeholder
// needs design
export function PatternsDoc() {
  return (
    <div>
      <H2>Get design guidance for common ways to enable commenting.</H2>
      <IconContext.Provider value={{ size: 64, weight: 'thin' }}>
        <ol>
          <li>
            <Item>
              <SidebarSimple />
              Detail Views
            </Item>
          </li>
          <li>
            <Item>
              <Rows />
              List Views
            </Item>
          </li>
          <li>
            <Item>
              <Table />
              Table Views
            </Item>
          </li>
        </ol>
      </IconContext.Provider>
    </div>
  );
}
