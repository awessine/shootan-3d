const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const socket = io();

let globalVars = {
    screenWidth: 1400,
    screedHeight: 800,
    state: "",
    playerName: "",
    pointer: "_",
    shift: 11,
    deadTimer: 3,
    player: {},
    players: [],
    parameters: {},
    oldPlayerCoordinates: {},
    disconnPlayers: [],
    playerKills: [],
    mouseCoords: {
        x: 0,
        y: 0
    },
    mouseDirectionCoords: {
        x: 0,
        y: 0
    },
    corners: {
        leftUp: {x: 0, y: 0},
        leftDown: {x: 0, y: canvas.height},
        rightUp: {x: canvas.width, y: 0},
        rightDown: {x: canvas.width, y: canvas.height}
    },
    actions: {
        upPressed: false,
        downPressed: false,
        leftPressed: false,
        rightPressed: false,
        qPressed: false,
        ePressed: false,
        spacePressed: false,
        mousePressed: false
    }
};