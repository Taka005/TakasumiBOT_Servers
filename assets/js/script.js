async function main(){
    const data = await fetch("https://api.taka.cf/v1/server")
        .then(res=>res.json())
        .catch(error=>{
            console.error(error);
            alert(`サーバーを取得出来ませんでした\n\nエラーコード: ${error}`);
        });
    data.data.reverse();

    const guilds = await fetch("https://api.taka.cf/v1/discord/guilds")
        .then(res=>res.json())
        .catch(error=>{
            console.error(error);
            alert(`サーバー情報を取得出来ませんでした\n\nエラーコード: ${error}`);
        });

    console.log(`${data.data.length}個のサーバーを取得しました`);
    console.log(`${Object.keys(guilds.data).length}個のサーバー情報を取得しました`);

    document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
        data.data.map(server=>{
            const guild = guilds.data[server.id];
            const check = server.id === "987698915820335124"?`<span class="badge rounded-pill bg-primary">公式</span>`:"";

            return `<div class="col-sm-6 Server">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title" id=${server.id}>${guild.name} ${check}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">- ${guild.memberCount}人 -</h6>
                        <p class="card-text">${server.text}</p>
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
            const filter = Object.entries(guilds.data).filter(guild=>guild[1].name.indexOf(serverInput.value) != -1);

            serverForm.insertAdjacentHTML("beforeend",`<div id="result" class="form-text">${data.data.filter(s=>filter.find(g=>g[0] === s.id)).length}件ヒットしました</div>`)
            document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
                data.data.map(server=>{
                    if(filter.find(g=>g[0] === server.id)){
                        const guild = filter.find(g=>g[0] === server.id)[1];
                        const check = server.id === "987698915820335124"?`<span class="badge rounded-pill bg-primary">公式</span>`:"";
            
                        return `<div class="col-sm-6 Server">
                            <div class="card text-center">
                                <div class="card-body">
                                    <h5 class="card-title" id=${server.id}>${guild.name} ${check}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">- ${guild.memberCount}人 -</h6>
                                    <p class="card-text">${server.text}</p>
                                    <a href="https://discord.gg/${server.code}" class="btn btn-outline-secondary" target="_blank">サーバーに参加する</a>
                                    <p class="card-text"><small class="text-muted">${time(new Date() - new Date(server.time))}前</small></p>
                                </div>
                            </div>
                        </div> `;
                    }
                }).join("")
            );
        }else{
            serverForm.insertAdjacentHTML("beforeend",`<div id="result" class="form-text"></div>`)
            document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
                data.data.map(server=>{
                    const guild = guilds.data[server.id];
                    const check = server.id === "987698915820335124"?`<span class="badge rounded-pill bg-primary">公式</span>`:"";

                    return `<div class="col-sm-6 Server">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title" id=${server.id}>${guild.name} ${check}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">- ${guild.memberCount}人 -</h6>
                                <p class="card-text">${server.text}</p>
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
}

main();

function time(ms){  
    const t = Math.round(ms / 1000);
    const h = Math.floor(t / 3600);
    const m = Math.floor((t - h * 3600) / 60);
    const s = Math.floor(t - h * 3600 - m * 60);
  
    if(h === 0){
        if(m === 0){
            return `${s}秒`;
        }else{
            return `${m}分`;
        }
    }else{
        return `${h}時間`;
    }
}