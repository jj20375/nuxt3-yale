<template>
    <div>
        <h1 class="text-[28px] font-medium YaleSolisW-Bd mb-[16px]">訂製您的專屬門扇</h1>
        <p class="text-gray-500 text-[14px]">打造獨一無二的門扇體驗，耶魯電子鎖提供多樣門扇、智能門鎖選擇<br />，隨您心意搭配，為不同需求場景訂製獨特風格。</p>
        <div
            class="mt-[20px] flex cursor-pointer"
            @click="handleProcess"
        >
            <NuxtImg
                class="w-[16px] mr-[9px]"
                src="/img/custom-product/custom-product-learn-more-icon.svg"
            />
            <p class="text-gray-800 text-[15px]">了解訂製流程</p>
        </div>
        <ClientOnly>
            <el-dialog
                class="custom-dialog h-[600px]"
                close-on-click-modal
                lock-scroll
                show-close
                :width="600"
                center
                align-center
                append-to-body
                v-model="dialogProcess"
            >
                <h3 class="text-[24px] font-bold text-gray-800 mb-[30px]">{{ processData.title }}</h3>
                <div
                    class="text-gray-800 edit-section"
                    v-html="processData.content"
                ></div>
            </el-dialog>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
// 電子鎖安裝照片彈窗
const dialogProcess = ref(false);

const handleProcess = () => {
    dialogProcess.value = true;
};

// 電子鎖彈窗資料
const processData = {
    title: "訂製門扇流程",
    content: "<img src='/img/custom-product/custom-process.jpg'/>",
};
</script>
