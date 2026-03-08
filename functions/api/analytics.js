export async function onRequest(context) {

const clientEmail = context.env.GA_CLIENT_EMAIL;
const privateKey = context.env.GA_PRIVATE_KEY.replace(/\\n/g,"\n");
const propertyId = context.env.GA_PROPERTY_ID;

if(!clientEmail) return new Response("Missing GA_CLIENT_EMAIL");
if(!privateKey) return new Response("Missing GA_PRIVATE_KEY");
if(!propertyId) return new Response("Missing GA_PROPERTY_ID");

const now = Math.floor(Date.now()/1000);

const header = {
alg:"RS256",
typ:"JWT"
};

const claim = {
iss: clientEmail,
scope:"https://www.googleapis.com/auth/analytics.readonly",
aud:"https://oauth2.googleapis.com/token",
exp: now + 3600,
iat: now
};

function base64url(obj){
return btoa(JSON.stringify(obj))
.replace(/\+/g,"-")
.replace(/\//g,"_")
.replace(/=+$/,"");
}

const unsigned = `${base64url(header)}.${base64url(claim)}`;

const encoder = new TextEncoder();

const key = await crypto.subtle.importKey(
"pkcs8",
pemToArrayBuffer(privateKey),
{
name:"RSASSA-PKCS1-v1_5",
hash:"SHA-256"
},
false,
["sign"]
);

const signature = await crypto.subtle.sign(
"RSASSA-PKCS1-v1_5",
key,
encoder.encode(unsigned)
);

const signedJWT = `${unsigned}.${arrayBufferToBase64Url(signature)}`;

const tokenRes = await fetch("https://oauth2.googleapis.com/token",{
method:"POST",
headers:{ "content-type":"application/x-www-form-urlencoded" },
body:`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signedJWT}`
});

const tokenData = await tokenRes.json();

if(!tokenData.access_token){
return new Response(JSON.stringify(tokenData));
}

const accessToken = tokenData.access_token;

const analyticsRes = await fetch(
`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
{
method:"POST",
headers:{
Authorization:`Bearer ${accessToken}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
dateRanges:[{startDate:"today",endDate:"today"}],
metrics:[
{name:"activeUsers"}
]
})
}
);

const data = await analyticsRes.json();

let users = 0;

if(data.rows){
users = data.rows[0].metricValues[0].value;
}

return new Response(JSON.stringify({
activeUsers: users
}),{
headers:{ "content-type":"application/json"}
});

}

function pemToArrayBuffer(pem){
const b64 = pem
.replace("-----BEGIN PRIVATE KEY-----","")
.replace("-----END PRIVATE KEY-----","")
.replace(/\n/g,"");

const binary = atob(b64);
const buffer = new Uint8Array(binary.length);

for(let i=0;i<binary.length;i++){
buffer[i] = binary.charCodeAt(i);
}

return buffer.buffer;
}

function arrayBufferToBase64Url(buffer){
let binary="";
const bytes = new Uint8Array(buffer);

for(let i=0;i<bytes.byteLength;i++){
binary += String.fromCharCode(bytes[i]);
}

return btoa(binary)
.replace(/\+/g,"-")
.replace(/\//g,"_")
.replace(/=+$/,"");
}
