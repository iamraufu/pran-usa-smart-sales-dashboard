import { useNavigate } from "react-router-dom";
export default function SalesRepCard({ user, rank }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/users/${user.emp_id}`);
        window.scrollTo(0, 0);
      }}
      className="
    group
    bg-white
    border
    rounded-2xl
    p-5
    transition-all
    duration-300
    
    hover:shadow-sm
    hover:border-blue-200
cursor-pointer
"
    >
      <div
        className="
flex
justify-between
"
      >
        <h3
          className="
font-bold
"
        >
          {rank === 1
            ? "🥇"
            : rank === 2
              ? "🥈"
              : rank === 3
                ? "🥉"
                : `#${rank}`}{" "}
          {user.name}
        </h3>
      </div>

      <div
        className="
mt-4
space-y-2
text-sm
"
      >
        <p
          className="
    flex
    justify-between
    transition-all
    duration-300
  "
        >
          💰 Sales <b>${(user.sales.toFixed(2) * 1000).toLocaleString()}</b>
        </p>

        <p
          className="
    flex
    justify-between
    transition-all
    duration-300
  "
        >
          📦 Orders <b>{user.orders}</b>
        </p>

        <p
          className="
    flex
    justify-between
    transition-all
    duration-300
  "
        >
          🏪 Visits <b>{user.visits}</b>
        </p>

        <p
          className="
    flex
    justify-between
    transition-all
    duration-300
  "
        >
          🎯 Strike Rate <b>{user.strikeRate}%</b>
        </p>
      </div>
    </div>
  );
}
