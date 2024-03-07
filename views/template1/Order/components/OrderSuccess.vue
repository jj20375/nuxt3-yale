<template>
    <div class="sm:flex justify-center mt-[40px]">
        <div class="flex justify-center mt-[60px]">
            <div>
                <Vue3Lottie
                    animationLink="/json/check.json"
                    :height="100"
                    :width="100"
                />
                <h1 class="font-bold text-[28px] text-center mt-5 mb-5">訂單建立成功</h1>
                <p class="text-center mb-[40px] text-gray-800 text-[16px]">
                    您的訂單已經成功送出，我們會在第一時間進行處理！ <br />
                    請至會員中心-我的訂單查詢，或於結帳時所填之 Email 信箱檢視郵件以追蹤訂單狀態。<br />
                    假如您有任何疑問，請撥打服務專線 {{ contactPhone }}，感謝您的訂購。
                </p>
                <div class="flex justify-center mb-5">
                    <button
                        @click.prevent="goToOrderList"
                        class="yellow-btn !px-16"
                    >
                        查看訂單狀態
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

function goToOrderList() {
    if (route.params[0] === "normal") {
        router.push({ name: "auth-order-slug", params: { slug: "一般商品-訂單記錄" } });
    } else {
        router.push({ name: "auth-door-slug", params: { slug: "訂製門扇-訂單記錄" } });
    }
}
</script>
