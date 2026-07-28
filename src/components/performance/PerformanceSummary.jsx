export default function PerformanceSummary({ data }) {
  const totalSales = data.reduce((sum, x) => sum + x.sales, 0);

  const totalOrders = data.reduce((sum, x) => sum + x.orders, 0);

  const totalVisits = data.reduce((sum, x) => sum + x.visits, 0);

  return (
    <div
      className="
grid
grid-cols-1
md:grid-cols-4
gap-4
"
    >
      <Card title="Total Sales" value={`$${(totalSales.toFixed(2)*1000).toLocaleString()}`} icon="💰" />

      <Card title="Orders" value={totalOrders} icon="📦" />

      <Card title="Visits" value={totalVisits} icon="🏪" />

      <Card title="Sales Reps" value={data.length} icon="👥" />
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div
      className="
bg-white
border
rounded-2xl
p-5
"
    >
      <div className="text-2xl">{icon}</div>

      <p className="text-gray-500 text-sm">{title}</p>

      <h2
        className="
text-2xl
font-bold
"
      >
        {value}
      </h2>
    </div>
  );
}
