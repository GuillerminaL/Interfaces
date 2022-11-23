"use strict";


//---------------- Vertical nav -----------------------------

const menuBtn = document.querySelector("#menu-btn");
const vertNav = document.querySelector("#vertical-nav");
const navItems = document.querySelectorAll(".nav-div-item");
const profileListItems = document.querySelectorAll(".profile-list li");
const categoriesListItems = document.querySelectorAll(".categories-list li");

let menuIsShown = false;
menuBtn.addEventListener("click", () => {
    if(!menuIsShown) {
        menuBtn.classList.add("close");
        vertNav.classList.add("open");
        navItems.forEach((item) => {
            item.classList.remove("close");
            item.classList.add("open");
        });
        profileListItems.forEach((item) => {
            item.classList.remove("close");
            item.classList.add("open");
        });
        categoriesListItems.forEach((item) => {
            item.classList.remove("close");
            item.classList.add("open");
        });
        menuIsShown = true;
    } else {
        menuBtn.classList.remove("close");
        navItems.forEach((item) => {
            item.classList.remove("open");
            item.classList.add("close");
        });
        profileListItems.forEach((item) => {
            item.classList.remove("open");
            item.classList.add("close");
        });
        categoriesListItems.forEach((item) => {
            item.classList.remove("open");
            item.classList.add("close");
        });
        menuIsShown = false;
        vertNav.classList.remove("open");
    }
});


//--------------- Main carousel -----------------------------

const imgs = 2;
let moveX = -(100/imgs);
let cContainer = document.querySelector("#mc-content");
let cNavPoints = document.querySelectorAll(".mc-nav-point");

cNavPoints.forEach((point, i) => {
    cNavPoints[i].addEventListener('click', () => {
        let pos = i;
        let op = pos*(moveX);
        cContainer.style.transform = `translateX(${op}%)`;
        cNavPoints.forEach((point) => {point.classList.remove("active");});
        point.classList.add("active");    
        if(i == 1) document.querySelector("#main-title").innerHTML = "Darksiders";
        else document.querySelector("#main-title").innerHTML = "God of War";
    });
});

//----------------- Animated cards gallery -----------------------
/**
 * Rota el elemento de la galería
 */
let animatedCards = document.querySelectorAll(".feature-card");
animatedCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
        card.classList.add("flip");
    });
    card.addEventListener("mouseout", () => {
        card.classList.remove("flip");
    });
});


//--------------- Carousel Navigation -----------------------------

let backBtn = document.querySelector(".back-btn");
let frwdBtn = document.querySelector(".forward-btn");

let backBtns = document.querySelectorAll(".carousel-nav .back-btn");
let frwrdBtns = document.querySelectorAll(".carousel-nav .forward-btn");

frwrdBtns.forEach((frwdBtn) => {
    frwdBtn.addEventListener("click", () => {
        let backBtn = frwdBtn.previousElementSibling;
        let carousel = (frwdBtn.parentElement).nextElementSibling;
        carousel.scrollTo({
            behavior: 'smooth',
            left: window.innerWidth
        })
        if(!backBtn.classList.contains("visible")) backBtn.classList.add("visible");
        frwdBtn.classList.add("hidden");
    });
});

backBtns.forEach((backBtn) => {
    backBtn.addEventListener("click", () => {
        let frwdBtn = backBtn.nextElementSibling;
        let carousel = (backBtn.parentElement).nextElementSibling;
        carousel.scrollTo({
            behavior: 'smooth',
            left: -(window.innerWidth)
        })
        if(frwdBtn.classList.contains("hidden")) frwdBtn.classList.remove("hidden");
        backBtn.classList.remove("visible");
    });
});



/*----------------------- Cards Hover Functionality ----------------------------*/

