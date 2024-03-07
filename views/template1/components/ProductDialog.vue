<template>
    <el-dialog
        class="custom-dialog h-[600px]"
        close-on-click-modal
        lock-scroll
        show-close
        center
        :width="600"
        align-center
        append-to-body
    >
        <h3 class="text-gray-800 font-bold text-[24px] mb-4">商品詳情</h3>
        <div class="flex flex-col gap-4">
            <div v-for="(item, index) in dialogData" :key="item.index">
                <template v-if="item.type === 'list'">
                    <div class="block border-b-[1px] border-gray-200 text-[18px] font-bold text-gray-800 py-2">{{ item.title }}</div>
                    <ul class="list-disc pl-5 mt-2">
                        <li class="py-1.5 font-bold" v-for="(list, listIndex) in item.data" :key="listIndex">
                            <div class="flex gap-4">
                                <div class="text-gray-800">{{ list.label }}</div>
                                <div class="text-gray-800">NT${{ $utils().formatCurrency(list.value) }}</div>
                            </div>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <div class="product-card p-5 border-gray-200 border-[1px] rounded-[8px]">
                        <div class="text-[18px] font-bold text-gray-800 mb-4">{{ item.title }}</div>
                        <div class="flex flex-col sm:flex-row gap-5">
                            <div class="flex-1 order-2 sm:order-1">
                                <div class="grid gap-2 text-gray-700">
                                    <template v-for="(column, columnIndex) in item.data" :key="columnIndex">
                                        <div class="text-gray-800">{{ column.label }}</div>
                                        <div class="text-gray-800">{{ column.value }}</div>
                                    </template>
                                </div>
                            </div>
                            <NuxtImg
                                class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                                :src="item.imgUrl"
                            />
                        </div>
                    </div>

                </template>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
const { $utils } = useNuxtApp();

interface Props {
    dialogData: {
        title: string;
        imgUrl: string;
        data: any;
        type: string;
    };
};

const props = withDefaults(defineProps<Props>(), {
    dialogData: {
        title: "",
        imgUrl: "",
        data: "",
        type: ""
    }
});
</script>

<style lang="scss" scoped>
.product-card {
    .grid {
        grid-template-columns: 100px 1fr;
    }
}

</style>