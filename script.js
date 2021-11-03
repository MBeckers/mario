let marioX = 50;
let marioY = 100;
let marioAccX = 0;
let marioAccY = 0;
let canvas;
let context;

window.onload = init;

function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp){
    gravity();
    collision();
    render();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function gravity() {
    marioAccY = Math.min(10, marioAccY+=0.5 )
    console.log(marioAccY);

    if (!collision()) {
        marioY = marioY + marioAccY;
    } else {
        marioAccY=0;    
        marioY = 175
    }

}

function collision() {
    return marioY > 175
}

function render() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var mario  = document.getElementById("mario");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, Math.min(50-marioX,0), 0);
    ctx.drawImage(mario, 50, marioY, 32, 32);
}

document.onkeypress = function (e) {
    e = e || window.event;
    if (e.keyCode == 119) {
        marioAccY = -10;
    }
    if (e.keyCode == 115) {
        marioY = marioY + 10;
    }
    if (e.keyCode == 97) {
        marioX = marioX - 10;
    }
    if (e.keyCode == 100) {
        marioX = marioX + 10;
    }
    render()
    console.log(e.keyCode)
};
