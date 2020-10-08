document.addEventListener('DOMContentLoaded',() =>{
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10

    let currentIndex = 0
    let appleIndex  = 0
    let currentSnake = [2,1,0] //the div being 2 is the head

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0 


    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval =  setInterval(moveOutcomes, intervalTime)
    }

    //function that deals with all the move outcomes of the snake
    function moveOutcomes(){
        //deals with snake hitting border and itself
        if(
            (currentSnake[0] + width >= (width*width) && direction == width) ||
            (currentSnake[0] % width === width - 1 && direction  === 1) ||
            (currentSnake)[0] % width === 0 && direction == -1 ||
            (currentSnake[0] - width < 0 && direction == -width)  ||
            squares[currentSnake[0] + direction].classList.contains('snake')
        ){
            return clearInterval(interval)// this will clear interval if anything of above happens
        }

        const tail  = currentSnake.pop()//removes last item of array and shows it
        squares[tail].classList.remove('snake')//removes class of snake
        currentSnake.unshift(currentSnake[0] + direction)// gives direction to the head of array


        //deals with snake getting apple

        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes,intervalTime)

        }
        squares[currentSnake[0]].classList.add('snake')
    } 

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() *squares.length)
        }while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }


    function control(e){
        squares[currentIndex].classList.remove('snake')
        console.log(e.key)

        if(e.key == "ArrowRight"){//if we press right, the snake will go one to the right
            console.log("right")
            direction = 1
        }
        else if(e.key == "ArrowUp"){//if we press up, the snake will go back ten divs appearing going up
            direction = -width
            console.log("up") 
        }
        else if(e.key === "ArrowLeft"){//going left
            console.log('left')
            direction = -1
        }
        else if(e.key === "ArrowDown"){//going down
            console.log('down')
            direction = +width 
        }

    }
    document.addEventListener('keyup',control)
    startBtn.addEventListener('click',startGame)
})