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
    const modalForm = document.querySelector(".modal header div");
    
    const photographerModel = photographerFactory(photographer);
    
    const userPictureDOM = photographerModel.getUserPictureDOM();
    const userInfoDOM = photographerModel.getUserInfoDOM();
    const nameInfoDOM = photographerModel.getUserNameDOM();

    photographersSection.appendChild(userPictureDOM);
    photographersSection.prepend(userInfoDOM);
    modalForm.appendChild(nameInfoDOM);

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

function triButton(e) {

    const mediaDisplay = document.querySelector(".photograph-media_display");
    mediaDisplay.innerHTML = "";

    const selectedValue = e.target.value;

    switch (selectedValue) {
        case "popular":
            triButtonByPopularite();
        break;
        
        case "date":
            triButtonByDate();
        break;

        case "title":
            triButtonByTitre();
        break;

        defaut: break;
  }
}

async function triButtonByPopularite() {

    const id = getUserId();

    const images = await getMediaById(id,"image");
    const videos = await getMediaById(id,"video");
    const medias = images.concat(videos);

    medias.sort(function(a,b){return a.likes - b.likes});

    displayTriButton(medias);
}

async function triButtonByDate() {

    const id = getUserId();

    const images = await getMediaById(id,"image");
    const videos = await getMediaById(id,"video");
    const medias = images.concat(videos);

    medias.sort(function(a,b){return a.date - b.date});
    
    displayTriButton(medias);
}

async function triButtonByTitre() {

    const id = getUserId();

    const images = await getMediaById(id,"image");
    const videos = await getMediaById(id,"video");
    const medias = images.concat(videos);


    medias.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      
      displayTriButton(medias);
}

function displayTriButton(medias) {
    
    const videos = [];
    medias.forEach((media,index) => {
        if(media.hasOwnProperty("video")) {
            videos.push(media);
            medias.splice(index, 1);
        }
    });

    displayMedia(medias,"image");
    displayMedia(videos,"video");

    const eventListenerAddLike = document.querySelectorAll(".photograph-media_display_addLike");
    
    eventListenerAddLike.forEach((element) => {
        element.addEventListener("click", addLike);
    });
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

function getUserId() {
    
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get('id'));

    return id;
}

async function init() {
    
    const id = getUserId();

    const photographer = await getPhotographerById(id);
    displayData(photographer);

    displayPrice(photographer);
    displayAllLike(photographer);
    
    const mediasPicture = await getMediaById(id,"image");
    const mediasVideo = await getMediaById(id,"video");
    displayMedia(mediasPicture, "image");
    displayMedia(mediasVideo, "video");

    const elementSelect = document.getElementById("select").addEventListener("change", triButton, false);

    const eventListenerAddLike = document.querySelectorAll(".photograph-media_display_addLike");

    eventListenerAddLike.forEach((element) => {
        element.addEventListener("click", addLike);
    });
};

init();