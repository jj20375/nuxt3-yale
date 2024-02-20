
import { NuxtLink } from "nuxt";
import { useWindowResize } from "@/composables/window-resize";

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
        const { isPad } = useWindowResize();

        return () => (
            <div class="sticky xl:relative top-[64px] xl:top-0 z-[1] before:absolute xl:before:content-none xl:border-r before:bottom-0 before:left-0 before:h-[1px] before:bg-gray-200 before:w-[calc(100%)]">
                <div class={[isPad.value ? 'container' : '']}>
                    <ul class="-mx-4 xl:mx-0 px-[14px] xl:px-0 bg-white flex xl:block xl:pr-[40px] border-gray-200 xl:w-[250px] z-[10]">
                        {menus.value.map((menu, index):any =>
                            (
                                <li onClick={()=>router.push(menu.url)} class={["cursor-pointer xl:p-0 xl:border-b border-gray-200","flex text-[16px] z-[1]", index !== 0 ? 'py-3 px-[14px] xl:py-4':'py-3 pr-[14px] xl:pb-4']}>
                                    <span class={[menu.id ==route.query.id ?'relative text-gray-800 YaleSolisW-Bd font-medium xl:after:content-none after:absolute after:-bottom-3 after:w-full after:h-[2px] after:bg-gray-800 after:left-0':'YaleSolisW-Rg xl:text-gray-400', 'xl:flex-1']}>{menu.text}</span>
                                    { menu.id ==route.query.id ? <span class="hidden xl:block"><font-awesome-icon icon={['fas', 'chevron-right']} /></span> : null }
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        )
    },
})
