
export default function BestProducts(){


const products=[

{
name:"Basil Lychee Drink",
sales:350
},

{
name:"Mango Drink",
sales:240
},

{
name:"Samosa",
sales:190
}

];


return(

<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="font-bold text-xl mb-5">
Best Sellers
</h2>


{

products.map((p,i)=>(


<div 
key={i}
className="
flex
justify-between
border-b
py-3
">


<span>
{p.name}
</span>


<b>
{p.sales} Boxes
</b>


</div>


))

}


</div>

)

}