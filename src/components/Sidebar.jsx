import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "📊",
    },

    {
      name: "Products",
      path: "/products",
      icon: "📦",
    },

    {
      name: "Users",
      path: "/users",
      icon: "👥",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          className="
fixed
inset-0
bg-black/40
z-40
md:hidden
"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`
fixed
top-0
left-0
h-screen
z-50

bg-gradient-to-b
from-slate-900
to-slate-800

text-white

transition-all
duration-300

${open ? "translate-x-0" : "-translate-x-full"}

md:translate-x-0

${open ? "w-72" : "w-24"}
`}
      >
        <div
          className="
h-full
flex
flex-col
p-4
"
        >
          {/* Logo */}

          <div
            className="
flex
items-center
justify-between
mb-8
"
          >
            <div
              className="
flex
items-center
gap-3
"
            >
              <div
                className="
w-12
h-12
rounded-2xl
bg-blue-600
flex
items-center
justify-center
text-2xl
"
              >
                📦
              </div>

              {open && (
                <div className="">
                  <h1
                    className="
font-bold
text-lg
"
                  >
                    Smart Sales
                  </h1>

                  <p
                    className="
text-xs
text-gray-300
"
                  >
                    Dashboard
                  </p>
                </div>
              )}
            </div>

            {/* Toggle */}

            <button
  onClick={() => setOpen(!open)}
  className="
  w-10
  h-10
  rounded-xl

  bg-white/10
  hover:bg-white/20

  transition

  flex
  items-center
  justify-center
  "
>
  {open ? "✕" : "☰"}
</button>
          </div>

          {/* Menu */}

          <nav
            className="
space-y-3
"
          >
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `

flex
items-center
rounded-2xl
p-3
transition
justify-center


${isActive ? "bg-blue-600 shadow-lg" : "hover:bg-white/10"}

`
                }
              >
                <span
                  className="
text-2xl
w-12
h-12
flex
items-center
justify-center
rounded-xl
"
                >
                  {item.icon}
                </span>

                {open && (
                  <span
                    className="
font-medium
ml-1
"
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom */}

          <div
            className="
mt-auto
bg-white/10
rounded-2xl
p-3
"
          >
            <div
              className="
flex
items-center
gap-3
"
            >
              <div
                className="
w-10
h-10
rounded-full
bg-blue-500
flex
items-center
justify-center
"
              >
                👤
              </div>

              {open && (
                <div>
                  <p
                    className="
font-semibold
text-sm
"
                  >
                    Eftykhar Rahman
                  </p>

                  <p
                    className="
text-xs
text-gray-300
"
                  >
                    ID:1457
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
