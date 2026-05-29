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

// ========== МОБИЛЬНЫЙ СЛАЙДЕР ==========
function renderMobileSlider() {
  if (!sliderTrack) return

  sliderTrack.innerHTML = ''

  const visibleCount = isExpanded ? fullBrandsList.length : currentLimit
  const brandsToShow = fullBrandsList.slice(0, visibleCount)

  brandsToShow.forEach((brand, index) => {
    const slide = document.createElement('div')
    slide.className = 'slider-item'
    slide.dataset.index = index

    const content = document.createElement('div')
    content.className = 'slider-item-content'

    const img = document.createElement('img')
    img.src = brand.img
    img.alt = brand.name || 'brand'
    img.className = 'brand-icon-mobile'
    img.onerror = () => {
      img.style.display = 'none'
    }

    content.appendChild(img)

    const arrow = document.createElement('div')
    arrow.className = 'slider-arrow'
    arrow.innerHTML = getArrowSVG()

    slide.appendChild(content)
    slide.appendChild(arrow)

    slide.addEventListener('click', () => {
      console.log('Выбран бренд')
    })

    sliderTrack.appendChild(slide)
  })

  updatePagination(brandsToShow.length)
  setupScrollObserver()
}

function updatePagination(slidesCount) {
  if (!sliderPagination) return
  sliderPagination.innerHTML = ''

  for (let i = 0; i < slidesCount; i++) {
    const dot = document.createElement('div')
    dot.className = 'pagination-dot'
    if (i === 0) dot.classList.add('active')
    dot.addEventListener('click', () => {
      const slides = sliderTrack.querySelectorAll('.slider-item')
      if (slides[i]) {
        slides[i].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        })
      }
    })
    sliderPagination.appendChild(dot)
  }
}

function setupScrollObserver() {
  if (!sliderTrack || !sliderPagination) return

  const updateActiveDot = () => {
    const slides = sliderTrack.querySelectorAll('.slider-item')
    const scrollPosition = sliderTrack.scrollLeft
    const slideWidth = slides[0] ? slides[0].offsetWidth : 0
    const activeIndex = Math.round(scrollPosition / slideWidth)

    const dots = sliderPagination.querySelectorAll('.pagination-dot')
    dots.forEach((dot, i) => {
      if (i === activeIndex) {
        dot.classList.add('active')
      } else {
        dot.classList.remove('active')
      }
    })
  }

  sliderTrack.addEventListener('scroll', updateActiveDot)
  window.addEventListener('resize', updateActiveDot)
}

// ========== БЛОК С ВИДАМИ ТЕХНИКИ ==========
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

// ========== МОДАЛЬНЫЕ ОКНА (ВЫЕЗЖАЮЩИЕ) ==========
const modalCall = document.getElementById('callModal')
const modalFeedback = document.getElementById('feedbackModal')
const modalOverlay = document.getElementById('modalOverlay')
const callButtons = document.querySelectorAll('.btn-call, .btn__red-call')
const chatButtons = document.querySelectorAll('.btn-chat, .btn__red-chat')

function openModal(modal) {
  if (modal) modal.classList.add('modal--open')
  if (modalOverlay) modalOverlay.classList.add('modal-overlay--visible')
  document.body.style.overflow = 'hidden'
}

function closeModal(modal) {
  if (modal) modal.classList.remove('modal--open')
  if (modalOverlay) modalOverlay.classList.remove('modal-overlay--visible')
  document.body.style.overflow = ''
}

function closeAllModals() {
  closeModal(modalCall)
  closeModal(modalFeedback)
}

callButtons.forEach((btn) => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      openModal(modalCall)
    })
  }
})

chatButtons.forEach((btn) => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      openModal(modalFeedback)
    })
  }
})

document.querySelectorAll('.modal-side__close').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal-side')
    closeModal(modal)
  })
})

if (modalOverlay) {
  modalOverlay.addEventListener('click', () => {
    closeAllModals()
  })
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals()
  }
})

// Отправка форм
const callForm = document.getElementById('callForm')
const feedbackForm = document.getElementById('feedbackForm')

if (callForm) {
  callForm.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Заявка на звонок отправлена!')
    closeModal(modalCall)
    callForm.reset()
  })
}

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Сообщение отправлено!')
    closeModal(modalFeedback)
    feedbackForm.reset()
  })
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ПРИ РЕСАЙЗЕ ==========
function updateUIBasedOnWidth() {
  const isMobile = window.innerWidth <= 768
  const desktopGridElem = document.querySelector('.brands-grid.desktop-grid')
  const mobileSliderContainer = document.querySelector(
    '.mobile-slider-container'
  )

  if (isMobile) {
    if (desktopGridElem) desktopGridElem.style.display = 'none'
    if (mobileSliderContainer) mobileSliderContainer.style.display = 'block'
    renderMobileSlider()
  } else {
    if (desktopGridElem) desktopGridElem.style.display = 'grid'
    if (mobileSliderContainer) mobileSliderContainer.style.display = 'none'
  }
}

function initBrands() {
  currentLimit = getLimitByWidth()
  isExpanded = false
  renderDesktopGrid()
  if (toggleBtn) toggleBtn.addEventListener('click', onToggleClick)
}

// ========== ДОБАВЛЕНИЕ СТРЕЛОК ==========
document.querySelectorAll('.tech-types__arrow').forEach((el) => {
  el.innerHTML = getArrowSVG()
})

document.querySelectorAll('.prices__order-arrow').forEach((el) => {
  el.innerHTML = getArrowSVG()
})

document.querySelectorAll('.prices__offer-arrow').forEach((el) => {
  el.innerHTML = getArrowSVG()
})

// ========== ЗАПУСК ==========
window.addEventListener('load', () => {
  initBrands()
  updateUIBasedOnWidth()
  console.log('✅ Загружено')
})

window.addEventListener('resize', () => {
  currentLimit = getLimitByWidth()
  if (!isExpanded) updateUI()
  updateUIBasedOnWidth()
})
