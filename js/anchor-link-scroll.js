
const anchors = document.querySelectorAll('a[href^="#"]')

for (const anchor of anchors) {
  anchor.addEventListener('click', event => {
    event.preventDefault()
    const targetId = event.currentTarget.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement)
      targetElement.scrollIntoView({ behavior: 'smooth' })
  })
}
