<template>
    <table class="custom-table">
        <thead>
        <tr>
            <th v-for="item in tableHeadData" :key="item.index">{{ item }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableBodyData" :key="item.index"
            class="cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:transition-all hover:duration-300">
            <td>
                <NuxtLink :to="item.url">
                    <div class="title">{{ item.number }}</div>
                </NuxtLink>
            </td>
            <td>
                <NuxtLink :to="item.url">
                    {{ item.date }}
                </NuxtLink>
            </td>
            <td>
                <NuxtLink :to="item.url">
                {{ item.quantity }}
                </NuxtLink>
            </td>
            <td>
                <NuxtLink :to="item.url">
                NT$ {{ $utils().formatCurrency(item.price) }}
                </NuxtLink>
            </td>
            <td>
                <NuxtLink :to="item.url" :class="getStatusClass(item.status)">
                {{ item.status }}
                </NuxtLink>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">

const { $utils } = useNuxtApp();

interface Props {
    tableHeadData: any[];
    tableBodyData: {
        number: string;
        date: string;
        quantity: string;
        price: number;
        status: string;
        url: {
            name: string;
            params?: { [key: string]: any };
            query?: { [key: string]: any }
        }
    }[];
};

const props = withDefaults(defineProps<Props>(), {
    tableHeadData: (props) => [],
    tableBodyData: [
        {
            number: "",
            date: "",
            quantity: "",
            price: 0,
            status: "",
            url: {
                name: "",
                params: {},
                query: {}
            }
        }
    ]
});

// 計算文字顏色
const getStatusClass = (status) => {
    if (status === '未付款' || status === '待付訂金' || status === '待付尾款') {
        return '!text-pink-900';
    } else if (status === '處理中' || status === '派工確認完成' || status === '施工確認完成') {
        return '!text-blue-500';
    } else if (status === '已取消') {
        return '!text-orange-500';
    } else {
        return '';
    }
};
</script>