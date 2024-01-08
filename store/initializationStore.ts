import { defineStore } from "pinia";

// const { $api } = useNuxtApp();
export const useInitializationStore = defineStore({
  id: "initializationStore",

  state: (): any => {
    return {
      // 初始化資料
      initializationData: null,
      cityAreaData: [],
      cityData: [],
    };
  },
  getters: {},
  actions: {},
});
