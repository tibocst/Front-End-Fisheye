export function mediaPicture (data) {
  const { id, photographerId, title, image, likes, date, price } = data

  const picture = `assets/sample photos/${image}`

  function getMediaDOM () {
    const div = document.createElement('div')

    const img = getMediaPictureDOM()

    const divTitre = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.textContent = title

    const pLikes = getMediaLikeDOM()

    div.appendChild(img)
    div.appendChild(divTitre)
    divTitre.appendChild(h2)
    divTitre.appendChild(pLikes)

    return (div)
  }

  function getMediaPictureDOM () {
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', title + ', closeup view')

    return (img)
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
    image,
    likes,
    date,
    price,
    getMediaDOM,
    getMediaPictureDOM,
    getMediaLikeDOM
  }
}
