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
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        closeLightBoxModal()
      }
    },
    true
  )
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
  console.log(leftChevron)
  console.log(rightChevron)
  leftChevron.parentNode.replaceChild(leftChevron.cloneNode(true), leftChevron)
  rightChevron.parentNode.replaceChild(rightChevron.cloneNode(true), rightChevron)
  console.log(leftChevron)
  console.log(rightChevron)
}

function eventListenerChevron (title) {
  const medias = document.querySelectorAll('.photograph-media_display > div > img, .photograph-media_display > div > video')
  const leftChevron = document.querySelector('.left-chevron > img')
  const rightChevron = document.querySelector('.right-chevron > img')
  let indexMedia = 0
  console.log(title)
  console.log(indexMedia)
  medias.forEach(function (media, index) {
    const titleMedia = media.parentNode.querySelector('div > h2').innerText
    if (titleMedia === title) {
      indexMedia = index
    }
  })
  console.log(indexMedia)

  if (indexMedia === 0) {
    console.log(indexMedia)
    leftChevron.classList.add('displaynone')
    rightChevron.addEventListener('click', function handlerFirst () {
      document.querySelector('.lightbox-media').innerHTML = ''
      leftChevron.classList.remove('displaynone')
      console.log(indexMedia)
      displayLightBoxMedia(medias[indexMedia + 1])
      this.removeEventListener('click', handlerFirst)
      console.log('passéfirst')
    })

    document.addEventListener(
      'keydown',
      function handlerFirstKey (event) {
        console.log(indexMedia)
        console.log('passé keydown right first')
        switch (event.code) {
          case 'ArrowRight': rightChevron.click()
            console.log('passéfirst touche')
            rightChevron.removeEventListener('keydown', handlerFirstKey, true)
            // Right pressed
            break
        }
      },
      true
    )
  } else if (indexMedia === medias.length - 1) {
    console.log(indexMedia)
    rightChevron.classList.add('displaynone')
    leftChevron.addEventListener('click', function handlerLast () {
      document.querySelector('.lightbox-media').innerHTML = ''
      rightChevron.classList.remove('displaynone')
      console.log(indexMedia)
      displayLightBoxMedia(medias[indexMedia - 1])
      this.removeEventListener('click', handlerLast)
      console.log('passélast')
    })

    document.addEventListener(
      'keydown',
      function handlerLastKey (event) {
        switch (event.code) {
          case 'ArrowLeft': leftChevron.click()
            console.log('passélast touche')
            this.removeEventListener('keydown', handlerLastKey, true)
            // Left pressed
            break
        }
      },
      true
    )
  } else {
    console.log(indexMedia)
    rightChevron.addEventListener('click', function handlerRight () {
      document.querySelector('.lightbox-media').innerHTML = ''
      this.removeEventListener('click', handlerRight)
      leftChevron.parentNode.replaceChild(leftChevron.cloneNode(true), leftChevron)
      rightChevron.parentNode.replaceChild(rightChevron.cloneNode(true), rightChevron)
      console.log(indexMedia)
      displayLightBoxMedia(medias[indexMedia + 1])
      console.log('passéright')
    })
    leftChevron.addEventListener('click', function handlerLeft () {
      document.querySelector('.lightbox-media').innerHTML = ''
      this.removeEventListener('click', handlerLeft)
      leftChevron.parentNode.replaceChild(leftChevron.cloneNode(true), leftChevron)
      rightChevron.parentNode.replaceChild(rightChevron.cloneNode(true), rightChevron)
      console.log(indexMedia)
      displayLightBoxMedia(medias[indexMedia - 1])
      console.log('passéleft')
    })

    document.addEventListener(
      'keydown',
      function handlerLeftAndRightKey (event) {
        switch (event.code) {
          case 'ArrowLeft': leftChevron.click()
            console.log('passéleft touche')
            this.removeEventListener('keydown', handlerLeftAndRightKey, true)
            // Left pressed
            break
          case 'ArrowRight': rightChevron.click()
            console.log('passéright touche')
            this.removeEventListener('keydown', handlerLeftAndRightKey, true)
            // Right pressed
            break
        }
      },
      true
    )
  }
}
