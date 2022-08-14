const prevOperand = document.querySelector('.prev-operand');
const currentOperand = document.querySelector('.current-operand');
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('.btn-operation');
const equalButton = document.querySelector('.btn-equal');
const allClearButton = document.querySelector('.btn-clear-all');
const deleteButton = document.querySelector('.btn-delete');
const allButtons = document.querySelectorAll('.btn');
let trackButton = "";

allButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
        trackButton += e.target.innerText;
    })
})

numberButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
        let arr = trackButton.split("+").join(",").split("-").join(",").split("*").join(",").split("÷").join(",").split(",");
        let arrLastItem = arr[arr.length -1];
        if(arrLastItem.length > 1 && arrLastItem.substring(0, arrLastItem.length-1).includes(".") && e.target.innerText === "."){
            return;
        }
        if(currentOperand.classList.contains("calculated")){
            currentOperand.innerText = e.target.innerText;
            currentOperand.classList.remove("calculated");
        } else if(prevOperand.innerText === "" && currentOperand.innerText === "0"){
            currentOperand.innerText = "";
            currentOperand.innerText += e.target.innerText;
        }else if(prevOperand.innerText === ""){
            currentOperand.innerText += e.target.innerText;
        }else{
            currentOperand.innerText += e.target.innerText;
        }
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
        if(currentOperand.innerText === "" || trackButton[trackButton.length-2] === e.target.innerText){
            return;
        }
        if(
            trackButton[trackButton.length-2] === "+" ||
            trackButton[trackButton.length-2] === "-" ||
            trackButton[trackButton.length-2] === "*" ||
            trackButton[trackButton.length-2] === "÷" 
        ){
            let arr = prevOperand.innerText.split('');
            arr[arr.length - 1] = e.target.innerText;
            prevOperand.innerText = arr.join('');
            return;
        }
        prevOperand.innerText += currentOperand.innerText+e.target.innerText;
        calculate();
    })
})

equalButton.addEventListener('click', ()=>{
    if(currentOperand.innerText === "" || prevOperand.innerText === ""){
        return;
    }
    calculate();
});


allClearButton.addEventListener('click', ()=>{
    prevOperand.innerText = "";
    currentOperand.innerText = 0;
    trackButton = "";
})

deleteButton.addEventListener('click', ()=>{
    if(
        currentOperand.innerText === "" ||
        prevOperand.innerText.substring(0, prevOperand.innerText.length-1) === currentOperand.innerText
    ){
        return;
    }
    let stringToArray = currentOperand.innerHTML.split("");
    let extractUpto = currentOperand.innerHTML.split("").length - 1;
    currentOperand.innerText = stringToArray.splice(0, extractUpto).join("");
})

const calculate = () => {
    if(trackButton[trackButton.length-1] === "="){
        let string = prevOperand.innerText.concat(currentOperand.innerText).replace(/[÷]/g, "/");
        evaluateString(string);
        prevOperand.innerText = "";
        trackButton = "";
    }else{
        let arr = prevOperand.innerHTML.split("");
        if (
            arr[arr.length - 1] === '+' ||
            arr[arr.length - 1] === '-' || 
            arr[arr.length - 1] === '*' || 
            arr[arr.length - 1] === '÷'
        ){
            arr.pop();
        }
        let string = arr.join("").replace(/[÷]/g, "/");
        evaluateString(string);
    }
}

function evaluateString(string){
    let stringToEvaluate = "";
    for(let i=0; i<=string.length-1; i++){
        if(string[i] === '*' || string[i] === '/'){
            stringToEvaluate = "("+stringToEvaluate+")";
        }
        stringToEvaluate += string[i];
    }
    let output = eval(stringToEvaluate);
    output = output.toString();
    if(string.includes(".")){
        let arr = string.split("+").join(",").split("-").join(",").split("*").join(",").split("/").join(",").split(",");
        let maxCount = 0;
        for(let i=0; i<=arr.length-1; i++){
            if(arr[i].includes(".")){
                let decimalCount = arr[i].substring(arr[i].indexOf(".") + 1).length;
                if(decimalCount > maxCount){
                    maxCount = decimalCount;
                }
            }
        }
        output = parseFloat(output).toFixed(maxCount);
    }
    currentOperand.innerText = output;
    currentOperand.classList.add("calculated");
}