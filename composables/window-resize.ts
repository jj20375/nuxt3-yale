export function useWindowResize() {
    const nowWindowSize = ref({
        width: 0,
        height: 0,
    });
    const isMobile = ref(false);
    const isPad = ref(false);
    const isDesktop = ref(false);
    const isLargeDesktop = ref(false);

    // 監控目前視窗大小
    function handleResize() {
        nowWindowSize.value.width = window.innerWidth;
        nowWindowSize.value.height = window.innerHeight;
        if (nowWindowSize.value.width < 767) {
            isMobile.value = true;
            isDesktop.value = false;
            isPad.value = false;
            isLargeDesktop.value = false;
        }
        else if (nowWindowSize.value.width >= 767 && nowWindowSize.value.width < 1280) {
            isPad.value = true;
            isDesktop.value = false;
            isMobile.value = false;
            isLargeDesktop.value = false;
        }
        else if (nowWindowSize.value.width >= 1280 && nowWindowSize.value.width < 1600) {
            isDesktop.value = true;
            isMobile.value = false;
            isPad.value = false;
            isLargeDesktop.value = false;
        }
        else {
            isLargeDesktop.value = true;
            isMobile.value = false;
            isPad.value = false;
            isDesktop.value = false;
        }
        console.log("nowWindowSize => ", nowWindowSize.value);
    }

    onMounted(() => {
        if (process.client) {
            window.addEventListener("resize", handleResize);

            console.log("isMobile => ", !isMobile.value);
            handleResize();
        }
    });
    onUnmounted(() => {
        if (process.client) {
            window.removeEventListener("resize", handleResize);
        }
    });
    return {
        isMobile,
        isPad,
        isDesktop,
        isLargeDesktop
    };
}
