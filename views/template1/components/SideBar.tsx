

export default defineComponent({
    props: {
        menus: {
            type: Array,
            default() {
                return [
                    {
                        text: "電子鎖",
                        id: "id1",
                        url: {
                            params: "電子鎖",
                            query: "id1",
                            name: "news-slug"
                        },
                    }
                ]
            }
        }
    },
    emits: [],
    setup(props, {emit}) {
        const route = useRoute();
        const menus = computed(() => props.menus)


        return () => (
                <ul class="ml-[122px] pr-[32px] border-r border-gray-200 mt-[60px]">
                    {menus.value.map((menu, index):any => 
                    (
                        <li class={["border-b border-gray-200","flex text-[16px]", index !== 0 ? 'py-[16px]':'pb-[16px]']}>
                            <span class={[menu.id ===route.query.id ?'text-black YaleSolisW-Bd font-medium':'font-[300] YaleSolisW-Rg text-gray-400', 'flex-1']}>{menu.text}</span>
                            { menu.id ===route.query.id ? <span><font-awesome-icon icon={['fas', 'chevron-right']} /></span> : null }
                        </li>
                    )
                    )}
                </ul>
        )
    }
})
