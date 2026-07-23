import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import users from "../../data/users";

import { getSRRoute } from "../api/routes";
import { getUserAttendance } from "../api/attendance";

import UserHeader from "../components/userProfile/UserHeader";
import RouteAssignments from "../components/userProfile/RouteAssignments";
import Attendance from "../components/userProfile/Attendance";
import { getUserDashboard } from "../api/dashboard";
import PerformanceOverview from "../components/userProfile/PerformanceOverview";

export default function UserProfile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = users.find((u) => u.emp_id.toString() === id);

  const today = new Date().toISOString().split("T")[0];

  const [routes, setRoutes] = useState([]);

  const [routeLoading, setRouteLoading] = useState(true);

  const [startDate, setStartDate] = useState(today);

  const [endDate, setEndDate] = useState(today);

  const [attendanceSummary, setAttendanceSummary] = useState(null);

  const [attendanceDetails, setAttendanceDetails] = useState([]);

  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const [dashboardSummary, setDashboardSummary] = useState(null);

  useEffect(() => {
    async function loadRoutes() {
      try {
        const data = await getSRRoute(user.emp_id);

        setRoutes(data.sr_route_data || []);
      } finally {
        setRouteLoading(false);
      }
    }

    if (user) loadRoutes();
  }, [user]);

  useEffect(() => {
    async function loadAttendance() {
      try {
        setAttendanceLoading(true);

        const data = await getUserAttendance(
          user.emp_id,

          startDate,

          endDate,
        );

        setAttendanceSummary(data.attn_summery);

        setAttendanceDetails(data.attn_details || []);
      } finally {
        setAttendanceLoading(false);
      }
    }

    if (user) loadAttendance();
  }, [user, startDate, endDate]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setDashboardLoading(true);

        const data = await getUserDashboard(user.emp_id, startDate, endDate);

        setDashboardSummary(data.visit_summery);
      } catch (error) {
        console.log(error);
      } finally {
        setDashboardLoading(false);
      }
    }

    if (user) {
      loadDashboard();
    }
  }, [user, startDate, endDate]);

  if (!user) return <div>User not found</div>;

  return (
    <div className="space-y-8">
      <UserHeader
        user={user}
        navigate={navigate}
        routeCount={routes.length}
        attendanceSummary={attendanceSummary}
      />

      <PerformanceOverview
        summary={dashboardSummary}
        loading={dashboardLoading}
      />

      <Attendance
        summary={attendanceSummary}
        details={attendanceDetails}
        loading={attendanceLoading}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <RouteAssignments routes={routes} loading={routeLoading} />
    </div>
  );
}
