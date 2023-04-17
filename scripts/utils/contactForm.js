// eslint-disable-next-line no-unused-vars
function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
  const firstFocusableElement = document.querySelector('.contact_modal_img')
  console.log(firstFocusableElement)
  firstFocusableElement.focus()

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal()
      }
    },
    true
  )
}

function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

// eslint-disable-next-line no-unused-vars
function submitedContactForm (event) {
  // affiche les résultats envoyé par le form sur la console
  // comme spécifié dans les notes
  event.preventDefault()
  console.log(document.forms.contactForm.first.value)
  console.log(document.forms.contactForm.second.value)
  console.log(document.forms.contactForm.email.value)
  console.log(document.forms.contactForm.msg.value)

  closeModal()
  return false
}

document.addEventListener('keydown', function (e) {
  const modal = document.getElementById('contact_modal')
  if (e.key === 'Tab' && modal.style.display === 'block') {
    const firstFocusableElement = document.querySelector('.contact_modal_img')
    const lastFocusableElement = document.querySelector('.contact_modal > form > input')
    if (lastFocusableElement === document.activeElement) {
      e.preventDefault()
      firstFocusableElement.focus()
    }
  }
})
