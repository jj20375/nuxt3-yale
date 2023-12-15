<template>
    <article
        v-for="(item, index) in datas"
        :key="index"
        class="flex items-center"
        :class="datas.length - 1 === index ? '' : 'mb-[48px]'"
    >
        <NuxtImg
            :src="item.imgSrc"
            class="w-full max-w-[400px] mr-[48px] cursor-pointer"
        />
        <div class="w-[440px] cursor-pointer">
            <h2 class="text-[24px] font-medium YaleSolisW-Bd">
                {{ item.title }}
            </h2>
            <ul>
                <li
                    class="flex text-[15px] text-gray-500 YaleSolisW-Rg"
                    :class="key !== 'phone' ? 'pt-[8px]' : 'mt-[20px]'"
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

const router = useRouter();
</script>
