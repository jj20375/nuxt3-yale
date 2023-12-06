<template>
    <div>
        <footer class="flex justify-center w-full text-white bg-gray-800">
            <section class="w-full pl-[158px] pr-[160px] mt-[98px]">
                <ul class="flex justify-between w-full">
                    <li class="mr-[128px]">
                        <NuxtImg
                            class="min-w-[136px] max-w-[136px] w-full"
                            src="/img/logo/logo-1.svg"
                            alt=""
                        />
                    </li>
                    <li
                        class="flx-1 mr-[40px]"
                        v-for="(data, key) in footerDatas"
                        :key="key"
                    >
                        <h6 class="font-bold text-[14px] YaleSolisW-Bd">{{ data.title }}</h6>
                        <ul>
                            <li
                                class="my-[17px] text-[14px] hover:text-yellow-600 duration-500 transition-all"
                                v-for="(menu, index) in data.menus"
                            >
                                <NuxtLink :to="{ path: menu.url }">
                                    {{ menu.text }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                    <li class="flx-1">
                        <ul class="flex">
                            <li
                                v-for="(icon, index) in contact.icons"
                                class="mr-[24px]"
                            >
                                <a :href="icon.url"
                                    ><NuxtImg
                                        class="min-w-[24px]"
                                        :src="icon.imgUrl"
                                        :alt="icon.alt"
                                /></a>
                            </li>
                        </ul>
                        <div class="mt-[30px]">{{ contact.name }}</div>
                        <div class="mt-[8px]">{{ contact.phone }}</div>
                    </li>
                </ul>
                <aside class="flex justify-between mt-20 text-sm font-light mb-[23px]">
                    <div>{{ copyright.text }}</div>
                    <ul class="flex">
                        <li
                            v-for="(caluse, index) in copyright['caluses']"
                            :key="index"
                            class="mr-5"
                        >
                            <a :href="caluse.url">{{ caluse.text }}</a>
                        </li>
                    </ul>
                </aside>
            </section>
        </footer>
        <div class="w-full h-[10px] bg-yellow-500"></div>
    </div>
</template>

<script setup lang="ts">
const footerDatas = ref({
    footer1: {
        title: "PRODUCTS",
        menus: [
            {
                text: "訂製您的專屬門扇",
                url: "",
            },
            {
                text: "Yale 電子鎖",
                url: "",
            },
            {
                text: "保險箱",
                url: "",
            },
            {
                text: "電子鎖配件",
                url: "",
            },
        ],
    },
    footer2: {
        title: "STORE",
        menus: [
            {
                text: "直營門市",
                url: "",
            },
            {
                text: "授權展售店",
                url: "",
            },
            {
                text: "全國電子通路",
                url: "",
            },
            {
                text: "電商通路",
                url: "",
            },
        ],
    },

    footer3: {
        title: "SUPPORT",
        menus: [
            {
                text: "常見問答",
                url: "",
            },
            {
                text: "維修與保固",
                url: "",
            },
            {
                text: "檔按下載",
                url: "",
            },
            {
                text: "預約安裝",
                url: "",
            },
            {
                text: "聯絡我們",
                url: "",
            },
        ],
    },
    footer4: {
        title: "ABOUT US",
        menus: [
            {
                text: "關於Yale",
                url: "",
            },
            {
                text: "服務流程",
                url: "",
            },
            {
                text: "國際認證專利",
                url: "",
            },
        ],
    },
});

const contact = ref({
    icons: [
        {
            imgUrl: "/img/footer/fb.svg",
            alt: "耶魯電子鎖粉絲專頁",
            url: "",
        },
        {
            imgUrl: "/img/footer/line.svg",
            alt: "耶魯電子鎖LINE",
            url: "",
        },
        {
            imgUrl: "/img/footer/ig.svg",
            alt: "耶魯電子鎖IG",
            url: "",
        },
        {
            imgUrl: "/img/footer/youtube.svg",
            alt: "耶魯電子鎖Youtube",
            url: "",
        },
    ],
    name: "灝翔有限公司",
    phone: "0800-314-109",
});

const copyright = {
    text: "灝翔有限公司 © Copyright All Rights Reserved. Powerd by 可思科技-網站架設",
    caluses: [
        { text: "隱私權政策", url: "" },
        { text: "網站服務條款", url: "" },
    ],
};
</script>
