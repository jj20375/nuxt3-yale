export default defineComponent({
    props: {},
    emits: [],
    setup(props, {emit}) {
        return () => (
            <video class="w-full" src="/video/homeVideo.mp4" preload="auto" autoplay muted loop></video>
        )
    }
})