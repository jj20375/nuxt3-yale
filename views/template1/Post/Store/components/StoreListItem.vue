<template>
    <article
        v-for="(item, index) in datas"
        :key="index"
        class="flex flex-col md:flex-row items-center gap-5 md:gap-[48px] list-card"
        :class="datas.length - 1 === index ? '' : 'md:mb-[48px] mb-[32px]'"
        ref="domRef"
    >
        <NuxtImg
            :src="item.imgSrc"
            class="object-cover w-full aspect-[16/9] rounded-2xl overflow-hidden w-full md:max-w-[360px]"
        />
        <div class="flex-1 w-full cursor-pointer">
            <h2 class="md:text-[24px] text-[18px] font-medium YaleSolisW-Bd">
                {{ item.title }}
            </h2>
            <ul>
                <li
                    class="flex text-[15px] text-gray-500 YaleSolisW-Rg"
                    :class="key !== 'phone' ? 'pt-[8px]' : 'md:mt-[20px] mt-[8px]'"
                    v-for="(contact, key) in item.contact"
                    :key="key"
                >
                    <NuxtImg
                        class="w-[20px] mr-[8px]"
                        :src="contact.icon"
                    />
                    <div v-if="key !== 'phone' && key !== 'location'">{{ contact.value }}</div>
                    <div v-else-if="key === 'phone'">
                        <a :href="'tel:' + contact.value">{{ contact.value }}</a>
                    </div>
                    <div v-else>
                        <a
                            target="_blank"
                            :href="'http://maps.google.com/?q=' + contact.value"
                            >{{ contact.value }}</a
                        >
                    </div>
                </li>
            </ul>
        </div>
    </article>
</template>

<script setup lang="ts">
interface Props {
    datas: {
        title: string;
        contact: {
            phone: { icon: string; value: string };
            time: { icon: string; value: string };
            location: { icon: string; value: string };
        };
        imgSrc: string;
    }[];
}
const props = withDefaults(defineProps<Props>(), {
    datas: [
        {
            title: "title",
            contact: {
                phone: { icon: "/img/icons/store/phone.svg", value: "02-2597-3123" },
                time: { icon: "/img/icons/store/time.svg", value: "11:00 - 21:00" },
                location: { icon: "/img/icons/store/location.svg", value: "台北市大同區承德路三段 217 號 1 樓" },
            },
            imgSrc: "/img/logo-1.svg",
        },
    ],
});

const domRef = ref<any>();

const router = useRouter();

defineExpose({
    domRef,
});
</script>
