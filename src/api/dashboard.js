import axios from "axios";

export async function getUserDashboard(empId, startDate, endDate) {
  const response = await axios.post(
    "/warehouse/api/v3/dashboard/home",
    new URLSearchParams({
      country_id: 42,
      role_id: 1,
      aemp_id: empId,
      start_date: startDate,
      end_date: endDate,
      type: 0,
      my_own: 1,
    }),
    {
      headers: {
        ApiKey: "f06ff43be3310989",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data;
}
