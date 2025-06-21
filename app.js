let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGamebtn = document.querySelector(".new-btn");
let msg = document.querySelector("#msg");
let count=0;


let turnO = true; // playerX playerO;

const winPatterns =[
    [0,1,2],
    [3,4,5],    
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],    
    [0,4,8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enablebtn();
    msgContainer.classList.add("hide")
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("Box was clicked")

       if( turnO ) {
        box.innerText ="O"
        box.classList.add("o-style");
        turnO = false;
       }
        else {
        box.innerText = "X"
        box.classList.add("x-style");
        turnO = true;
       }
       box.disabled = true;
       count++;
       checkWinner();
    if(count === 9){
        checkDraw();
    }
    });
});

const disablebtn = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enablebtn = () =>{
    for(let box of boxes){
        box.disabled = false;   
        box.innerText ="";
        box.classList.remove("o-style", "x-style");
    }
};

const showWinner =(Winner) => {
    msg.innerText = `Congratulation Winner is ${Winner}`;
    msgContainer.classList.remove("hide")
    disablebtn()
}

 // check for winner
const checkWinner = () => {
    for( let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner", pos1Val)
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
}


 // check for draw
const checkDraw = () => {
    let winnerFound = false;

    if(!winnerFound && count === 9){
        msg.innerText = "Game Is Draw !"
        msgContainer.classList.remove("hide");
        disablebtn();
    }
};

newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);