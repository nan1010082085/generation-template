import { Fragment, defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld'
import styles from '@/assets/sass/app.module.scss';
import vueLogo from '@/assets/vue.svg';

const App = defineComponent({
  name: 'App',
  setup() {

    return () => {
      return <Fragment>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img src={vueLogo} class={[styles.logo, styles.vue]} alt="Vue logo" />
          </a>
        </div>
        <HelloWorld msg="Vite + Vue" />
      </Fragment>
    }
  }
})

export default App;
