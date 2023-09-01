(async function(){
    const params = new URLSearchParams(window.location.search);
    if(!params.has("id")) return window.location = "./";

    const servers = await fetch("https://api.taka.cf/v1/server")
        .then(res=>res.json())
        .catch(error=>{
            console.log(error);
        });

    console.log(`${data.data.length}個のサーバーを取得しました`);

    const server = servers.find(server=>server.id === params.get("id"));
    if(!server) return window.location = "./";

    const guild = await fetch(`https://api.taka.cf/v1/discord/guild?id=${server.id}`)
        .then(res=>res.json())
        .catch(error=>{
            console.log(error);
        });

    console.log(`${guild.data.name}(${guild.data.id})を取得しました`);

    document.querySelector("title").innerText = guild.data.name;

})();