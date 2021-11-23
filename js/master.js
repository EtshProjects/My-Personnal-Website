//check the local storage empty or not 
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {

    document.documentElement.style.setProperty('--main-color', mainColor);

    //remove active class from all colors list items
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        //add active class on element
        if (element.dataset.color === mainColor) {

            //add active class
            element.classList.add("active");
        }

    });
}


//random background option
let backgroundOption = true;

//variable to control the interval
let backgroundInterval;

//check if there is localstorage random background item 
let backgroundlocalitem = localStorage.getItem("background_option");

//check if random background localstorage is not empty
if (backgroundlocalitem !== null){
    

    if (backgroundlocalitem === true)
    {
        backgroundOption = true;
    }
    else {
        backgroundOption = false;
    }


    //remove active class from all spans 
    document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        element.classList.remove("active");
    });


    if (backgroundlocalitem === 'true'){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}


// toggle spin class on icon 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");
}

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

//loop on all list items
colorsLi.forEach(li => {

    //click on every list item 
    li.addEventListener("click", (e) => {

        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);

        //remove active class from all children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        });

        //Add active class 
        e.target.classList.add("active");
    })

});

// switch background optins
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//loop on all spans
randomBackEl.forEach(span => {

    //click on every span 
    span.addEventListener("click", (e) => {



        //remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        });

        //Add active class on spans
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes')
        {
            backgroundOption = true;
            randomizeImgs();

            localStorage.setItem("background_option",true);
        }
        else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false);
        }
    })

});



// select landing page elemnt
let landingpage = document.querySelector(".landing-page");

// get images array 
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.png", "05.jpg"];



//function to randomize imgs
function randomizeImgs() {

    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {

            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);


            // change background image url
            landingpage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 10000);
    }
}

//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function (){

    //skills offset top
    let skillsoffsettop = ourSkills.offsetTop;

    //skills outer height
    let skillsouterheight = ourSkills.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //window scrolltop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsoffsettop + skillsouterheight - windowHeight)){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        });

    }
}


//create popup with images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{

    img.addEventListener('click',(e)=>{

        //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup
        let popupBox = document.createElement("div");

        //add class to popup box
        popupBox.className = 'popup-box';

        if (img.alt !== null){

            //create heading
            let imgheading = document.createElement("h3")

            //create text for heading 
            let imgtext = document.createTextNode(img.alt);

            //append the text to the heading
            imgheading.appendChild(imgtext);

            //append the heading to the popup box
            popupBox.appendChild(imgheading);
        }

        //create image
        let popupimage = document.createElement("img");

        //set image source 
        popupimage.src = img.src;

        //add image to popup box
        popupBox.appendChild(popupimage);

        //append popup box to body
        document.body.appendChild(popupBox);

        //create close span 
        let closebutton = document.createElement("span");

        //create the close button text
        let closebuttontext = document.createTextNode("X");

        //append text to close button 
        closebutton.appendChild(closebuttontext);

        //add class to close button 
        closebutton.className = 'close-button';

        //add close button to the pop box
        popupBox.appendChild(closebutton);

    });

});

//close popup
document.addEventListener('click',function (e) {
    
    if (e.target.className == 'close-button'){

        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay 
        document.querySelector(".popup-overlay").remove();

    }

})
