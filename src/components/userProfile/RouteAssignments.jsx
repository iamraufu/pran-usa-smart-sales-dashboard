import RouteCard from "./RouteCard";

export default function RouteAssignments({ routes, loading }) {
  return (
    <div>
      <div
        className="
flex
justify-between
mb-4
"
      >
        <h2 className="font-semibold text-lg">Route Assignments</h2>

        <span>{routes.length} Routes</span>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className="
grid
md:grid-cols-3
gap-4
"
        >
          {routes.map((route) => (
            <RouteCard key={route.column_id} route={route} />
          ))}
        </div>
      )}
    </div>
  );
}
