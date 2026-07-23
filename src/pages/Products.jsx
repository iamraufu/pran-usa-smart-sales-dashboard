import { useEffect, useMemo, useRef, useState } from "react";
import { getProducts } from "../api/products";

function DetailItem({ label, value }) {
  return (
    <div
      className="
      flex
      justify-between
      border-b
      border-gray-200
      pb-3
      last:border-0
    "
    >
      <span className="text-gray-500">{label}</span>

      <span
        className="
        font-semibold
        text-gray-800
      "
      >
        {value}
      </span>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts();

        const data = response?.Sync_Product_Info_Table?.data || [];

        const formatted = data.map((item) => {
          const stockQty = Number(item.Stock_Qty) || 0;

          const boxSize = Number(item.Item_Factor) || 1;

          const boxes = Math.floor(stockQty / boxSize);

          let status = "In Stock";

          if (boxes <= 0) {
            status = "Out Of Stock";
          } else if (boxes < 10) {
            status = "Low Stock";
          }

          const sellingPrice = Number(item.Item_Rate) || 0;

          return {
            code: item.Item_Code,

            name: item.Item_Name || "Unknown",

            category: item.Category_Name || "Unknown",

            price: sellingPrice,

            costPrice: Number(item.cost_price) || 0,

            boxSize,

            boxPrice: sellingPrice * boxSize,

            stockQty,

            boxes,

            image: item.amim_imgl,

            status,
          };
        });

        setProducts(formatted);
      } catch (error) {
        console.error("Product API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];

    return ["All", ...cats.sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const term = search.toLowerCase();

      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          String(p.code).toLowerCase().includes(term),
      );
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [products, category, search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
        p-6
      "
      >
        <div
          className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-xl
          border
          p-8
        "
        >
          {/* Logo Animation */}

          <div
            className="
            flex
            justify-center
            mb-6
          "
          >
            <div
              className="
              w-20
              h-20
              rounded-3xl
              bg-gradient-to-br
              from-blue-600
              to-indigo-600
              flex
              items-center
              justify-center
              shadow-lg
              animate-pulse
            "
            >
              <span
                className="
                text-4xl
              "
              >
                📦
              </span>
            </div>
          </div>

          {/* Title */}

          <h2
            className="
            text-center
            text-2xl
            font-bold
            text-gray-800
          "
          >
            Loading Inventory
          </h2>

          <p
            className="
            text-center
            text-gray-500
            mt-2
            mb-8
          "
          >
            Fetching latest product information...
          </p>

          {/* Progress Bar */}

          <div
            className="
            w-full
            h-3
            bg-gray-100
            rounded-full
            overflow-hidden
            mb-8
          "
          >
            <div
              className="
              h-full
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              rounded-full
              animate-[loading_2s_ease-in-out_infinite]
              w-1/2
            "
            />
          </div>

          {/* Skeleton Cards */}

          <div
            className="
            space-y-3
          "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  flex
                  gap-4
                  items-center
                  p-3
                  rounded-2xl
                  bg-gray-50
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    bg-gray-200
                    rounded-xl
                    animate-pulse
                  "
                />

                <div
                  className="
                    flex-1
                    space-y-2
                  "
                >
                  <div
                    className="
                      h-3
                      bg-gray-200
                      rounded-full
                      w-3/4
                      animate-pulse
                    "
                  />

                  <div
                    className="
                      h-3
                      bg-gray-200
                      rounded-full
                      w-1/2
                      animate-pulse
                    "
                  />
                </div>
              </div>
            ))}
          </div>

          <p
            className="
            text-center
            text-xs
            text-gray-400
            mt-6
          "
          >
            Smart Sales Dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      p-4
      md:p-6
      bg-gray-50
      min-h-screen
    "
    >
      {/* Header */}

      <div className="mb-6">
        <h1
          className="
          text-3xl
          font-bold
          text-gray-800
        "
        >
          Products
        </h1>

        <p
          className="
          text-gray-500
          mt-1
        "
        >
          Product catalog and inventory
        </p>
      </div>

      {/* Search & Filter Section */}

      <div
        className="
    bg-white
    rounded-3xl
    border
    shadow-sm
    p-5
    mb-6
  "
      >
        <div
          className="
      flex
      flex-col
      lg:flex-row
      gap-4
      lg:items-center
      lg:justify-between
    "
        >
          {/* Search Box */}

          <div
            className="
        relative
        flex-1
      "
          >
            <svg
              className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          w-5
          h-5
          text-gray-400
        "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="
          Search product name, category...
        "
              className="
          w-full
          pl-12
          pr-12
          py-3.5
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          text-gray-700
          outline-none
          transition
          focus:bg-white
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-gray-700
              text-lg
            "
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter */}

          <div
            className="
        flex
        items-center
        gap-3
      "
          >
            <div
              className="
          hidden
          md:flex
          items-center
          gap-2
          text-gray-500
          text-sm
        "
            >
              <span>Category</span>
            </div>

            <div
              className="
    relative
    min-w-[220px]
  "
              ref={categoryRef}
            >
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="
    w-full
    flex
    items-center
    justify-between
    gap-3
    bg-white
    border
    border-gray-200
    rounded-2xl
    px-5
    py-3.5
    hover:border-blue-400
    transition
  "
              >
                <div
                  className="
    flex
    items-center
    gap-3
  "
                >
                  <span
                    className="
    w-9
    h-9
    rounded-xl
    bg-blue-50
    flex
    items-center
    justify-center
  "
                  >
                    📂
                  </span>

                  <div className="text-left">
                    <p
                      className="
