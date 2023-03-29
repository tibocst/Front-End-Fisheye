export function displayLightBoxModal (e) {
  const modal = document.querySelector('.lightbox_modal')
  modal.style.display = 'block'

  const lightBoxMedia = document.querySelector('.lightbox-media')
  const lightBoxMediaDom = e.target.cloneNode(true)
  const lightBoxMediaTitreDom = document.createElement('h2')
  const mediaTitle = e.target.parentNode.querySelector('div > h2').innerText
  lightBoxMediaTitreDom.textContent = mediaTitle
  lightBoxMediaDom.alt = mediaTitle
  lightBoxMedia.appendChild(lightBoxMediaDom)
  lightBoxMedia.appendChild(lightBoxMediaTitreDom)

  document.querySelector('.lightbox_modal_img').addEventListener('click', closeLightBoxModal)

  eventListenerChevron(mediaTitle)
}

function displayLightBoxMedia (element) {
  const lightBoxMedia = document.querySelector('.lightbox-media')
  const lightBoxMediaDom = element.cloneNode(true)
  const lightBoxMediaTitreDom = document.createElement('h2')
  const mediaTitle = element.parentNode.querySelector('div > h2').innerText

  lightBoxMediaTitreDom.textContent = mediaTitle
  lightBoxMediaDom.alt = mediaTitle
  lightBoxMedia.appendChild(lightBoxMediaDom)
  lightBoxMedia.appendChild(lightBoxMediaTitreDom)

  eventListenerChevron(mediaTitle)
}

function closeLightBoxModal () {
  const modal = document.querySelector('.lightbox_modal')
  modal.style.display = 'none'
  document.querySelector('.lightbox-media').innerHTML = ''
  const leftChevron = document.querySelector('.left-chevron > img')
  const rightChevron = document.querySelector('.right-chevron > img')

  leftChevron.classList.remove('displaynone')
  rightChevron.classList.remove('displaynone')
}

function eventListenerChevron (title) {
  const medias = document.querySelectorAll('.photograph-media_display > div > img, .photograph-media_display > div > video')
  const leftChevron = document.querySelector('.left-chevron > img')
  const rightChevron = document.querySelector('.right-chevron > img')
  let indexMedia = 0

  medias.forEach(function (media, index) {
    const titleMedia = media.parentNode.querySelector('div > h2').innerText
    if (titleMedia === title) {
      indexMedia = index
    }
  })

  if (indexMedia === 0) {
    leftChevron.classList.add('displaynone')
    rightChevron.addEventListener('click', function handlerFirst () {
      document.querySelector('.lightbox-media').innerHTML = ''
      leftChevron.classList.remove('displaynone')
      displayLightBoxMedia(medias[indexMedia + 1])
      this.removeEventListener('click', handlerFirst)
      console.log('passéfirst')
    })
  } else if (indexMedia === medias.length - 1) {
    rightChevron.classList.add('displaynone')
    leftChevron.addEventListener('click', function handlerLast () {
      document.querySelector('.lightbox-media').innerHTML = ''
      rightChevron.classList.remove('displaynone')
      displayLightBoxMedia(medias[indexMedia - 1])
      this.removeEventListener('click', handlerLast)
      console.log('passélast')
    })
  } else {
    rightChevron.addEventListener('click', function handlerRight () {
      document.querySelector('.lightbox-media').innerHTML = ''
      this.removeEventListener('click', handlerRight)
      leftChevron.parentNode.replaceChild(leftChevron.cloneNode(true), leftChevron)
      rightChevron.parentNode.replaceChild(rightChevron.cloneNode(true), rightChevron)
      displayLightBoxMedia(medias[indexMedia + 1])
      console.log('passéright')
    })
    leftChevron.addEventListener('click', function handlerLeft () {
      document.querySelector('.lightbox-media').innerHTML = ''
      this.removeEventListener('click', handlerLeft)
      leftChevron.parentNode.replaceChild(leftChevron.cloneNode(true), leftChevron)
      rightChevron.parentNode.replaceChild(rightChevron.cloneNode(true), rightChevron)
      displayLightBoxMedia(medias[indexMedia - 1])
      console.log('passéleft')
    })
  }
}
