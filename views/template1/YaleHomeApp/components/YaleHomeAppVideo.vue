<template>
    <section class="mt-[80px] container">
        <h2 class="text-[32px] text-gray-800 font-medium YaleSolisW-Bd mb-[20px]">Yale Home 設定教學影片</h2>

        <div class="flex items-center">
            <div
                class="relative flex-1"
                :class="index === 0 ? 'mr-[14px]' : ''"
                v-for="(video, index) in videos"
                :key="index"
            >
                <NuxtImg
                    :src="video.posterUrl"
                    class="w-full h-[320px]"
                ></NuxtImg>
                <div
                    @click.prevent="openDialog(video.videoUrl)"
                    class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full cursor-pointer"
                >
                    <div class="text-[80px] text-white">
                        <button>
                            <font-awesome-icon :icon="['far', 'circle-play']" />
                        </button>
                    </div>
                </div>
                <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            </div>
        </div>
        <div class="border-b pt-[40px] border-gray-300 w-full h-[1px]"></div>
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
                    width="100%"
                    height="350"
                    :src="currentVideo.videoUrl"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
            </el-dialog>
        </ClientOnly>
    </section>
</template>

<script setup lang="ts">
const videos = ref([
    {
        posterUrl: "video/poster/poster-1.jpg",
        videoUrl: "https://www.youtube.com/embed/REaIV5ZClxQ?si=BNodONl1-bA4KrZy",
    },
    {
        posterUrl: "video/poster/poster-2.jpg",
        videoUrl: "https://www.youtube.com/embed/WtuEESHbGg0?si=y0zpw-r5RjsTtJmg",
    },
]);

const showDialog = ref(false);

// 當前播放影片
const currentVideo = ref<{ videoUrl: string }>({
    videoUrl: "",
});

/**
 * 打開彈窗
 * @param { type String (字串) } videoUrl 影片網址
 */
function openDialog(videoUrl: string) {
    showDialog.value = true;
    currentVideo.value = { videoUrl };
}

/**
 * 關閉彈窗
 */
function closeDialog() {
    showDialog.value = false;
    currentVideo.value = { videoUrl: "" };
}

// const player1RefDom = ref(null);
// const player2RefDom = ref(null);

// // 判斷是否暫停
// const paused = ref(true);
// // 判斷是否暫停
// const paused2 = ref(true);

// function play() {
//     if (player1RefDom.value) {
//         player1RefDom.value.play();
//     }
// }

// function pause() {
//     if (player1RefDom.value) {
//         if (player1RefDom.value.playing) {
//         }
//         player1RefDom.value.pause();
//     }
// }
// function play2() {
//     if (player2RefDom.value) {
//         player2RefDom.value.play();
//     }
// }

// function pause2() {
//     if (player2RefDom.value) {
//         if (player2RefDom.value.playing) {
//         }
//         player2RefDom.value.pause();
//     }
// }

// function updatePaused(event) {
//     console.log(".target => ", event.target.paused);
//     paused.value = event.target.paused;
// }
// function updatePaused2(event) {
//     console.log(".target => ", event.target.paused);
//     paused2.value = event.target.paused;
// }

// const youtubeRefDom = ref(null);

// function onReady() {
//     youtubeRefDom.value.playVideo();
// }
</script>

<style lang="scss" scoped>
:deep {
    .el-dialog__body {
        @apply mx-10;
    }
    .el-dialog {
        @apply rounded-[20px];
    }
}
</style>
