let marioX = 50;
let marioY = 175;

function render() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    var mario  = document.getElementById("mario");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, Math.min(50-marioX,0), 0);
    ctx.drawImage(mario, 50, marioY, 32, 32);
}

render();

document.onkeypress = function (e) {
    e = e || window.event;
    if (e.keyCode == 119) {
        marioY = marioY - 10;
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
