let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;
let count = 0;

const WinPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
];
const resetgame =()=>{
    turn = true;
    count = 0;
    Enableboxes();
    msgcontainer.classList.add("hide");
};
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turn){
            box.innerText = "O";
            box.style.color = "#b0413e";
            turn = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "green";
            turn = true;
        }
        box.disabled = true;
        count++;

        let iswinner = checkwinner();
        if(count===9 && !iswinner){
            gamedraw();
        }
    });
});
const gamedraw =()=>{
    msg.innerText = `Game was a Draw`;
    msgcontainer.classList.remove("hide");
    Disableboxes();
}
const Enableboxes =()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
const Disableboxes =()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const showWinner =(winner)=>{
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    Disableboxes();
}
const checkwinner =()=>{
    for(let pattern of WinPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !="" && pos2 !="" && pos3 !=""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
};
newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);