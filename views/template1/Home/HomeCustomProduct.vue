<template>
    <section
        id="text"
        class="flex px-10 bg-yellow-400 rounded-bl-[200px] min-h-[800px] items-center justify-center relative"
    >
        <article>
            <h3 class="text-white text-[100px] OpenSansFont font-bold">CUSTOMIZED</h3>
            <h5 class="text-[60px] font-medium leading-none">訂製您的專屬門扇</h5>
            <p class="text-xl font-light max-w-[300px] mt-5">最新智慧電子鎖，從卡片密碼鎖到最新進的指紋鎖，一應俱全。</p>
            <div class="my-5">
                <button class="flex items-center bg-white rounded-full min-w-[300px] py-5 justify-center">
                    <img
                        class="w-[30px] mr-2"
                        src="/img/home/custom/button-icon.svg"
                        alt=""
                    />
                    前往訂製門扇
                </button>
            </div>
        </article>
        <article class="relative right-0 -top-[250px] min-w-[300px]">
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
                <div
                    @mouseover="mouseoverEvent(key)"
                    @mouseleave="mouseleaveEvent(key)"
                >
                    <div
                        class="flex items-center transition-all duration-500"
                        :class="isClick[key] ? 'bg-white rounded-full mt-5 ml-[120px]' : ''"
                    >
                        <NuxtImg
                            class="w-[50px] my-2"
                            :class="isClick[key] ? 'ml-2' : 'mx-auto'"
                            :src="icon.img"
                            @click="isClick[key] = !isClick[key]"
                        />
                        <div
                            class="flex"
                            v-if="isClick[key]"
                        >
                            <div
                                v-for="item in icon.styles"
                                :class="[item.value === 1 ? 'mx-5' : 'mr-5', doorStyles[icon.key] === item.style ? 'bg-yellow-500 rounded-full ' : '']"
                                class="cursor-pointer w-[20px] h-[20px] flex items-center justify-center"
                                @click="doorStyles[icon.key] = item.style"
                            >
                                {{ item.value }}
                            </div>
                        </div>
                    </div>
                    <Transition>
                        <div
                            class="text-center"
                            v-if="isHover[key]"
                        >
                            <div>{{ icon.text }}</div>
                        </div>
                    </Transition>
                </div>
            </div>
        </article>
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
    isHover.value[key] = false;
}
</script>

<style lang="scss" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.v-enter-active,
.v-leave-active {
    visibility: visible;
    transition: all 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    visibility: hidden;
}
</style>
