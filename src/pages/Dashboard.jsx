/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getWarehouseStock } from "../api/warehouse";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    inStock: 0,
    lowStock: 0,
    outStock: 0,
  });

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("nameAsc");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getWarehouseStock();

        const data = Array.isArray(response) ? response : response.data || [];

        let inStock = 0;

        let lowStock = 0;

        let outStock = 0;

        const formatted = data.map((product) => {
          const boxSize = Number(product.factor) || 1;

          const stock = Number(product.DEPOT_B) || 0;

          const boxes = Math.floor(stock / boxSize);

          let status = "In Stock";

          if (boxes === 0) {
            status = "Out Of Stock";

            outStock++;
          } else if (boxes < 10) {
            status = "Low Stock";

            lowStock++;
          } else {
            inStock++;
          }

          return {
            name: (product.amim_name || "").trim(),

            boxSize,

            boxes,

            status,
          };
        });

        setProducts(formatted);

        setStats({
          total: formatted.length,

          inStock,

          lowStock,

          outStock,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // FILTER + SORT

  useEffect(() => {
    let result = [...products];

    // SEARCH PRODUCT NAME

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim()),
      );
    }

    // FILTER STATUS

    if (filter !== "All") {
      result = result.filter((item) => item.status === filter);
    }

    // SORT

    switch (sort) {
      case "nameAsc":
        result.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );

        break;

      case "nameDesc":
        result.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
        );

        break;

      case "highStock":
        result.sort((a, b) => b.boxes - a.boxes);

        break;

      case "lowStock":
        result.sort((a, b) => a.boxes - b.boxes);

        break;
    }

    setFilteredProducts(result);
  }, [products, filter, sort, search]);

  if (loading) {
    return (
      <div
        className="
            min-h-screen
            bg-gray-100
            flex
            items-center
            justify-center
            p-5
        "
      >
        <div
          className="
                bg-white
                rounded-3xl
                shadow-xl
                p-8
                w-full
                max-w-md
                text-center
            "
        >
          {/* Warehouse Icon */}

          <div
            className="
                    mx-auto
                    w-20
                    h-20
                    rounded-2xl
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    text-4xl
                    shadow-lg
                    animate-pulse
                "
          >
            📦
          </div>

          <h2
            className="
                    mt-6
                    text-2xl
                    font-bold
                    text-gray-800
                "
          >
            Loading Inventory
          </h2>

          <p
            className="
                    mt-2
                    text-gray-500
                    text-sm
                "
          >
            Fetching warehouse stock data...
          </p>

          {/* Loading Bar */}

          <div
            className="
                    mt-8
                    h-3
                    w-full
                    bg-gray-200
                    rounded-full
                    overflow-hidden
                "
          >
            <div
              className="
                        h-full
                        w-1/2
                        bg-blue-600
                        rounded-full
                        animate-[pulse_1.5s_ease-in-out_infinite]
                    "
            ></div>
          </div>

          <div
            className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xs
                    text-gray-400
                "
          >
            <span
              className="
                        w-2
                        h-2
                        rounded-full
                        bg-blue-600
                        animate-ping
                    "
            ></span>
            Syncing inventory
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-gray-100
p-4
md:p-8
"
    >
      <h1
        className="
text-3xl
font-bold
mb-8
"
      >
        Warehouse Dashboard
      </h1>

      {/* TOP CARDS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
"
      >
        <Card
          title="Total Products"
          value={stats.total}
          icon="📦"
          type="total"
        />

        <Card title="In Stock" value={stats.inStock} icon="✅" type="stock" />

        <Card title="Low Stock" value={stats.lowStock} icon="⚠️" type="low" />

        <Card
          title="Out Of Stock"
          value={stats.outStock}
          icon="❌"
          type="out"
        />
      </div>

      {/* FILTER & SORT */}

      <div
        className="
    mt-8
    bg-white
    rounded-2xl
    shadow-sm
    border
    p-5
    flex
    flex-col
    md:flex-row
    gap-4
"
      >
        {/* Search */}
        <div className="flex-1">
          <label
            className="
block
text-sm
font-medium
text-gray-600
mb-2
"
          >
            Search Products
          </label>

          <div
            className="
relative
"
          >
            <span
              className="
absolute
left-3
top-1/2
-translate-y-1/2
text-lg
"
            >
              🔍
            </span>

            <input
              type="text"
              placeholder="Search product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
w-full
bg-gray-50
border
border-gray-200
rounded-xl
py-3
pl-10
pr-4
text-gray-700
font-medium
outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition
"
            />
          </div>
        </div>

        {/* Filter */}

        <div className="flex-1">
          <label
            className="
            block
            text-sm
            font-medium
            text-gray-600
            mb-2
        "
          >
            Filter Inventory
          </label>

          <div
            className="
            relative
        "
          >
            <span
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-lg
            "
            >
              🔎
            </span>

            <select
              className="
                    w-full
                    appearance-none
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-xl
                    py-3
                    pl-10
                    pr-10
                    text-gray-700
                    font-medium
                    outline-none
                    cursor-pointer
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                    transition
                "
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Products</option>

              <option value="In Stock">✅ In Stock</option>

              <option value="Low Stock">⚠️ Low Stock</option>

              <option value="Out Of Stock">❌ Out Of Stock</option>
            </select>

            <span
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                pointer-events-none
            "
            >
              ▼
            </span>
          </div>
        </div>

        {/* Sort */}

        <div className="flex-1">
          <label
            className="
            block
            text-sm
            font-medium
            text-gray-600
            mb-2
        "
          >
            Sort Products
          </label>

          <div
            className="
            relative
        "
          >
            <span
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-lg
            "
            >
              ↕️
            </span>

            <select
              className="
                    w-full
                    appearance-none
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-xl
                    py-3
                    pl-10
                    pr-10
                    text-gray-700
                    font-medium
                    outline-none
                    cursor-pointer
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                    transition
                "
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="nameAsc">A → Z Product Name</option>

              <option value="nameDesc">Z → A Product Name</option>

              <option value="highStock">📈 Highest Stock</option>

              <option value="lowStock">📉 Lowest Stock</option>
            </select>

            <span
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                pointer-events-none
            "
            >
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* INVENTORY TABLE */}

      <div
        className="
mt-6
bg-white
rounded-xl
shadow
overflow-hidden
"
      >
        <div
          className="
p-5
border-b
text-xl
font-bold
"
        >
          Inventory Products
        </div>

        <div
          className="
    hidden
    md:block
    overflow-x-auto
    max-h-[515px]
    overflow-y-auto
"
        >
          <table
            className="
w-full
text-left
"
          >
            <thead
              className="
    bg-gray-100
    sticky
    top-0
    z-10
"
            >
              <tr>
                <th className="p-4">Product Name</th>

                <th className="p-4">Box Size</th>

                <th className="p-4">Boxes</th>

                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={index}
                  className="
border-b
hover:bg-gray-50
"
                >
                  <td className="p-4 font-medium">{product.name}</td>

                  <td className="p-4">{product.boxSize}</td>

                  <td className="p-4 font-bold">{product.boxes}</td>

                  <td className="p-4">
                    <Status status={product.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}

        <div
          className="
    md:hidden
    p-4
    space-y-4
    max-h-96
    overflow-y-auto
"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="
border
rounded-xl
p-4
bg-gray-50
"
            >
              <h3
                className="
font-bold
mb-3
"
              >
                {product.name}
              </h3>

              <p>
                Box Size:
                <b> {product.boxSize}</b>
              </p>

              <p>
                Boxes:
                <b> {product.boxes}</b>
              </p>

              <div className="mt-3">
                <Status status={product.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon, type }) {
  const styles = {
    total: {
      card: "bg-blue-50 border-blue-100",
      icon: "bg-blue-600",
      text: "text-blue-600",
      desc: "All inventory items",
    },

    stock: {
      card: "bg-green-50 border-green-100",
      icon: "bg-green-600",
      text: "text-green-600",
      desc: "Available now",
    },

    low: {
      card: "bg-yellow-50 border-yellow-100",
      icon: "bg-yellow-500",
      text: "text-yellow-600",
      desc: "Need attention",
    },

    out: {
      card: "bg-red-50 border-red-100",
      icon: "bg-red-600",
      text: "text-red-600",
      desc: "Reorder required",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`
${style.card}
border
rounded-2xl
p-6
flex
justify-between
items-center
shadow-sm
hover:shadow-lg
transition
`}
    >
      <div>
        <p
          className="
text-gray-500
text-sm
font-medium
"
        >
          {title}
        </p>

        <h2
          className={`
text-4xl
font-bold
mt-2
${style.text}
`}
        >
          {value}
        </h2>

        <p
          className="
text-xs
text-gray-500
mt-2
"
        >
          {style.desc}
        </p>
      </div>

      <div
        className={`
${style.icon}
w-14
h-14
rounded-2xl
flex
items-center
justify-center
text-3xl
text-white
`}
      >
        {icon}
      </div>
    </div>
  );
}

function Status({ status }) {
  const colors = {
    "In Stock": "bg-green-100 text-green-700",

    "Low Stock": "bg-yellow-100 text-yellow-700",

    "Out Of Stock": "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
px-3
py-1
rounded-full
text-sm
font-semibold
${colors[status]}
`}
    >
      {status}
    </span>
  );
}
