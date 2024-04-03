<template>
    <section class="relative xl:flex items-center justify-center rounded-bl-[60px] xl:rounded-bl-[120px] xl:min-h-screen py-[48px] md:py-[90px] xl:py-[120px]">
        <h3 class="relative hidden md:block xl:hidden text-white text-center text-[32px] sm:text-[48px] xl:text-[66px] font-medium YaleSolisW-Bd leading-none z-[1]">CUSTOMIZED</h3>
        <h5 class="relative hidden md:block xl:hidden text-gray-800 text-center xl:text-start text-[32px] mt-[14px] mb-[24px] font-medium YaleSolisW-Bd leading-[50px] tracking-wide z-[1]">{{ custom_door.title }}</h5>
        <NuxtImg
            class="absolute w-full h-full top-0 left-0 object-cover rounded-bl-[60px] xl:rounded-bl-[120px]"
            src="/img/home/custom/section-bg.jpg"
        />
        <main class="container relative flex flex-col md:flex-row xl:items-center justify-center xl:justify-between md:gap-6 item">
            <article>
                <h3 class="hidden xl:block text-white text-[56px] xl:text-[66px] font-medium YaleSolisW-Bd leading-[66px]">CUSTOMIZED</h3>
                <h5 class="md:hidden xl:block text-gray-800 text-center xl:text-start text-[28px] sm:text-[32px] xl:text-[40px] xl:mt-[14px] font-medium YaleSolisW-Bd leading-[50px] tracking-wide">{{ custom_door.title }}</h5>
                <p class="hidden xl:block w-[329px] mt-[20px] text-start text-gray-800 text-base font-normal YaleSolisW-Bd leading-relaxed tracking-tight">{{ custom_door.subtitle }}</p>
                <div class="hidden xl:block mt-[40px]">
                    <button
                        @click="customLink(custom_door.link)"
                        class="gap-2 yellow-btn btn-lg flex items-center justify-center"
                    >
                        <img
                            class="w-[30px]"
                            src="/img/home/custom/button-icon.svg"
                            alt=""
                        />
                        前往訂製門扇
                    </button>
                </div>
            </article>
            <article class="relative left-1/2 md:left-0 top-0 -translate-x-1/2 md:translate-x-0 aspect-[3/5] xl:ml-[80px] flex-1 max-w-[180px] md:max-w-[300px] xl:max-w-[400px]">
                <div
                    v-for="(door, key) in doors"
                    :key="key"
                    class="absolute top-0 left-0 aspect-[3/5] w-full z-50"
                >
                    <NuxtImg
                        class="w-full"
                        :src="door[doorStyles[key]]"
                    />
                </div>
            </article>
            <article class="relative m-auto self-start mt-2 md:mt-auto xl:mt-[5%] 2xl:mt-[10%]">
                <div class="inline-block relative w-full xl:w-fit xl:left-[-15px] mb-2">
                    <div class="mb-2 xl:mb-4 text-center">點擊變換風格</div>
                    <div class="hidden xl:flex justify-center">
                        <div class="bg-black w-[1px] h-[30px]"></div>
                    </div>
                </div>
                <div
                    class="flex gap-4 flex-column"
                    v-for="(icon, key) in icons"
                >
                    <div>
                        <div
                            class="icon-wrap"
                            :class="isLargePad ? 'active' : isHover[key] ? 'active' : null"
                        >
                            <NuxtImg
                                @mouseover="isLargePad ? null : mouseoverEvent(key)"
                                class="w-[50px] aspect-square object-cover cursor-pointer"
                                :src="icon.img"
                            />
                            <div v-if="isLargePad">
                                {{ icon.text }}
                            </div>
                            <div
                                class="flex"
                                :class="isLargePad || isHover[key] ? 'opacity-100 pointer-events-auto transition-all duration-400 before:ease-in-out delay-500' : 'opacity-0 pointer-events-none'"
                            >
                                <div
                                    v-for="item in icon.styles"
                                    :class="doorStyles[icon.key] === item.style ? 'bg-yellow-600 rounded-full pointer-events-none' : ''"
                                    class="cursor-pointer mr-3 w-[30px] h-[30px] flex items-center justify-center xl:hover:bg-gray-100 duration-500 transition-all rounded-full"
                                    @click="doorStyles[icon.key] = item.style"
                                >
                                    {{ item.value }}
                                </div>
                            </div>
                        </div>
                        <div
                            class="relative w-[66px] text-center overflow-hidden"
                            :class="isHover[key] ? 'max-h-[30px] mb-4 top-0 transition-all duration-1000 ease-in-out opacity-1' : 'max-h-0 top-2 opacity-0'"
                        >
                            {{ icon.text }}
                        </div>
                    </div>
                </div>
                <div class="xl:hidden mt-4">
                    <button
                        @click="customLink(custom_door.link)"
                        class="gap-2 animation-btn btn-sm block mx-auto"
                    >
                        前往訂製門扇
                    </button>
                </div>
            </article>
        </main>
    </section>
</template>

<script setup lang="ts">
const { isLargePad } = useWindowResize();
interface Props {
    custom_door: {
        title: string;
        subtitle: string;
        link: string;
    };
}

const props = defineProps<Props>();

const isHover = ref({
    lock: false,
    doorOut: false,
    doorInside: false,
});
const isClick = ref({
    lock: false,
    doorOut: false,
    doorInside: false,
});

const doors = computed(() => ({
    main: {
        style1: "/img/home/custom/customized_door1.png",
        style2: "/img/home/custom/customized_door2.png",
        style3: "/img/home/custom/customized_door3.png",
    },
    out: {
        style1: "/img/home/custom/customized_frame1.png",
        style2: "/img/home/custom/customized_frame2.png",
        style3: "/img/home/custom/customized_frame3.png",
    },
    lock: {
        style1: "/img/home/custom/customized_lock1.png",
        style2: "/img/home/custom/customized_lock2.png",
        style3: "/img/home/custom/customized_lock3.png",
    },
}));

const doorStyles = ref({
    main: "style1",
    out: "style1",
    lock: "style1",
});

const currentStyles = [
    { style: "style1", value: 1 },
    { style: "style2", value: 2 },
    { style: "style3", value: 3 },
];

const icons = computed(() => ({
    lock: {
        img: "/img/home/custom/icons/lock.svg",
        text: "門鎖",
        styles: currentStyles,
        key: "lock",
    },
    doorOut: {
        img: "/img/home/custom/icons/door-out.svg",
        text: "門框",
        styles: currentStyles,
        key: "out",
    },
    doorInside: {
        img: "/img/home/custom/icons/door-inside.svg",
        text: "門扇",
        styles: currentStyles,
        key: "main",
    },
}));

function mouseoverEvent(key: string) {
    isHover.value[key] = true;
}

function customLink(link: any) {
    if (link) {
        window.location.href = link;
    }
}
</script>

<style lang="scss" scoped>
.icon-wrap {
    @apply relative flex gap-6 p-2 mt-1 mb-1 items-center z-0 duration-1000 overflow-hidden rounded-full;
    @apply before:absolute before:bg-white before:top-0 before:left-0 before:h-full before:rounded-full before:opacity-0 before:min-w-[66px] before:-z-[1];
    &.active {
        @apply mt-3 xl:mt-2 mb-3 xl:mb-2 before:opacity-100 before:min-w-[400px] before:opacity-100;
        @apply before:transition-opacity before:duration-200 before:ease-in-out;
        @apply before:transition-[min-width] before:duration-1000 before:ease-in-out before:delay-200;
    }
}
</style>
