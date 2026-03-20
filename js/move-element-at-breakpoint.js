function debounce(fn, delay = 100) {
  let timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(), delay)
  }
}

// All elements to move should have data attributes:
// data-move-after="#selector" (destination sibling)
// data-move-break="665" (breakpoint in px)
const trackedElements = Array.from(document.querySelectorAll('[data-move-after]')).map(el => ({
  el,
  originalParent: el.parentNode,
  moveAfterEl: document.querySelector(el.dataset.moveAfter),
  breakpoint: parseInt(el.dataset.moveBreak) || 0
}))

function handleResize(item) {
  if (window.innerWidth <= item.breakpoint)
    item.moveAfterEl.after(item.el)
  else
    item.originalParent.append(item.el)
}

const handleResizeAll = () => trackedElements.forEach(handleResize)

handleResizeAll()
window.addEventListener('resize', debounce(handleResizeAll, 100))
