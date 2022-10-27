import { useState } from 'react';
import { ThemeProvider, Thread } from '@collabkit/react';
import { light } from '../styles/Theme.css';
import { AcmeLogo, Container, Heading, HeadingRow, UI } from './DemoUI';
import * as styles from './ListDemo.css';
import { default as X } from 'phosphor-react/dist/icons/X.esm.js';

import avatar1 from '../assets/home/list/employees/5e6802566d3b380006d3f13b_transparent.png';
import avatar2 from '../assets/home/list/employees/5e685b006d3b380006e7ad45_transparent.png';
import avatar3 from '../assets/home/list/employees/5e6869806d3b380006eaf699_transparent.png';
import avatar4 from '../assets/home/list/employees/5e6876c86d3b380006edf213_transparent.png';
import avatar5 from '../assets/home/list/employees/5e687bc56d3b380006ef19fb_transparent.png';
import avatar6 from '../assets/home/list/employees/5e6886b66d3b380006f19c8f_transparent.png';
import avatar7 from '../assets/home/list/employees/5e6887c36d3b380006f1da63_transparent.png';
import avatar8 from '../assets/home/list/employees/5e6888f06d3b380006f21e9d_transparent.png';
import avatar9 from '../assets/home/list/employees/5e6888a66d3b380006f20e33_transparent.png';

type Employee = {
  id: string;
  name: string;
  role: string;
  hiredOn: string;
  department: string;
  avatar: string;
};

const employees: Employee[] = [
  {
    id: '9224641G',
    name: 'Adam Hill',
    role: 'Marketing Coordinator',
    hiredOn: '04/09/22',
    department: 'Sales',
    avatar: avatar1,
  },
  {
    id: '8195063A',
    name: 'Baker Jones',
    role: 'Product Designer',
    hiredOn: '04/09/22',
    department: 'R&D',
    avatar: avatar2,
  },
  {
    id: '1766698L',
    name: 'Clark Klein',
    role: 'Product Designer',
    hiredOn: '04/09/22',
    department: 'Design',
    avatar: avatar3,
  },
  {
    id: '2608510R',
    name: 'Eva Lopez',
    role: 'Senior Engineer',
    hiredOn: '04/09/22',
    department: 'Infrastructure',
    avatar: avatar4,
  },
  {
    id: '4991791M',
    name: 'Frank Mason',
    role: 'Engineer',
    hiredOn: '04/09/22',
    department: 'Research',
    avatar: avatar5,
  },
  {
    id: '3374135A',
    name: 'Ghosh Nalty',
    role: 'Engineer',
    hiredOn: '04/09/22',
    department: 'Engineering',
    avatar: avatar6,
  },
  {
    id: '9586331U',
    name: 'Reilly Hills',
    role: 'Account Executive',
    hiredOn: '04/09/22',
    department: 'Advertising',
    avatar: avatar7,
  },
  {
    id: '3600818H',
    name: 'Irene Ochoa',
    role: 'Project Manager',
    hiredOn: '04/09/22',
    department: 'Engineering',
    avatar: avatar8,
  },
  {
    id: '8789935W',
    name: 'Jane Patel',
    role: 'Senior Engineer',
    hiredOn: '04/10/17',
    department: 'Engineering',
    avatar: avatar9,
  },
];

function Row({
  employee,
  selectedId,
  onClick,
}: {
  employee: Employee;
  selectedId: string | undefined;
  onClick: (id: string) => void;
}) {
  return (
    <div
      className={styles.row({ selected: selectedId === employee.id })}
      onClick={() => onClick(employee.id)}
    >
      <span className={styles.name}>
        <input type="checkbox" className={styles.checkbox} />
        {employee.name}
      </span>
      <span className={styles.role}>{employee.role}</span>
    </div>
  );
}

function Sidebar({ employee, onClose }: { employee: Employee | undefined; onClose: () => void }) {
  if (employee == null) return null;
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sidebarTitle}>
          Details
          <button className={styles.closeButton} onClick={onClose} type="button">
            <X weight={'bold'} size={16} />
          </button>
        </div>
        <img className={styles.avatar} src={employee.avatar} />
        <div className={styles.employeeName}>{employee.name}</div>
        <div className={styles.employeeRole}>{employee.role}</div>
        <dl className={styles.detailsBox}>
          <dt className={styles.fieldName}>ID</dt>
          <dd>{employee.id}</dd>
          <dt className={styles.fieldName}>Hiring date</dt>
          <dd>{employee.hiredOn}</dd>
          <dt className={styles.fieldName}>Department</dt>
          <dd>{employee.department}</dd>
        </dl>
        <Thread threadId={`employee-${employee.id}`} />
      </div>
    </div>
  );
}

export function ListDemo() {
  const [selectedId, setSelectedId] = useState<string | undefined>(employees[3].id);
  const selectedEmployee = selectedId ? employees.find(({ id }) => id === selectedId) : undefined;
  return (
    <ThemeProvider theme="light">
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
                <Row
                  key={employee.id}
                  employee={employee}
                  selectedId={selectedId}
                  onClick={setSelectedId}
                />
              ))}
            </div>
          </Container>
          <Sidebar employee={selectedEmployee} onClose={() => setSelectedId(undefined)} />
        </UI>
      </div>
    </ThemeProvider>
  );
}
