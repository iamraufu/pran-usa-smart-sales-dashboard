import axios from "axios";

export async function getProducts() {
  const response = await axios.post(
    "/warehouse/api/v2/OrderModuleDataUAE/CheckINSyncAllData_Merge",
    new URLSearchParams({
      emp_id: "1457",
      country_id: "42",
      site_id: "831",
      slgp_id: "1",
      ou_id: "1",
      dpot_id: "1",
      discount_id: "0",
      srid: "1457",
      is_coworking: "0",
    }),
    {
      headers: {
        ApiKey: "f06ff43be3310989",
        "App-Language": "en",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data;
}
