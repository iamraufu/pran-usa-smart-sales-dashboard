import axios from "axios";

export async function getWarehouseStock() {
  const response = await axios.post(
    "/warehouse/api/v3/DpoWiseStockDetails",

    new URLSearchParams({
      emp_id: "1457",

      country_id: "42",
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
