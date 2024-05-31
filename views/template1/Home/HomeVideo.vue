<template>
    <div class="videoDiv w-full relative">
        <video class="videoSection w-full" :src=props.videoUrl playsinline autoplay muted></video>
        <div class="videoFlow absolute">
            <div class="relative h-full">
                <div @click="goAnchor" class="anchorArrow">
                    <IconArrowDown/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import IconArrowDown from "~/assets/img/icons/arrow-line-down.svg";
export interface Props {
    videoUrl?: any
}

const props = withDefaults(defineProps<Props>(), {
    videoUrl: {
        type: String,
        required: true,
        default: "/video/homeVideo.mp4"
    }
})
const emits = defineEmits(["goAnchor"]);
onMounted(() => {
    nextTick(async () => {
        if (process.client) {
            setTimeout(() => {
                const videoDivEl = document.querySelector('.videoDiv');
                const videoSectionEl = document.querySelector('.videoSection');
                const videoFlow = document.querySelector('.videoFlow');
                console.log(videoSectionEl, videoSectionEl.offsetHeight)
                const videoHeight = videoSectionEl.offsetHeight
                videoDivEl.style.height = videoHeight + 'px'
                videoFlow.style.height = videoHeight + 'px'
            }, 1000);
        }
    });
})
const goAnchor = () => {
    emits("goAnchor");
}

</script>
<style lang="scss" scoped>
.videoFlow {
    top: 0;
    width: 100%;
}
.anchorArrow {
    display: inline-block;
    position: sticky;
    top: 80%;
    left: 100%;
    z-index: 1000;
    cursor: pointer;
    :hover {
        background-color: #00000059;
        border-radius: 5rem;
        border-width: 0;
        cursor: pointer;
    }
    svg {
        align-items: center;
        flex-shrink: 0;
        font-size: 0;
        height: 5.8rem;
        justify-content: center;
        overflow: hidden;
        padding: 1rem 2rem;
        position: relative;
        width: 5.8rem;
        border-radius: 6rem;
        border-width: 0;
        background-color: #0000000d;
        color: #fff
    }
}
</style>
