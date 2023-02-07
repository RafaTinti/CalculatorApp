const screen = {
    operation: operation = "",
    result: result = "0",
    waitingNew: waitingNew = false,
};

updateScreen(screen);

const btnList = document.querySelectorAll(".btn");
btnList.forEach(button => {
    button.addEventListener("click", updateCalc);
});


function updateCalc(e){
    keyId = e.target.id;
    if (isNaN(keyId)){// not a numeric key
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
            mathOp(keyId);
        } 
    }
    else{ // numeric key
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
    if (screen.result === "0" || screen.waitingNew){
        screen.result = keyId;
        screen.waitingNew = false;
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
    if(screen.waitingNew) return;
    screen.result = screen.result.slice(0, screen.result.length - 1);
    if (screen.result === ""){
        screen.result = "0";
    }
}

function dotOp(){
    if (screen.result.includes(".")) return;
    if (screen.waitingNew){
        screen.result = "0.";
        screen.waitingNew = false;
    }
    else {
        screen.result += "."
    }
}

function mathOp(keyId){
    if (keyId === "equals"){
        let op = screen.operation.slice(-1)
        if ((op === "x"||op === "+"||op === "-"||op === "/" )&&!screen.waitingNew){
            let result = solve(op);
            screen.operation += ` ${screen.result} =`;
            screen.result = `${result}`;
            screen.waitingNew = true;
        }
    }
    else{ //+-*/
        let op = screen.operation.slice(-1);
        if (op === "x"||op === "+"||op === "-"||op === "/"){ // if the operator is at the end
            if (screen.waitingNew){
                screen.operation = screen.operation.slice(0, screen.operation.length - 1) + decode(keyId);
            }
            else{
                let result = solve(op);
                screen.operation = `${result} ${decode(keyId)}`;
                screen.result = `${result}`;
                screen.waitingNew = true;
            }
        }
        else{ // if not just add the operator
            screen.operation = screen.result + " "+ decode(keyId);
            screen.waitingNew = true;
        }
    }
}

function solve(op){
    let n1 = +screen.operation.substring(0, screen.operation.indexOf(" "));
    let n2 = +screen.result;
    switch (op) {
        case "+":
            return Math.round(1000 * (n1+n2))/1000;
        case "-":
            return Math.round(1000 * (n1-n2))/1000;
        case "x":
            return Math.round(1000 * (n1*n2))/1000;
        case "/":
            if (n2===0) {
                alert("can't divide by 0");
                return 0;
            }
            return Math.round(1000 * (n1/n2))/1000;
    }
}

function decode(keyId){
    if (keyId === "plus") return "+";
    if (keyId === "minus") return "-";
    if (keyId === "multiply") return "x";
    if (keyId === "divide") return "/";
}