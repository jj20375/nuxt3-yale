<template>
    <section class="mt-[94px] flex">
        <CustomProductPrewView v-model:currentAngle="currentAngle" />
        <div class="mx-[55px] min-w-[430px]">
            <CustomProductBackground v-model:currentTab="currentBackground" />
            <CustomProductDoor
                class="mt-[20px]"
                v-model:currentDoor="currentDoor"
                :doors="doorColors[0].doors"
            />
            <CustomProductColor
                class="mt-[20px]"
                v-model:currentColor="currentDoorColor"
                :colors="doorColors"
            />
            <CustomProductDoor
                class="mt-[20px]"
                v-model:currentDoor="currentDoorOut"
                :doors="doorOutColors[0].doors"
            />
            <CustomProductColor
                class="mt-[20px]"
                v-model:currentColor="currentDoorOutColor"
                :colors="doorOutColors"
            />
            <div>
                <h3 class="text-gray-800 text-[20px] font-medium YaleSolisW-Bd">03 選擇門鎖</h3>
                <CustomProductLock
                    v-model:lockCategory="lockCategory"
                    v-model:currentLock="currentLock"
                    :locks="locks"
                />
            </div>
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
// 選擇顏色
import CustomProductColor from "~/views/template1/CustomProduct/components/CustomProductColor.vue";
// 選擇門鎖
import CustomProductLock from "~/views/template1/CustomProduct/components/CustomProductLock.vue";
// 預設選擇場景
const currentBackground = ref("id1");
// 預設選擇門扇
const currentDoor = ref("id1");
// 預設選擇門扇
const currentDoorColor = ref("id1");
// 預設選擇門框
const currentDoorOut = ref("id1");
// 預設選擇門框顏色
const currentDoorOutColor = ref("id1");
// 預設選擇門的角度
const currentAngle = ref("front");
// 預設選擇鎖種類 default = 水平把手; smartLock = 智慧電子鎖
const lockCategory = ref("default");
// 預設選擇鎖樣式
const currentLock = ref({
    imgSrc: "/img/custom-product/demo/custom-product-door-demo-1.jpg",
    id: "id1",
    style: "door R51 02 light",
    price: 20000,
});
// 門扇資料
const doors = ref([]);
// 門扇假資料
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
// 門扇顏色
const doorColors = ref([
    {
        id: "id1",
        text: "琥珀",
        imgSrc: "/img/product/demo/color-1.png",
        doors: doors.value,
    },
    {
        id: "id2",
        text: "白色",
        imgSrc: "/img/product/demo/color-2.png",
        doors: doors.value,
    },
    {
        id: "id3",
        text: "黑色",
        imgSrc: "/img/product/demo/color-3.png",
        doors: doors.value,
    },
]);
// 門框資料
const doorsOut = ref([]);
// 門框假資料
for (let i = 1; i < 6; i++) {
    doorsOut.value.push({
        imgSrc: "/img/custom-product/demo/custom-product-door-out-demo-1.jpg",
        name: "品牌/ASSA ABLOY",
        style: `YDM3109A-${i}`,
        title: `門扇款式-${i}`,
        price: 2000,
        id: `id${i}`,
    });
}
// 門扇顏色
const doorOutColors = ref([
    {
        id: "id1",
        text: "琥珀",
        imgSrc: "/img/product/demo/color-1.png",
        doors: doorsOut.value,
    },
    {
        id: "id2",
        text: "白色",
        imgSrc: "/img/product/demo/color-2.png",
        doors: doorsOut.value,
    },
    {
        id: "id3",
        text: "黑色",
        imgSrc: "/img/product/demo/color-3.png",
        doors: doorsOut.value,
    },
]);

// 鎖的種類
const locks = ref({
    default: [],
    smartLock: [],
});

for (let i = 1; i < 20; i++) {
    locks.value.default.push({
        imgSrc: "/img/custom-product/demo/custom-product-lock-demo-1.jpg",
        style: `default lock-${i}`,
        price: 1000 + i,
        id: `id${i}`,
    });
    locks.value.smartLock.push({
        imgSrc: "/img/custom-product/demo/custom-product-lock-demo-1.jpg",
        style: `smart lock-${i}`,
        price: 2000 + i,
        id: `id${i}`,
    });
}
</script>
