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

function triButton (e) {
  const mediaDisplay = document.querySelector('.photograph-media_display')
  mediaDisplay.innerHTML = ''

  const selectedValue = e.target.value

  switch (selectedValue) {
    case 'popular':
      triButtonByPopularite()
      break

    case 'date':
      triButtonByDate()
      break

    case 'title':
      triButtonByTitre()
      break

    default: break
  }
}

async function triButtonByPopularite () {
  const id = getUserId()

  const images = await getMediaById(id, 'image')
  const videos = await getMediaById(id, 'video')
  const medias = images.concat(videos)

  medias.sort(function (a, b) { return a.likes - b.likes })

  displayTriButton(medias)
}

async function triButtonByDate () {
  const id = getUserId()

  const images = await getMediaById(id, 'image')
  const videos = await getMediaById(id, 'video')
  const medias = images.concat(videos)

  medias.sort(function (a, b) { return a.date - b.date })

  displayTriButton(medias)
}

async function triButtonByTitre () {
  const id = getUserId()

  const images = await getMediaById(id, 'image')
  const videos = await getMediaById(id, 'video')
  const medias = images.concat(videos)

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
  const params = (new URL(document.location)).searchParams
  const id = parseInt(params.get('id'))

  return id
}

async function initPhotographer () {
  const id = getUserId()

  const photographer = await getPhotographerById(id)
  displayData(photographer)

  displayPrice(photographer)
  displayAllLike(photographer)

  const mediasPicture = await getMediaById(id, 'image')
  const mediasVideo = await getMediaById(id, 'video')
  displayMedia(mediasPicture, 'image')
  displayMedia(mediasVideo, 'video')

  document.getElementById('select').addEventListener('change', triButton, false)

  const eventListenerAddLike = document.querySelectorAll('.photograph-media_display_addLike')

  eventListenerAddLike.forEach((element) => {
    element.addEventListener('click', addLike)
  })
}

initPhotographer()
