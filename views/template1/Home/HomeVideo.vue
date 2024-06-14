<template>
    <div class="videoDiv w-full relative">
        <video class="videoSection w-full" :src=videoUrl playsinline autoplay muted></video>
        <div :class="[isLargePad ? 'videoFlowMobile' : '']" class="videoFlow absolute">
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
const { isDesktop, isMobile, isLargePad } = useWindowResize();
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

const videoUrl = computed(() => {
    let result = props.videoUrl.desktop
    if (isLargePad.value) {
        result = props.videoUrl.mobile
    }

    return result
})

</script>
<style lang="scss" scoped>
.videoFlow {
    top: 0;
    width: 100%;
}
.videoFlowMobile {
    .anchorArrow {
        height: 2.8rem;
        width: 2.8rem;
        padding: 0rem .75rem;
        top: 73%;
        left: 82%;
    }
}
.anchorArrow {
    display: inline-block;
    position: sticky;
    top: 80%;
    left: 95%;
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
        height: 48px;
        justify-content: center;
        overflow: hidden;
        padding: 12px;
        position: relative;
        width: 48px;
        border-radius: 6rem;
        border-width: 0;
        background-color: #0000000d;
        color: #fff
    }
}
</style>
