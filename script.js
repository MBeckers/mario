let marioX;
let positionX;
let backgroundX;
let marioY;
let marioAccX;
let marioAccY;
let ground;
let canvas;
let context;
let controls;

window.onload = init;

const tilemap = [
    [418, 480, 143, 175],
    [578, 640, 127, 175]
]

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    initData()

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function initData() {
    marioX = 50;
    backgroundX = 0;
    marioY = 100;
    marioAccX = 0;
    marioAccY = 0;
    ground = 175;
    controls = "";
}

function gameLoop(timeStamp) {
    map();
    gravity();
    move();
    render();


    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function map() {
    positionX = marioX-backgroundX;
    ground = 175;
    tilemap.forEach(element => {
        if (
            positionX > element[0] &&
            positionX < element[1] &&
            marioY <= element[3]
        ) {
            ground = element[2]
        }
    });
    console.log(positionX, marioY);

    // if (marioY > 300) {
    //     alert('LOST');
    //     init();
    // }
    // if (positionX > 1089 && positionX < 1121) {
    //     ground = 400;
    // }
    // else {
    //     ground = 175;
    // }

    // console.log(positionX);
}

function move() {
    let speed = 2;
    if (controls == "left" && marioX>=10) {
        if (collisionMove()) {
            console.log('collision')
        } else {
            marioX = marioX - speed;
        }

    }
    if (controls == "right") {
        if (collisionMove()) {
            console.log('collision')
        } else {
            if (marioX<=400) {
                marioX = marioX + speed;
            } else {
                backgroundX = backgroundX - speed
            }
        }

    }

}

function gravity() {
    marioAccY = Math.min(10, marioAccY+=0.25 )
    marioY = marioY + marioAccY;

    if (collisionGround()) {
        marioAccY = 0;
        marioY = ground;
    }
}

function collisionGround() {
    return marioY >= ground;
}

function collisionMove() {
    return tilemap.find(element => {
        if (controls == 'right') {
            if (positionX >= element[0] &&
                positionX < element[1] &&
                marioY > element[2] &&
                marioY <= element[3]
                ) {
                return true;
            }
        }
        if (controls == 'left') {
            if (positionX > element[0] &&
                positionX <= element[1] &&
                marioY > element[2] &&
                marioY <= element[3]
            ) {
                return true;
            }
        }
    })
    return false;
}


function render() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var mario  = document.getElementById("mario");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, backgroundX, 0);
    ctx.drawImage(mario, Math.min(marioX, 400), marioY, 32, 32);
}


function keyDown(code) {
    if (code == 87) {
        if (collisionGround()) {
            marioAccY = -7;
        }
    }
    if (code == 115) {
        //down?
    }
    if (code == 68) {
        controls = 'right';
    }
    if (code == 65) {
        controls = 'left';
    }
    render()
   // console.log(code)
};

function keyUp(code) {
    if (code == 68) {
        controls = '';
    }
    if (code == 65) {
        controls = '';
    }
}

document.onkeyup = function (e) {
    e = e || window.event;
    keyUp(e.keyCode);
}
document.onkeydown = function (e) {
    e = e || window.event;
    keyDown(e.keyCode);
}
