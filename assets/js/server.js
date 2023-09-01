const params = new URLSearchParams(window.location.search);

if(params.has("id")) return location.href = "./";

const servers = await fetch("https://api.taka.cf/v1/server")
    .then(res=>res.json())
    .catch(error=>{
        console.log(error);
    });

const server = servers.find(server=>server.id === params.get("id"));
if(!server[0]) return location.href = "./";

const guild = await fetch(`https://api.taka.cf/v1/discord/guild?id=${server.id}`)
    .then(res=>res.json())
    .catch(error=>{
        console.log(error);
    });

document.querySelector("title").innerText = guild.name;