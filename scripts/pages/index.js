import { photographerFactory, getPhotographers } from '../factories/photographer.js'

// affiche les profils des photographes
async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()

    photographersSection.appendChild(userCardDOM)
  })
};

async function init () {
  const photographers = await getPhotographers()

  displayData(photographers)
};

init()
