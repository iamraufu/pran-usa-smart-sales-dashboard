import axios from "axios";

export async function getSRRoute(emp_id) {
  const response = await axios.post(
    "/warehouse/api/v3/common_data",

    new URLSearchParams({
      emp_id: emp_id,

      country_id: "42",

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
