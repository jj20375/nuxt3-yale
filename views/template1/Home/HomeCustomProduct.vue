<template>
    <section class="flex items-center justify-center bg-gradient-to-r from-yellow-100 from-5% via-yellow-500 via-50% to-yellow-500 to-90% rounded-bl-[120px] min-h-[100%] py-[100px]">
        <main class="w-[1113px] flex item items-center justify-center relative">
            <article class="mr-[68px]">
                <h3 class="text-white text-[66px] font-bold YaleSolisW-Bd leading-[66px]">CUSTOMIZED</h3>
                <h5 class="text-zinc-800 text-[40px] mt-[14px] font-bold font-['Yale Solis'] leading-[50px] tracking-wide">訂製您的專屬門扇</h5>
                <p class="w-[329px] mt-[20px] text-zinc-800 text-base font-normal font-['Yale Solis'] leading-relaxed tracking-tight">最新智慧電子鎖，從卡片密碼鎖到最先進的指紋鎖，一應俱全。</p>
                <div class="mt-[40px]">
                    <button class="flex items-center w-[230px] h-[58px] px-7 py-4 bg-white rounded-full justify-center">
                        <img
                            class="w-[30px] mr-2"
                            src="/img/home/custom/button-icon.svg"
                            alt=""
                        />
                        前往訂製門扇
                    </button>
                </div>
            </article>
            <article class="relative right-0 top-[50px] min-w-[300px] min-h-[600px]">
                <div
                    v-for="(door, key) in doors"
                    :key="key"
                    class="absolute top-0 left-0 w-[300px] z-50"
                >
                    <NuxtImg
                        class="w-full"
                        :src="door[doorStyles[key]]"
                    />
                </div>
            </article>
            <article class="w-[300px]">
                <div class="text-center">點擊變換風格</div>
                <div class="flex justify-center my-2">
                    <div class="bg-black w-[1px] h-[30px]"></div>
                </div>
                <div v-for="(icon, key) in icons">
                    <div>
                        <div
                            class="flex items-center transition-all duration-1000 w-[180px]"
                            :class="isHover[key] ? 'bg-white rounded-full mt-5 ml-[120px] ' : 'ml-[100px]'"
                        >
                            <div :class="isHover[key] ? 'ml-0' : 'ml-[-50px] w-[200px]'">
                                <NuxtImg
                                    @mouseover="mouseoverEvent(key)"
                                    @mouseleave="mouseleaveEvent(key)"
                                    class="w-[50px] my-2 cursor-pointer"
                                    :class="isHover[key] ? 'ml-2' : 'mx-auto'"
                                    :src="icon.img"
                                    @click="isHover[key] = !isHover[key]"
                                />
                            </div>
                            <div
                                class="flex"
                                v-if="isHover[key]"
                            >
                                <div
                                    v-for="item in icon.styles"
                                    :class="[item.value === 1 ? 'mx-5' : 'mr-5', doorStyles[icon.key] === item.style ? 'bg-yellow-600 rounded-full ' : '']"
                                    class="cursor-pointer w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-100 duration-500 transition-all rounded-full"
                                    @click="doorStyles[icon.key] = item.style"
                                >
                                    {{ item.value }}
                                </div>
                            </div>
                            <div
                                class="min-h-[30px] w-[full]"
                                :class="isHover[key] ? 'opacity-100' : 'opacity-0'"
                            ></div>
                        </div>
                        <Transition>
                            <div
                                class="mt-2 text-center"
                                v-show="isHover[key]"
                            >
                                <div>{{ icon.text }}</div>
                            </div>
                        </Transition>
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
    },
    out: {
        style1: "/img/home/custom/customized_frame1.png",
        style2: "/img/home/custom/customized_frame2.png",
    },
    lock: {
        style1: "/img/home/custom/customized_lock1.png",
        style2: "/img/home/custom/customized_lock2.png",
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
</script>

<style lang="scss" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.v-enter-active,
.v-leave-active {
    visibility: visible;
    transition: all 2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    visibility: hidden;
}
</style>
