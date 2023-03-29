// eslint-disable-next-line no-unused-vars
function displayModal () {
  const modal = document.getElementById('contact_modal')

  modal.style.display = 'block'

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
  event.preventDefault()
  console.log(document.forms.contactForm.first.value)
  console.log(document.forms.contactForm.second.value)
  console.log(document.forms.contactForm.email.value)
  console.log(document.forms.contactForm.msg.value)

  closeModal()
  return false
}
