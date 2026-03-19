
const anchors = document.querySelectorAll('a[href^="#"]')

for (const anchor of anchors) {
  onPrimaryClick(anchor, event => {
    event.preventDefault()
    const targetId = event.currentTarget.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement)
      targetElement.scrollIntoView({ behavior: 'smooth' })
  })
}

function onPrimaryClick(element, handler) {
  element.addEventListener('click', event => {
    // Ignore if it's modified or already handled
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    handler(event)
  })
}
