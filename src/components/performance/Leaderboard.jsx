import SalesRepCard from "./SalesRepCard";

export default function Leaderboard({ data }) {
  return (
    <div>
      <h2
        className="
text-xl
font-semibold
mb-4
"
      >
        🏆 Ranking
      </h2>

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-5
"
      >
        {data.map((item, index) => (
          <SalesRepCard key={item.id} user={item} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
