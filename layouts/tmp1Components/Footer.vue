<template>
    <div class="z-[300] relative">
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
                        class="flex-1 mr-[40px]"
                        v-for="(data, key) in footerDatas"
                        :key="key"
                    >
                        <h6 class="font-medium text-[14px] YaleSolisW-Bd">{{ data.title }}</h6>
                        <ul>
                            <li
                                class="my-[17px] text-[14px] hover:text-yellow-400 duration-500 transition-all"
                                v-for="(menu, index) in data.menus"
                            >
                                <NuxtLink :to="{ path: menu.url }">
                                    {{ menu.text }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                    <li class="flex-1">
                        <ul class="flex gap-6">
                            <li
                                v-for="(icon, index) in contact.icons"
                                class="text-[24px]"
                            >
                                <a :href="icon.url" class="hover:text-yellow-400 transition-all"
                                    ><font-awesome-icon :icon="['fab', icon.iconName]" />
                                </a>
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
                text: "檔案下載",
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
                text: "關於我們",
                url: "",
            },
            {
                text: "最新消息",
                url: "",
            },
            {
                text: "裝修實績",
                url: "",
            },
            {
                text: "Yale Home APP",
                url: "",
            },
        ],
    },
});

const contact = ref({
    icons: [
        {
            iconName: "facebook",
            alt: "耶魯電子鎖粉絲專頁",
            url: "",
        },
        {
            iconName: "line",
            alt: "耶魯電子鎖LINE",
            url: "",
        },
        {
            iconName: "instagram",
            alt: "耶魯電子鎖IG",
            url: "",
        },
        {
            iconName: "youtube",
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
