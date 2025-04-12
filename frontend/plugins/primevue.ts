import { defineNuxtPlugin } from 'nuxt/app';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import Tooltip from 'primevue/tooltip';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
    inputStyle: 'filled',
    darkTheme: true,
  });
  
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
  
  nuxtApp.vueApp.component('PvButton', Button);
  nuxtApp.vueApp.component('PvDataTable', DataTable);
  nuxtApp.vueApp.component('PvColumn', Column);
  nuxtApp.vueApp.component('PvInputText', InputText);
  nuxtApp.vueApp.component('PvDropdown', Dropdown);
  nuxtApp.vueApp.component('PvCalendar', Calendar);
  nuxtApp.vueApp.component('PvChart', Chart);
  nuxtApp.vueApp.component('PvDialog', Dialog);
  nuxtApp.vueApp.component('PvToast', Toast);
  nuxtApp.vueApp.component('PvConfirmDialog', ConfirmDialog);
  nuxtApp.vueApp.component('PvCard', Card);
  nuxtApp.vueApp.component('PvMenubar', Menubar);
  nuxtApp.vueApp.component('PvTabView', TabView);
  nuxtApp.vueApp.component('PvTabPanel', TabPanel);
  nuxtApp.vueApp.component('PvSidebar', Sidebar);
  nuxtApp.vueApp.component('PvMenu', Menu);
  
  nuxtApp.vueApp.directive('tooltip', Tooltip);
}); 