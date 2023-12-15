<template>
    <article
        v-for="(item, index) in datas"
        :key="index"
        class="flex items-center"
        :class="datas.length - 1 === index ? '' : 'mb-[48px]'"
        @click="router.push(item.url)"
    >
        <NuxtImg
            :src="item.imgSrc"
            class="w-full max-w-[360px] mr-[48px] cursor-pointer"
        />
        <div class="w-[440px] cursor-pointer">
            <h2 class="text-[24px] font-medium YaleSolisW-Bd">
                {{ item.title }}
            </h2>
            <p class="leading-relaxed text-[16px] font-[300] YaleSolisW-Lt pt-[12px] line-clamp-3">
                {{ item.content }}
            </p>

            <div class="flex mt-[20px]">
                <div class="text-center mr-[16px] w-[90px] border border-gray-300 py-[6px] px-[12px] text-gray-400 text-[12px]">
                    <span>{{ item.date }}</span>
                </div>
                <span
                    ><img
                        class="w-[28px]"
                        src="/img/news/pin-icon.svg"
                /></span>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
interface Props {
    datas: { title: string; content: string; imgSrc: string; date: string; url: { name: string; params?: { slug?: string }; query: any } }[];
}
const props = withDefaults(defineProps<Props>(), {
    datas: [{ title: "title", content: "is content", imgSrc: "/img/logo-1.svg", url: { name: "index", params: { slug: "home" } } }],
});

const router = useRouter();
</script>