text-xs
text-gray-400
"
                    >
                      Category
                    </p>

                    <p
                      className="
font-semibold
text-gray-700
"
                    >
                      {category}
                    </p>
                  </div>
                </div>

                <svg
                  className={`
w-5
h-5
text-gray-400
transition

${categoryOpen ? "rotate-180" : ""}
`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {categoryOpen && (
                <div
                  className="
absolute
z-50
mt-3
w-full
bg-white
rounded-2xl
shadow-xl
border
p-2
max-h-72
overflow-y-auto
"
                >
                  {categories.map((cat, index) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);

                        setCategoryOpen(false);
                      }}
                      className={`

w-full
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-left
transition


${
  category === cat
    ? "bg-blue-50 text-blue-700"
    : "hover:bg-gray-50 text-gray-700"
}

`}
                    >
                      <span>{index === 0 ? "📦" : "🏷️"}</span>

                      <span
                        className="
font-medium
"
                      >
                        {cat}
                      </span>

                      {category === cat && (
                        <span
                          className="
ml-auto
"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters / Stats */}

        <div
          className="
      flex
      flex-wrap
      gap-3
      mt-5
      pt-4
      border-t
    "
        >
          <div
            className="
        bg-blue-50
        text-blue-700
        px-4
        py-2
        rounded-xl
        text-sm
        font-medium
      "
          >
            📦 Total: {products.length}
          </div>

          {category !== "All" && (
            <button
              onClick={() => setCategory("All")}
              className="
            bg-purple-50
            text-purple-700
            px-4
            py-2
            rounded-xl
            text-sm
            font-medium
          "
            >
              🏷 {category} ✕
            </button>
          )}

          {search && (
            <button
              onClick={() => setSearch("")}
              className="
            bg-green-50
            text-green-700
            px-4
            py-2
            rounded-xl
            text-sm
            font-medium
          "
            >
              🔎 "{search}" ✕
            </button>
          )}
        </div>
      </div>

      <div
        className="
        mb-4
        text-sm
        text-gray-500
      "
      >
        Showing {filteredProducts.length} products
      </div>

      {/* Product Table */}

      <div
        className="
        bg-white
        rounded-2xl
        border
        shadow-sm
        overflow-hidden
      "
      >
        <div
          className="
          overflow-auto
          max-h-[70vh]
        "
        >
          <table className="w-full">
            <thead
              className="
              sticky
              top-0
              bg-gray-100
              border-b
            "
            >
              <tr>
                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">Category</th>

                <th className="p-4 text-left">Piece Price</th>
                <th className="p-4 text-left">Box Size</th>

                <th className="p-4 text-left">Box Price</th>

                <th className="p-4 text-left">Stock</th>

                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.code}
                  onClick={() => setSelectedProduct(product)}
                  className="
                    border-b
                    hover:bg-blue-50
                    cursor-pointer
                    transition
                  "
                >
                  <td
                    className="
                    p-4
                    font-medium
                  "
                  >
                    {product.name}
                  </td>

                  <td className="p-4">{product.category}</td>

                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4">{product.boxSize}</td>

                  <td className="p-4">${product.boxPrice.toFixed(2)}</td>

                  <td className="p-4">{product.boxes}</td>

                  <td className="p-4">
                    <span
                      className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold

                      ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }

                    `}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Drawer */}

      {selectedProduct && (
        <div
          className="
              fixed
              inset-0
              bg-black/40
              z-50
              flex
              justify-end
            "
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="
                bg-white
                w-full
                md:max-w-lg
                h-full
                overflow-y-auto
                shadow-2xl
              "
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="
                bg-linear-to-r
                from-blue-600
                to-indigo-600
                p-6
                text-white
              "
            >
              <div
                className="
                  flex
                  justify-between
                "
              >
                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Product Details
                </h2>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div
                className="
                  flex
                  justify-center
                  mb-5
                "
              >
                <img
                  src={
                    selectedProduct.image || "https://via.placeholder.com/200"
                  }
                  className="
                      w-40
                      h-40
                      object-contain
                      rounded-2xl
                      border
                      bg-gray-50
                      p-3
                    "
                />
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-center
                "
              >
                {selectedProduct.name}
              </h2>

              <p
                className="
                  text-center
                  text-gray-500
                "
              >
                {selectedProduct.category}
              </p>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                  mt-6
                "
              >
                <div
                  className="
                    bg-green-50
                    rounded-xl
                    p-4
                  "
                >
                  <p className="text-sm">Selling Price</p>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-green-700
                    "
                  >
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>

                <div
                  className="
                    bg-blue-50
                    rounded-xl
                    p-4
                  "
                >
                  <p className="text-sm">Stock</p>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-blue-700
                    "
                  >
                    {selectedProduct.boxes} Boxes
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-6
                  bg-gray-50
                  rounded-2xl
                  p-5
                  space-y-4
                "
              >
                <DetailItem label="Item Code" value={selectedProduct.code} />

                <DetailItem label="Box Size" value={selectedProduct.boxSize} />

                <DetailItem
                  label="Box Price"
                  value={`$${selectedProduct.boxPrice.toFixed(2)}`}
                />

                <DetailItem
                  label="Cost Price"
                  value={`$${selectedProduct.costPrice.toFixed(2)}`}
                />

                <DetailItem
                  label="Total Units"
                  value={selectedProduct.stockQty}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
