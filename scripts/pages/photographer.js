import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { getPhotographers } from "./index.js";

async function getPhotographerById(id) {

    const photographers = await getPhotographers();

    for (let i = 0; i < photographers.length; i++) {
        if(photographers[i].id === id){
            return photographers[i];
        }
      }
      return false;
}

export async function getMediaById(id,type) {
    try {
        const result = await fetch("../../data/photographers.json");
    const resultJson = await result.json();
    const medias = resultJson.media;
    const mediasTab = [];

    for (let i = 0; i < medias.length; i++) {
        if(medias[i].photographerId === id){
            if(medias[i].hasOwnProperty(type)) {
                mediasTab.push(medias[i]);
            }
        }
      }
      return mediasTab;
    }
    catch(error) {
        console.log(error);
    }
}

async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
    
    const photographerModel = photographerFactory(photographer);
    
    const userPictureDOM = photographerModel.getUserPictureDOM();
    const userInfoDOM = photographerModel.getUserInfoDOM();

    photographersSection.appendChild(userPictureDOM);
    photographersSection.prepend(userInfoDOM);

};

async function displayMedia(medias,type) {
    const mediaDisplay = document.querySelector(".photograph-media_display");
    
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media,type);
        const mediaDOM = mediaModel.getMediaDOM();
        mediaDisplay.appendChild(mediaDOM);
    });
}

async function displayPrice(photographer){
    const encartPrice = document.querySelector(".photograph-encart_price");

    const photographerModel = photographerFactory(photographer);
    const userPriceDOM = photographerModel.getUserPriceDOM();

    encartPrice.appendChild(userPriceDOM);
}

async function displayAllLike(photographer){
    const encartAllLike = document.querySelector(".photograph-encart_likes");

    const photographerModel = photographerFactory(photographer);
    const userPriceDOM = await photographerModel.getUserAllLikeDOM();
  
    const imglikes = document.createElement( 'img' );
    imglikes.src = "./assets/icons/heart-solid.svg";
    imglikes.alt = "coeur";

    encartAllLike.appendChild(userPriceDOM);
    encartAllLike.appendChild(imglikes);
}

function triButton() {
    const triButtonPopularite = document.querySelector(".photograph-media_tri_button_popularite");
    const triButtonDate = document.querySelector(".photograph-media_tri_button_date");
    const triButtonTitre = document.querySelector(".photograph-media_tri_button_titre");
    const triButtonChevronUp = document.querySelector(".fa-chevron-up");
    const triButtonChevronDown = document.querySelector(".fa-chevron-down");
    const triButton = document.querySelector(".photograph-media_tri_button");

    
    triButtonChevronUp.style.opacity = "1";
    triButtonChevronDown.style.opacity = "0";
}   

function addLike(element) {
    
    if(element.currentTarget.classList.contains("liked")) {
        element.currentTarget.classList.remove("liked");
        const p = element.currentTarget.querySelector("p");
        let pNumber = parseInt(p.innerHTML);
        pNumber = pNumber - 1;
        p.innerHTML = pNumber.toString();

        const pEncartLike = document.querySelector(".photograph-encart_likes > p");
        let pNumberEncartLike = parseInt(pEncartLike.innerHTML);
        pNumberEncartLike = pNumberEncartLike - 1;
        pEncartLike.innerHTML = pNumberEncartLike.toString();
    }
    else {
        const p = element.currentTarget.querySelector("p");
        let pNumber = parseInt(p.innerHTML);
        pNumber = pNumber + 1;
        p.innerHTML = pNumber.toString();
        element.currentTarget.classList.add("liked");

        const pEncartLike = document.querySelector(".photograph-encart_likes > p");
        let pNumberEncartLike = parseInt(pEncartLike.innerHTML);
        pNumberEncartLike = pNumberEncartLike + 1;
        pEncartLike.innerHTML = pNumberEncartLike.toString();
    }
}

async function init() {
    
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get('id'));

    const photographer = await getPhotographerById(id);
    displayData(photographer);

    displayPrice(photographer);
    displayAllLike(photographer);
    
    const mediasPicture = await getMediaById(id,"image");
    const mediasVideo = await getMediaById(id,"video");
    displayMedia(mediasPicture, "image");
    displayMedia(mediasVideo, "video");

    const eventListenerTriButton = document.querySelector(".photograph-media_tri_button");
    eventListenerTriButton.addEventListener("click", triButton, false);

    const eventListenerAddLike = document.querySelectorAll(".photograph-media_display_addLike");
    
    console.log(eventListenerAddLike)

    eventListenerAddLike.forEach((element) => {
        console.log(element)
        element.addEventListener("click", addLike);
    });
};

init();