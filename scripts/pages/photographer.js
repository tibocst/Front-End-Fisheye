import { photographerFactory, getPhotographers } from '../factories/photographer.js'
import { mediaFactory, getMediaById } from '../factories/mediaFactory.js'
import { displayLightBoxModal } from '../utils/lightBoxModal.js'

async function getPhotographerById (id) {
  const photographers = await getPhotographers()

  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id === id) {
      return photographers[i]
    }
  }
  return false
}

// affiche le profil du photographe
async function displayData (photographer) {
  const photographersSection = document.querySelector('.photograph-header')
  const modal = document.getElementById('contact_modal')
  const modalFormH2 = document.querySelector('.modal header div > h2')

  const photographerModel = photographerFactory(photographer)

  const userPictureDOM = photographerModel.getUserPictureDOM()
  const userInfoDOM = photographerModel.getUserInfoDOM()
  const nameInfoDOM = photographerModel.getUserNameDOM()
  modal.ariaLabel = 'Contact me ' + nameInfoDOM.innerText
  photographersSection.appendChild(userPictureDOM)
  photographersSection.prepend(userInfoDOM)
  modalFormH2.innerText = modalFormH2.innerText + ' ' + nameInfoDOM.innerHTML
};

// affiche les medias du photographe
async function displayMedia (medias, type) {
  const mediaDisplay = document.querySelector('.photograph-media_display')

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media, type)
    const mediaDOM = mediaModel.getMediaDOM()
    mediaDisplay.appendChild(mediaDOM)
  })

  const eventListenerMediaDisplay = document.querySelectorAll('.photograph-media_display > div > img, .photograph-media_display > div > video')

  eventListenerMediaDisplay.forEach((element) => {
    element.addEventListener('click', displayLightBoxModal)
  })
}

async function displayPrice (photographer) {
  const encartPrice = document.querySelector('.photograph-encart_price')

  const photographerModel = photographerFactory(photographer)
  const userPriceDOM = photographerModel.getUserPriceDOM()

  encartPrice.appendChild(userPriceDOM)
}

async function displayAllLike (photographer) {
  const encartAllLike = document.querySelector('.photograph-encart_likes')

  const photographerModel = photographerFactory(photographer)
  const userPriceDOM = await photographerModel.getUserAllLikeDOM()

  const imglikes = document.createElement('img')
  imglikes.src = './assets/icons/heart-solid.svg'
  imglikes.alt = 'coeur'

  encartAllLike.appendChild(userPriceDOM)
  encartAllLike.appendChild(imglikes)
}

async function triButtonByPopularite () {
  const id = getUserId()
  const menubutton1 = document.getElementById('menubutton1')
  const img = document.querySelector('.menu-button-actions > button > img').cloneNode(true)
  menubutton1.innerText = 'Popularité'
  menubutton1.appendChild(img)

  // récupère les images et videos puis les concatènes pour les trier
  const images = await getMediaById(id, 'image')
  const videos = await getMediaById(id, 'video')
  const medias = images.concat(videos)

  medias.sort(function (a, b) { return a.likes - b.likes })

  displayTriButton(medias)
}

async function triButtonByDate () {
  const id = getUserId()
  const menubutton1 = document.getElementById('menubutton1')
  const img = document.querySelector('.menu-button-actions > button > img').cloneNode(true)
  menubutton1.innerText = 'Date'
  menubutton1.appendChild(img)

  const images = await getMediaById(id, 'image')
  const videos = await getMediaById(id, 'video')
  const medias = images.concat(videos)

  medias.sort(function (a, b) { return a.date - b.date })

  displayTriButton(medias)
}

async function triButtonByTitre () {
  const id = getUserId()
  const menubutton1 = document.getElementById('menubutton1')
  const img = document.querySelector('.menu-button-actions > button > img').cloneNode(true)
  menubutton1.innerText = 'Titre'
  menubutton1.appendChild(img)

  const images = await getMediaById(id, 'image')
  const videos = await getMediaById(id, 'video')
  const medias = images.concat(videos)

  // une autre méthode de tri que les précédentes
  medias.sort(function (a, b) {
    if (a.title < b.title) {
      return -1
    }
    if (a.title > b.title) {
      return 1
    }
    return 0
  })

  displayTriButton(medias)
}

