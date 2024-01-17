<template>
    <section class="mt-[80px] container">
        <h2 class="text-[32px] text-gray-800 font-medium YaleSolisW-Bd mb-[20px]">Yale Home 設定教學影片</h2>

        <div class="flex items-center">
            <div class="relative flex-1 mr-[14px]">
                <video
                    class="w-full"
                    ref="player1RefDom"
                    src="/video/yale-home-app-demo.mp4"
                    @canplay="updatePaused"
                    @playing="updatePaused"
                    @pause="updatePaused"
                />

                <div
                    v-if="player1RefDom"
                    class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full"
                >
                    <div class="text-[80px] text-white">
                        <!-- {{ player1RefDom }} -->
                        <button
                            v-if="paused"
                            @click.prevent="play"
                        >
                            <font-awesome-icon :icon="['far', 'circle-play']" />
                        </button>
                        <button
                            v-else
                            @click="pause"
                        >
                            <font-awesome-icon :icon="['far', 'circle-pause']" />
                        </button>
                    </div>
                </div>
                <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            </div>
            <div class="relative flex-1">
                <video
                    class="w-full"
                    ref="player2RefDom"
                    src="/video/yale-home-app-demo.mp4"
                    @canplay="updatePaused2"
                    @playing="updatePaused2"
                    @pause="updatePaused2"
                />
                <div
                    v-if="player2RefDom"
                    class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full"
                >
                    <div class="text-[80px] text-white">
                        <!-- {{ player1RefDom }} -->
                        <button
                            v-if="paused2"
                            @click.prevent="play2"
                        >
                            <font-awesome-icon :icon="['far', 'circle-play']" />
                        </button>
                        <button
                            v-else
                            @click="pause2"
                        >
                            <font-awesome-icon :icon="['far', 'circle-pause']" />
                        </button>
                    </div>
                </div>
                <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            </div>
        </div>
        <div class="border-b pt-[40px] border-gray-300 w-full h-[1px]"></div>
    </section>
</template>

<script setup lang="ts">
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";

const player1RefDom = ref(null);
const player2RefDom = ref(null);

// 判斷是否暫停
const paused = ref(true);
// 判斷是否暫停
const paused2 = ref(true);

function play() {
    if (player1RefDom.value) {
        player1RefDom.value.play();
    }
}

function pause() {
    if (player1RefDom.value) {
        if (player1RefDom.value.playing) {
        }
        player1RefDom.value.pause();
    }
}
function play2() {
    if (player2RefDom.value) {
        player2RefDom.value.play();
    }
}

function pause2() {
    if (player2RefDom.value) {
        if (player2RefDom.value.playing) {
        }
        player2RefDom.value.pause();
    }
}

function updatePaused(event) {
    console.log(".target => ", event.target.paused);
    paused.value = event.target.paused;
}
function updatePaused2(event) {
    console.log(".target => ", event.target.paused);
    paused2.value = event.target.paused;
}
</script>
