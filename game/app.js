const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

server.listen(53304);

let players = [];
let id = 0;
let rawMap = fs.readFileSync('helpers/map.json');
let map = JSON.parse(rawMap);
let parameters = {
    map: map
};

console.log(parameters.map);


let updatedPlayers = [];

app.use(express.static(__dirname + '/game/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/game/game.html');
});

io.on('connection', (socket) => {
    socket.on('login', playerName => {
        let playerData = require('./helpers/objectData').playerData;
        playerData.id = id;
        playerData.name = playerName;
        let randomIndex = Math.ceil(Math.random() * parameters.map.spawnPoints.length - 1);
        console.log(randomIndex);
        let randomX = parameters.map.spawnPoints[randomIndex].x;
        let randomY = parameters.map.spawnPoints[randomIndex].y;
        playerData.x = randomX;
        playerData.y = randomY;
        playerData.hitbox.x = randomX;
        playerData.hitbox.y = randomY;

        socket.id = id;

        id++;

        players.push(playerData);
        updatedPlayers.push({
            action: 'connect',
            player: playerData
        });

        socket.emit('online', {
            parameters: parameters,
            player: playerData,
            players: players
        });
        console.log(players);
    });

    socket.on('disconnect', () => {
        for (i in players) {
            if (players[i].id === socket.id) {
                updatedPlayers.push({
                    action: 'disconnect',
                    player: players[i]
                });
                players.splice(i, 1);
                break;
            }
        }
    });

    socket.on('action', data => {
        if (data.action === 'move') {
            for (player of players) {
                if (data.player.id === player.id) {
                    players[players.indexOf(player)] = data.player;
                    updatedPlayers.push({
                        action: 'move',
                        player: data.player
                    });
                    break;
                }
            }
        }

        if (data.action === 'shoot') {
            for (player of players) {
                if (data.player.id === player.id) {
                    updatedPlayers.push({
                        action: 'shoot',
                        player: data.player,
                        direction: data.direction
                    });
                    break;
                }
            }
        }

        if (data.action === 'kill') {
            for(player of players) {
                if(data.player.id === player.id) {
                    updatedPlayers.push({
                        action: 'kill',
                        player: data.player,
                        killedPlayer: data.killedPlayer
                    })
                }
            }
        }

        if (data.action === 'respawn') {
            for(player of players) {
                if(data.player.id === player.id) {
                    updatedPlayers.push({
                        action: 'respawn',
                        player: data.player
                    })
                }
            }
        }
    });
});

setInterval(() => {
    if (updatedPlayers.length !== 0)
        io.emit('update', updatedPlayers);
    updatedPlayers = [];
}, 15);

/*setInterval(() => {
    console.log(players)
}, 1000);*/
