let playerData = {
    id: 0,
    name: '',
    x: 55,
    y: 0,
    skin: {
        width: 50,
        height: 50
    },
    hitbox: {
        x: 0,
        y: 0,
        width: 50,
        height: 50
    },
    step: 4,
    projectiles: [],
    killCounter: 0,
    state: 'alive'
}

module.exports.playerData = playerData;