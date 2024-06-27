<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCRL5WXL"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
