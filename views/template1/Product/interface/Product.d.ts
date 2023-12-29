export interface ProductInterface {
    // 產品款式
    style: string | number;
    // 產品型號
    category: string | number;
    // 產品圖
    imgSrc: string;
    // 顏色
    color: string;
    // 專利安全按鈕
    safeBtn: string;
    // 自動上鎖功能
    autoLock: string;
    // 入侵 / 破壞 / 高溫警報功能
    feature: string;
    // 節電設計
    savePower: string;
    // 低電量提示
    lowPower: string;
    // 卡片解鎖
    cardUnlock: string;
    // 密碼解鎖
    passwordUnlock: string;
    // 虛位密碼
    virtualPassword: string;
    // 指紋解鎖
    fingerUnlock: string;
    // 備用機械鑰匙
    copyMachineKey: string;
    // 語音提示
    voiceCheck: string;
    // Yale home 遠端管理
    yaleHomeApp: string;
    // 正面尺寸
    frontSize: string;
    // 背面尺寸
    backendSize: string;
    // 鎖體
    type: string;
    // 電源
    power: string;
    // 保固
    warranty: string;
}
