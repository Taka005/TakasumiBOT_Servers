(async function(){
    const data = await fetch("https://api.taka.cf/v1/server")
        .then(res=>res.json())
        .catch(error=>{
            console.log(error);
        });

    data.data.reverse();

    console.log(`${data.data.length}個のサーバーを取得しました`);

    document.querySelector(".count").innerText = `${data.data.length}サーバーを掲載中`;

    const serverForm = document.getElementById("serverForm");
    const serverInput = document.getElementById("serverInput");

    const params = new URLSearchParams(window.location.search);
    if(params.has("q")&&params.get("q").length > 0){
        const filter = data.data.filter(server=>server.name.indexOf(params.get("q")) != -1);

        serverForm.insertAdjacentHTML("beforeend",`<div class="form-text result">${filter.length}件ヒットしました</div>`)
        ServerList(filter);
    }else if(params.has("tag")&&params.get("tag").length > 0){
        const filter = data.data.filter(server=>{
            if(!server.text.match(/#[^\s#]+/g)) return false;
            return server.text.match(/#[^\s#]+/g)
              .map(tag=>tag.trim())
              .find(tag=>tag.startsWith(`#${params.get("tag").trim()}`))
        });

        serverForm.insertAdjacentHTML("beforeend",`<div class="form-text result">${filter.length}件ヒットしました</div>`)
        ServerList(filter);
    }else{
        ServerList(data.data);
    }

    serverForm.addEventListener("submit",async(event)=>{
        event.preventDefault();
        
        document.querySelector(".serverList").innerHTML = "";
        document.querySelectorAll(".result").forEach(result=>result.remove());
        
        if(serverInput.value.length > 0){
            let filter;
            if(serverInput.value.match(/#[^\s#]+/)?.[0]){
                filter = data.data.filter(server=>{
                    if(!server.text.match(/#[^\s#]+/g)) return false;
                    return server.text.match(/#[^\s#]+/g)
                      .map(tag=>tag.trim())
                      .find(tag=>tag.startsWith(serverInput.value.match(/#[^\s#]+/)[0].trim()))
                });
            }else{
                filter = data.data.filter(server=>server.name.indexOf(serverInput.value) != -1);
            }

            serverForm.insertAdjacentHTML("beforeend",`<div class="form-text result">${filter.length}件ヒットしました</div>`)
            ServerList(filter);            
        }else{
            serverForm.insertAdjacentHTML("beforeend",`<div class="form-text result"></div>`)
            ServerList(data.data);
        }
        serverInput.value = "";
    });
})();

function ServerList(data){
    document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
        data.map(server=>{
            const check = "987698915820335124" === server.id?`<span class="badge rounded-pill bg-success">公式</span>`:"";

            return `<div class="col-sm-6 Server" id=${server.id}>
                <div class="card text-center">
                    <div class="card-body">
                        <div class="serverLink">
                            <h5 class="card-title">${escape(server.name)} ${check}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">- ${server.count}人 -</h6>
                            <p class="card-text">${tag(escape(server.text))}</p>
                            <a class="Link" href="./server.html?id=${server.id}"></a>
                        </div>
                        <a href="https://discord.gg/${server.code}" class="btn btn-outline-secondary" target="_blank">サーバーに参加する</a>
                        <p class="card-text"><small class="text-muted">${time(new Date() - new Date(server.time))}前</small></p>
                    </div>
                </div>
            </div> `;
        }).join("")
    );
}

function tag(str){
    return str.replace(/(#[^\s#]+)/g,`<a class='tag' aria-label='タグ'>$&</a>`);
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