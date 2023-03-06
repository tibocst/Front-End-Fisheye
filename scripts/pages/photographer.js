import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
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

async function getMediaById(id) {
    try {
        const result = await fetch("../../data/photographers.json");
    const resultJson = await result.json();
    const medias = resultJson.media;
    const mediasTab = [];

    for (let i = 0; i < medias.length; i++) {
        if(medias[i].photographerId === id){
            mediasTab.push(medias[i]);
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

async function displayMedia(medias) {
    const mediaDisplay = document.querySelector(".photograph-media_display");
    
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        console.log(mediaModel);
        const mediaDOM = mediaModel.getMediaDOM();
        mediaDisplay.appendChild(mediaDOM);
    });
}

async function init() {
    
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get('id'));

    const photographer = await getPhotographerById(id);
    console.log(photographer);
    displayData(photographer);
    
    const medias = await getMediaById(id);
    console.log(medias);
    displayMedia(medias);
};

init();