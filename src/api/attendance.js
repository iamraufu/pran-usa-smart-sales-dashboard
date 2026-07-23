import axios from "axios";

export async function getUserAttendance(emp_id, start_date, end_date) {
  const response = await axios.post(
    "/warehouse/api/v3/dashboard/userAttendanceDetailsAndSummery",

    new URLSearchParams({
      country_id: "42",

      role_id: "1",

      aemp_id: emp_id,

      start_date,

      end_date,
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
