
// game constants and variables
let direction = {
    x:0,
    y:0
}

const foodSound = new Audio("music/food.mp3")
const gameOverSound = new Audio("music/gameover.mp3")
const moveSound = new Audio("music/move.mp3")
const gameMusic = new Audio("music/music.mp3")
let lastPaintTime = 0;
let speed = 7
let snakeArr = [
    {x:13, y:15}
]
let move = {x: 0, y: 0};
let food = {x:6, y:7}
let score = 0;


// Game functions
function main (ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)

    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine();

}

function gameEngine() {
    // part 1: Updatimg the snake array and food

    function isCollide(snake) {
        // if snake collides with herself
        for (let i=1; i<snakeArr.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
        // if snake bumps into the wall
        if (snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) {
            return true;
        }
    }

    if(isCollide(snakeArr)) {
        gameMusic.pause()
        moveSound.pause()
        move = {x:0, y:0}
        alert("Game Over. Press Enter to play again!")
        snakeArr = [{x:13, y:15}]
        gameMusic.play()
        score = 0;
        speed = 7;
    }

    // when food is eaten by snake, increase score and change position of food.
    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        snakeArr.unshift({x: snakeArr[0].x + move.x, y: snakeArr[0].y + move.y})
        food = {
            x: Math.floor(1 + Math.random() * 15), // Adjusted to avoid the leftmost column
            y: Math.floor(1 + Math.random() * 15), // Adjusted to avoid the top row
        };
        foodSound.play()
        score++
        document.querySelector("#score").textContent = score
        if (score>highscoreval) {
            highscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(highscoreval))
            hiscoreBox.innerHTML = "High Score: " + highscoreval
        }
        speed += 0.15
    }
    


    // moving the snake
    for (let i=snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += move.x
    snakeArr[0].y += move.y


    // part 2: Render(display) the snake and food 
    // DISPLAY SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x

    if (index === 0) {
        snakeElement.classList.add("head")
    } else {
        snakeElement.classList.add("snake")
    }
    board.appendChild(snakeElement)
});

    // DISPLAY FOOD
        foodElement = document.createElement("div")
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add("food")
        
        board.appendChild(foodElement)


}





// Logic
let hiscore = localStorage.getItem("hiscore")

if(hiscore===null) {
    highscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(highscoreval))
} else {
    highscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "High Score: " + hiscore  
}


window.requestAnimationFrame(main)

window.addEventListener("keydown", play => {
    move = {x:0, y:1}
    moveSound.play()
    
    switch (play.key) {
        case "ArrowUp":
        document.querySelector(".head")
        move.x = 0
        move.y = -1
        break;
        case "ArrowDown":
        move.x = 0
        move.y = 1
        break;
        case "ArrowRight":
            move.x = 1
            move.y = 0
        break;
        case "ArrowLeft":
            move.x = -1
            move.y = 0
        break;
        default:
            break;
    }
})