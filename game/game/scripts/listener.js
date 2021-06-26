//state === login
let loginKeyboardListener = e => {
    if (e.key === "Backspace") {
        globalVars.playerName = globalVars.playerName.substring(0, globalVars.playerName.length - 1);
    }
};
let loginTypingListener = e => {
    if (e.key === "Enter") {
        socket.emit('login', globalVars.playerName);
    } else {
        globalVars.playerName += e.key;
    }
    if (globalVars.playerName.length == 21) {
        globalVars.playerName = playerName.substring(0, playerName.length - 1);
    }
};

//state === game
let playerKeyDownListener = e => {
    if (e.code ==="KeyW") {
        globalVars.actions.upPressed = true;
    }
    if (e.code === "KeyS") {
        globalVars.actions.downPressed = true;
    }
    if (e.code === "KeyA") {
        globalVars.actions.leftPressed = true;
    }
    if (e.code === "KeyD") {
        globalVars.actions.rightPressed = true;
    }

    if (e.code === "KeyQ") {
        globalVars.actions.qPressed = true;
    }
    if (e.code === "KeyE") {
        globalVars.actions.ePressed = true;
    }
    if (e.code === "Space") {
        globalVars.actions.spacePressed = true;
    }
};
let playerKeyUpListener = e => {
    if (e.code === "KeyW") {
        globalVars.actions.upPressed = false;
    }
    if (e.code === "KeyS") {
        globalVars.actions.downPressed = false;
    }
    if (e.code === "KeyA") {
        globalVars.actions.leftPressed = false;
    }
    if (e.code === "KeyD") {
        globalVars.actions.rightPressed = false;
    }

    if (e.code === "KeyQ") {
        globalVars.actions.qPressed = false;
    }
    if (e.code === "KeyE") {
        globalVars.actions.ePressed = false;
    }
    if (e.code === "Space") {
        globalVars.actions.spacePressed = false;
    }
};

let playerMouseDownListener = e => {
    globalVars.actions.mousePressed = true;
};

let playerMouseUpListener = e => {
    globalVars.actions.mousePressed = false;
};