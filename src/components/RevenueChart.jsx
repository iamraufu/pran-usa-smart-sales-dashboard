import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
}
from "recharts";


const data=[

{
month:"Jan",
sales:12000
},

{
month:"Feb",
sales:18000
},

{
month:"Mar",
sales:15000
},

{
month:"Apr",
sales:24000
}

];


export default function RevenueChart(){


return(

<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="font-bold text-xl mb-5">
Revenue
</h2>


<ResponsiveContainer width="100%" height={300}>


<LineChart data={data}>


<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Line
type="monotone"
dataKey="sales"
stroke="#2563eb"
strokeWidth={3}
/>


</LineChart>


</ResponsiveContainer>


</div>

)

}