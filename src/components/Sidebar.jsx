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
        />
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

    transition-transform
    duration-300
    ease-in-out

    ${open ? "translate-x-0" : "-translate-x-full"}

    w-72

    md:translate-x-0
    ${open ? "md:w-72" : "md:w-24"}
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
          {/* LOGO */}
          <div
            className="
            flex
            items-center
            justify-between
            mb-8
            "
          >
            <div
              onClick={() => {
                setOpen(true);
              }}
              className={`
    flex
    items-center
    cursor-pointer

    ${open ? "gap-3" : "justify-center w-full"}
  `}
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
    shrink-0
  "
              >
                📦
              </div>

              {open && (
                <div>
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

            {/* CLOSE BUTTON */}
            {open && (
              <button
                onClick={() => setOpen(false)}
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
                ✕
              </button>
            )}
          </div>

          {/* MENU */}

          <nav
            className="
            space-y-3
            "
          >
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  window.scrollTo(0, 0);

                  if (window.innerWidth < 768) {
                    setOpen(false);
                  }
                }}
                className={({ isActive }) => `

                flex
                items-center

                ${open ? "justify-start" : "justify-center"}

                gap-3

                rounded-2xl

                p-3

                transition

                ${isActive ? "bg-blue-600 shadow-lg" : "hover:bg-white/10"}

                `}
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
                  shrink-0
                  "
                >
                  {item.icon}
                </span>

                {open && (
                  <span
                    className="
                    font-medium
                    "
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom User Section */}

          <div
            className={`
  mt-auto
  rounded-2xl
  transition-all
  duration-300

  ${open ? "bg-white/10 p-3" : "p-0"}
  `}
          >
            <div
              className={`
    flex
    items-center

    ${open ? "gap-3" : "justify-center"}
    `}
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
      shrink-0
      text-lg
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
                    ID: 1457
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
