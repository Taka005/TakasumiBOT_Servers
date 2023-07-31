async function main(){
    const data = await fetch("https://api.taka.cf/v1/server")
        .then(res=>res.json())
        .catch(error=>{
            console.error(error);
            alert(`サーバーを取得出来ませんでした\n\nエラーコード: ${error}`);
        });

    await fetch("https://api.taka.cf/v1/discord/guilds")
        .then(res=>res.json())
        .then(res=>{
            console.log(`${data.data.length}個のサーバーを取得しました`);
            console.log(`${Object.keys(res.data).length}個のサーバー情報を取得しました`);
        
            document.querySelector(".serverList").insertAdjacentHTML("afterbegin",
                data.data.reverse().map(server=>{
                    console.log(JSON.stringify(server.id));
                    const guild = res.data[server.id];
                    console.log(JSON.stringify(guild));
        
                    return `<div class="col-sm-6 Server">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title" id=${server.id}>${guild.name} - ${guild.memberCount}人</h5>
                                <p class="card-text">${server.text}</p>
                                <a href="https://discord.gg/${server.code}" class="btn btn-secondary" target="_blank">サーバーに参加</a>
                                <p class="card-text"><small class="text-muted">${time(new Date() - new Date(server.time))}前</small></p>
                            </div>
                        </div>
                    </div> `;
                }).join("")
            );
        })
        .catch(error=>{
            console.error(error);
            alert(`サーバー情報を取得出来ませんでした\n\nエラーコード: ${error}`);
        });

    
}

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

main();