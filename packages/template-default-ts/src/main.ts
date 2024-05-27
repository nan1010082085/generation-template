import { createApp } from 'vue';
import 'normalcss';
import '@/assets/sass/global.scss';
import App from './App';

const app = createApp(App);

app.mount('#app');
