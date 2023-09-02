(async function(){
    const params = new URLSearchParams(window.location.search);
    if(!params.has("id")) return window.location = "./";

    const servers = await fetch("https://api.taka.cf/v1/server")
        .then(res=>res.json())
        .catch(error=>{
            console.log(error);
        });

    console.log(`${servers.data.length}個のサーバーを取得しました`);

    const server = servers.data.find(server=>server.id === params.get("id"));
    if(!server) return window.location = "./";

    const guild = await fetch(`https://api.taka.cf/v1/discord/guild?id=${server.id}`)
        .then(res=>res.json())
        .catch(error=>{
            console.log(error);
        });

    console.log(`${guild.data.name}(${guild.data.id})を取得しました`);

    document.querySelector("title").innerText = guild.data.name;

    document.querySelector(".serverInfo").insertAdjacentHTML("afterbegin",`
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="./">サーバー一覧</a></li>
                <li class="breadcrumb-item active">${escape(guild.data.name)}</li>
            </ol>
        </nav>
        <div class="card text-center">
            <div>
                <img src=${guild.data.iconURL||"https://cdn.discordapp.com/embed/avatars/0.png"} class="icon" width="150" height="150" alt="サーバーアイコン">         
            </div>
            <div class="card-body">
                <h1 class="card-title">${escape(guild.data.name)}</h1>
                <p class="card-text">
                    <h5>
                        <span class="badge rounded-pill bg-light text-dark">${guild.data.onlineCount}がオンライン ${guild.data.memberCount}人</span>
                        ${guild.data.nitro !== 0 ? `<span class="badge rounded-pill bg-danger nitro">${guild.data.nitro}ブースト</span>`:""}
                    </h5>
                </p>
                <p class="card-text">${tag(escape(server.text))}</p>
                <a href="https://discord.gg/${server.code}" class="btn btn-lg btn-outline-secondary" target="_blank">サーバーに参加する</a>
                <p class="card-text"><small class="text-muted">${time(new Date() - new Date(server.time))}前</small></p>
            </div>
        </div>
    `)
})();

function tag(str){
    return str.replace(/#[^\s#]+/g,"<h6>$&</h6>");
}

function escape(str){
    return str.replace(/[&'"<>]/g,(m)=>({
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;",
        "/": "&sol;"
    })[m]);
}

function time(ms){
    const t = Math.round(ms / 1000);
    const d = Math.floor(t / 86400);
    const h = Math.floor((t - d * 86400) / 3600);
    const m = Math.floor((t - d * 86400 - h * 3600) / 60);
    const s = Math.floor(t - d * 86400 - h * 3600 - m * 60);
  
    if(d === 0){
        if(h === 0){
            if(m === 0){
                return `${s}秒`;
            }else{
                return `${m}分`;
            }
        }else{
            return `${h}時間`;
        }
    }else{
        return `${d}日`;
    }
}