let drawPlayer = () => {
    ctx.fillStyle = 'rgb(255,120,0)';
    ctx.fillRect(canvas.width / 2, canvas.height / 2, globalVars.player.skin.width, globalVars.player.skin.height);
    ctx.font = '20px arial';
    ctx.textAlign = 'center';
    ctx.fillText(globalVars.player.name, canvas.width / 2 + globalVars.player.skin.width / 2, canvas.height / 2 - 10);
    ctx.fillStyle = 'black';
    ctx.fillText(globalVars.player.killCounter, canvas.width / 2 + 25, canvas.height / 2 + 30);
}
let drawPlayers = () => {
    for(player of globalVars.players) {
        ctx.fillStyle = 'red';
        ctx.fillRect(player.x + canvas.width / 2 - globalVars.player.x, player.y + canvas.height / 2 - globalVars.player.y, player.skin.width, player.skin.height);
        ctx.font = '20px arial';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, player.x + player.skin.width / 2 + canvas.width / 2 - globalVars.player.x, player.y - 10 + canvas.height / 2 - globalVars.player.y);
        ctx.fillStyle = 'black';
        ctx.fillText(player.killCounter, player.x + player.skin.width / 2 + canvas.width / 2 - globalVars.player.x, player.y + 30 + canvas.height / 2 - globalVars.player.y);
    }
}
let drawEntities = () => {
    ctx.fillStyle = 'yellow'
    globalVars.parameters.map.entities.forEach(entity => {
        ctx.fillRect(entity.x + canvas.width / 2 - globalVars.player.x, entity.y + canvas.height / 2 - globalVars.player.y, entity.width, entity.height);
    });
}
let drawLoginScreen = () => {
    ctx.fillStyle = 'yellow';
    ctx.font = '40px arial';
    ctx.textAlign = 'center';
    ctx.fillText("ВВЕДИТЕ ИМЯ", canvas.width / 2, -75 + canvas.height / 2);
    ctx.fillText(globalVars.playerName + globalVars.pointer, globalVars.shift + canvas.width / 2, canvas.height / 2);
}
let drawConnect = () => {
    ctx.fillStyle = 'black';
    ctx.font = '10px arial';
    //ctx.textAlign = 'center';
    ctx.fillText(globalVars.playerName, canvas.width / 2, -75 + canvas.height / 2);
    //ctx.fillText(globalVars.playerName + globalVars.pointer, globalVars.shift + canvas.width / 2, canvas.height / 2);
}
let drawDeathMessage = () => {
    ctx.fillStyle = 'black';
    ctx.font = '10px arial';
    //ctx.textAlign = 'center';
    ctx.fillText(globalVars.playerName, canvas.width / 2, -75 + canvas.height / 2);
    //ctx.fillText(globalVars.playerName + globalVars.pointer, globalVars.shift + canvas.width / 2, canvas.height / 2);
}
/*let drawFieldOfVision = () => {
    //ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillStyle = "gray";

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + globalVars.player.skin.width / 2, canvas.height / 2 + globalVars.player.skin.height / 2);
    let newX = globalVars.mouseDirectionCoords.x * Math.cos(40) - globalVars.mouseDirectionCoords.y * Math.sin(40);
    let newY = globalVars.mouseDirectionCoords.x * Math.sin(40) + globalVars.mouseDirectionCoords.y * Math.cos(40);
    ctx.lineTo((newY * canvas.height * canvas.width) + canvas.width / 2, -(newX * canvas.width * canvas.height) + canvas.height / 2);
    ctx.lineTo(-(globalVars.mouseDirectionCoords.x * canvas.width * canvas.height) + canvas.width / 2, -(globalVars.mouseDirectionCoords.y * canvas.height * canvas.width) + canvas.height / 2);
    newX = globalVars.mouseDirectionCoords.x * Math.cos(-40) - globalVars.mouseDirectionCoords.y * Math.sin(-40);
    newY = globalVars.mouseDirectionCoords.x * Math.sin(-40) + globalVars.mouseDirectionCoords.y * Math.cos(-40);
    ctx.lineTo(-(newY * canvas.height * canvas.width) + canvas.width / 2, (newX * canvas.width * canvas.height) + canvas.height / 2);
    ctx.fill();
}*/
/*let drawCursor = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(globalVars.mouseCoords.x, globalVars.mouseCoords.y, 2, 14);
    ctx.fillRect(globalVars.mouseCoords.x, globalVars.mouseCoords.y, 14, 2);
    ctx.fillRect(globalVars.mouseCoords.x + 6, globalVars.mouseCoords.y + 6, 4, 4)
}*/
let drawProjectiles = () => {
    ctx.fillStyle = 'rgb(255,120,0)';
    for (projectile of globalVars.player.projectiles) {
        ctx.fillRect(canvas.width / 2 + projectile.x - globalVars.player.x, canvas.height / 2 + projectile.y - globalVars.player.y, projectile.skin.width, projectile.skin.height);
    }
}
let drawEnemyProjectiles = () => {
    ctx.fillStyle = 'red';
    for (player of globalVars.players) {
        for (projectile of player.projectiles) {
            ctx.fillRect(canvas.width / 2 + projectile.x - globalVars.player.x, canvas.height / 2 + projectile.y - globalVars.player.y, projectile.skin.width, projectile.skin.height);
        }
    }
}
let clearCanvas = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
let drawDeadScreen = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'yellow';
    ctx.font = '50px arial';
    ctx.fillText(Math.ceil(globalVars.deadTimer), canvas.width / 2, canvas.height / 2)
}
let drawDisconnPlayers = () => {
    ctx.fillStyle = 'green';
    for(i in globalVars.disconnPlayers) {
        ctx.font = '25px arial';
        ctx.textAlign = 'left';
        ctx.fillText(globalVars.disconnPlayers[i], 10, 25 + 25 * i);
    }
}
let drawPlayerKills = () => {
    ctx.fillStyle = 'white';
    for(i in globalVars.playerKills) {
        ctx.font = '25px arial';
        ctx.textAlign = 'right';
        ctx.fillText(globalVars.playerKills[i], canvas.width , 25 + 25 * i);
    }
}