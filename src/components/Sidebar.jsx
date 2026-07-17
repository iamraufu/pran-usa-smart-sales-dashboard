import {
LayoutDashboard,
Package,
ShoppingCart,
Store,
BarChart3
} from "lucide-react";


export default function Sidebar(){


return(

<div className="
w-64 
bg-slate-900 
text-white 
min-h-screen
p-5
">


<h1 className="text-2xl font-bold mb-10">
Smart Sales
</h1>


<nav className="space-y-5">


<Menu 
icon={<LayoutDashboard/>}
text="Dashboard"
/>


<Menu
icon={<Package/>}
text="Inventory"
/>


<Menu
icon={<ShoppingCart/>}
text="Orders"
/>


<Menu
icon={<Store/>}
text="Stores"
/>


<Menu
icon={<BarChart3/>}
text="Reports"
/>


</nav>


</div>


)

}


function Menu({icon,text}){

return(

<div className="
flex
gap-3
items-center
cursor-pointer
hover:bg-slate-700
p-3
rounded-lg
">

{icon}

<span>{text}</span>


</div>

)

}