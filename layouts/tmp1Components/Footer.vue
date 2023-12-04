<template>
    <footer class="text-white bg-gray-800">
        <section class="p-10">
            <ul class="grid grid-cols-5 gap-4">
                <li>
                    <NuxtImg
                        class="max-w-[150px] w-full"
                        src="/img/logo/logo-1.svg"
                        alt=""
                    />
                </li>
                <li
                    class="my-5"
                    v-for="(data, key) in footerDatas"
                    :key="key"
                >
                    {{ data.title }}
                    <ul>
                        <li
                            class="my-5"
                            v-for="(menu, index) in data.menus"
                        >
                            <NuxtLink :to="{ path: menu.url }">
                                {{ menu.text }}
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul class="flex my-5">
                        <li
                            v-for="(icon, index) in contact.icons"
                            class="mr-2"
                        >
                            <a :href="icon.url"
                                ><NuxtImg
                                    class="min-w-[30px]"
                                    :src="icon.imgUrl"
                                    :alt="icon.alt"
                            /></a>
                        </li>
                    </ul>
                    <div class="my-5">{{ contact.name }}</div>
                    <div class="my-5">{{ contact.phone }}</div>
                </li>
            </ul>
            <aside class="flex justify-between mt-20 text-sm font-light">
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
        <div class="w-full h-[10px] bg-yellow-500"></div>
    </footer>
</template>

<script setup lang="ts">
const footerDatas = ref({
    footer1: {
        title: "ABOUT YALE",
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
    footer2: {
        title: "PRODUCTS",
        menus: [
            {
                text: "Yale電子鎖",
                url: "",
            },
            {
                text: "門扇",
                url: "",
            },
            {
                text: "五金配件",
                url: "",
            },
            {
                text: "保險箱",
                url: "",
            },
            {
                text: "Yale Home App",
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
