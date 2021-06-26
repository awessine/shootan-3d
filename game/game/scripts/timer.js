//LOGIN
let pointerTimer = () => { 
    if(globalVars.pointer === "") {
        globalVars.pointer = "_"
        globalVars.shift = 11;
    }else if(globalVars.pointer === "_") {
        globalVars.pointer = "";
        globalVars.shift = 0;
    }
};

//GAME
let drawTimer = () => {
    clearCanvas();
    if(globalVars.state === 'login') {
        drawLoginScreen();
    }else if(globalVars.state === 'online') {
        if(globalVars.player.state === 'alive') {
            drawPlayers();
            //drawFieldOfVision();
            drawPlayer();
            drawEntities();
            //drawCursor();
            drawProjectiles();
            drawEnemyProjectiles();
            drawDisconnPlayers();
            drawPlayerKills();
        }else if(globalVars.player.state === 'dead') {
            drawDeadScreen();
            drawDeathMessage();
        }
        
    }
    
};
let gameTimer = () => {
    if(globalVars.state === 'online') {
        calculateDirectionOfMouse();
        movePlayer();
        movePlayers();
        playerActions();
        moveProjectiles();
        moveEnemyProjectiles();
        if(globalVars.player.state === 'dead') {
            globalVars.deadTimer -= 0.005;
            if(Math.ceil(globalVars.deadTimer) === 0) {
                globalVars.player.state = 'alive';
                globalVars.deadTimer = 3;
                let randomIndex = Math.ceil(Math.random() * globalVars.parameters.map.spawnPoints.length - 1);
                let randomX = globalVars.parameters.map.spawnPoints[randomIndex].x;
                let randomY = globalVars.parameters.map.spawnPoints[randomIndex].y;
                globalVars.player.x = randomX;
                globalVars.player.y = randomY;
                globalVars.player.hitbox.x = randomX;
                globalVars.player.hitbox.y = randomY;
                console.log(globalVars.player);
                socket.emit('action', {
                    action: 'respawn',
                    player: globalVars.player
                });
            }
        }
    }
};
let sendActionTimer = () => {
    //Отправление на сервер новых координат
    if(globalVars.oldPlayerCoordinates.x !== globalVars.player.x || globalVars.oldPlayerCoordinates.y !== globalVars.player.y) {
        socket.emit('action', {
            action: 'move',
            player: globalVars.player
        });
    }
    
    globalVars.oldPlayerCoordinates.x = globalVars.player.x;
    globalVars.oldPlayerCoordinates.y = globalVars.player.y;
};