export async function onRequest(context) {

const propertyId = "527488007";

const body = {
dateRanges:[{startDate:"today",endDate:"today"}],
metrics:[
{name:"activeUsers"},
{name:"screenPageViews"}
]
};

const res = await fetch(
`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
{
method:"POST",
headers:{
Authorization:`Bearer ${context.env.GA_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify(body)
}
);

const data = await res.json();

return new Response(JSON.stringify(data),{
headers:{ "content-type":"application/json"}
});

}
