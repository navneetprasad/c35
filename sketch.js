var ball;
var database,position,hypnoticBall;

function setup(){
    database = firebase.database();
    console.log(database);

    createCanvas(500,500);
    // ball = createSprite(250,250,10,10);
    // ball.shapeColor = "red";

    hypnoticBall = createSprite(250,250,20,20);
    hypnoticBall.shapeColor = "green";

    var hypnoticBallPosition = database.ref('ball/position');
    hypnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y,
    })
}


function readPosition(data){
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;

}
function showError(){
    console.log("error in writing to the database");
}
