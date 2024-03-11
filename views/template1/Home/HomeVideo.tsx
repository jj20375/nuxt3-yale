export default defineComponent({
    props: {
        videoUrl: {
            type: String,
            required: true,
            default: "/video/homeVideo.mp4"
        }
    },
    emits: [],
    setup(props, {emit}) {
        return () => (
            <video class="w-full" src={props.videoUrl} preload="auto" autoplay muted loop></video>
        )
    }
})