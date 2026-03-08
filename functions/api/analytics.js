export async function onRequestGet() {

const propertyId = "527488007"

const clientEmail = "analytics-api@cellular-ratio-489414-e1.iam.gserviceaccount.com"

const privateKey = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZnGzENmoZ4lye\n4FXBRz+24ANY0oUfB3oIEGZEaJogzAc1IxRrmCAPm0MU9gZ/xY3p7c/HozumKh1m\nB/Icbss0gAEbZV8UmItUYTwsRjEMDwNq95C5wdbBm6jtoLjohEhVlxCM33ZdJZPD\nooqPh+SDlC+iaXhBtmzk1bXglubtP7B8AqUDu13TcPvXA63QQMrSZce7UbW4kvnQ\n7T6H0t18Wj7xJG+LB9osRfqGF5SvBrXJ5XJJle9TWknO5vwL8efmi6j5mj1spftm\n95sMDRMQLdGO84odwI4sYbf0BsRqk4cgnJLwkBVRusceNwsTkXoPuB8zHM0oUNlg\nH/FKzJ2vAgMBAAECggEATlbCzSwtrB3SbBuko4zrwgEJE2vOIqqFYuvMdSoW+mGY\n4qc7TbSZLiUd1CjxlAPhn+pN17fK3Hni1X1cyqGUI9VFEMDApuB3oCvVBrdKJuYs\nu9Bd2JGQp2hLOyiWCJa+l5lnit9TdBr4BAC60wr/1+J794LymO18bDEHZc/NWHDf\nuy49LoyYXmxn4lPOPKa6zTrPViVX6kagybJ/AaKUY06Y0wgEbACBenN95Aw9ilmi\nKoQM4QjpPyvfX32YEw2oy1GSKNFfVBWJSlmAE/aI1EhqhFS7M99hrwqi0n+6Qh8V\nsS75YhYamYUkQHf/4/Wulh9HYFlH9+19/6Ejcr9++QKBgQD/F6bmx6GYK3RMV2hR\nGMiP5oaHAFzGTerQvDgg4hkIl6hd2y4Qo8Qr9DXRjwgeCjxqghQi46ru7304hE6r\nZF7XF+q54C0tx2Vcah20unmhs9IowcP5IFloM+Suq+ATV8A2XW5w0bDvBkkVTDAC\n2e+d2/2taQPxywhSX+rKbbm5bQKBgQDaYqIo+aSIC71hHbcnzcdsoPaWJbWORk/j\nuEdBhK3igFZMUPLI+rhtuRmFO75nC31u4UbA6r5N9e8d/lvF4505OeT79sjupMbG\nVV+NvVPOTH3frRY5aFGzi7Ix+Gzdmzm/dUamUFAbyNOUvq2QfQUEwM9sniJFlxoA\nHV9s2gZ+CwKBgFKcbki+ze5h5D/07quUwx8XIOoHjAQMp8cBrYu4rTLDKpt6p+hr\noNQ7OlKrZ42S8w3rImpKIMlQddUfw/ptfulZrYKUvwzcTk8nbodg/JMJkT3xwm2j\ntFCyvZRzxRV+jZkNmP6gahR+jJyBF+tUeO0+mWDXaZeckQ1cUsVL06HhAoGBAJi0\nE3PXbCb9HoVEBAg/Kc1ZmFNRNuyvWbl/58N2hSg2WSGwELRcLI38uk2hgvgG3sSj\nnZfUDRHygCtW6tEq4YtcYjOVUtccPSn+FHzGAE3myrWXEE1AFrEXY5jxfx5OJkks\nNiShUAK9oMUHt9GqudGjCOeIg6pph/LAlzNEGPoVAoGAZj2WQ/UhxWwm2GriST0n\nchu7vRMLytbWHn4gqzvMFAR47ZmPdcx8Y12MVuGZFjp1qXtB6DnYxClv344VBA5N\nxK1dSREWVJfN99bi7uCeKlthUAqxoYDczI6o86HmG1J6di0K2KHJoUeMpW+CgioG\nTZLLKbcGNBsF44Wz+VsCleE=\n-----END PRIVATE KEY-----\n`

// tạo JWT header
const header = {
alg: "RS256",
typ: "JWT"
}

// tạo JWT payload
const payload = {
iss: clientEmail,
scope: "https://www.googleapis.com/auth/analytics.readonly",
aud: "https://oauth2.googleapis.com/token",
exp: Math.floor(Date.now()/1000)+3600,
iat: Math.floor(Date.now()/1000)
}

function base64url(source){
return btoa(JSON.stringify(source))
.replace(/=/g,'')
.replace(/\+/g,'-')
.replace(/\//g,'_')
}

const unsignedJWT = base64url(header)+"."+base64url(payload)

// Cloudflare có WebCrypto
const encoder = new TextEncoder()

const keyData = privateKey
.replace("-----BEGIN PRIVATE KEY-----","")
.replace("-----END PRIVATE KEY-----","")
.replace(/\n/g,"")

const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0))

const cryptoKey = await crypto.subtle.importKey(
"pkcs8",
binaryKey.buffer,
{
name:"RSASSA-PKCS1-v1_5",
hash:"SHA-256"
},
false,
["sign"]
)

const signature = await crypto.subtle.sign(
"RSASSA-PKCS1-v1_5",
cryptoKey,
encoder.encode(unsignedJWT)
)

const signedJWT = unsignedJWT+"."+btoa(String.fromCharCode(...new Uint8Array(signature)))
.replace(/=/g,'')
.replace(/\+/g,'-')
.replace(/\//g,'_')

// lấy access token
const tokenRes = await fetch("https://oauth2.googleapis.com/token",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:new URLSearchParams({
grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",
assertion:signedJWT
})
})

const tokenData = await tokenRes.json()

// gọi Google Analytics
const res = await fetch(
`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
{
method:"POST",
headers:{
Authorization:`Bearer ${tokenData.access_token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
dateRanges:[{startDate:"7daysAgo",endDate:"today"}],
metrics:[{name:"activeUsers"}]
})
}
)

const data = await res.json()

return new Response(JSON.stringify(data),{
headers:{'content-type':'application/json'}
})

}
