import { getMediaById } from '../pages/photographer.js'

export function photographerFactory (data) {
  const { name, id, city, country, tagline, price, portrait } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM () {
    // ne pas oublier les alt et aria-label
    const article = document.createElement('article')
    const a = document.createElement('a')
    a.href = 'photographer.html?id=' + id
    a.ariaLabel = name
    const img = getUserPictureDOM()

    const h2 = getUserNameDOM()
    const h3 = document.createElement('h3')
    h3.textContent = city + ', ' + country
    const pTagline = document.createElement('p')
    pTagline.textContent = tagline

    const pPrice = getUserPriceDOM()

    article.appendChild(a)
    a.appendChild(img)
    a.appendChild(h2)
    article.appendChild(h3)
    article.appendChild(pTagline)
    article.appendChild(pPrice)

    return (article)
  }

  function getUserNameDOM () {
    // ne pas oublier les alt et aria-label

    const h2 = document.createElement('h2')
    h2.textContent = name

    return (h2)
  }

  function getUserPictureDOM () {
    // ne pas oublier les alt et aria-label

    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', tagline)
    img.ariaLabel = name

    return (img)
  }

  function getUserInfoDOM () {
    // ne pas oublier les alt et aria-label
    const div = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.textContent = name

    const h3 = document.createElement('h3')
    h3.textContent = city + ', ' + country

    const pTagline = document.createElement('p')
    pTagline.textContent = tagline

    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(pTagline)

    return (div)
  }

  function getUserPriceDOM () {
    const pPrice = document.createElement('p')
    pPrice.textContent = price + '€/jour'

    return (pPrice)
  }

  async function getUserAllLikeDOM () {
    const images = await getMediaById(id, 'image')
    const videos = await getMediaById(id, 'video')
    let likeTotal = 0

    images.forEach((image) => {
      likeTotal = image.likes + likeTotal
    })

    videos.forEach((video) => {
      likeTotal = video.likes + likeTotal
    })

    const plikes = document.createElement('p')
    plikes.textContent = likeTotal

    return plikes
  }

  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    portrait,
    getUserCardDOM,
    getUserPictureDOM,
    getUserInfoDOM,
    getUserPriceDOM,
    getUserAllLikeDOM,
    getUserNameDOM
  }
}
