<template>
    <section class="relative flex items-center justify-center rounded-bl-[120px] min-h-[100%] py-[100px]">
        <NuxtImg
            class="absolute w-full h-full object-cover rounded-bl-[120px]"
            src="/img/home/custom/section-bg.jpg"
        />
        <main class="relative container flex item items-center justify-between gap-6 xl:gap-10">
            <article>
                <h3 class="text-white text-[56px] xl:text-[66px] font-bold YaleSolisW-Bd leading-[66px]">CUSTOMIZED</h3>
                <h5 class="text-zinc-800 text-[40px] mt-[14px] font-bold font-['Yale Solis'] leading-[50px] tracking-wide">訂製您的專屬門扇</h5>
                <p class="w-[329px] mt-[20px] text-zinc-800 text-base font-normal font-['Yale Solis'] leading-relaxed tracking-tight">最新智慧電子鎖，從卡片密碼鎖到最先進的指紋鎖，一應俱全。</p>
                <div class="mt-[40px]">
                    <button class="animation-btn gap-2">
                        <img
                            class="w-[30px]"
                            src="/img/home/custom/button-icon.svg"
                            alt=""
                        />
                        前往訂製門扇
                    </button>
                </div>
            </article>
            <article class="relative right-0 top-0 aspect-[3/5] xl:ml-[80px] flex-1 max-w-[400px]">
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
            <article class="relative self-start mt-[5%] 2xl:mt-[10%]">
                <div class="inline-block relative left-[-15px] mb-2">
                    <div class="text-center mb-4">點擊變換風格</div>
                    <div class="flex justify-center">
                        <div class="bg-black w-[1px] h-[30px]"></div>
                    </div>
                </div>
                <div class="flex flex-column gap-4" v-for="(icon, key) in icons">
                    <div>
                        <div
                            class="icon-wrap"
                            :class="isHover[key] ? 'active': null"
                        >
                            <NuxtImg
                                @mouseover="mouseoverEvent(key)"
                                @mouseleave="mouseleaveEvent(key)"
                                class="w-[50px] aspect-1/1 cursor-pointer"
                                :src="icon.img"
                                @click="handleClick(key)"
                            />
                            <div
                                class="flex"
                                :class="isHover[key] ? 'opacity-100 pointer-events-auto transition-all duration-400 before:ease-in-out delay-500' : 'opacity-0 pointer-events-none'"
                            >
                                <div
                                    v-for="item in icon.styles"
                                    :class="doorStyles[icon.key] === item.style ? 'bg-yellow-600 rounded-full pointer-events-none' : ''"
                                    class="cursor-pointer mr-3 w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-100 duration-500 transition-all rounded-full"
                                    @click="doorStyles[icon.key] = item.style"
                                >
                                    {{ item.value }}
                                </div>
                            </div>
                        </div>
                        <div
                            class="relative w-[66px] text-center overflow-hidden"
                            :class="isHover[key] ? 'max-h-[30px] mb-4 top-0 transition-all duration-1000 ease-in-out opacity-1': 'max-h-0 top-2 opacity-0'"
                        >{{ icon.text }}
                        </div>
                    </div>
                </div>
            </article>
        </main>
    </section>
</template>

<script setup lang="ts">
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
        style3: "/img/home/custom/customized_door1.png",
    },
    out: {
        style1: "/img/home/custom/customized_frame1.png",
        style2: "/img/home/custom/customized_frame2.png",
        style3: "/img/home/custom/customized_door1.png",
    },
    lock: {
        style1: "/img/home/custom/customized_lock1.png",
        style2: "/img/home/custom/customized_lock2.png",
        style3: "/img/home/custom/customized_door1.png",
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

function mouseleaveEvent(key: string) {
    // isHover.value[key] = false;
}

// icon按鈕只能開不能關
function handleClick(key: string) {
    if(isHover[key] === false) {
        isHover[key] = !isHover[key]
    }
}
</script>

<style lang="scss" scoped>
.icon-wrap{
    @apply relative flex gap-6 p-2 mt-1 mb-1 items-center z-0 duration-1000 overflow-hidden rounded-full;
    @apply before:absolute before:bg-white before:top-0 before:left-0 before:h-full before:rounded-full before:opacity-0 before:min-w-[66px] before:-z-[1];
    &.active{
        @apply mt-2 mb-2 before:opacity-100 before:min-w-[400px] before:opacity-100;
        @apply before:transition-opacity before:duration-200 before:ease-in-out;
        @apply before:transition-[min-width] before:duration-1000 before:ease-in-out before:delay-200;
    }
}
</style>
