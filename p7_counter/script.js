const countValue=document.querySelector('#counter');
function increment(){
    console.log('decrement')
    // get the value form ui 
    let value=parseInt(countValue.innerText);
    // update the value 
    value=value+1;
    // set the value to UI 
    countValue.innerText=value;

}

function decrement(){
    console.log('decrement')
    // get the value form ui 
    let value=parseInt(countValue.innerText);
    // update the value 
    value=value-1;
    // set the value to UI 
    countValue.innerText=value;

};

const reset=()=>{
    // get the value form ui 
    let value=parseInt(countValue.innerText);
    // update the value 
    value=0;
    // set the value to UI 
    countValue.innerText=value;
}