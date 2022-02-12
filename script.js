const gameBoard = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""];
    let turn = "x";
    let gameOver = false;
    const message = document.querySelector(".message");

    // const container = document.querySelector(".container");
    const grid = document.querySelector(".grid");

    const render = () => {
        let idx = 0;

        gameArray.forEach(ele => { 
            let block = document.createElement("div");
            block.id = `block-${idx}`;
            
            block.classList.add("block");
            block.textContent = ele;
            idx++;
            grid.appendChild(block);
        });

    };

    render();

    const blocks = document.querySelectorAll(".block");

    const checkThreeInRow = () => {
        if (gameArray[0] && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]) {
            return true;
        } else if (gameArray[0] && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]) {
            return true;
        } else if (gameArray[0] && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) {
            return true;
        } else if (gameArray[3] && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) {
            return true;
        } else if (gameArray[6] && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) {
            return true;
        } else if (gameArray[1] && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]) {
            return true;
        } else if (gameArray[2] && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]) {
            return true;
        } else if (gameArray[2] && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) {
            return true;
        } else if (gameArray.every(ele => ele)) {
            return true;
        }

        return false;
    }

    const playGame = e => {
        let block = e.path[0].textContent;
        
        while(!gameOver) {
            if (block) return;
            else {
                if (turn === "x") {
                    block = "X";
                    turn = "o";
                }
                else {
                    block = "O"
                    turn = "x";
                }
            }

            let idx = Array.from(blocks).indexOf(e.path[0]);
            gameArray[idx] = block;
            e.path[0].textContent = block;
            gameOver = checkThreeInRow() ? true : false; 
        }

        message.textContent = "Game Over.";
        const replay = document.createElement("div");
        // const YesBtn = 
        replay.textContent = "Play again?";
        message.appendChild(replay);
    
    };

    blocks.forEach(block => block.addEventListener("click", playGame));  

    const resetBoard = () => {
        blocks.forEach(block => block.textContent = "");
        gameArray = ["", "", "", "", "", "", "", "", ""];
        gameOver = false;
        message.textContent = "";
        turn = "x";
    };

    const createPlayer = (name, marker) => {
        return {
            name,
            marker,
        };
    };

    return {
        gameArray,
        resetBoard
    };
})();