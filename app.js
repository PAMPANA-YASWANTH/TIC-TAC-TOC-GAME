let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetb1");
let newgamebtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
let oscore=0;
let xscore=0;
let oscoredisplay=document.querySelector("#o-score");
let xscoredisplay=document.querySelector("#x-score");
let resetscorebtn = document.querySelector("#resetscore");
let turn = true;

const winnerpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (box.innerText !== "") return;

        if (turn) {
            box.innerText = "O";
            box.classList.add("o-style");
            turn = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-style");
            turn = true;
        }

        checkwinner();
    });
});

const disableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-style");
        box.classList.remove("x-style");
        box.classList.remove("winner"); 
    });
};

const showwinner = (winner) => {
    if (winner==="o"){
        oscore ++;
        oscoredisplay.innerText= oscore;
    }
    else{
        xscore++;
        xscoredisplay.innerText=xscore;
    }
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of winnerpatterns) {

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");
                showwinner(pos1val);
                return;
            }
        }
    }
};

const resetgame = () => {
    turn = true;
    enableboxes();
    msgcontainer.classList.add("hide");
    oscore = 0;
    xscore = 0;
    oscoredisplay.innerText = 0;
    xscoredisplay.innerText = 0;
};

resetscorebtn.addEventListener("click",()=>{
    oscore=0;
    xscore=0;
    oscoredisplay,innerText=0;
    xscoredisplay.innerText=0;
});



newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