function createBtn(className, id = null, text, imgSrc = null) {
    //Crea un botón...
    let btn = document.createElement("button");
    let p = document.createElement("p");
    let img;

    //Agrega clase, id, texto e imagen...
    btn.classList.add(className);
    if(id != null) btn.id = id;
    
    if(imgSrc != null) {
        img = document.createElement("img");
        img.src = imgSrc;
        btn.appendChild(img);
    }

    p.appendChild(document.createTextNode(text));
    btn.appendChild(p);

    return btn;

}

function createCardOverlay(price = null, className = null) {
    //Crea un overlay...
    let overlay = document.createElement("div");
    overlay.classList.add(className);

    let btnsContainer = document.createElement("div");
    btnsContainer.classList.add("btns-container");

    let btns = [];

    if(price != null) {

         //Le agrega el precio
        let priceDiv = document.createElement("div");
        let priceP = document.createElement("p");
        priceP.id = "price";
        priceP.appendChild(document.createTextNode(price));
        priceDiv.appendChild(priceP);

        overlay.appendChild(priceDiv);

        //y los botones (comprar y agregar al carrito)...
        btns.push(createBtn("buyBtn", "buyBtn", "Comprar", null));
        btns.push(createBtn("cartBtn", "cartBtn", "Agregar al carrito", "images/emptyCart.png"));
        let fullcartBtn = createBtn("cartBtn", null, "Agregado al carrito", "images/fullcart.png");
        fullcartBtn.classList.add("display-none");
        btns.push(fullcartBtn);
       
    } else {
        
        //Agrega los botones (continuar jugando y volver a inicio)...
        btns.push(createBtn("continueBtn", null, "Continuar", "images/play.png"));
        btns.push(createBtn("cartBtn", null, "Volver a iniciar", null));

    }

    for (const btn of btns) btnsContainer.appendChild(btn); 

    overlay.appendChild(btnsContainer);

    return overlay;
    
}   

//Crea un overlay invisible junto a cada card que es mostrado al hacer hover sobre ella
function createCardFunctionality(card) {
    let carousel = card.parentElement.parentElement;
    let overlay;

    if(carousel.id == "continue-playing-carousel") overlay = createCardOverlay(null, "keep-playing-card");
    else overlay = createCardOverlay("$159.99", "buy-card-overlay");

    card.insertAdjacentElement("afterbegin", overlay);
    card.addEventListener("mouseenter", () => {overlay.classList.add("visible");});
    card.addEventListener("mouseleave", () => {overlay.classList.remove("visible");});
}



/*----------------------- Cards Btns Functionality ---------------------------*/
function setAddToCartBtns() {
    let addToCartBtns = document.querySelectorAll("#cartBtn");
    addToCartBtns.forEach((btn, i) => {
        addToCartBtns[i].addEventListener("click", () => {
            btn.classList.add("display-none");
            let activeBtn = btn.nextElementSibling;
            activeBtn.classList.remove("display-none");
            activeBtn.addEventListener("click", () => {
                activeBtn.classList.add("display-none");
                btn.classList.remove("display-none");
            });
        });
    });
}

function setBuyBtns() {
    let downloadTemplate = `<div class="btns-container">
                                <div class="price"><p>Ya puedes descargar tu juego!</p></div>
                                <button class="continueBtn" id="downloadBtn"><img src="images/download.png" alt="download"><p>Descargar</p></button>
                            </div>`;

    let loadingTemplate = `<div class="btns-container">
                                <div class="price"><h5 style = "font-size: .6em;">Espera mientras se descarga tu juego...</h5></div>
                            </div>`;

    let buyBtns = document.querySelectorAll("#buyBtn");
    buyBtns.forEach((btn, i) => {
        buyBtns[i].addEventListener('click', (e) => {
            let btnsContainer = btn.parentElement;
            let gameContainerBackground = btnsContainer.parentElement;
            gameContainerBackground.removeChild(btnsContainer);
            gameContainerBackground.innerHTML = downloadTemplate;
        
            let downloadBtn = document.querySelector("#downloadBtn");
            downloadBtn.addEventListener('click', () => {
                let btnsContainer = downloadBtn.parentElement;
                btnsContainer.innerHTML = loadingTemplate;

                btnsContainer.classList.add("loading-img-div");

                let circle = createCircle(true);
                console.log(circle);
                btnsContainer.appendChild(circle);

                let bar = createBar();
                btnsContainer.appendChild(bar);
                bar.classList.add("display-none");

                initIntervals();
                setTimeout(() => {
                    // btnsContainer.innerHTML = `<button class="continueBtn" disabled="disabled"><img src="images/play.png" alt="play"><p>Jugar</p></button>`;
                    let playBtn =  createBtn("continueBtn", "play-btn", "Jugar", "images/play.png");
                    btnsContainer.replaceChildren(playBtn);
                    playBtn.addEventListener("click", () => {
                        location.href = "html/cuatroEnLinea.html";
                    });
                }, 5500);
            });
        });
    });

}

