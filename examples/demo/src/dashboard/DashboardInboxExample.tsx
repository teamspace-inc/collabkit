import { ComponentPropsWithoutRef } from 'react';
import Info from 'phosphor-react/dist/icons/Info.esm.js';
import {
  AreaChart,
  BadgeDelta,
  Block,
  Card,
  ColGrid,
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
import {
  Commentable,
  useCommentableRef,
  PinCommentButton,
  SidebarInbox,
  InboxButton,
  SidebarRoot,
  Sidebar,
  SidebarCloseButton,
  InboxItemList,
  InboxRoot,
  Root,
  Scrollable,
  SidebarHeader,
  SidebarTitle,
  Inbox,
} from '@collabkit/react';

import { Charts } from './Charts';
import Flow from './Flow';

import { useSnapshot } from 'valtio';
import {
  DashboardStore,
  dashboardStore,
  kpiData,
  performanceData,
  salesPeople,
  SalesPerson,
} from '../dashboardStore';

function KpiCardGrid() {
  return (
    <ColGrid numColsMd={2} numColsLg={3} marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
      {kpiData.map((item) => (
        <Commentable key={item.title} objectId={`dashboard-kpi-${item.title}`}>
          <div data-testid={`dashboard-kpi-${item.title.toLowerCase()}`}>
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
          </div>
        </Commentable>
      ))}
    </ColGrid>
  );
}

// Basic formatters for the chart values
const dollarFormatter = (value: number) => `$ ${Intl.NumberFormat('us').format(value).toString()}`;

const numberFormatter = (value: number) => `${Intl.NumberFormat('us').format(value).toString()}`;

function ChartView({ chartData }: { chartData: any }) {
  const { selectedKpi } = useSnapshot(dashboardStore);

  // map formatters by selectedKpi
  const formatters: { [key: string]: any } = {
    Sales: dollarFormatter,
    Profit: dollarFormatter,
    Customers: numberFormatter,
  };

  const ref = useCommentableRef(`dashboard-chart-legend-${selectedKpi}`);

  return (
    <Card marginTop="mt-6">
      <div className="md:flex justify-between" ref={ref}>
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
            onValueChange={(value) => (dashboardStore.selectedKpi = value)}
          >
            <ToggleItem value="Sales" text="Sales" />
            <ToggleItem value="Profit" text="Profit" />
            <ToggleItem value="Customers" text="Customers" />
          </Toggle>
        </div>
      </div>
      <Commentable objectId={`dashboard-performance-chart-${selectedKpi}`}>
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
      </Commentable>
    </Card>
  );
}

function TableView() {
  const { selectedStatus, selectedNames } = useSnapshot(dashboardStore);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === 'all') &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);

  return (
    <Card marginTop="mt-6">
      <div className="sm:mt-6 hidden sm:flex sm:justify-start sm:space-x-2">
        <MultiSelectBox
          onValueChange={(value: DashboardStore['selectedNames']) =>
            (dashboardStore.selectedNames = value)
          }
          placeholder="Select Salespeople"
          maxWidth="max-w-xs"
        >
          {salesPeople.map((item) => (
            <MultiSelectBoxItem key={item.name} value={item.name} text={item.name} />
          ))}
        </MultiSelectBox>
        <Dropdown
          maxWidth="max-w-xs"
          value={selectedStatus}
          onValueChange={(value) => (dashboardStore.selectedStatus = value)}
        >
          <DropdownItem value="all" text="All Performances" />
          <DropdownItem value="overperforming" text="Overperforming" />
          <DropdownItem value="average" text="Average" />
          <DropdownItem value="underperforming" text="Underperforming" />
        </Dropdown>
      </div>
      <div className="mt-6 sm:hidden space-y-2 sm:space-y-0">
        <MultiSelectBox
          onValueChange={(value: DashboardStore['selectedNames']) =>
            (dashboardStore.selectedNames = value)
          }
          placeholder="Select Salespeople"
          maxWidth="max-w-full"
        >
          {salesPeople.map((item) => (
            <MultiSelectBoxItem key={item.name} value={item.name} text={item.name} />
          ))}
        </MultiSelectBox>
        <Dropdown
          maxWidth="max-w-full"
          value={selectedStatus}
          onValueChange={(value) => (dashboardStore.selectedStatus = value)}
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
                <TableCell objectId={`${item.name}-name`}>{item.name}</TableCell>
                <TableCell objectId={`${item.name}-leads`}>{item.leads}</TableCell>
                <TableCell objectId={`${item.name}-sales`}>{item.sales}</TableCell>
                <TableCell objectId={`${item.name}-quota`}>{item.quota}</TableCell>
                <TableCell objectId={`${item.name}-variance`}>{item.variance}</TableCell>
                <TableCell objectId={`${item.name}-region`}>{item.region}</TableCell>
                <TableCell objectId={`${item.name}-status`}>
                  <BadgeDelta deltaType={item.deltaType} text={item.status} size="xs" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export function DashboardInboxExample() {
  const snapshot = useSnapshot(dashboardStore);
  const { selectedTab, startDate, endDate } = snapshot;

  const chartData = performanceData.filter((value) => {
    const date = new Date(value.date);
    return (
      (isAfter(date, startDate) || isEqual(date, startDate)) &&
      (isBefore(date, endDate) || isEqual(date, endDate))
    );
  });

  return (
    <div className="flex h-screen w-screen">
      <main className="bg-slate-50 p-8 sm:p-10 flex-1 h-screen overflow-scroll">
        <Flex>
          <Block truncate>
            <Title>Dashboard</Title>
            <Text>View core metrics on the state of your company.</Text>
          </Block>
          {/* <Debug /> */}
          {/* <PopoverInbox /> */}
          {/* <PopoverChannel /> */}
          <div className="px-2"></div>
          <PinCommentButton />
          <InboxButton />
          {/* <Datepicker
              minDate={minDate}
              maxDate={maxDate}
              defaultStartDate={minDate}
              defaultEndDate={maxDate}
              enableRelativeDates={false}
              onValueChange={(start, end) => {
                dashboardStore.startDate = start;
                dashboardStore.endDate = end;
              }}
              maxWidth="max-w-xs"
            /> */}
        </Flex>
        <TabList
          defaultValue={'overview'}
          onValueChange={(tab: DashboardStore['selectedTab']) => (dashboardStore.selectedTab = tab)}
          marginTop="mt-6"
        >
          <Tab value={'overview'} text="Overview" />
          <Tab value={'detail'} text="Detail" />
          <Tab value={'flowchart'} text="Flowchart" />
          <Tab value={'charts'} text="Charts" />
        </TabList>

        {selectedTab === 'overview' ? (
          <>
            <KpiCardGrid />
            <ChartView chartData={chartData} />
          </>
        ) : null}
        {selectedTab === 'detail' ? <TableView /> : null}
        {selectedTab === 'charts' ? <Charts /> : null}
        {selectedTab === 'flowchart' ? <Flow /> : null}
      </main>
      <div style={{ position: 'relative' }}>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitle>Comments</SidebarTitle>
            <div style={{ flex: 1 }} />
            <SidebarCloseButton />
          </SidebarHeader>
          <Scrollable>
            <Inbox
              commentFilter={(body: string) => true}
              direction="desc"
              statusFilter="open"
              threadIds={undefined}
            />
          </Scrollable>
        </Sidebar>
      </div>
      {/* <Sidebar>
        <div>
          <SidebarCloseButton />
        </div>
        <InboxRoot>
          <InboxItemList />
        </InboxRoot>
      </Sidebar> */}
    </div>
  );
}

const TableCell = (props: { objectId: string } & ComponentPropsWithoutRef<'td'>) => {
  const { objectId, ...rest } = props;
  const ref = useCommentableRef(objectId);
  return (
    <td
      className="tr-align-middle tr-whitespace-nowrap tr-tabular-nums tr-text-left tr-pl-4 tr-pr-4 tr-pt-4 tr-pb-4"
      ref={ref}
      {...rest}
    />
  );
};
