<template>
    <section>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]">
            <div class="rounded-tr-[60px] md:rounded-tr-[90px] xl:rounded-tr-[120px] bg-white ml-auto w-full absolute top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]"></div>
        </div>
        <div class="container">
            <div class="flex flex-col md:flex-row items-center justify-between w-full mx-auto xl:w-5/6">
                <article class="order-3 md:order-1">
                    <p class="text-[16px] text-center YaleSolisW-Rg font-light mt-6 xl:mt-0">立即下載</p>
                    <div class="flex justify-center items-center gap-4 md:gap-5 mt-6 xl:mt-[41px]">
                        <qrcode-vue
                            :value="props.yale_home_app.ios_link"
                            :size="isMobile ? 33 : 44"
                            level="H"
                        />
                        <NuxtImg
                            @click="downloadApp(props.yale_home_app.ios_link)"
                            class="w-[122px] xl:w-[164px] cursor-pointer"
                            src="/img/home/app/app-store.png"
                        />
                    </div>
                    <div class="flex justify-center items-center gap-4 md:gap-5 mt-5 xl:mt-6">
                        <qrcode-vue
                            :value="props.yale_home_app.android_link"
                            :size="isMobile ? 33 : 44"
                            level="H"
                        />
                        <NuxtImg
                            @click="downloadApp(props.yale_home_app.android_link)"
                            class="w-[122px] xl:w-[164px] cursor-pointer"
                            src="/img/home/app/google-play.png"
                        />
                    </div>
                </article>
                <NuxtImg
                    class="order-2 mt-[30px] xl:mt-0 lg:ml-[40px] w-[180px] xl:w-[280px]"
                    src="/img/home/app/phone.png"
                />
                <article class="order-1 md:order-3">
                    <h2 class="text-center md:text-start text-gray-100 YaleSolisW-Bd text-[32px] md:text-[48px] xl:text-[66px] font-medium gradient-title">DOWNLOAD</h2>
                    <h3 class="text-center md:text-start font-medium leading-[50px] YaleSolisW-Bd text-[28px] md:text-[32px] xl:text-[44px]">{{ yale_home_app.title }}</h3>
                </article>
            </div>
        </div>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]">
            <div class="bg-white rounded-br-[60px] md:rounded-br-[90px] xl:rounded-br-[120px] ml-auto w-full absolute top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]"></div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";
const { isMobile } = useWindowResize();

interface Props {
    yale_home_app: {
        title: string;
        image: string;
        ios_link: string;
        android_link: string;
    };
}

const props = withDefaults(defineProps<Props>(), {
    yale_home_app: () => {
        return {
            title: "",
            image: "",
            ios_link: "",
            android_link: "",
        };
    },
});

const downloadApp = (link: string) => {
    window.open(link, "_blank");
};
</script>
