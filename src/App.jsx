import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import Performance from "./pages/Performance";
import Stores from "./pages/Stores";
import StoreMap from "./pages/StoreMap";
import RouteOutlets from "./pages/RouteOutlets";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  return (
    <BrowserRouter>
      <button
        onClick={() => setSidebarOpen(true)}
        className="
  md:hidden
  fixed
  bottom-5
  right-5
  z-[60]
  h-14
  w-14
  rounded-full
  bg-blue-600
  text-white
  shadow-xl
  flex
  items-center
  justify-center
  text-xl
  hover:scale-105
  transition
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
            <Route path="/performance" element={<Performance />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/store-map" element={<StoreMap />} />
            <Route path="/route/:id/outlets" element={<RouteOutlets />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
