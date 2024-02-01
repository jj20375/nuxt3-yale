<template>
    <section class="min-h-screen mt-[86px] mb-[100px]">
        <nav class="border-t border-gray-300 py-[16px] min-h-[55px]">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="border-t h-[1px] border-gray-300 w-full"></div>
        <div class="container mt-[60px]">
            <div class="max-w-[800px] mx-auto">
                <h1 class="text-[32px] YaleSolisW-Bd font-medium text-black">{{ postData.title }}</h1>
                <div class="flex mt-[20px] border-b border-gray-300 pb-[24px]">
                    <div class="text-center mr-[16px] w-[90px] border border-gray-300 py-[6px] px-[12px] text-gray-400 text-[12px]">
                        <span>{{ postData.published_at }}</span>
                    </div>
                    <span v-if="postData.is_top"
                        ><img
                            class="w-[28px]"
                            src="/img/news/pin-icon.svg"
                    /></span>
                </div>
                <div
                    class="my-10 text-gray-500 YaleSolisW-Rg text-[16px] edit-section"
                    v-html="postData.content"
                ></div>
                <div class="flex items-center justify-center pt-[24px] border-t border-gray-300">
                    <div class="flex-1 mr-[40px]">
                        <template v-if="pagination.prev">
                            <button
                                @click.prevent="jumpPage(pagination.prev)"
                                class="w-full YaleSolisW-Rg text-[16px] flex items-center justify-start"
                            >
                                <NuxtImg
                                    class="w-[12px] basis-[12px]"
                                    src="/img/icons/post/arrow-prev.svg"
                                />
                                <span class="ml-[8px] whitespace-nowrap">上一篇</span>
                                <span class="text-start ml-[20px] text-gray-400 line-clamp-1">{{ pagination.prev.title }}</span>
                            </button>
                        </template>
                    </div>
                    <div>
                        <button
                            @click.prevent="backList"
                            class="gray-btn btn-xs"
                        >
                            回列表
                        </button>
                    </div>
                    <div class="flex-1 ml-[40px]">
                        <template v-if="pagination.next">
                            <button
                                @click.prevent="jumpPage(pagination.next)"
                                class="w-full YaleSolisW-Rg text-[16px] flex items-center justify-end"
                            >
                                <span class="mr-[20px] text-gray-400 line-clamp-1">{{ pagination.next.title }}</span>
                                <span class="mr-[8px] whitespace-nowrap">下一篇</span>
                                <NuxtImg
                                    class="w-[12px] basis-[12px]"
                                    src="/img/icons/post/arrow-next.svg"
                                />
                            </button>
                        </template>
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

const breadcrumbs = ref([]);
// 取得 storage 麵包屑參數值
if (process.client) {
    breadcrumbs.value = JSON.parse($utils().getBreadcrumbsData());
}

const postData = ref<any>({
    id: "",
    title: "",
    content: "",
    published_at: "",
    is_top: 0,
});

const pagination = ref<any>({
    prev: null,
    next: null,
});

/**
 * 取得績詳資料
 */
async function getData(params: { articleId: any }, isChangePost: boolean) {
    try {
        const { data } = await $api().SampleDetailAPI(params);
        console.log("home sample api => ", data.value);
        const detail = (data.value as any).data;

        postData.value = {
            id: detail.id,
            title: detail.title,
            content: detail.content,
            article_category: detail.article_category,
            is_top: detail.is_top,
            published_at: $utils().formatToDate(detail.published_at),
        };

        //判斷在內頁切換文章時 麵包屑 只更新最後一筆陣列簪料
        if (!isChangePost) {
            if (breadcrumbs.value.find((item: any) => item.name === route.name) === undefined) {
                breadcrumbs.value.push({
                    name: route.name,
                    params: { slug: detail.title.substr(0, 10) },
                    text: detail.title.length > 10 ? detail.title.substr(0, 10) + "..." : detail.title,
                    query: { id: detail.id, breadcrumbs: JSON.stringify(breadcrumbs.value) },
                });
            }
        }

        if (detail.previous_article) {
            pagination.value.prev = {
                id: detail.previous_article.id,
                title: detail.previous_article.title,
                url: {
                    name: route.name,
                    params: {
                        slug: route.params.slug,
                    },
                    query: { id: detail.previous_article.id, breadcrumbs: JSON.stringify(breadcrumbs.value) },
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
                    query: { id: detail.next_article.id, breadcrumbs: JSON.stringify(breadcrumbs.value) },
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
    // 將麵包屑存進 storage
    $utils().saveBreadcrumbsData(page.url.query.breadcrumbs);
    router.push({ name: page.url.name, params: page.url.params, query: { id: page.url.query.id } });
    await getData({ articleId: page.id }, true);
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
    await getData({ articleId: route.query.id }, false);
}

await init();
onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
        }
    });
});
</script>
