export function displayLightBoxModal (e) {
  const modal = document.querySelector('.lightbox_modal')
  modal.style.display = 'block'

  const lightBoxMedia = document.querySelector('.lightbox-media')
  lightBoxMedia.innerHTML = ''
  const lightBoxMediaDom = e.target.cloneNode(true)
  const lightBoxMediaTitreDom = document.createElement('h2')
  const mediaTitle = e.target.parentNode.querySelector('div > h2').innerText
  lightBoxMediaTitreDom.textContent = mediaTitle
  lightBoxMediaDom.alt = mediaTitle
  lightBoxMedia.appendChild(lightBoxMediaDom)
  lightBoxMedia.appendChild(lightBoxMediaTitreDom)

  const firstFocusableElement = document.querySelector('.lightbox_modal_img')
  firstFocusableElement.focus()
  hideChevron()
}

function displayLightBoxMedia (element) {
  const lightBoxMedia = document.querySelector('.lightbox-media')
  lightBoxMedia.innerHTML = ''
  const lightBoxMediaDom = element.cloneNode(true)
  const lightBoxMediaTitreDom = document.createElement('h2')
  const mediaTitle = element.parentNode.querySelector('div > h2').innerText

  lightBoxMediaTitreDom.textContent = mediaTitle
  lightBoxMediaDom.alt = mediaTitle
  lightBoxMedia.appendChild(lightBoxMediaDom)
  lightBoxMedia.appendChild(lightBoxMediaTitreDom)
  hideChevron()
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

function getIndexMedia () {
  const medias = document.querySelectorAll('.photograph-media_display > div > img, .photograph-media_display > div > video')
  const lightBoxMediaTitre = document.querySelector('.lightbox-media > h2').innerText
  let indexMedia = 0
  medias.forEach(function (media, index) {
    const titleMedia = media.parentNode.querySelector('div > h2').innerText
    if (titleMedia === lightBoxMediaTitre) {
      indexMedia = index
    }
  })
  return indexMedia
}

function hideChevron () {
  const leftChevron = document.querySelector('.left-chevron > img')
  const rightChevron = document.querySelector('.right-chevron > img')
  const medias = document.querySelectorAll('.photograph-media_display > div > img, .photograph-media_display > div > video')
  const indexMedia = getIndexMedia()
  if (indexMedia === 0) {
    leftChevron.classList.add('displaynone')
  } else if (indexMedia === medias.length - 1) {
    rightChevron.classList.add('displaynone')
  } else {
    leftChevron.classList.remove('displaynone')
    rightChevron.classList.remove('displaynone')
  }
}

function handlerRight () {
  const rightChevron = document.querySelector('.right-chevron > img')
  const medias = document.querySelectorAll('.photograph-media_display > div > img, .photograph-media_display > div > video')
  if (!rightChevron.classList.contains('displaynone')) {
    displayLightBoxMedia(medias[getIndexMedia() + 1])
  }
}

function handlerLeft () {
  const leftChevron = document.querySelector('.left-chevron > img')
  const medias = document.querySelectorAll('.photograph-media_display > div > img, .photograph-media_display > div > video')
  if (!leftChevron.classList.contains('displaynone')) {
    displayLightBoxMedia(medias[getIndexMedia() - 1])
  }
}

function initLightBox () {
  const modal = document.querySelector('.lightbox_modal')
  const leftChevron = document.querySelector('.left-chevron > img')
  const rightChevron = document.querySelector('.right-chevron > img')

  document.querySelector('.lightbox_modal_img').addEventListener('click', closeLightBoxModal)

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.code === 'Escape' && modal.style.display === 'block') {
        closeLightBoxModal()
      }
    },
    true
  )

  rightChevron.addEventListener('click', handlerRight)
  leftChevron.addEventListener('click', handlerLeft)

  document.addEventListener(
    'keydown',
    function handlerLeftAndRightKey (event) {
      if (event.code === 'ArrowLeft' && modal.style.display === 'block') {
        leftChevron.click()
      } else if (event.code === 'ArrowRight' && modal.style.display === 'block') {
        rightChevron.click()
      }
    },
    true
  )

  document.addEventListener('keydown', function (e) {
    const modal = document.querySelector('.lightbox_modal')
    if (e.key === 'Tab' && modal.style.display === 'block') {
      const firstFocusableElement = document.querySelector('.lightbox_modal_img')
      const lastFocusableElement = rightChevron
      console.log('passé')
      if (rightChevron.classList.contains('displaynone')) {
        console.log('passé')
        if (leftChevron === document.activeElement) {
          e.preventDefault()
          firstFocusableElement.focus()
        }
      }
      if (lastFocusableElement === document.activeElement) {
        e.preventDefault()
        firstFocusableElement.focus()
      }
    }
  })
}

initLightBox()
