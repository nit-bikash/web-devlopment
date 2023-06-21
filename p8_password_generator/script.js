// DIFFICULTIES
            // 1.How to genrerate symbol for our password 


const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthdisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");

const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");

const symbols='`!@#$%^&*()_+=-[]{}|\:;",.<>?/'

const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton")
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordLength=10;
let checkCount=1;
handleSlider();
setIndicator("#ccc")

// set password length 
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthdisplay.innerText=passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;

    
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
}


// set indicator 
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color} `;
    

}

function getRndInterger(min,max){
    return Math.floor(Math.random()*(max-min)) +min;

}

function generateRandomNumber(){
    return getRndInterger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInterger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInterger(65,91));
}



function generateSymbol(){

    let number=getRndInterger(0,symbols.length);

    return symbols.charAt(number);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("red");
    } else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength>=6
        ) {
        setIndicator("yellow");
    } else {
        setIndicator("green");
    }

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    // to move copy wala span visible 
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

inputSlider.addEventListener('input', (e=>{
    passwordLength=e.target.value;
    
    handleSlider();
})
)

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

function sufflePassword( array){

    // Fisher yets method 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}


function handelCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });

    // special case 
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}




generateBtn.addEventListener('click',()=>{
    //none of the checkbox is selected
    if(checkCount<=0) return;

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    // lets fine the new password 
    console.log("starting the journey");
    // remove old password 
    password="";

    // let put the minimum stuff mentioned by the checkbox 
    // if(uppercaseCheck){
    //     password+= generateUpperCase();
    // }

    // if(lowerCheck){
    //     password+= generateLowerCase();
    // }

    // if(numbersCheck){
    //     password+= generateRandomNumber();
    // }

    // if(symbolsCheck){
    //     password+= generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);    

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);    

    //  compulsary addition 
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i](); 
    }

    console.log("Compulsory addition done");

    // remening addition 
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRndInterger(0,funcArr.length);
        password += funcArr[randIndex]();
    }

    console.log("remening addition");

    // suffle the passowrd 
    password = sufflePassword(Array.from(password));

    
    // show in UI 
    passwordDisplay.value=password;

    console.log("after password display");
    // calculate strength 
    calcStrength();






})