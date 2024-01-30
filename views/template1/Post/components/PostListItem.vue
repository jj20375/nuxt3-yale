<template>
    <article
        v-for="(item, index) in datas"
        :key="index"
        class="flex items-center gap-[48px] list-card"
        :class="datas.length - 1 === index ? '' : 'mb-[48px]'"
        @click="router.push(item.url)"
    >
        <div class="image-wrap rounded-2xl overflow-hidden cursor-pointer w-full max-w-[360px] aspect-[16/9]">
            <NuxtImg
                :src="item.imgSrc"
                class="object-cover w-full aspect-[16/9]"
            />
        </div>
        <div class="flex-1 cursor-pointer">
            <h2 class="text-[24px] font-medium YaleSolisW-Bd line-clamp-2">
                {{ item.title }}
            </h2>
            <p class="leading-relaxed text-[16px] pt-[12px] line-clamp-2">
                {{ item.content }}
            </p>

            <div class="flex mt-[20px]">
                <div class="text-center mr-[16px] w-[90px] border border-gray-300 py-[6px] px-[12px] text-gray-400 text-[12px]">
                    <span>{{ item.date }}</span>
                </div>
                <span v-if="item.is_top"
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
    datas: { title: string; content: string; is_top: number; imgSrc: string; date: string; url: { name: string; params?: { slug?: string; query: { breadcrumbs: any } }; query: any } }[];
}
const props = withDefaults(defineProps<Props>(), {
    datas: [{ title: "title", content: "is content", is_top: 0, imgSrc: "/img/logo-1.svg", url: { name: "index", params: { slug: "home" } } }],
});

const router = useRouter();
</script>

<style lang="scss" scoped>
.list-card{
    img{
        @apply scale-100 transition-all duration-500;
    }
    &:hover{
        .image-wrap{
            img{
                @apply scale-110 transition-all duration-500;
            }
        }
    }
}
</style>
