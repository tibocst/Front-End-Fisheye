import { mediaPicture } from './mediaPicture.js'
import { mediaVideo } from './mediaVideo.js'

// redirige vers la bonne factory en fonction du type de media souhaité
export function mediaFactory (data, type) {
  if (type === 'image') {
    return mediaPicture(data)
  } else if (type === 'video') {
    return mediaVideo(data)
  } else {
    console.log('Unknown type format : image ou video accepté')
  }
}

export async function getMediaById (id, type) {
  try {
    const result = await fetch('https://tibocst.github.io/Front-End-Fisheye/data/photographers.json')
    const resultJson = await result.json()
    console.log(resultJson)
    const medias = resultJson.media
    const mediasTab = []

    for (let i = 0; i < medias.length; i++) {
      if (medias[i].photographerId === id) {
        // eslint-disable-next-line no-prototype-builtins
        if (medias[i].hasOwnProperty(type)) {
          mediasTab.push(medias[i])
        }
      }
    }
    return mediasTab
  } catch (error) {
    console.log(error)
  }
}
