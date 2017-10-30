const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const colorCollection = ['#03275A' , '#1A7DD7' , '#F2B809' , '#F37402' , '#F34605'];
function randomNumberGenerator(limit){
    return Math.floor(Math.random() * limit) + 1;
}

const rectangles = [];

function rectangleDataGenerator(count , canvasHeight , canvasWidth){

    if(count <= 0){
        loop();
        return '';
    }

    const rectangleData = {
        x: randomNumberGenerator(canvasWidth),
        y: randomNumberGenerator(canvasHeight),
        width: 10,
        height: 10,
        xDelta: 1,
        yDelta: 1,
        color: colorCollection[randomNumberGenerator(5)]
    };

    rectangles.push(rectangleData);

    rectangleDataGenerator(count-1 , canvasHeight , canvasWidth);

}

function drawrectangle(count){


    if(count<0){

        return '';
    }

    context.fillStyle = rectangles[count].color;
    context.fillRect(rectangles[count].x , rectangles[count].y , rectangles[count].width , rectangles[count].height);

    drawrectangle(count-1);
}


function update(count) {
    if(count<0){
        return '';
    }

    if(rectangles[count].x >= canvas.width - rectangles[count].width){
        rectangles[count].xDelta = -1 * rectangles[count].xDelta
    }
    else if (rectangles[count].x <= 0){
        rectangles[count].xDelta = -1 * rectangles[count].xDelta
    }

    if(rectangles[count].y >= canvas.height - rectangles[count].height){
        rectangles[count].yDelta = -1 * rectangles[count].yDelta;
    }
    else if (rectangles[count].y <= 0){
        rectangles[count].yDelta = -1 * rectangles[count].yDelta;
    }

    rectangles[count].x += rectangles[count].xDelta;
    rectangles[count].y += rectangles[count].yDelta;

    update(count-1);
}

function loop(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawrectangle(rectangles.length - 1);
    update(rectangles.length - 1);


    requestAnimationFrame(loop);
}

rectangleDataGenerator(20 , canvas.height , canvas.width);