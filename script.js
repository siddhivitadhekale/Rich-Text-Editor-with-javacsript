
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptbuttons = document.querySelectorAll(".script");

// list all Fontlist
let fontlist = ["Arial","verdana","Times New Roman","Garamond","Georgia","Courier New","Cursive",];

// initial setting

const initializer = ()=>{
    //no hightlight for link unlink list undo redo since they are one time operations
    highlighter(alignButtons,true);
    highlighter(spacingButtons,true);
    highlighter(formatButtons ,false);
    highlighter( scriptbuttons,true);


    //create  options for font names
    fontlist.map((value)=>{
        let option = document.createElement("option");
        option.value= value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // font size allow only till 7
    for(let i =1; i<=7;i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }
     // default font size
    fontSizeRef.value= 3;
};


// main Logic
 const modifyText = (command,defaultUi, value)=>{
    //execCommand executes commnad on selected  text
  document.execCommand(command, defaultUi, value);
 };
 console.log(modifyText);

 // for Basic operations  which don't need parametere
  Array.from(optionsButtons).forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id,false,null); 
    });
 });
 
 // options that require value parameter(e.g  colors, fonts)
 advancedOptionButton.forEach((button)=>{
    button.addEventListener("change",()=>{
        modifyText(button.id,false,button.value);
    });
 })
 //link
 linkButton.addEventListener("click",()=>{
    let userLink = prompt("Enter a URL");
    //if link has http then pass directly else add https
    if(/http/i.test(userLink)){
        modifyText(linkButton.id,false,userLink);
    }
    else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id,false,userLink);
    }
 })

// hightlight click button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click",()=>{
            //needsRemoval = true means only one button should be hightlight and other would be normal
            if(needsRemoval){
                let alreadyActive = false;
                // if currently Clicked Button is already active
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }
                // remove highlight from other button
                highlighterRemover(className);
                if(!alreadyActive){
                    //  highlight clicked Button
                    button.classList.add("active");
                }
            }
            else{
                //if other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
        
    });
};

console.log(highlighter);

const highlighterRemover =(className) =>{
    className.forEach((button)=>{
        button.classList.remove("active");
    });
};

window.onload = initializer();