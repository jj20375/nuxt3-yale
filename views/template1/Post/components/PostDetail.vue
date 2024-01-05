<template>
    <section class="min-h-screen mt-[94px] mb-[100px]">
        <nav class="border-t border-gray-300 py-[16px] pl-[122px]">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="border-t h-[1px] border-gray-300 w-full"></div>
        <div class="container mt-[60px]">
            <div class="max-w-[795px] mx-auto">
                <h1 class="text-[32px] YaleSolisW-Bd font-medium text-black">{{ postData.title }}</h1>
                <div class="flex mt-[20px] border-b border-gray-300 pb-[24px]">
                    <div class="text-center mr-[16px] w-[90px] border border-gray-300 py-[6px] px-[12px] text-gray-400 text-[12px]">
                        <span>{{ postData.published_at }}</span>
                    </div>
                    <span
                        ><img
                            class="w-[28px]"
                            src="/img/news/pin-icon.svg"
                    /></span>
                </div>
                <div
                    class="my-10 text-gray-500 YaleSolisW-Rg text-[16px]"
                    v-html="postData.content"
                ></div>
                <div class="flex items-center justify-center pt-[24px] border-t border-gray-300">
                    <div
                        class="mr-[40px]"
                        v-if="pagination.prev"
                    >
                        <button
                            @click.prevent="jumpPage(pagination.prev)"
                            class="YaleSolisW-Rg text-[16px] flex items-center"
                        >
                            <NuxtImg
                                class="w-[10px]"
                                src="/img/icons/post/arrow-prev.svg"
                            />
                            <span class="ml-[8px]">上一篇</span>
                            <span class="ml-[20px] text-gray-400">{{ pagination.prev.title.substr(0, 10) }}...</span>
                        </button>
                    </div>
                    <div>
                        <button
                            @click.prevent="backList"
                            class="YaleSolisW-Rg rounded-full text-center bg-gray-100 w-[111px] py-[8px] px-[32px] text-[15px]"
                        >
                            回列表
                        </button>
                    </div>
                    <div
                        class="ml-[40px]"
                        v-if="pagination.next"
                    >
                        <button
                            @click.prevent="jumpPage(pagination.next)"
                            class="YaleSolisW-Rg text-[16px] flex items-center"
                        >
                            <span class="mr-[20px] text-gray-400">{{ pagination.next.title.substr(0, 10) }}...</span>
                            <span class="mr-[8px]">下一篇</span>
                            <NuxtImg
                                class="w-[10px]"
                                src="/img/icons/post/arrow-next.svg"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
const route = useRoute();
const router = useRouter();

const { $api, $utils } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "news-slug",
        text: "最新消息",
        params: { slug: "耶魯最新消息" },
    },
    {
        name: "news-slug",
        text: "電子鎖",
        params: { slug: "耶魯最新消息" },
        query: { id: "id1" },
    },
    {
        name: "news-slug",
        text: "質感居家，將舒適與風格融為一體。精緻材質、簡約設計，打造溫馨空間".substr(0, 10) + "...",
        params: { slug: "耶魯最新消息" },
        query: { id: "id1" },
    },
]);

const postData = ref<any>({
    id: "",
    title: "",
    content: "",
    published_at: "",
});

const pagination = ref<any>({
    prev: null,
    next: null,
});

/**
 * 取得裝修實績詳細資料
 */
async function getList(params: { articleId: any }) {
    try {
        const { data } = await $api().SampleDetailAPI(params);
        console.log("home sample api => ", data.value);
        const detail = (data.value as any).data;

        postData.value = {
            id: detail.id,
            title: detail.title,
            content: detail.content,
            article_category: detail.article_category,
            published_at: $utils().formatToDate(detail.published_at),
        };

        if (detail.previous_article) {
            pagination.value.prev = {
                id: detail.previous_article.id,
                title: detail.previous_article.title,
                url: {
                    name: route.name,
                    params: {
                        slug: route.params.slug,
                    },
                    query: { id: detail.previous_article.id },
                },
            };
        } else {
            pagination.value.prev = null;
        }

        if (detail.next_article) {
            pagination.value.next = {
                id: detail.next_article.id,
                title: detail.next_article.title,
                url: {
                    name: route.name,
                    params: {
                        slug: route.params.slug,
                    },
                    query: { id: detail.next_article.id },
                },
            };
        } else {
            pagination.value.next = null;
        }
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

async function jumpPage(page: { id: any; url: any }) {
    router.push(page.url);
    await getList({ articleId: page.id });
}

function backList() {
    router.push({
        params: { slug: postData.value.article_category.name },
        query: { id: postData.value.article_category.id },
        name: postData.value.article_category.type === "news" ? "news-slug" : "sample-slug",
    });
}

/**
 * 初始化
 */
async function init() {
    await getList({ articleId: route.query.id });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
