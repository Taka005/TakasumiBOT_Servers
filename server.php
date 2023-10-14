<?php
$server = json_decode(file_get_contents("https://api.taka.cf/v1/server"),true);
$data = $server["data"][array_search($_GET["id"],array_column($server["data"],"id"))];
if(!$data) return header("Location: /");
?>
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>TakasumiBOT Servers</title>

        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/assets/img/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="180x180" href="/assets/img/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/img/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="1024x1024" href="/assets/img/takasumibot.png">

        <head prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/ fb# prefix属性: https://ogp.me/ns/ prefix属性#">
        <meta property="og:url" content="https://servers.taka.cf/server/<?= $data["id"] ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="<?= $data["name"] ?>" />
        <meta property="og:description" content="<?= $data["text"] ?>" />
        <meta property="og:site_name" content="TakasumiBOT Servers" />
        <meta property="og:image" content="<?= $data["icon"] ?>" />    

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="/assets/css/server.css">
    </head>
    <body>
        <header>
            <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand text-darl mb-0 h1" href="/">
                        <img src="/assets/img/takasumibot.png" alt="ロゴ" width="30" height="30" class="d-inline-block align-text-top">
                        TakasumiBOT Servers
                    </a>
                </div>
            </nav>
        </header>
	    <main>
            <div class="serverInfo"></div>
	    </main>
        <script src="/assets/js/server.js"></script>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
    </body>
</html>