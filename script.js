const screen = {
    operation: operation = "",
    result: result = "0",
};

updateScreen(screen);

const btnList = document.querySelectorAll(".btn");
btnList.forEach(button => {
    button.addEventListener("click", updateCalc);
});


function updateCalc(e){
    keyId = e.target.id;
    if (isNaN(keyId)){
        console.log("NaN");
        if(keyId === "clear"){
            clearOp();
        }
        else if (keyId === "delete"){
            deleteOp();
        }
        else if (keyId === "dot"){
            dotOp();
        }
        else{ // its an operation
            operation(keyId);
        } 
    }
    else{
        numberOp();
    }
    updateScreen(screen);
}

function updateScreen(screen){
    const top = document.querySelector("p.operation");
    top.textContent = screen.operation;
    if (screen.result > 999999999999999) {
        screen.result = "Infinite";
    }
    const bottom = document.querySelector("p.result");
    bottom.textContent = screen.result;
}

function numberOp(){
    if (screen.result === "Infinite") return;
    if (screen.result === "0"){
        screen.result = keyId;
        console.log("here");
    }
    else{
        screen.result = screen.result + keyId;
    }
}

function clearOp(){
    screen.operation = "";
    screen.result = "0";
}

function deleteOp(){
    screen.result = screen.result.slice(0, screen.result.length - 1);
}

function dotOp(){
    if(screen.result.includes(".")) return;
    screen.result += "."
    screen.hasDot = true;
}

function operation(){
    
}