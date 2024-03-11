
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
        const { isLargePad } = useWindowResize();
        const scrollRef = ref(null);
        const { x: xPosition, arrivedState } = useScroll(scrollRef, {
            behavior: "smooth"
        });
        const { right: rightArrived, left: leftArrived } = toRefs(arrivedState);

        return () => (
            <div class="sticky xl:relative top-[64px] xl:top-0 z-[1] before:absolute xl:before:content-none xl:border-r before:bottom-0 before:left-0 before:h-[1px] before:bg-gray-200 before:w-full">
                <div onClick={()=>xPosition.value -= 350} class={["absolute bottom-0 left-0 h-[48px] w-6 xl:hidden before:absolute before:top-0 before:left-0 before:h-full before:w-16 before:bg-[linear-gradient(90deg,_#FFFFFF_26.14%,_rgb(0_0_0/0)_75.76%)] z-[11]", leftArrived.value ? 'hidden': '']}><font-awesome-icon class="absolute bottom-4 left-2" icon={['fas', 'chevron-left']} /></div>
                <div class={[isLargePad.value ? 'container' : '']}>
                    <ul ref={ scrollRef } class="-mx-6 xl:mx-0 px-6 xl:px-0 bg-white flex flex-nowrap whitespace-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar xl:block xl:pr-[40px] border-gray-200 xl:w-[250px] z-[10]">
                        {menus.value.map((menu, index):any =>
                            (
                                <li onClick={()=>router.push(menu.url)} class={["cursor-pointer xl:p-0 xl:border-b border-gray-200 flex text-[16px] z-[1]", index !== 0 ? 'pb-3 pt-7 px-[14px] xl:py-4':'pb-3 pt-7 pr-[14px] xl:pb-4']}>
                                    <span class={[menu.id ==route.query.id ?'relative text-gray-800 font-medium YaleSolisW-Bd xl:after:content-none after:absolute after:-bottom-3 after:w-full after:h-[2px] after:bg-gray-800 after:left-0':'YaleSolisW-Rg xl:text-gray-400', 'xl:flex-1']}>{menu.text}</span>
                                    { menu.id ==route.query.id ? <span class="hidden xl:block"><font-awesome-icon icon={['fas', 'chevron-right']} /></span> : null }
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div onClick={()=>xPosition.value += 350} class={["absolute bottom-0 right-0 h-[48px] w-6 xl:hidden before:absolute before:top-0 before:right-0 before:h-full before:w-16 before:bg-[linear-gradient(270deg,_#FFFFFF_26.14%,_rgb(0_0_0/0)_75.76%)] z-[11]", rightArrived.value ? 'hidden': '']}><font-awesome-icon class="absolute bottom-4 right-2" icon={['fas', 'chevron-right']} /></div>
            </div>
        )
    },
})
