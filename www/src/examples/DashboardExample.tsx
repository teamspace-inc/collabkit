import { useState } from 'react';
import Info from 'phosphor-react/dist/icons/Info.esm.js';
import {
  AreaChart,
  BadgeDelta,
  Block,
  Card,
  ColGrid,
  Datepicker,
  DeltaType,
  Dropdown,
  DropdownItem,
  Flex,
  Icon,
  Metric,
  MultiSelectBox,
  MultiSelectBoxItem,
  ProgressBar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TabList,
  Text,
  Title,
  Toggle,
  ToggleItem,
} from '@tremor/react';
import '@tremor/react/dist/esm/tremor.css';
import { isAfter, isBefore, isEqual } from 'date-fns';

import { performance } from './data';
import { AddCommentButton } from '@collabkit/react';
// import './examples.css';

type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

const kpiData: Kpi[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    progress: 15.9,
    target: '$ 80,000',
    delta: '13.2%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Profit',
    metric: '$ 45,564',
    progress: 36.5,
    target: '$ 125,000',
    delta: '23.9%',
    deltaType: 'increase',
  },
  {
    title: 'Customers',
    metric: '1,072',
    progress: 53.6,
    target: '2,000',
    delta: '10.1%',
    deltaType: 'moderateDecrease',
  },
];

function KpiCardGrid() {
  return (
    <ColGrid numColsMd={2} numColsLg={3} marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
      {kpiData.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="items-start">
            <Block truncate={true}>
              <Text>{item.title}</Text>
              <Metric truncate={true}>{item.metric}</Metric>
            </Block>
            <BadgeDelta deltaType={item.deltaType} text={item.delta} />
          </Flex>
          <Flex marginTop="mt-4" spaceX="space-x-2">
            <Text truncate={true}>{`${item.progress}% (${item.metric})`}</Text>
            <Text>{item.target}</Text>
          </Flex>
          <ProgressBar percentageValue={item.progress} marginTop="mt-2" />
        </Card>
      ))}
    </ColGrid>
  );
}

// Basic formatters for the chart values
const dollarFormatter = (value: number) => `$ ${Intl.NumberFormat('us').format(value).toString()}`;

const numberFormatter = (value: number) => `${Intl.NumberFormat('us').format(value).toString()}`;

function ChartView({ chartData }: { chartData: any }) {
  const [selectedKpi, setSelectedKpi] = useState('Sales');

  // map formatters by selectedKpi
  const formatters: { [key: string]: any } = {
    Sales: dollarFormatter,
    Profit: dollarFormatter,
    Customers: numberFormatter,
  };

  return (
    <Card marginTop="mt-6">
      <div className="md:flex justify-between">
        <Block>
          <Flex justifyContent="justify-start" spaceX="space-x-0.5" alignItems="items-center">
            <Title> Performance History </Title>
            <Icon
              icon={Info}
              variant="simple"
              tooltip="Shows day-over-day (%) changes of past performance"
            />
          </Flex>
          <Text> Daily increase or decrease per domain </Text>
        </Block>
        <div className="mt-6 md:mt-0">
          <Toggle
            color="zinc"
            defaultValue={selectedKpi}
            handleSelect={(value) => setSelectedKpi(value)}
          >
            <ToggleItem value="Sales" text="Sales" />
            <ToggleItem value="Profit" text="Profit" />
            <ToggleItem value="Customers" text="Customers" />
          </Toggle>
        </div>
      </div>
      <AreaChart
        data={chartData}
        dataKey="date"
        categories={[selectedKpi]}
        colors={['blue']}
        showLegend={false}
        valueFormatter={formatters[selectedKpi]}
        yAxisWidth="w-14"
        height="h-96"
        marginTop="mt-8"
      />
    </Card>
  );
}

export type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
  deltaType: DeltaType;
};

