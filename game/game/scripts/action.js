let movePlayer = () => {
    globalVars.player.moveUp(globalVars.actions.upPressed);
    for(entity of globalVars.parameters.map.entities) { //Столкновение для элементов карты
        if(globalVars.player.hitbox.checkCollision(entity.hitbox)) {
            globalVars.player.moveDown(true);
        }
    }
    for(player of globalVars.players) { //Столкновение для игроков
        if(globalVars.player.hitbox.checkCollision(player.hitbox)) {
            globalVars.player.moveDown(true);
        }
    }

    globalVars.player.moveDown(globalVars.actions.downPressed);
    for(entity of globalVars.parameters.map.entities) {
        if(globalVars.player.hitbox.checkCollision(entity.hitbox)) {
            globalVars.player.moveUp(true);
        }
    }
    for(player of globalVars.players) {
        if(globalVars.player.hitbox.checkCollision(player.hitbox)) {
            globalVars.player.moveUp(true);
        }
    }

    globalVars.player.moveLeft(globalVars.actions.leftPressed);
    for(entity of globalVars.parameters.map.entities) {
        if(globalVars.player.hitbox.checkCollision(entity.hitbox)) {
            globalVars.player.moveRight(true);
        }
    }
    for(player of globalVars.players) {
        if(globalVars.player.hitbox.checkCollision(player.hitbox)) {
            globalVars.player.moveRight(true);
        }
    }

    globalVars.player.moveRight(globalVars.actions.rightPressed);
    for(entity of globalVars.parameters.map.entities) {
        if(globalVars.player.hitbox.checkCollision(entity.hitbox)) {
            globalVars.player.moveLeft(true);
        }
    }
    for(player of globalVars.players) {
        if(globalVars.player.hitbox.checkCollision(player.hitbox)) {
            globalVars.player.moveLeft(true);
        }
    }
}

let movePlayers = () => {
    for(player of globalVars.players) {
        if(player.x < player.newX) {
            player.moveRight(true);
            if (player.hitbox.checkCollision(globalVars.player.hitbox)) {
                player.moveLeft(true);
            }
        }
        if(player.x > player.newX) {
            player.moveLeft(true);
            if(player.hitbox.checkCollision(globalVars.player.hitbox)) {
                player.moveRight(true);
            }
        }
        if(player.y < player.newY) {
            player.moveDown(true);
            if(player.hitbox.checkCollision(globalVars.player.hitbox)) {
                player.moveUp(true);
            }
        }
        if(player.y > player.newY) {
            player.moveUp(true);
            if(player.hitbox.checkCollision(globalVars.player.hitbox)) {
                player.moveDown(true);
            }
        }
        /*if(Math.sqrt((player.newX - player.x) * (player.newX - player.x) + (player.newY - player.y) * (player.newY - player.y)) > 10) {
            player.x = player.newX;
            player.y = player.newY;
        }*/
    }
}

let calculateDirectionOfMouse = () => {
    let vectorX = globalVars.mouseCoords.x - canvas.width / 2;
    let vectorY = globalVars.mouseCoords.y - canvas.height / 2;
    
    let vectorLength = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

    globalVars.mouseDirectionCoords.x = vectorX / vectorLength;
    globalVars.mouseDirectionCoords.y = vectorY / vectorLength;
}

let moveProjectiles = () => {
    for(i in globalVars.player.projectiles) {
        globalVars.player.projectiles[i].moveProjectile();
        for(entity of globalVars.parameters.map.entities) {
            if(globalVars.player.projectiles[i].hitbox.checkCollision(entity.hitbox)) {
                globalVars.player.projectiles.splice(i, 1);
                break;
            }
        }
        if(globalVars.player.projectiles[i] !== undefined) {
            for(player of globalVars.players) {
                if(globalVars.player.projectiles[i].hitbox.checkCollision(player.hitbox)) {
                    globalVars.player.projectiles.splice(i, 1);
                    globalVars.player.killCounter += 1;
                    socket.emit('action', {
                        action: 'kill',
                        player: globalVars.player,
                        killedPlayer: player
                    })
                    if (globalVars.playerKills.length > 5) {
                        globalVars.playerKills.shift();
                    } 
                    globalVars.playerKills.push(globalVars.player.name + ' kills ' + player.name);
                    break;
                }
            }
        }
    }
}

let moveEnemyProjectiles = () => {
    for(player of globalVars.players) {
        for(i in player.projectiles) {
            if(player.projectiles[i] !== undefined) {
                player.projectiles[i].moveProjectile();
            }
            if(player.projectiles[i] !== undefined) {
                for(entity of globalVars.parameters.map.entities) {
                    if(player.projectiles[i].hitbox.checkCollision(entity.hitbox)) {
                        player.projectiles.splice(i, 1);
                        break
                    }
                }
            }
            if(player.projectiles[i] !== undefined) {
                for(enemyEnemyPlayer of globalVars.players) {
                    if(enemyEnemyPlayer.id !== player.id) {
                        if(player.projectiles[i].hitbox.checkCollision(enemyEnemyPlayer.hitbox)) {
                            player.projectiles.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            if(player.projectiles[i] !== undefined) {
                if(player.projectiles[i].hitbox.checkCollision(globalVars.player.hitbox)) {
                    player.projectiles.splice(i, 1);
                }
            }
        }
    }
}

let playerActions = () => {
    if (globalVars.actions.mousePressed) {
        let hitbox = {
            x: globalVars.player.x,
            y: globalVars.players.y,
            width: 5,
            height: 5
        };
        let projectile = new Projectile(globalVars.player.x, globalVars.player.y, globalVars.mouseDirectionCoords.x, globalVars.mouseDirectionCoords.y, 10, new Skin(5, 5), new Hitbox(hitbox));
        globalVars.player.projectiles.push(projectile);
        globalVars.actions.mousePressed = false;

        socket.emit('action', {
            action: 'shoot',
            player: globalVars.player,
            direction: globalVars.mouseDirectionCoords
        });
    }
}