import axios from "axios";

export async function getUserTimeline(empId, timelineDate, page = 1) {
  const response = await axios.post(
    `/warehouse/api/v3/dashboard/userTimeline?page=${page}`,

    new URLSearchParams({
      country_id: "42",
      role_id: "1",
      aemp_id: empId,
      timeline_date: timelineDate,
    }),

    {
      headers: {
        ApiKey: "f06ff43be3310989",
        "App-Language": "en",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data.data;
}
