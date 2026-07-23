export default function ProfileStatCard({ icon, title, value }) {
  return (
    <div
      className="
bg-white
border
rounded-xl
p-4
"
    >
      <div className="text-xl">{icon}</div>

      <p
        className="
text-sm
text-gray-500
mt-2
"
      >
        {title}
      </p>

      <p
        className="
text-xl
font-bold
text-gray-800
"
      >
        {value}
      </p>
    </div>
  );
}
