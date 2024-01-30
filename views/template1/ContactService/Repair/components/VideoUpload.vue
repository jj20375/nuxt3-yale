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
    <p class="text-gray-700 text-[14px] mt-[4px]">(僅限MP4、AVI、MOV、WMV)</p>
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
const { $api, $utils } = useNuxtApp();

const emit = defineEmits(["tempPath"]);
const props = defineProps({
    // 顯示彈窗
    prop: {
        type: String,
        default: "",
    },
});

const fileList = ref<any>(null);
const fileDataList = ref<any>([]);
const videoFlag = ref<any>(false);
const videoUploadPercent = ref<any>(0);
const showVideoPath = ref<any>('');
/**
 * 圖片變更
 * @param file
 * @param fcFileList
 */
async function handleChange(file: any, fcFileList: any) {
    console.log("fcFileList =>", file, fcFileList);
    fileList.value = fcFileList;
    // 判斷是否符合圖片類型
    if (!$utils().isVideoType(file.raw.type)) {
        ElMessage({
            type: "error",
            message: "不符合影片類型(mp4,avi,mov,wmv)",
        });
        return;
    }
    const formData = new FormData();
    formData.append("file", file.raw);
    formData.append("scene", "work-order");
    try {
        const { data } = await $api().UploadAPI(formData);
        console.log("UploadAPI api => ", data.value);
        const file = (data.value as any).data;
        fileDataList.value.push(file.path);
        fileList.value[fileList.value.length - 1].url = file.preview_url;
        emit("tempPath", fileDataList.value, props.prop);
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}
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
:deep .el-upload.is-drag{
  @apply border-none;
}

:deep .el-upload-dragger {
  @apply h-full border-gray-300 rounded-none flex items-center justify-center #{!important};
  &:hover{
    @apply border-yellow-600 #{!important};
  }
}

:deep .el-upload-list__item {
  @apply rounded-none border-gray-300;
  > *{
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