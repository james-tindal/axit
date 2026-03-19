
const toggleButton = document.querySelector('.mobile-menu-toggle')
const menu = document.querySelector('.navbar ul')
let disposeEvent
toggleButton.addEventListener('click', () => {
  const isOpen = menu.classList.contains('open')
  if (isOpen)
    closeMenu()
  else {
    menu.classList.add('open')
    menu.classList.remove('closed')
    disposeEvent = clickOutside('.mobile-menu-toggle, .navbar ul', closeMenu)
  }
})

function closeMenu() {
  menu.classList.replace('open', 'closed')
  disposeEvent?.()
  disposeEvent = undefined
}

function clickOutside(selector, callback) {
  function handler({ target }) {
    console.log(target, target.matches(selector))
    if (!target.matches(selector))
      callback()
  }
  return addEventListener('click', handler)
}

function addEventListener(event, handler) {
  document.addEventListener(event, handler)
  return () =>
    document.removeEventListener(event, handler)
}
