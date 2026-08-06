import axios from "axios";

export async function getRouteOutlets({ emp_id, route_id, search = "" }) {
  const response = await axios.post(
    "/warehouse/api/v2/OrderModuleDataUAE/GetSRTodayOutletList",

    new URLSearchParams({
      country_id: "42",

      emp_id: String(emp_id),

      route_id: String(route_id),

      ou_id: "1",

      slgp_id: "1",

      new_one: "1",

      is_coworking: "0",

      search,

      sr_id: String(emp_id),
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
