// Generate a random color(use of hexvalues from 0-9 and A-F)

const randomColor=function(){
    const hex="0123456789ABCDEF";
    let color='#';//because hexvalue are of type #DA2314 etc.
    for(let i=0;i<6;i++){
        color+=hex[Math.floor(Math.random()*16)];
    }
    // console.log(color);
    return color;
}
// randomColor()
let intervalId=null;
const startChangingColor=function(){

    if(intervalId==null){
        intervalId=setInterval(changeBgColor,1000)
    }

    function changeBgColor(){
        let newColor=randomColor()
        const currentColor=document.querySelector('.current-color');
        currentColor.innerHTML= "Current Color's hexCode value is " + newColor;
        // console.log(newColor);
        document.body.style.backgroundColor=newColor;
    }
};

const stopChangingColor=function(){
   clearInterval(intervalId);
   intervalId=null;
}

document.querySelector('#start').
addEventListener('click',startChangingColor);

document.querySelector('#stop').
addEventListener('click',stopChangingColor);

const date=document.querySelector('.date');
let currentDate=new Date();
date.innerHTML=currentDate.getFullYear()



