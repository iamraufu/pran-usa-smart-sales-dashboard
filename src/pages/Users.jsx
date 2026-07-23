import { useState } from "react";
import users from "../../data/users";
import { useNavigate } from "react-router-dom";
export default function Users() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  function getUserType(username) {
    if (username?.toUpperCase().startsWith("SALES")) {
      return "SR";
    }

    return "Employee";
  }

  function getDisplayName(name) {
    const parts = name.split("-");

    return parts[parts.length - 1];
  }

  const srCount = users.filter(
    (user) => getUserType(user.username) === "SR",
  ).length;

  const employeeCount = users.length - srCount;

  const filteredUsers = users.filter((user) => {
    const type = getUserType(user.username);

    const searchText = search.toLowerCase();

    const matchesSearch =
      getDisplayName(user.name).toLowerCase().includes(searchText) ||
      user.username.toLowerCase().includes(searchText) ||
      user.phone.includes(search);

    const matchesFilter = filter === "All" ? true : type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
     {/* Header */}

<div>

<h1 className="
text-2xl
font-bold
text-gray-800
">
Users
</h1>


<p className="
text-sm
text-gray-500
mt-1
">
Manage employees and sales representatives
</p>


</div>





{/* Stats */}

<div className="
grid
grid-cols-1
sm:grid-cols-3
gap-4
">


<div className="
bg-white
rounded-2xl
p-4
border
flex
items-center
gap-4
">

<div className="
w-11
h-11
rounded-xl
bg-blue-50
flex
items-center
justify-center
text-xl
">
👥
</div>


<div>

<p className="
text-xs
text-gray-500
">
Total Employees
</p>


<p className="
text-xl
font-bold
text-gray-800
">
{users.length}
</p>

</div>


</div>






<div className="
bg-white
rounded-2xl
p-4
border
flex
items-center
gap-4
">

<div className="
w-11
h-11
rounded-xl
bg-green-50
flex
items-center
justify-center
text-xl
">
🧑‍💼
</div>


<div>

<p className="
text-xs
text-gray-500
">
Sales Representatives
</p>


<p className="
text-xl
font-bold
text-gray-800
">
{srCount}
</p>

</div>


</div>







<div className="
bg-white
rounded-2xl
p-4
border
flex
items-center
gap-4
">

<div className="
w-11
h-11
rounded-xl
bg-gray-100
flex
items-center
justify-center
text-xl
">
👤
</div>


<div>

<p className="
text-xs
text-gray-500
">
Employees
</p>


<p className="
text-xl
font-bold
text-gray-800
">
{employeeCount}
</p>

</div>


</div>



</div>








{/* Search and Filter */}

<div className="
bg-white
rounded-2xl
border
p-4
flex
flex-col
md:flex-row
gap-3
">


<div className="
relative
flex-1
">


<span className="
absolute
left-3
top-2.5
text-gray-400
">
🔍
</span>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="
Search employee...
"

className="
w-full
pl-10
pr-4
py-2.5
rounded-xl
border
text-sm
outline-none
focus:ring-2
focus:ring-blue-100
"

 />


</div>







<div className="relative">


<select

value={filter}

onChange={(e)=>setFilter(e.target.value)}

className="
appearance-none
w-full
md:w-48
px-4
py-2.5
pr-10
rounded-xl
border
bg-white
text-sm
outline-none
cursor-pointer
"

>


<option value="All">
All Users
</option>


<option value="SR">
Sales Representatives
</option>


<option value="Employee">
Employees
</option>


</select>



<span className="
absolute
right-3
top-3
text-gray-400
pointer-events-none
">
⌄
</span>


</div>



</div>

      {/* User Cards */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
      >
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="
                bg-white
                border
                rounded-xl
                p-4
                hover:shadow-sm
                transition
              "
          >
            <div
              className="
                flex
                items-center
                gap-3
                mb-4
              "
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-lg
                "
              >
                👤
              </div>

              <div>
                <h2
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                  "
                >
                  {getDisplayName(user.name)}
                </h2>

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  {getUserType(user.username)}
                </p>
              </div>
            </div>

            <div
              className="
                space-y-2
                text-xs
              "
            >
              <div
                className="
                  flex
                  justify-between
                "
              >
                <span className="text-gray-500">Employee ID</span>

                <span className="font-medium">{user.emp_id}</span>
              </div>

              <div
                className="
                  flex
                  justify-between
                "
              >
                <span className="text-gray-500">Username</span>

                <span className="font-medium">{user.username}</span>
              </div>

              <div
                className="
                  flex
                  justify-between
                "
              >
                <span className="text-gray-500">Phone</span>

                <span className="font-medium">{user.phone}</span>
              </div>
            </div>

            <div className="
mt-3
pt-3
border-t
flex
items-center
justify-between
">


<span className="
text-xs
text-gray-500
">

🏷 {getUserType(user.username)}

</span>



{
getUserType(user.username) === "SR" && (

<button

onClick={() => navigate(`/users/${user.emp_id}`)}

className="
text-xs
text-blue-600
hover:text-blue-800
font-medium
"

>

View Profile →

</button>

)

}


</div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div
          className="
            bg-white
            border
            rounded-xl
            p-8
            text-center
            text-gray-500
          "
        >
          No users found
        </div>
      )}
    </div>
  );
}
