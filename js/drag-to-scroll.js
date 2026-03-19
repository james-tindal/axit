import { polyfillUserSelectNone } from './polyfill-user-select-none'

const carousel = document.querySelector('.drag-to-scroll')

let isDragging = false
let startX = 0
let startScroll = 0

const mouseMove = (e) => {
  if (!isDragging) return
  const deltaX = e.clientX - startX
  carousel.scrollLeft = startScroll - deltaX
}

const endDrag = () => {
  if (!isDragging) return
  isDragging = false

  carousel.classList.remove('dragging')

  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', endDrag)
  window.removeEventListener('blur', endDrag)
  window.removeEventListener('mouseleave', endDrag)
}

carousel.addEventListener('mousedown', (e) => {
  isDragging = true
  startX = e.clientX
  startScroll = carousel.scrollLeft

  carousel.classList.add('dragging')  // only change: use class instead of inline styles

  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', endDrag)
  window.addEventListener('blur', endDrag)
  window.addEventListener('mouseleave', endDrag)
})

polyfillUserSelectNone('.drag-to-scroll')
