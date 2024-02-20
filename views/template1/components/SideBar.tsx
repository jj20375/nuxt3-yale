
import { NuxtLink } from "nuxt";

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
        const router = useRouter();
        const menus = computed(() => props.menus)


        return () => (
            <ul class="relative -mx-4 xl:mx-0 px-4 xl:px-0 flex xl:block xl:pr-[40px] xl:border-r border-gray-200 xl:w-[250px] before:absolute xl:before:content-none before:bottom-0 before:-left-[10rem] before:w-full before:h-[1px] before:bg-gray-200 before:w-[calc(100%+20rem)]">
                {menus.value.map((menu, index):any =>
                (
                    <li onClick={()=>router.push(menu.url)} class={["cursor-pointer py-3 px-4 xl:p-0 xl:border-b border-gray-200","flex text-[16px]", index !== 0 ? 'xl:py-[16px]':'xl:pb-[16px]']}>
                        <span class={[menu.id ==route.query.id ?'text-gray-800 YaleSolisW-Bd font-medium':'YaleSolisW-Rg text-gray-400', 'xl:flex-1']}>{menu.text}</span>
                        { menu.id ==route.query.id ? <span class="hidden xl:block"><font-awesome-icon icon={['fas', 'chevron-right']} /></span> : null }
                    </li>
                )
                )}
            </ul>
        )
    },
})
