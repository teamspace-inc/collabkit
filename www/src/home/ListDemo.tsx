import { useState } from 'react';
import { Inbox, Sidebar, ThemeProvider } from '@collabkit/react';
import { light } from '../styles/Theme.css';
import { AcmeLogo, Container, Heading, HeadingRow, UI } from './DemoUI';
import * as styles from './ListDemo.css';

type Employee = {
  id: string;
  name: string;
  role: string;
  hiredOn: string;
  department: string;
};

const employees: Employee[] = [
  {
    id: '9224641G',
    name: 'Adam Hill',
    role: 'Marketing Coordinator',
    hiredOn: '04/09/22',
    department: 'Sales',
  },
  {
    id: '8195063A',
    name: 'Baker Jones',
    role: 'Product Designer',
    hiredOn: '04/09/22',
    department: 'R&D',
  },
  {
    id: '1766698L',
    name: 'Clark Klein',
    role: 'Product Designer',
    hiredOn: '04/09/22',
    department: 'Design',
  },
  {
    id: '2608510R',
    name: 'Eva Lopez',
    role: 'Senior Engineer',
    hiredOn: '04/09/22',
    department: 'Infrastructure',
  },
  {
    id: '4991791M',
    name: 'Frank Mason',
    role: 'Engineer',
    hiredOn: '04/09/22',
    department: 'Research',
  },
  {
    id: '3374135A',
    name: 'Ghosh Nalty',
    role: 'Engineer',
    hiredOn: '04/09/22',
    department: 'Engineering',
  },
  {
    id: '9586331U',
    name: 'Reilly Hills',
    role: 'Account Executive',
    hiredOn: '04/09/22',
    department: 'Advertising',
  },
  {
    id: '3600818H',
    name: 'Irwin Ochoa',
    role: 'Project Manager',
    hiredOn: '04/09/22',
    department: 'Engineering',
  },
  {
    id: '8789935W',
    name: 'Jane Patel',
    role: 'Senior Engineer',
    hiredOn: '04/10/17',
    department: 'Engineering',
  },
];

function Row({ employee, onClick }: { employee: Employee; onClick: (id: string) => void }) {
  return (
    <div className={styles.row} onClick={() => onClick(employee.id)}>
      <span className={styles.name}>
        <input type="checkbox" className={styles.checkbox} />
        {employee.name}
      </span>
      <span className={styles.role}>{employee.role}</span>
    </div>
  );
}

export function ListDemo() {
  const [selectedId, setSelectedId] = useState(employees[0].id);
  return (
    <ThemeProvider theme="dark">
      <div className={light} style={{ display: 'contents' }}>
        <UI>
          <div>
            <AcmeLogo />
          </div>
          <Container>
            <HeadingRow>
              <Heading>Employees</Heading>
            </HeadingRow>
            <div className={styles.list}>
              {employees.map((employee) => (
                <Row key={employee.id} employee={employee} onClick={setSelectedId} />
              ))}
            </div>
          </Container>
          <Sidebar strategy="absolute">
            <Inbox />
          </Sidebar>
        </UI>
      </div>
    </ThemeProvider>
  );
}
