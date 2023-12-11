<template>
    <ul class="flex">
        <li
            v-for="(menu, index) in menus"
            :key="menu.name"
            class="text-gray-800 text-[12px] YaleSolisW-Rg"
        >
            <NuxtLink :to="menu">
                {{ menu.text }}
            </NuxtLink>
            <span
                v-if="index < menus.length - 1"
                class="mx-2 font-light"
                ><font-awesome-icon :icon="['fas', 'chevron-right']"
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
