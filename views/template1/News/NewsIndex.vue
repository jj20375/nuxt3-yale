<template>
    <div class="p-10">
        客製化網址{{ route.params.slug }}
        <div>搜尋參數 id:{{ route.query.id }}</div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
