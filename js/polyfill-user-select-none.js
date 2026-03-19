
const shouldPolyfill = !CSS.supports('user-select', 'none')
export let polyfillUserSelectNone

if (shouldPolyfill) {
  const preventSelect = e => e.preventDefault()

  function onMouseDown() {
    document.addEventListener('selectstart', preventSelect)
    document.addEventListener('mouseup', onMouseUp, { once: true })
  }

  function onMouseUp() {
    document.removeEventListener('selectstart', preventSelect)
  }

  polyfillUserSelectNone = selector => {
    const elements = document.querySelectorAll(selector)
    for (const el of elements)
      el.addEventListener('mousedown', onMouseDown)
  }
} else {
  polyfillUserSelectNone = () => {}
}
