export async function onRequest() {

const propertyId = "386855850";   // property ID của bạn

const url =
`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

const body = {
dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
metrics: [{ name: "activeUsers" }]
};

const res = await fetch(url,{
method:"POST",
headers:{
"Authorization": "Bearer YOUR_ACCESS_TOKEN",
"Content-Type":"application/json"
},
body: JSON.stringify(body)
});

const data = await res.json();

return new Response(JSON.stringify(data),{
headers:{ "Content-Type":"application/json" }
});

}
