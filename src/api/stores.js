import axios from "axios";

export async function searchStores(search, lat, lon, page = 1) {
  const response = await axios.post(
    `/warehouse/api/v3/search/getSiteSearchWise?page=${page}`,

    new URLSearchParams({
      country_id: "42",
      search_text: search || "",
      geo_lat: lat,
      geo_lon: lon,
      role_id: "1",
      aemp_id: "1385",
    }),

    {
      headers: {
        ApiKey: "f06ff43be3310989",

        "App-Language": "en",

        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  const siteList = response.data.site_list;

  return {
    ...siteList,
    data: Array.isArray(siteList.data)
      ? siteList.data
      : Object.values(siteList.data || {}),
  };
}
