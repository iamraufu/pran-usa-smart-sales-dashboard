export default function StatCard({
title,
value,
icon
}){


return(

<div className="
bg-white
rounded-2xl
shadow
p-6
">


<div className="
flex
justify-between
">


<div>

<p className="text-gray-500">
{title}
</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{value}

</h2>


</div>


<div className="
bg-blue-100
p-3
rounded-xl
">

{icon}

</div>


</div>


</div>

)

}