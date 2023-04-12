export function mediaVideo (data) {
  const { id, photographerId, title, video, likes, date, price } = data

  const videoPath = `assets/sample photos/${video}`

  function getMediaDOM () {
    const div = document.createElement('div')

    const video = getMediaVideoDOM()

    const divTitre = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.textContent = title

    const pLikes = getMediaLikeDOM()

    div.appendChild(video)
    div.appendChild(divTitre)
    divTitre.appendChild(h2)
    divTitre.appendChild(pLikes)

    return (div)
  }

  function getMediaVideoDOM () {
    const video = document.createElement('video')
    const source = document.createElement('source')

    video.setAttribute('controls', '')
    video.setAttribute('alt', title + ', closeup view')
    source.setAttribute('src', videoPath)
    source.setAttribute('type', 'video/mp4')
    video.appendChild(source)

    return (video)
  }

  function getMediaLikeDOM () {
    const divlikes = document.createElement('div')
    divlikes.className = 'photograph-media_display_addLike'

    const plikes = document.createElement('p')
    plikes.textContent = likes

    const imglikes = document.createElement('img')
    imglikes.src = './assets/icons/heart-solid.svg'
    imglikes.alt = 'likes'

    divlikes.appendChild(plikes)
    divlikes.appendChild(imglikes)

    return (divlikes)
  }

  return {
    id,
    photographerId,
    title,
    video,
    likes,
    date,
    price,
    getMediaDOM,
    getMediaVideoDOM,
    getMediaLikeDOM
  }
}
