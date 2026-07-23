export default function RouteCard({ route }) {
  return (
    <div
      className="
bg-white
border
rounded-xl
p-5
"
    >
      <div
        className="
flex
justify-between
"
      >
        <h3 className="font-semibold">{route.Route_Name}</h3>

        <span>{route.Day}</span>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <p>
          Base: <b>{route.Base_Name}</b>
        </p>

        <p>
          Staff: <b>{route.Staff_ID}</b>
        </p>

        <p>
          Route ID: <b>{route.Route_ID}</b>
        </p>
      </div>
    </div>
  );
}
