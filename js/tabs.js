
const tabs = [...document.querySelectorAll('#feature-one .tab')]
const pages = [...document.querySelectorAll('#feature-one .page')]

function deselectAll() {
  for (const node of [...tabs, ...pages])
    node.classList.remove('active')
}

function makeActive(...nodes) {
  for (const node of nodes)
    node.classList.add('active')
}

function select(tab) {
  const index = tabs.indexOf(tab)
  const page = pages[index]
  deselectAll()
  makeActive(tab, page)
}

for (const tab of tabs)
  tab.addEventListener('click', ({ target }) => select(target))
