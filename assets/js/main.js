(async function(){
    const data = await fetch("https://api.taka.cf/v1/server")
        .then(res=>res.json())
        .catch(error=>{
            console.log(error);
        });

    data.data.reverse();

    console.log(`${data.data.length}個のサーバーを取得しました`);

    document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
        data.data.map(server=>{
            const check = "987698915820335124" === server.id?`<span class="badge rounded-pill bg-success">公式</span>`:"";

            return `<div class="col-sm-6 Server" id=${server.id}>
                <div class="card text-center">
                    <div class="card-body">
                        <div class="serverLink">
                            <h5 class="card-title">${escape(server.name)} ${check}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">- ${server.count}人 -</h6>
                            <p class="card-text">${escape(server.text)}</p>
                            <a href="./server.html?id=${server.id}"></a>
                        </div>
                        <a href="https://discord.gg/${server.code}" class="btn btn-outline-secondary" target="_blank">サーバーに参加する</a>
                        <p class="card-text"><small class="text-muted">${time(new Date() - new Date(server.time))}前</small></p>
                    </div>
                </div>
            </div> `;
        }).join("")
    );

    const serverForm = document.getElementById("serverForm");
    const serverInput = document.getElementById("serverInput");

    serverForm.addEventListener("submit",async(event)=>{
        event.preventDefault();
        document.querySelector(".serverList").innerHTML = "";
        document.querySelector("#result").remove();
        
        if(serverInput.value.length > 0){
            const filter = data.data.filter(server=>server.name.indexOf(serverInput.value) != -1);

            serverForm.insertAdjacentHTML("beforeend",`<div id="result" class="form-text">${filter.length}件ヒットしました</div>`)
            document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
                filter.map(server=>{
                    const check = "987698915820335124" === server.id?`<span class="badge rounded-pill bg-success">公式</span>`:"";
        
                    return `<div class="col-sm-6 Server" id=${server.id}>
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">${escape(server.name)} ${check}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">- ${server.count}人 -</h6>
                                <p class="card-text">${escape(server.text)}</p>
                                <a href="https://discord.gg/${server.code}" class="btn btn-outline-secondary" target="_blank">サーバーに参加する</a>
                                <p class="card-text"><small class="text-muted">${time(new Date() - new Date(server.time))}前</small></p>
                            </div>
                        </div>
                    </div> `;
                }).join("")
            );
        }else{
            serverForm.insertAdjacentHTML("beforeend",`<div id="result" class="form-text"></div>`)
            document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
                data.data.map(server=>{
                    const check = "987698915820335124" === server.id?`<span class="badge rounded-pill bg-success">公式</span>`:"";

                    return `<div class="col-sm-6 Server" id=${server.id}>
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">${escape(server.name)} ${check}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">- ${server.count}人 -</h6>
                                <p class="card-text">${escape(server.text)}</p>
                                <a href="https://discord.gg/${server.code}" class="btn btn-outline-secondary" target="_blank">サーバーに参加する</a>
                                <p class="card-text"><small class="text-muted">${time(new Date() - new Date(server.time))}前</small></p>
                            </div>
                        </div>
                    </div> `;
                }).join("")
            );
        }
        serverInput.value = "";
    });
})();

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