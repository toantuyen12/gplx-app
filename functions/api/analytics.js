export async function onRequestGet() {

const propertyId = "386855850"

return new Response(JSON.stringify({
property: propertyId,
status:"API running"
}),{
headers:{'content-type':'application/json'}
})

}
