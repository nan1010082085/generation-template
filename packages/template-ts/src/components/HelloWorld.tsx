import { Fragment, defineComponent, ref, type PropType } from 'vue'

const HelloWorld = defineComponent({
  props: {
    msg: {
      type: String as PropType<string>
    }
  },
  setup(props) {
    const count = ref(0);
    const msg = ref(props.msg);

    return () => {
      return <Fragment>
        <h1>{ msg.value }</h1>

        <div class="card">
          <button type="button" onClick={() => count.value++}>count is { count.value }</button>
          <p>
            Edit
            <code>components/HelloWorld.tsx</code> to test HMR
          </p>
        </div>
      </Fragment >
    }
  }
})

export default HelloWorld;
