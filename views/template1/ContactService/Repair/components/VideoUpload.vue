<template>
    <div>
        <el-upload
            ref="upload"
            :list-type="'picture-card'"
            :on-change="handleChange"
            :auto-upload="false"
            drag
            multiple
            action=""
            :limit="5"
            accept=".mp4, .avi, .wmv, .mov"
            :on-exceed="imageOverLimit"
        >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
                <div>
                    <iframe
                        class="w-full h-full aspect-video"
                        :src="file.url"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                        sandbox=""
                    ></iframe>
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
        <p class="text-gray-700 text-[14px] mt-[4px]">(僅限MP4、AVI、MOV、WMV)</p>
        <ClientOnly>
            <el-dialog
                class="custom-dialog"
                close-on-click-modal
                lock-scroll
                show-close
                :width="800"
                center
                align-center
                append-to-body
                v-model="showDialog"
                :before-close="closeDialog"
            >
                <iframe
                    class="w-full aspect-video"
                    :src="dialogImageUrl"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
            </el-dialog>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, ElLoading } from "element-plus";
import type { UploadProps, UploadFile } from "element-plus";
const { $api, $utils } = useNuxtApp();

const emit = defineEmits(["tempPath"]);
const props = defineProps({
    // 顯示彈窗
    prop: {
        type: String,
        default: "",
    },
    scene: {
        type: String,
        default: "work-order",
    },
});

const fileList = ref<any>(null);
const fileDataList = ref<any>([]);
// 預覽彈窗圖
const dialogImageUrl = ref("");
// 顯示預覽彈窗
const showDialog = ref(false);
/**
 * 圖片變更
 * @param file
 * @param fcFileList
 */
async function handleChange(file: any, fcFileList: any) {
    console.log("fcFileList =>", file, fcFileList);
    const loading = ElLoading.service({
        lock: true,
        text: "影片上傳中",
        background: "rgba(0, 0, 0, 0.7)",
    });
    fileList.value = fcFileList;
    if (file.size > 50 * 1024 * 1024) {
        ElMessage({
            type: "error",
            message: `影片尺寸不得超過 50MB`,
        });
        fileList.value.pop();
        return;
    }
    // 判斷是否符合圖片類型
    if (!$utils().isVideoType(file.raw.type)) {
        ElMessage({
            type: "error",
            message: "不符合影片類型(mp4,avi,mov,wmv)",
        });
        fileList.value.pop();
        loading.close();
        return;
    }
    const formData = new FormData();
    formData.append("file", file.raw);
    formData.append("scene", props.scene);
    try {
        const { data, status, error } = await $api().UploadAPI(formData);
        console.log("UploadAPI api => ", data.value);
        if (status.value === "success") {
            const file = (data.value as any).data;
            fileDataList.value.push(file.path);
            fileList.value[fileList.value.length - 1].url = file.preview_url;
            emit("tempPath", fileDataList.value, props.prop);
        } else {
            ElMessage({
                type: "error",
                message: (error.value as any).data.message,
            });
            fileList.value.pop();
        }
        loading.close();
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
        loading.close();
    }
}

const handleRemove: UploadProps["onRemove"] = (removeFile) => {
    console.log(removeFile);
    const index = fileList.value.findIndex((item: { uid: number }) => item.uid === removeFile.uid);
    if (index !== -1) {
        fileList.value.splice(index, 1);
        fileDataList.value.splice(index, 1);
    }
    emit("tempPath", fileDataList.value, props.prop);
};

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!;
    showDialog.value = true;
};

const closeDialog = () => {
    dialogImageUrl.value = "";
    showDialog.value = false;
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
:deep .el-upload.is-drag {
    @apply border-none;
}

:deep .el-upload-dragger {
    @apply h-full border-gray-300 rounded-none flex items-center justify-center #{!important};
    &:hover {
        @apply border-yellow-600 #{!important};
    }
}

:deep .el-upload-list__item {
    @apply rounded-none border-gray-300;
    > * {
        @apply w-full;
    }
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