/*----------------------- Loader -------------------------*/

function createCircle(small = false) {
    let circles = document.createElement("div");
    if(small) circles.classList.add("small-loading-circle");
    else circles.classList.add("circle");
    for(let i = 0; i < 6; i++) {
        let circle = document.createElement("div");
        circle.classList.add("element", "inactive");
        if(small) circle.classList.add("small-loading");
        else circle.classList.add("std-circle");
        circles.appendChild(circle);
    }
    return circles;
}

function createBar() {
    let div = document.createElement("div");
    let bar = document.createElement("div");
    bar.classList.add("progress-bar");
    let span = document.createElement("span")
    span.classList.add("loading-span");
    let msg = document.createElement("p");
    msg.appendChild(span);
    div.appendChild(bar);
    div.appendChild(msg);
    msg.style.textAlign = "center";
    return div;
}

function initIntervals() {
    let loadingDelay = 5;
    const span = document.querySelector(".loading-span");
    const circles = document.querySelectorAll(".element");
    const n = 6;  // numero de circulos
    const r = 60; // radio
    let angulo = 0;
    let originX = circles[0].offsetLeft;
    let originY = circles[0].offsetTop;
    let loaded = 0;
    let perc = 100/loadingDelay;
    let i = 0;
    let colorInterval = setInterval(() => {
        circles.forEach((circle) => {circle.classList.remove("active");});
        circles[i].classList.add("active");
        i++;
        if(i == n) i = 0;
    },500);

    let circleInterval = setInterval(() => {
        angulo += 0.01
        circles.forEach((element,i) => {
            element.style.left = `${originX + r*Math.cos(angulo + 2*Math.PI/n*i)}px`
            element.style.top = `${originY + r*Math.sin(angulo + 2*Math.PI/n*i)}px`})
    },20);
  
    let barInterval = setInterval(function(){
        loaded += perc;
        span.innerHTML = loaded.toFixed(0) + " %";
        if(loadingDelay > 1) {
            loadingDelay--;
            // console.log(loadingDelay);
        } else {
            clearInterval(barInterval);
            clearInterval(colorInterval);
            clearInterval(circleInterval);
        }
    }, 1000); 
 
}

function showLoading() {
    const container = document.querySelector(".loading-container");
    if(container != null) {
        const circle = createCircle();
        const bar = createBar();
        container.appendChild(circle);
        container.appendChild(bar);
        initIntervals();
        setTimeout(() => {
            container.remove();
            document.querySelector("#body").classList.remove("display-none");
        }, 5500);
    }
}

/*----*/
// document.querySelector("#body").classList.remove("display-none");
showLoading();

window.onload = () => {
    if(window.innerWidth > 600) {

        //Crea el overlay de cada card...
        let cards = document.querySelectorAll(".card");
        cards.forEach((card) => { createCardFunctionality(card) });
    
        //Setea los botones "continuar" para que redirijan al juego...
        let continueBtns = document.querySelectorAll(".continueBtn");
        continueBtns.forEach((btn) => { btn.addEventListener("click", () => {
            console.log("continue btn");
                location.href = "html/cuatroEnLinea.html";
            });
        });
    
    } 
    setAddToCartBtns();
    setBuyBtns();
}
