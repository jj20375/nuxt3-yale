export default defineComponent({
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    emits: [],
    setup(props, { emit}) {
        return () => (
            <div>
                <h1 class="text-[28px] font-medium text-gray-800 mb-[32px] leading-none">{ props.title }</h1>
            </div>
        )
    }
})