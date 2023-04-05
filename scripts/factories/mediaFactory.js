import { mediaPicture } from './mediaPicture.js'
import { mediaVideo } from './mediaVideo.js'

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
    const result = await fetch('../../data/photographers.json')
    const resultJson = await result.json()
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
