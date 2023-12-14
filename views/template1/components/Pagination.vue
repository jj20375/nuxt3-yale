<template>
    <div id="myPagination">
        <el-pagination
            :page-size="20"
            :pager-count="5"
            layout="prev, pager, next"
            :background="true"
            :total="1000"
        />
    </div>
</template>

<style lang="scss" scoped>
:deep {
    .el-pager li.is-active {
        @apply text-white border-none rounded-full bg-black #{!important};
    }
    .el-pager li {
        @apply bg-opacity-0 bg-[rgba(255,255,255,0)] text-gray-400 text-[15px] mx-[20px] #{!important};
    }
}
:deep .el-pagination.is-background .btn-prev {
    @apply bg-[rgba(255,255,255,0)] mr-[40px] #{!important};
    .el-icon {
        @apply text-[32px]  #{!important};
    }
}
:deep .el-pagination.is-background .btn-next {
    @apply bg-[rgba(255,255,255,0)] ml-[40px] #{!important};
    .el-icon {
        @apply text-[32px]  #{!important};
    }
}
</style>
