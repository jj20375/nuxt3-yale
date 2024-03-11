<template>
    <ul class="flex flex-wrap gap-y-2 min-h-[21px]">
        <li
            v-for="(menu, index) in menus"
            :key="menu.name"
            class="text-gray-800 text-[14px] YaleSolisW-Rg flex items-center"
        >
            <NuxtLink class="leading-none" :to="menu">
                {{ menu.text }}
            </NuxtLink>
            <span
                v-if="index < menus.length - 1"
                class="mx-3 font-light"
                ><font-awesome-icon class="text-[13px] leading-none" :icon="['fas', 'chevron-right']"
            /></span>
        </li>
    </ul>
</template>

<script setup lang="ts">
interface Props {
    menus: { text: string; name: string; params?: { [key: string]: any }; query?: { [key: string]: any } }[];
}

const props = withDefaults(defineProps<Props>(), {
    menus: [{ text: "首頁", name: "index" }],
});
const route = useRoute();
const router = useRouter();
</script>
