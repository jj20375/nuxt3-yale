

export default defineComponent({
    props: {},
    emits: [],
    setup(props, {emit}) {
        const route = useRoute();
        const menus = computed(() => ({
            id1: {
                text: "電子鎖",
                url: {
                    params: "電子鎖",
                    query: "id1",
                },
            },
            id2: {
                text: "保險箱",
                url: {
                    params: "保險箱",
                    query: "id2",
                },
            },
            id3: {
                text: "Yale Home App 及配件",
                url: {
                    params: "Yale Home App 及配件",
                    query: "id3",
                },
            },
            id4: {
                text: "訂製專屬門扇",
                url: {
                    params: "訂製專屬門扇",
                    query: "id4",
                },
            },
            id5: {
                text: "型錄及檔案下載",
                url: {
                    params: "型錄及檔案下載",
                    query: "id5",
                },
            },
        }));


        return () => (
            <div class="min-h-screen h-full">
                <ul class="ml-[122px] pr-[32px] border-r border-gray-200 h-screen w-[240px]">
                    {Object.keys(menus.value).map((key) => 
                    (
                        <li class={["border-b border-gray-200","flex text-[16px]", key !== 'id1' ? 'py-[16px]':'pb-[16px]']}>
                            <span class={[key ===route.query.id ?'text-black YaleSolisW-Bd font-bold':'font-[300] YaleSolisW-Rg text-gray-400', 'flex-1']}>{menus.value[key].text}</span>
                            { key ===route.query.id ? <span><font-awesome-icon icon={['fas', 'chevron-right']} /></span> : null }
                        </li>
                    )
                    )}
                </ul>
            </div>
        )
    }
})
