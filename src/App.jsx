import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  return (
    <BrowserRouter>
    <button
  onClick={() => setSidebarOpen(true)}
  className="
    md:hidden
    fixed
    bottom-6
    right-6
    z-50
    h-14
    w-14
    rounded-full
    bg-black
    text-white
    shadow-lg
    flex
    items-center
    justify-center
  "
>
  ☰
</button>
      <div
        className="
min-h-screen
bg-gray-100
"
      >
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main
          className={`
transition-all
duration-300
min-h-screen
p-4
md:p-6


${sidebarOpen ? "md:ml-72" : "md:ml-24"}

`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
