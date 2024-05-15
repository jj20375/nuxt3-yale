<template>
    <div>
        <h1 class="text-[24px] xl:text-[28px] font-medium YaleSolisW-Bd mb-[16px]">訂製您的專屬門扇</h1>
        <p class="text-gray-500 text-[16px] xl:text-[14px]">打造獨一無二的門扇體驗，耶魯電子鎖提供多樣門扇、智能門鎖選擇，隨您心意搭配，為不同需求用途訂製獨特風格。</p>
        <div class="mt-[20px] flex">
            <div
                class="flex cursor-pointer group"
                @click="handleProcess"
            >
                <NuxtImg
                    class="w-[16px] mr-[9px]"
                    src="/img/custom-product/custom-product-learn-more-icon.svg"
                />
                <p class="text-gray-800 text-[15px] underline underline-offset-2 group-hover:no-underline">訂製流程圖及時程表</p>
            </div>
        </div>
        <ClientOnly>
            <el-dialog
                class="custom-dialog" :class="isLargePad ? '' : 'h-[95%]'"
                close-on-click-modal
                lock-scroll
                show-close
                :width="isLargePad ? '100%' : 1200"
                center
                align-center
                append-to-body
                v-model="dialogProcess"
            >
                <h3 class="text-[24px] font-bold text-gray-800 mb-[30px]">{{ isLargePad ? processData.app.title : processData.web.title }}</h3>
                <div
                    class="text-gray-800 edit-section"
                    v-html="isLargePad ? processData.app.content : processData.web.content"
                ></div>
            </el-dialog>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
// 電子鎖安裝照片彈窗
const dialogProcess = ref(false);

const handleProcess = () => {
    dialogProcess.value = true;
};

// 電子鎖彈窗資料
const processData = ref({
    app: {
        title: "",
        content: "",
    },
    web: {
        title: "",
        content: "",
    }
});

async function getPageData() {
    try {
        const params = { code: "custom_process_and_schedule" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        processData.value.app.title = pageData.app.title
        processData.value.app.content = pageData.app.content
        processData.value.web.title = pageData.web.title
        processData.value.web.content = pageData.web.content
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}
getPageData()

const { isLargePad } = useWindowResize();
</script>
