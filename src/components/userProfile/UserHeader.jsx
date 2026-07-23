import { ArrowLeft } from "lucide-react";

export default function UserHeader({ user, navigate }) {
  const displayName = user?.name?.split("-").pop() || "";

  const role = user?.username?.toUpperCase().startsWith("SALES")
    ? "Sales Representative"
    : "Employee";

  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-xl border flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div
            className="
            h-16 w-16
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            text-white
            flex
            items-center
            justify-center
            text-xl
            font-bold
          "
          >
            {displayName.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>

            <div className="flex items-center gap-2 mt-1">
              <span
                className="
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                bg-blue-50
                text-blue-700
              "
              >
                {role}
              </span>

              <span className="text-sm text-gray-500">ID #{user.emp_id}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <div className="bg-gray-50 rounded-xl px-4 py-3 min-w-[120px]">
            <p className="text-xs text-gray-500">Username</p>
            <p className="font-semibold text-gray-800">{user.username}</p>
          </div>

          <div className="bg-gray-50 rounded-xl px-4 py-3 min-w-[140px]">
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-semibold text-gray-800">{user.phone || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
