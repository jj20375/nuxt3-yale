<template>
    <div class="sm:flex justify-center mt-[40px]">
        <div class="flex justify-center mt-[60px]">
            <div>
                <Vue3Lottie
                    animationLink="/json/check.json"
                    :height="100"
                    :width="100"
                />
                <h1 class="font-bold text-[28px] text-center mt-5 mb-5">付款失敗</h1>
                <p class="text-center mb-[40px] text-gray-800 text-[16px]">
                    請您返回重新付款 <br />
                    假如您有任何疑問，請撥打服務專線 {{ contactPhone }}，感謝您的訂購。
                </p>
                <div class="flex justify-center mb-5">
                    <button
                        @click.prevent="goToPanel"
                        class="yellow-btn !px-16"
                    >
                        返回
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import { useInitializationStore } from "~/store/initializationStore";
const initializationStore = useInitializationStore();

const router = useRouter();
const route = useRoute();

const contactPhone = computed(() => initializationStore.initializationData.site.contact_phone);

function goToPanel() {
    router.push({ name: "auth-panel-slug", params: { slug: "會員中心" } });
}
</script>
