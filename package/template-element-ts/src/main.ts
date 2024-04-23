import { createApp } from 'vue';
import 'normalcss';
import '@/assets/sass/global.scss';
import App from './App';
import { createPinia } from 'pinia';
import router from '@/router';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router);

app.mount('#app');
