window.onload = window.onresize = () => {
    canvas.width = document.documentElement.clientWidth * 0.998;
    canvas.height = document.documentElement.clientHeight  * 0.995;
    globalVars.corners = {
        leftUp: {x: 0, y: 0},
        leftDown: {x: 0, y: canvas.height},
        rightUp: {x: canvas.width, y: 0},
        rightDown: {x: canvas.width, y: canvas.height}
    }
    console.log(globalVars.corners);
    drawTimer();
}
canvas.width = globalVars.screenWidth;
canvas.height = globalVars.screedHeight;

socket.on('connect', () => {
    globalVars.state = 'login';
    setInterval(pointerTimer, 500);
    var draw = setInterval(drawTimer, 5);

    document.addEventListener('keydown', loginKeyboardListener);
    document.addEventListener('keypress', loginTypingListener);
});

socket.on('online', data => {
    globalVars.state = 'online';
    clearInterval(pointerTimer);
    document.removeEventListener('keydown', loginKeyboardListener);
    document.removeEventListener('keypress', loginTypingListener);

    document.addEventListener('keydown', playerKeyDownListener);
    document.addEventListener('keyup', playerKeyUpListener);
    document.addEventListener('mousedown', playerMouseDownListener);
    document.addEventListener('mouseup', playerMouseUpListener);
    canvas.onmousemove = canvas.onmouseover = e => {
        globalVars.mouseCoords.x = e.offsetX;
        globalVars.mouseCoords.y = e.offsetY;
    }

    //Подготовка к игре, заполнение поля игроками
    globalVars.parameters = data.parameters;
    globalVars.player = new Player(data.player);
    data.players.forEach(player => {
        player.projectiles = [];
        globalVars.players.push(new Player(player));
    });
    for(player of globalVars.players) {
        if(player.id === globalVars.player.id) {
            globalVars.players.splice(globalVars.players.indexOf(player), 1);
        }
    }
    console.log(globalVars.players);
    setInterval(gameTimer, 5);
    setInterval(sendActionTimer, 15);

    //Процесс обмена данными с сервером во время игры
    socket.on('update', data => {
        for(playerMessage of data) {
            if(playerMessage.action === 'connect') {
                let player = new Player(playerMessage.player);
                player.projectiles = [];
                globalVars.players.push(player);
                if (globalVars.disconnPlayers.length > 5) {
                    globalVars.disconnPlayers.shift();
                }
                globalVars.disconnPlayers.push(player.name + ' connected');
            }
            if(playerMessage.action === 'move') {
                for(playerClient of globalVars.players) {
                    if(playerMessage.player.id === playerClient.id) {
                        playerClient.newX = playerMessage.player.x;
                        playerClient.newY = playerMessage.player.y;
                    }
                }
            }
            if(playerMessage.action === 'shoot') {
                for(playerClient of globalVars.players) {
                    if (playerMessage.player.id === playerClient.id) {
                        let hitbox = {
                            x: globalVars.player.x,
                            y: globalVars.player.y,
                            width: 5,
                            height: 5
                        };
                        let projectile = new Projectile(playerMessage.player.x, playerMessage.player.y, playerMessage.direction.x, playerMessage.direction.y, 10, new Skin(5, 5), new Hitbox(hitbox));
                        playerClient.projectiles.push(projectile);
                        
                    }
                }
            }
            if(playerMessage.action === 'kill') {
                if(playerMessage.killedPlayer.id === globalVars.player.id) {
                    globalVars.player.x = 10000;
                    globalVars.player.y = 10000;
                    globalVars.player.hitbox.x = 10000;
                    globalVars.player.hitbox.y = 10000;
                    globalVars.player.state = 'dead';
                }
                for(playerClient of globalVars.players) {
                    if(playerMessage.player.id === playerClient.id) {
                        playerClient.killCounter++;
                        if (globalVars.playerKills.length > 5) {
                            globalVars.playerKills.shift();
                        } 
                        globalVars.playerKills.push(playerClient.name + ' kills ' + playerMessage.killedPlayer.name);
                    }
                    if(playerMessage.killedPlayer.id === playerClient.id) {
                        playerClient.x = 10000;
                        playerClient.y = 10000;
                        playerClient.hitbox.x = 10000;
                        playerClient.hitbox.y = 10000;
                    }
                }
            }
            if(playerMessage.action === 'respawn') {
                for(playerClient of globalVars.players) {
                    if (playerMessage.player.id === playerClient.id) {
                        playerClient.x = playerMessage.player.x;
                        playerClient.y = playerMessage.player.y;
                        playerClient.hitbox = new Hitbox(playerMessage.player.hitbox);
                        console.log(playerClient);
                        console.log(playerMessage.player);
                    }
                }
            }
            if(playerMessage.action === 'disconnect') {
                for(playerClient of globalVars.players) {
                    if(playerMessage.player.id === playerClient.id) {
                        if (globalVars.disconnPlayers.length > 5) {
                            globalVars.disconnPlayers.shift();
                        }
                        globalVars.disconnPlayers.push(playerClient.name + ' disconnected');
                        globalVars.players.splice(globalVars.players.indexOf(playerClient), 1);
                    }
                }
            }
        }
    
        for (player of globalVars.players) {
            if (player.id === globalVars.player.id) {
                globalVars.players.splice(globalVars.players.indexOf(player), 1);
            }
        }
        //console.log(data);
        //console.log(globalVars.players);
    });
});

socket.on('disconnect', () => {

});
