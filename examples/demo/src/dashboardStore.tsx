import { proxy } from 'valtio';
import { DashboardStore, maxDate, minDate } from './dashboard/DashboardExample';

export const dashboardStore = proxy<DashboardStore>({
  selectedKpi: 'Sales',
  selectedStatus: 'all',
  selectedNames: [],
  selectedTab: 'overview',
  startDate: minDate,
  endDate: maxDate,
});
