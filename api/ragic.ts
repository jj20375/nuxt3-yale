export default () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();
  return {
    /**
     * 一般安裝
     */
    GeneralnstallationAPI(data: {
      contact_name: string;
      contact_phone: string;
      landline: string | null;
      city: string;
      district: string;
      zip3: string;
      detailed_address: string;
      purchase_channel: string;
      series_selection: string;
      installation_model: string;
      installation_quantity: string;
      product_serial_number: string;
      appointment_time_slot: string[];
      vendor_name: string | null;
      attachments: string[];
      captcha: string;
    }) {
      return useMyFetch(`${apiUrl}/ragic/general-installation`, {
        method: "post",
        body: data,
      });
    },
    /**
     * 新光保全安裝
     */ SkSecurityInstallationnAPI(data: {
      contract_order_number: string;
      contract_content: string;
      customer_name: string;
      contact_phone: string;
      landline: string | null;
      city: string;
      district: string;
      zip3: string;
      detailed_address: string;
      sk_contact_name: string;
      sk_contact_phone: string;
      sk_landline: string | null;
      installation_model: string;
      installation_quantity: string;
      appointment_time_slot: string[];
      other_requirements: string | null;
      attachments: string[];
      captcha: string;
    }) {
      return useMyFetch(`${apiUrl}/ragic/sk-security-installation`, {
        method: "post",
        body: data,
      });
    },
    /**
     * 保固登記
     */
    WarrantyRegistrationAPI(data: {
      company_name: string;
      installation_or_delivery_date: string;
      sales_purpose: string;
      model: string;
      quantity: string;
      contact_name: string;
      contact_phone: string;
      customer_name: string;
      customer_phone: string;
      installation_or_delivery_address: string;
      remarks: string | null;
      project_name: string | null;
      serial_number: string[];
    }) {
      return useMyFetch(`${apiUrl}/ragic/warranty-registration`, {
        method: "post",
        body: data,
      });
    },
    /**
     * 線上報修
     */
    OnlineRepairAPI(data: {
      contact_name: string;
      contact_phone: string;
      landline: string;
      city: string;
      district: string;
      zip3: string;
      detailed_address: string;
      series_selection: string;
      installation_date: string;
      repair_model: string;
      repair_quantity: string;
      product_serial_number: string;
      repair_time_slot: string[];
      condition_description: string;
      attachments: string[];
      captcha: string;
    }) {
      return useMyFetch(`${apiUrl}/ragic/online-repair`, {
        method: "post",
        body: data,
      });
    },
    /**
     * 表單設置
     */
    RagicConfigAPI(params: { code: string }) {
      return useMyFetch(`${apiUrl}/ragic/config`, {
        method: "get",
        params
      });
    },
  };
};
