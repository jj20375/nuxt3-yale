<template>
    <div>
        <el-upload
            ref="upload"
            :list-type="'picture-card'"
            :on-change="handleChange"
            :auto-upload="false"
            drag
            action=""
            :limit="5"
            :on-exceed="imageOverLimit"
        >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
                <div>
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                    />
                    <span class="el-upload-list__item-actions">
                        <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                        >
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <!-- <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                        >
                            <el-icon><Download /></el-icon>
                        </span> -->
                        <span
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                        >
                            <el-icon><Delete /></el-icon>
                        </span>
                    </span>
                </div>
            </template>
        </el-upload>
        <p class="text-gray-700 text-[14px] mt-[4px]">(僅限JPEG、PNG，且不得超過10mb)</p>
        <el-dialog v-model="showDialog">
            <img
                w-full
                :src="dialogImageUrl"
                alt="Preview Image"
            />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { UploadProps, UploadFile } from "element-plus";
const { $utils } = useNuxtApp();

const fileList = ref<any>(null);
// 預覽彈窗圖
const dialogImageUrl = ref("");
// 顯示預覽彈窗
const showDialog = ref(false);
/**
 * 圖片變更
 * @param file
 * @param fcFileList
 */
function handleChange(file: any, fcFileList: any) {
    console.log("fcFileList =>", file, fcFileList);
    fileList.value = fcFileList;
    if (file.size > 10 * 1024 * 1024) {
        ElMessage({
            type: "error",
            message: `圖片尺寸不得超過 10MB`,
        });
        return;
    }
    // 判斷是否符合圖片類型
    if (!$utils().isImageType(file.raw.type)) {
        ElMessage({
            type: "error",
            message: "不符合圖片類型(jpg,jpeg,png,gif)",
        });
        return;
    }
}

const handleRemove: UploadProps["onRemove"] = (removeFile) => {
    console.log(removeFile);
    const index = fileList.value.findIndex((item) => item.uid === removeFile.uid);
    if (index !== -1) {
        fileList.value.splice(index, 1);
    }
};

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!;
    showDialog.value = true;
};

/**
 * 上傳圖片超過限制數量
 * @param files
 * @param fileList
 */
function imageOverLimit(files: any, fileList: any) {
    ElMessage({
        type: "error",
        message: "超過上傳圖片上限",
    });
}
</script>

<style lang="scss" scoped>
:deep .el-upload-dragger {
    @apply h-full flex items-center justify-center #{!important};
}
// :deep .el-upload-dragger {
//     @apply flex items-center justify-center border-none;
// }
// :deep .el-upload-list {
//     @apply sr-only;
// }
// :deep .el-upload-dragger {
//     @apply h-auto w-full;
// }
// :deep .el-upload {
//     @apply w-auto;
// }
// :deep .el-dialog {
//     @screen sm {
//         @apply w-[500px];
//     }
//     @apply w-auto;
// }
</style>
