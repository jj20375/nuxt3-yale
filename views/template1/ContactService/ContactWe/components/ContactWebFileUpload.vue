<template>
    <div>
        <el-upload
            v-if="photoFile === null || photoImage !== null"
            ref="upload"
            :show-file-list="false"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            drag
            action=""
            :on-exceed="imageOverLimit"
        >
            <div class="relative flex items-center justify-center w-full h-full p-5">
                <div class="w-full flex items-center justify-center border-4 min-h-[228px] border-gray-300 border-dashed">
                    <!-- 呈現字串得上傳框 -->
                    <div
                        v-if="photoFile === null && photoImage === null"
                        class="YaleSolisW-Rg"
                    >
                        <NuxtImg
                            class="w-[40px] mx-auto"
                            src="/img/contact/photo-icon.svg"
                        />
                        <p class="text-[16px] text-gray-900 mt-[12px]">請點擊上傳照片</p>
                        <p class="text-gray-700 text-[14px] mt-[4px]">(僅限JPEG、PNG，且不得超過10mb)</p>
                    </div>
                    <div
                        v-if="photoImage !== null"
                        class="p-2"
                    >
                        <img
                            class="w-full rounded-lg"
                            :src="photoImage"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </el-upload>
        <!-- <div class="text-center text-gray-300 el-upload__tip">只能上傳jpg/png文件，且不超過5mb</div> -->
    </div>
</template>

<script setup lang="ts">
// element plus 框架
import { ElMessage } from "element-plus";
defineOptions({
    name: "ContactUpload",
});
defineExpose({
    onSubmit,
});

// 上傳圖片檔
const photoFile = ref(null);
// 上傳圖片 base64
const photoImage = ref<any>(null);
// 檔案列表
const fileList = ref([]);
const loading = ref(false);

/**
 * 圖片變更
 */
async function handleChange(file: any) {
    // 清空上傳檔案列表 以免造成檔案上傳上限超過數量限制
    fileList.value = [];
    if (file.size > 5 * 1024 * 1024) {
        ElMessage({
            type: "error",
            message: `圖片尺寸不得超過 5MB`,
        });
        return;
    }
    // 設定圖片為上傳檔案
    photoFile.value = file.raw;
    photoImage.value = await toBase64(photoFile.value);
    upLoadPhoto(photoFile.value);
}
/**
 * 將圖片轉為 base64
 * @param file
 */
function toBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
/**
 * 移除圖片
 */
function handleRemove() {
    photoFile.value = null;
}
/**
 * 上傳圖片超過限制數量
 * @param files
 * @param fileList
 */
function imageOverLimit(files: any, fileList: any) {
    console.log(fileList);
    ElMessage({
        type: "error",
        message: "超過上傳圖片上限",
    });
}
/**
 * 上傳圖片
 * @param { type Blob or File(Blob 或 檔案格式) } file
 */
async function upLoadPhoto(file: any) {
    loading.value = true;
    emit("update:imageFile", file);
}
/**
 * 表單發送
 */
function onSubmit() {
    // 判斷是否有上傳存摺照片
    if (photoImage.value === null) {
        ElMessage({
            type: "error",
            message: "尚未上傳存摺",
        });
        return false;
    }
    return true;
}
</script>

<style lang="scss" scoped>
:deep .el-upload-dragger {
    @apply bg-gray-50 rounded-none flex w-full items-center p-0 justify-center border-none;
}
:deep .el-upload-dragger {
    @apply h-auto w-full flex-grow overflow-visible;
}
:deep .el-upload {
    @apply w-full;
}
:deep .el-dialog {
    @screen sm {
        @apply w-[500px];
    }
    @apply w-auto;
}
</style>
