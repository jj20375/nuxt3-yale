<script>
import vueRecaptcha from "vue3-recaptcha2";

export default {
    name: "GoogleReCaptchaV2",
    components: {
        vueRecaptcha,
    },
    props: {
        lang: {
            type: String,
        },
    },
    setup(props, { emit }) {
        const $config = useRuntimeConfig();
        const siteKey = $config.public.reCAPTCHASITEKEY;
        const setlang = props.lang ? props.lang : "zh-TW";

        const refresh = () => {
            this.$refs.vueRecaptcha.reset();
        };
        const recaptchaVerified = (response) => {
            emit("update:modelValue", response);
            //console.log('recaptchaVerified', response)
        };
        const recaptchaExpired = () => {
            refresh();
        };
        const recaptchaFailed = () => {
            console.log("recaptchaFailed");
        };
        const recaptchaError = (reason) => {
            console.log("recaptchaError", reason);
        };
        return {
            siteKey,
            setlang,
            refresh,
            recaptchaVerified,
            recaptchaExpired,
            recaptchaFailed,
            recaptchaError,
        };
    },
};
</script>

<template>
    <vue-recaptcha
        :sitekey="siteKey"
        size="normal"
        name="recaptchaToken"
        theme="light"
        :hl="setlang"
        :loading-timeout="30000"
        @verify="recaptchaVerified"
        @expire="recaptchaExpired"
        @fail="recaptchaFailed"
        @error="recaptchaError"
        ref="vueRecaptcha"
    >
    </vue-recaptcha>
</template>

<style scoped lang="scss"></style>
