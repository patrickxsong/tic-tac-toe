const gameBoard = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""];
    let turn = "x";
    let gameOver = false;
    let winner = 1;

    const message = document.querySelector(".message");
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

        endGame();
    };

    const checkThreeInRow = () => {
        if (gameArray[0] && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]) {
            return true;
        } else if (gameArray[0] && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]) {
            winner = (gameArray[0] === "X") ? 1 : 2; 
            return true;
        } else if (gameArray[0] && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) {
            winner = (gameArray[0] === "X") ? 1 : 2; 
            return true;
        } else if (gameArray[3] && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) {
            winner = (gameArray[3] === "X") ? 1 : 2; 
            return true;
        } else if (gameArray[6] && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) {
            winner = (gameArray[6] === "X") ? 1 : 2; 
            return true;
        } else if (gameArray[1] && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]) {
            winner = (gameArray[1] === "X") ? 1 : 2; 
            return true;
        } else if (gameArray[2] && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]) {
            winner = (gameArray[2] === "X") ? 1 : 2; 
            return true;
        } else if (gameArray[2] && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) {
            winner = (gameArray[2] === "X") ? 1 : 2; 
            return true;
        } else if (gameArray.every(ele => ele)) {
            winner = 0;
            return true;
        }

        return false;
    }

    const endGame = () =>  {
        let messageArr = ["Game Over. "];

        if (winner === 1) {
            messageArr.push("Player 1 wins!");
        } else if (winner === 2) {
            messageArr.push("Player 2 wins!");
        } else {
            messageArr.push("Tie game.");
        }

        message.textContent = messageArr.join(" ");

        const replay = document.createElement("button");
        replay.textContent = "Play again";
        
        message.appendChild(replay);
        
        replay.addEventListener("click", resetBoard);
    };

    const resetBoard = () => {
        blocks.forEach(block => block.textContent = "");
        gameArray = ["", "", "", "", "", "", "", "", ""];
        gameOver = false;
        message.textContent = "";
        turn = "x";
    };

    blocks.forEach(block => block.addEventListener("click", playGame));  

})();