export const salesPeople: SalesPerson[] = [
  {
    name: 'Peter Doe',
    leads: 45,
    sales: '1,000,000',
    quota: '1,200,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'moderateIncrease',
  },
  {
    name: 'Lena Whitehouse',
    leads: 35,
    sales: '900,000',
    quota: '1,000,000',
    variance: 'low',
    region: 'Region B',
    status: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Phil Less',
    leads: 52,
    sales: '930,000',
    quota: '1,000,000',
    variance: 'medium',
    region: 'Region C',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
  },
  {
    name: 'John Camper',
    leads: 22,
    sales: '390,000',
    quota: '250,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Max Balmoore',
    leads: 49,
    sales: '860,000',
    quota: '750,000',
    variance: 'low',
    region: 'Region B',
    status: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Peter Moore',
    leads: 82,
    sales: '1,460,000',
    quota: '1,500,000',
    variance: 'low',
    region: 'Region A',
    status: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Joe Sachs',
    leads: 49,
    sales: '1,230,000',
    quota: '1,800,000',
    variance: 'medium',
    region: 'Region B',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
  },
];

function TableView() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === 'all') &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);

  return (
    <Card marginTop="mt-6">
      <div className="sm:mt-6 hidden sm:block sm:flex sm:justify-start sm:space-x-2">
        <MultiSelectBox
          handleSelect={(value) => setSelectedNames(value)}
          placeholder="Select Salespeople"
          maxWidth="max-w-xs"
        >
          {salesPeople.map((item) => (
            <MultiSelectBoxItem key={item.name} value={item.name} text={item.name} />
          ))}
        </MultiSelectBox>
        <Dropdown
          maxWidth="max-w-xs"
          defaultValue="all"
          handleSelect={(value) => setSelectedStatus(value)}
        >
          <DropdownItem value="all" text="All Performances" />
          <DropdownItem value="overperforming" text="Overperforming" />
          <DropdownItem value="average" text="Average" />
          <DropdownItem value="underperforming" text="Underperforming" />
        </Dropdown>
      </div>
      <div className="mt-6 sm:hidden space-y-2 sm:space-y-0">
        <MultiSelectBox
          handleSelect={(value) => setSelectedNames(value)}
          placeholder="Select Salespeople"
          maxWidth="max-w-full"
        >
          {salesPeople.map((item) => (
            <MultiSelectBoxItem key={item.name} value={item.name} text={item.name} />
          ))}
        </MultiSelectBox>
        <Dropdown
          maxWidth="max-w-full"
          defaultValue="all"
          handleSelect={(value) => setSelectedStatus(value)}
        >
          <DropdownItem value="all" text="All Performances" />
          <DropdownItem value="overperforming" text="Overperforming" />
          <DropdownItem value="average" text="Average" />
          <DropdownItem value="underperforming" text="Underperforming" />
        </Dropdown>
      </div>

      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Leads</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Sales ($)</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Quota ($)</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Variance</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Region</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salesPeople
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell textAlignment="text-right">{item.leads}</TableCell>
                <TableCell textAlignment="text-right">{item.sales}</TableCell>
                <TableCell textAlignment="text-right">{item.quota}</TableCell>
                <TableCell textAlignment="text-right">{item.variance}</TableCell>
                <TableCell textAlignment="text-right">{item.region}</TableCell>
                <TableCell textAlignment="text-right">
                  <BadgeDelta deltaType={item.deltaType} text={item.status} size="xs" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}

const minDate = new Date(performance[0].date);
const maxDate = new Date(performance[performance.length - 1].date);

export function DashboardExample() {
  const [selectedView, setSelectedView] = useState(1);
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const chartData = performance.filter((value) => {
    const date = new Date(value.date);
    return (
      (isAfter(date, startDate) || isEqual(date, startDate)) &&
      (isBefore(date, endDate) || isEqual(date, endDate))
    );
  });

  return (
    <main className="bg-slate-50 p-6 sm:p-10 h-full">
      <Flex>
        <Block truncate>
          <Title>Dashboard</Title>
          <Text>View core metrics on the state of your company.</Text>
        </Block>
        <AddCommentButton />
        <Datepicker
          minDate={minDate}
          maxDate={maxDate}
          defaultStartDate={minDate}
          defaultEndDate={maxDate}
          enableRelativeDates={false}
          handleSelect={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
          maxWidth="max-w-xs"
        />
      </Flex>

      <TabList defaultValue={1} handleSelect={(value) => setSelectedView(value)} marginTop="mt-6">
        <Tab value={1} text="Overview" />
        <Tab value={2} text="Detail" />
      </TabList>

      {selectedView === 1 ? (
        <>
          <KpiCardGrid />
          <ChartView chartData={chartData} />
        </>
      ) : (
        <TableView />
      )}
    </main>
  );
}
