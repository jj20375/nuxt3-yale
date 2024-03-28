<template>
    <div id="myPagination">
        <el-pagination
            v-model:current-page="pagination.page"
            :page-size="pagination.pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            :background="true"
            :total="pagination.total"
            @update:current-page="handlePageChange"
        />
    </div>
</template>

<script setup lang="ts">
interface Props {
    pagination: { page: number; total: number; pageSize: number };
}
const props = withDefaults(defineProps<Props>(), {
    pagination: { page: 1, pageSize: 10, total: 0 },
});

const emit = defineEmits(["handlePageChange"]);

const handlePageChange = (value: any) => {
    emit("handlePageChange", value);
};
</script>

<style lang="scss" scoped>
:deep(.el-pager li.is-active) {
    @apply text-white border-none rounded-full bg-black #{!important};
}
:deep(.el-pager li) {
    @apply bg-opacity-0 bg-[rgba(255,255,255,0)] text-gray-400 text-[15px] mx-[20px] #{!important};
}
:deep(.el-pagination.is-background .btn-prev){
    @apply bg-[rgba(255,255,255,0)] mr-[40px] #{!important};
    .el-icon {
        @apply text-[32px]  #{!important};
    }
}
:deep(.el-pagination.is-background .btn-next){
    @apply bg-[rgba(255,255,255,0)] ml-[40px] #{!important};
    .el-icon {
        @apply text-[32px]  #{!important};
    }
}
</style>
