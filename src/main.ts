import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router/index.ts';
import 'primevue/resources/themes/aura-light-green/theme.css';

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue);
app.use(ToastService);
app.component('ToastMessage', Toast);
app.use(pinia);
app.use(router);
app.mount('#app');
