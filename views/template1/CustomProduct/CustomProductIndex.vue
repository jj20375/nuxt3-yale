<template>
    <section class="mt-[94px] flex">
        <CustomProductPrewView />
        <div>
            <CustomProductBackground v-model:currentTab="currentBackground" />
            <CustomProductDoor
                class="mt-[20px]"
                v-model:currentDoor="currentDoor"
                :doors="doors"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
// 預覽圖片
import CustomProductPrewView from "~/views/template1/CustomProduct/components/CustomProductPrewView.vue";
// 選擇場景
import CustomProductBackground from "~/views/template1/CustomProduct/components/CustomProductBackground.vue";
// 選擇門扇
import CustomProductDoor from "~/views/template1/CustomProduct/components/CustomProductDoor.vue";

// 預設選擇場景
const currentBackground = ref("id1");
// 預設選擇門扇
const currentDoor = ref("id1");

const doors = ref([]);

for (let i = 1; i < 6; i++) {
    doors.value.push({
        imgSrc: "/img/custom-product/demo/custom-product-door-demo-1.jpg",
        name: "品牌/ASSA ABLOY",
        style: `YDM3109A-${i}`,
        title: `門扇款式-${i}`,
        price: 2000,
        id: `id${i}`,
    });
}
</script>