function displayTriButton (medias) {
  const videos = []
  medias.forEach((media, index) => {
    // eslint-disable-next-line no-prototype-builtins
    if (media.hasOwnProperty('video')) {
      videos.push(media)
      medias.splice(index, 1)
    }
  })

  displayMedia(medias, 'image')
  displayMedia(videos, 'video')

  const eventListenerAddLike = document.querySelectorAll('.photograph-media_display_addLike')

  eventListenerAddLike.forEach((element) => {
    element.addEventListener('click', addLike)
  })
}

function addLike (element) {
  if (element.currentTarget.classList.contains('liked')) {
    element.currentTarget.classList.remove('liked')
    const p = element.currentTarget.querySelector('p')
    let pNumber = parseInt(p.innerHTML)
    pNumber = pNumber - 1
    p.innerHTML = pNumber.toString()

    const pEncartLike = document.querySelector('.photograph-encart_likes > p')
    let pNumberEncartLike = parseInt(pEncartLike.innerHTML)
    pNumberEncartLike = pNumberEncartLike - 1
    pEncartLike.innerHTML = pNumberEncartLike.toString()
  } else {
    const p = element.currentTarget.querySelector('p')
    let pNumber = parseInt(p.innerHTML)
    pNumber = pNumber + 1
    p.innerHTML = pNumber.toString()
    element.currentTarget.classList.add('liked')

    const pEncartLike = document.querySelector('.photograph-encart_likes > p')
    let pNumberEncartLike = parseInt(pEncartLike.innerHTML)
    pNumberEncartLike = pNumberEncartLike + 1
    pEncartLike.innerHTML = pNumberEncartLike.toString()
  }
}

function getUserId () {
  // va chercher l'id contenu dans l'url
  // passé par le clic sur les photographes sur la page index
  const params = (new URL(document.location)).searchParams
  const id = parseInt(params.get('id'))

  return id
}

async function initPhotographer () {
  const id = getUserId()
  const mediaDisplay = document.querySelector('.photograph-media_display')
  const photographer = await getPhotographerById(id)
  displayData(photographer)

  displayPrice(photographer)
  displayAllLike(photographer)

  triButtonByPopularite()

  const eventListenerAddLike = document.querySelectorAll('.photograph-media_display_addLike')

  eventListenerAddLike.forEach((element) => {
    element.addEventListener('click', addLike)
  })

  const menu1 = document.getElementById('menu1')
  const menubutton1 = document.getElementById('menubutton1')
  const menu1Popularite = document.getElementById('popularite')
  const menu1Date = document.getElementById('date')
  const menu1Titre = document.getElementById('titre')

  document.getElementById('menubutton1').addEventListener('click', () => {
    if (menu1.style.display === 'flex') {
      menu1.style.display = 'none'
      menubutton1.style.borderRadius = '5px'
      document.querySelector('#menubutton1 > img').classList.remove('rotated')
    } else {
      menu1.style.display = 'flex'
      document.querySelector('#menubutton1 > img').classList.add('rotated')
      menubutton1.style.borderRadius = 'inherit'
      menubutton1.style.borderTopLeftRadius = '5px'
      menubutton1.style.borderTopRightRadius = '5px'
    }

    menu1Popularite.style.display = 'flex'
    menu1Date.style.display = 'flex'
    menu1Titre.style.display = 'flex'
    if (menubutton1.innerHTML.toLowerCase().includes('popularité')) {
      menu1Popularite.style.display = 'none'
    } else if (menubutton1.innerHTML.toLowerCase().includes('titre')) {
      menu1Titre.style.display = 'none'
    } else if (menubutton1.innerHTML.toLowerCase().includes('date')) {
      menu1Date.style.display = 'none'
    }
  })

  menu1Popularite.addEventListener('click', () => {
    mediaDisplay.innerHTML = ''
    menu1.style.display = 'none'
    menubutton1.style.borderRadius = '5px'
    triButtonByPopularite()
    document.querySelector('#menubutton1 > img').classList.remove('rotated')
  })

  menu1Date.addEventListener('click', () => {
    mediaDisplay.innerHTML = ''
    menu1.style.display = 'none'
    menubutton1.style.borderRadius = '5px'
    triButtonByDate()
    document.querySelector('#menubutton1 > img').classList.remove('rotated')
  })

  menu1Titre.addEventListener('click', () => {
    mediaDisplay.innerHTML = ''
    menu1.style.display = 'none'
    menubutton1.style.borderRadius = '5px'
    triButtonByTitre()
    document.querySelector('#menubutton1 > img').classList.remove('rotated')
  })

  menu1Popularite.style.display = 'none'
}

initPhotographer()
