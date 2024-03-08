<template>
    <div class="mt-[30px] sm:mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full YaleSolisW-Bd font-medium mb-[30px]">預約丈量時間</h5>
        <el-form
            ref="formRefDom"
            :model="formData"
            :rules="rules"
            class="custom-form"
        >
            <el-form-item prop="measureSizeTime">
                <div class="flex flex-col md:grid grid-cols-2 gap-[30px] w-full">
                    <div>
                        <label class="block w-full text-gray-800 text-[15px]">選擇丈量時間<span class="ml-1 text-red-500">*</span></label>
                        <el-config-provider :locale="locale">
                            <el-date-picker
                                class="w-full"
                                type="date"
                                valueFormat="YYYY-MM-DD"
                                placeholder="請選擇日期"
                                @panel-change="handleChangeYearOrMonth"
                                :disabled-date="disabledDate"
                                v-model="formData.measureSizeTime"
                            >
                            </el-date-picker>
                        </el-config-provider>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import zhTw from "element-plus/dist/locale/zh-tw.mjs";
import en from "element-plus/dist/locale/en.mjs";
import moment from "moment";
import { FormInstance } from "element-plus";
const { $api } = useNuxtApp();
const route = useRoute();
const emit = defineEmits(["update:form"]);

const language = ref("zh-tw");

const locale = computed(() => (language.value === "zh-tw" ? zhTw : en));
const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                // 預約丈量時間
                measureSizeTime: "2024-01-01",
            };
        },
    },
});

const formData = ref(props.form);

const rules = ref<any>({
    measureSizeTime: [
        {
            required: true,
            message: "請選擇丈量時間",
            trigger: ["change", "blur"],
        },
    ],
});

// 可預訂丈量時間
const availableDates = ref<string[]>([]);

/**
 * 取得可丈量時間 api
 * @param param0
 */
async function getMeasuring({ startDate, endDate }: { startDate: string; endDate: string }) {
    try {
        const { data, error }: any = await $api().GetMeasuringTimeAPI({ start_date: startDate, end_date: endDate });
        if (error.value) {
            console.log("getMeasuring error =>", error.value);
            return;
        }
        availableDates.value = data.value.data.filter((item: any) => item.is_available === true).map((item: any) => moment(item.date).format("YYYY-MM-DD"));
    } catch (err) {
        console.log("getMeasuring func =>", err);
    }
}

/**
 * 不可選擇的日期
 * @param time
 */
function disabledDate(time: any) {
    return !availableDates.value.includes(moment(time).format("YYYY-MM-DD"));
}

/**
 * 更換月份或年份時觸發
 * @param date
 */
async function handleChangeYearOrMonth(date: Date) {
    await getMeasuring({ startDate: moment(date).startOf("month").format("YYYY-MM-DD"), endDate: moment(date).endOf("month").format("YYYY-MM-DD") });
}

watch(formData.value, (val) => {
    emit("update:form", val);
});

const formRefDom = ref<FormInstance>();

const validForm = async () => {
    if (!formRefDom.value) return false;
    const result = await formRefDom.value.validate((valid) => {
        console.log("formRefDom.value =>", valid);
        if (valid) {
            return true;
        } else {
            return false;
        }
    });
    return result;
};

defineExpose({
    validForm,
});

await getMeasuring({ startDate: moment().startOf("month").format("YYYY-MM-DD"), endDate: moment().endOf("month").format("YYYY-MM-DD") });
</script>
