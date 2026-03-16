export async function onRequest(context) {

return new Response(JSON.stringify({
status:"tracked"
}),{
headers:{
"content-type":"application/json"
}
})

}
