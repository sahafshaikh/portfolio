document.addEventListener("DOMContentLoaded", () => {
  // Image Management System

  
  const uploadedImages = []
  const currentImageIndex = 0

  // Theme Management
  let currentTheme = "dark"

  // Initialize theme
  function initializeTheme() {
    try {
      currentTheme = localStorage.getItem("theme") || "dark"
    } catch (e) {
      console.warn("localStorage access failed:", e)
    }

    document.documentElement.setAttribute("data-theme", currentTheme)
    updateThemeIcon(currentTheme)
    generateAllPlaceholderImages()
  }

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle")
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", currentTheme)

    try {
      localStorage.setItem("theme", currentTheme)
    } catch (e) {
      console.warn("localStorage set failed:", e)
    }

    updateThemeIcon(currentTheme)
    generateAllPlaceholderImages()

    // Add smooth transition effect
    document.body.style.transition = "all 0.3s ease"
    setTimeout(() => {
      document.body.style.transition = ""
    }, 300)
  })

  function updateThemeIcon(theme) {
    const icon = theme === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>'
    themeToggle.innerHTML = icon
  }

  // Generate placeholder images with proper font rendering
  function generateAllPlaceholderImages() {
    const theme = document.documentElement.getAttribute("data-theme")
    const bgColor = theme === "dark" ? "#64ffda" : "#3182ce"
    const textColor = theme === "dark" ? "#0a0e1a" : "#ffffff"

    // Generate all canvas placeholders
    generateCanvasImage("heroImage", "Sahaf Shaikh", bgColor, textColor)
    generateCanvasImage("aboutImage", "Profile", bgColor, textColor)

    // Project images
    document.querySelectorAll(".project-canvas").forEach((canvas) => {
      const text = canvas.getAttribute("data-text") || "Project"
      generateCanvasImage(canvas, text, bgColor, textColor)
    })

    // Blog images
    document.querySelectorAll(".blog-canvas").forEach((canvas) => {
      const text = canvas.getAttribute("data-text") || "Blog"
      generateCanvasImage(canvas, text, bgColor, textColor)
    })

    // Modal images
    document.querySelectorAll(".modal-canvas").forEach((canvas) => {
      const text = canvas.getAttribute("data-text") || "Details"
      generateCanvasImage(canvas, text, bgColor, textColor)
    })

    // Testimonial avatars
    document.querySelectorAll(".testimonial-avatar").forEach((canvas) => {
      const text = canvas.getAttribute("data-text") || "User"
      generateCanvasImage(canvas, text, bgColor, textColor)
    })
  }

  function generateCanvasImage(canvasElement, text, bgColor, textColor) {
    if (typeof canvasElement === "string") {
      canvasElement = document.getElementById(canvasElement)
    }

    if (!canvasElement) return

    const ctx = canvasElement.getContext("2d")
    const width = canvasElement.width
    const height = canvasElement.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Background with gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, bgColor)
    gradient.addColorStop(1, adjustBrightness(bgColor, -20))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Text with proper font
    ctx.fillStyle = textColor
    ctx.font = `bold ${Math.min(width, height) / 8}px 'Poppins', 'Inter', 'Roboto', Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, width / 2, height / 2)

    // Add subtle border
    ctx.strokeStyle = adjustBrightness(bgColor, 30)
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, width - 2, height - 2)
  }

  function adjustBrightness(hex, percent) {
    const num = Number.parseInt(hex.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  // Initialize theme
  initializeTheme()

  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader")
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  })

  // Sidebar Management
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebarClose = document.getElementById("sidebarClose")

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.add("active")
  })

  sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("active")
  })

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active")
    }
  })

  // Smooth Scroll Navigation
  document.querySelectorAll(".nav-link").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = anchor.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        sidebar.classList.remove("active")
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Back to Top
  const backToTop = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "flex"
    } else {
      backToTop.style.display = "none"
    }
  })

  backToTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Typed.js for hero section
  const Typed = window.Typed // Declare Typed variable
  try {
    if (typeof Typed !== "undefined") {
      new Typed("#typed", {
        strings: [
          "Full-Stack Developer",
          "Web Developer",
          "Python Developer",
          "Django Expert",
          "Problem Solver",
          "Innovator",
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      })
    } else {
      document.getElementById("typed").textContent = "Full-Stack Developer"
    }
  } catch (e) {
    console.error("Typed.js error:", e)
    document.getElementById("typed").textContent = "Full-Stack Developer"
  }

  // Skills Section Management
  const skillCategoryBtns = document.querySelectorAll(".skill-category-btn")
  const skillSections = document.querySelectorAll(".skill-section")

  skillCategoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category")

      // Update active button
      skillCategoryBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Show/hide skill sections
      skillSections.forEach((section) => {
        const sectionCategory = section.getAttribute("data-category")
        if (category === "all" || sectionCategory === category) {
          section.style.display = "block"
          section.classList.add("active")
        } else {
          section.style.display = "none"
          section.classList.remove("active")
        }
      })
    })
  })

  // Animate skill circles when in view
  const animateSkillCircles = () => {
    const skillItems = document.querySelectorAll(".skill-item")

    skillItems.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (isVisible && !item.classList.contains("animated")) {
        const circle = item.querySelector(".circle-progress")
        const percentage = circle.getAttribute("data-percentage")

        // Animate the conic gradient
        let currentPercentage = 0
        const increment = percentage / 60 // 60 frames for smooth animation

        const animateCircle = () => {
          if (currentPercentage < percentage) {
            currentPercentage += increment
            const degrees = (currentPercentage / 100) * 360
            circle.style.background = `conic-gradient(var(--accent) ${degrees}deg, var(--bg-tertiary) ${degrees}deg)`
            requestAnimationFrame(animateCircle)
          } else {
            const finalDegrees = (percentage / 100) * 360
            circle.style.background = `conic-gradient(var(--accent) ${finalDegrees}deg, var(--bg-tertiary) ${finalDegrees}deg)`
          }
        }

        animateCircle()
        item.classList.add("animated")
      }
    })
  }

  // Portfolio Filter
  const Isotope = window.Isotope // Declare Isotope variable
  try {
    if (typeof Isotope !== "undefined") {
      const portfolioGrid = document.querySelector(".portfolio-grid")
      const filterButtons = document.querySelectorAll(".filter-btn")

      const iso = new Isotope(portfolioGrid, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
        transitionDuration: "0.6s",
      })

      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const filterValue = button.getAttribute("data-filter")

          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"))
          // Add active class to clicked button
          button.classList.add("active")

          // Filter items
          iso.arrange({ filter: filterValue })
        })
      })
    }
  } catch (e) {
    console.warn("Isotope error:", e)
  }

  // Testimonial Slider
  const Swiper = window.Swiper // Declare Swiper variable
  try {
    if (typeof Swiper !== "undefined") {
      new Swiper(".testimonial-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      })
    }
  } catch (e) {
    console.warn("Swiper error:", e)
  }

  // Fun Facts Counter Animation
  const counters = document.querySelectorAll(".counter")

  const animateCounters = () => {
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (isVisible && !counter.classList.contains("animated")) {
        const target = Number.parseInt(counter.getAttribute("data-target"))
        const suffix = counter.getAttribute("data-suffix") || ""
        const duration = 2000 // 2 seconds
        const increment = target / (duration / 16) // 60fps
        let current = 0

        const updateCounter = () => {
          current += increment
          if (current < target) {
            counter.textContent = Math.floor(current) + suffix
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target + suffix
          }
        }

        updateCounter()
        counter.classList.add("animated")
      }
    })
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm")
  const formFeedback = document.getElementById("formFeedback")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const message = document.getElementById("message").value.trim()

    // Reset previous validation
    document.querySelectorAll(".form-control").forEach((field) => {
      field.classList.remove("is-invalid")
    })

    let isValid = true

    // Validate fields
    if (!name) {
      document.getElementById("name").classList.add("is-invalid")
      isValid = false
    }

    if (!email || !isValidEmail(email)) {
      document.getElementById("email").classList.add("is-invalid")
      isValid = false
    }

    if (!subject) {
      document.getElementById("subject").classList.add("is-invalid")
      isValid = false
    }

    if (!message) {
      document.getElementById("message").classList.add("is-invalid")
      isValid = false
    }

    if (isValid) {
      // Simulate form submission
      formFeedback.innerHTML = `
        <div class="alert alert-success">
          <i class="bi bi-check-circle me-2"></i>
          Thank you for your message! I'll get back to you soon.
        </div>
      `
      contactForm.reset()
    } else {
      formFeedback.innerHTML = `
        <div class="alert alert-danger">
          <i class="bi bi-exclamation-triangle me-2"></i>
          Please fill in all required fields correctly.
        </div>
      `
    }

    // Clear feedback after 5 seconds
    setTimeout(() => {
      formFeedback.innerHTML = ""
    }, 5000)
  })

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Map Integration
  const L = window.L // Declare L variable
  try {
    if (typeof L !== "undefined") {
      const map = L.map("map").setView([22.51, 72.88], 10)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: '<i class="bi bi-geo-alt-fill" style="color: var(--accent); font-size: 24px;"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      })

      L.marker([22.51, 72.88], { icon: customIcon })
        .addTo(map)
        .bindPopup("<strong>Sahaf Shaikh</strong><br>Kapadwanj, Gujarat")
        .openPopup()
    } else {
      document.getElementById("map").innerHTML = `
        <div class="d-flex align-items-center justify-content-center h-100">
          <p class="text-muted">Map service unavailable</p>
        </div>
      `
    }
  } catch (error) {
    console.warn("Map initialization failed:", error)
    document.getElementById("map").innerHTML = `
      <div class="d-flex align-items-center justify-content-center h-100">
        <p class="text-muted">Map could not be loaded</p>
      </div>
    `
  }

  // Scroll Animations
  const animateOnScroll = () => {
    animateSkillCircles()
    animateCounters()

    // General fade-in animations
    const elements = document.querySelectorAll(
      ".timeline-content, .project-card, .blog-card, .fact-item, .testimonial-item",
    )

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("fade-in", "visible")
      }
    })
  }

  // Initialize scroll animations
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load

  // Smooth page transitions
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)

  // Performance optimization - debounce scroll events
  let scrollTimeout
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(() => {
      animateOnScroll()
    }, 10)
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sidebar.classList.remove("active")
    }
  })

  // Initialize all animations on load
  setTimeout(() => {
    animateOnScroll()
  }, 500)

  console.log("Portfolio initialized successfully with complete theme system!")
})
