<template>
    <div class="min-h-screen">
        <TopBanner />
        <HomeVideo />
        <HomeCustomProduct />
        <HomeSample />
        <HomeProduct />
        <HomeApp />
        <HomeService />
        <StoreCarousel />
    </div>
</template>

<script setup lang="ts">
import TopBanner from "~/views/template1/Home/HomeTopBanner.vue";
import StoreCarousel from "~/views/template1/Home/HomeStoreCarousel.vue";
import HomeVideo from "~/views/template1/Home/HomeVideo.tsx";
import HomeCustomProduct from "~/views/template1/Home/HomeCustomProduct.vue";
import HomeSample from "~/views/template1/Home/HomeSample.vue";
import HomeProduct from "~/views/template1/Home/HomeProduct.vue";
import HomeApp from "~/views/template1/Home/HomeApp.vue";
import HomeService from "~/views/template1/Home/HomeService.vue";
</script>
