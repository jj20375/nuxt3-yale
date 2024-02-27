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
                <h1 class="xl:text-[28px] text-[24px] font-bold text-gray-800 xl:mb-[32px] mb-[14px] leading-none">{ props.title }</h1>
            </div>
        )
    }
})