import '../scss/styles.scss'

function getArrowSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 7 12" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.08569 5.58569L0.292799 1.7928C-0.097725 1.40227 -0.0977242 0.769111 0.2928 0.378587L0.378586 0.292801C0.76911 -0.0977237 1.40228 -0.0977241 1.7928 0.2928L6.37859 4.87859C6.76911 5.26911 6.76911 5.90228 6.37859 6.2928L1.7928 10.8786C1.40228 11.2691 0.769111 11.2691 0.378587 10.8786L0.292801 10.7928C-0.0977237 10.4023 -0.0977241 9.76911 0.2928 9.37859L4.08569 5.58569Z" fill="#e31e24"/>
    </svg>`
}

const fullBrandsList = [
  { name: '', img: 'img/lenovo.png' },
  { name: '', img: 'img/bosch.png' },
  { name: '', img: 'img/apple.png' },
  { name: '', img: 'img/sonic.png' },
  { name: '', img: 'img/hp.png' },
  { name: '', img: 'img/aser.png' },
  { name: '', img: 'img/sony.png' },
  { name: '', img: 'img/samsung.png' },
  { name: '', img: 'img/lenovo.png' },
  { name: '', img: 'img/bosch.png' },
  { name: '', img: 'img/apple.png' }
]

let isExpanded = false
let currentLimit = 6

const desktopGrid = document.getElementById('desktopBrandsGrid')
const sliderTrack = document.getElementById('sliderTrack')
const sliderPagination = document.getElementById('sliderPagination')
const toggleBtn = document.getElementById('toggleBtn')

function getLimitByWidth() {
  const width = window.innerWidth
  if (width <= 768) return 6
  if (width <= 1119) return 6
  return 8
}

function createDesktopBrandElement(brand) {
  const link = document.createElement('a')
  link.className = 'brand-link'
  link.href = '#'
  const leftPart = document.createElement('span')
  leftPart.className = 'brand-content'
  const img = document.createElement('img')
  img.src = brand.img
  img.alt = brand.name || 'brand'
  img.className = 'brand-icon'
  const arrow = document.createElement('span')
  arrow.className = 'brand-arrow'
  arrow.innerHTML = getArrowSVG()
  leftPart.appendChild(img)
  link.appendChild(leftPart)
  link.appendChild(arrow)
  link.addEventListener('click', (e) => e.preventDefault())
  return link
}

function renderDesktopGrid() {
  if (!desktopGrid) return
  desktopGrid.innerHTML = ''
  fullBrandsList.forEach((brand) => {
    desktopGrid.appendChild(createDesktopBrandElement(brand))
  })
  updateDesktopVisibility()
}

function updateDesktopVisibility() {
  if (!desktopGrid) return
  const visibleCount = isExpanded ? fullBrandsList.length : currentLimit
  const allBrands = desktopGrid.querySelectorAll('.brand-link')
  allBrands.forEach((brand, index) => {
    brand.style.display = index < visibleCount ? 'flex' : 'none'
  })
  if (toggleBtn) {
    toggleBtn.innerHTML = isExpanded
      ? '<span class="toggle-btn__arrows"><span class="toggle-btn__arrow"></span><span class="toggle-btn__arrow"></span></span> Скрыть'
      : '<span class="toggle-btn__arrows"><span class="toggle-btn__arrow"></span><span class="toggle-btn__arrow"></span></span> Показать все'
  }
}

function updateUI() {
  if (window.innerWidth <= 768) return
  updateDesktopVisibility()
}

function onToggleClick() {
  isExpanded = !isExpanded
  updateUI()
}

function initBrands() {
  currentLimit = getLimitByWidth()
  isExpanded = false
  renderDesktopGrid()
  if (toggleBtn) toggleBtn.addEventListener('click', onToggleClick)
  window.addEventListener('resize', () => {
    currentLimit = getLimitByWidth()
    if (!isExpanded) updateUI()
  })
}

// БЛОК С ВИДАМИ ТЕХНИКИ
const techTypesGrid = document.getElementById('techTypesGrid')
const techTypesToggle = document.getElementById('techTypesToggle')

if (techTypesGrid && techTypesToggle) {
  const allTechItems = Array.from(
    techTypesGrid.querySelectorAll('.tech-types__item')
  )
  const defaultVisible = 4
  let isTechExpanded = false

  function updateTechVisibility() {
    allTechItems.forEach((item, index) => {
      item.style.display =
        index < defaultVisible || isTechExpanded ? 'flex' : 'none'
    })
    techTypesToggle.innerHTML = isTechExpanded
      ? '<span class="tech-types__toggle__arrows"><span class="tech-types__toggle__arrow"></span><span class="tech-types__toggle__arrow"></span></span> Скрыть'
      : '<span class="tech-types__toggle__arrows"><span class="tech-types__toggle__arrow"></span><span class="tech-types__toggle__arrow"></span></span> Показать все'
  }

  techTypesToggle.addEventListener('click', () => {
    isTechExpanded = !isTechExpanded
    updateTechVisibility()
  })

  updateTechVisibility()
}

// ДОБАВЛЕНИЕ СТРЕЛОК
document.querySelectorAll('.tech-types__arrow').forEach((el) => {
  el.innerHTML = getArrowSVG()
})

document.querySelectorAll('.prices__order-arrow').forEach((el) => {
  el.innerHTML = getArrowSVG()
})

document.querySelectorAll('.prices__offer-arrow').forEach((el) => {
  el.innerHTML = getArrowSVG()
})

document.addEventListener('DOMContentLoaded', () => {
  initBrands()
  console.log('✅ Загружено')
})
