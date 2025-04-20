document.addEventListener("DOMContentLoaded", () => {
  // Globale Variablen
  let activePage = "PORTFOLIO"
  let selectedProject = null
  let viewMode = "gallery" // Geändert von "grid" zu "gallery" als Standard
  let darkMode = false
  let language = "de" // "de" für Deutsch, "en" für Englisch
  let konamiUnlocked = false
  let clickCount = 0
  const konamiSequence = []
  const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]

  // DOM-Elemente
  const contentElement = document.getElementById("content")
  const navItems = document.querySelectorAll(".nav-item")
  const languageToggle = document.getElementById("language-toggle")
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  const subtitle = document.getElementById("subtitle")

  // Sample Data - Replace with your actual data source (e.g., JSON file or API)
  const projects = [
    {
      id: 1,
      title: "Project 1",
      subtitle: "Subtitle 1",
      description: "Description 1",
      fullDescription: "Full Description 1",
      image: "images/project1.jpg",
      link: "https://example.com",
      linkText: "View Project",
      additionalImages: ["images/project1_1.jpg", "images/project1_2.jpg"],
    },
    {
      id: 2,
      title: "Project 2",
      subtitle: "Subtitle 2",
      description: "Description 2",
      fullDescription: "Full Description 2",
      image: "images/project2.jpg",
      link: "https://example.com",
      linkText: "View Project",
      additionalImages: ["images/project2_1.jpg", "images/project2_2.jpg"],
    },
    {
      id: 3,
      title: "Project 3",
      subtitle: "Subtitle 3",
      description: "Description 3",
      fullDescription: "Full Description 3",
      image: "images/project3.jpg",
      link: "https://example.com",
      linkText: "View Project",
      additionalImages: ["images/project3_1.jpg", "images/project3_2.jpg"],
    },
  ]

  const aboutMeTranslations = {
    de: {
      title: "Über Mich",
      hello: "Hallo, ich bin",
      bio: ["Ein paar Sätze über mich auf Deutsch.", "Noch ein paar Sätze."],
      cv: "Lebenslauf",
      education: "Ausbildung",
      educationItems: {
        master: {
          title: "Master",
          period: "2020-2022",
          institution: "Universität",
          note: "Sehr gut",
        },
        bachelor: {
          title: "Bachelor",
          period: "2016-2020",
          institution: "Hochschule",
        },
        ib: {
          title: "International Baccalaureate",
          period: "2014-2016",
          institution: "Gymnasium",
        },
        school: {
          title: "Abitur",
          period: "2008-2014",
          institution: "Realschule",
        },
      },
      workExperience: "Berufserfahrung",
      workItems: {
        boschSensor: {
          title: "Werkstudent",
          period: "2022-Heute",
          company: "Bosch Sensortec",
        },
        simple: {
          title: "Webentwickler",
          period: "2021-2022",
          company: "Simple GmbH",
        },
        bosch2021: {
          title: "Praktikant",
          period: "2021",
          company: "Bosch Sensortec",
        },
        bosch2019: {
          title: "Praktikant",
          period: "2019",
          company: "Bosch Sensortec",
        },
        mercedes: {
          title: "Praktikant",
          period: "2018",
          company: "Mercedes-Benz",
        },
      },
      internships: "Praktika",
      internshipItems: {
        simple: {
          title: "Mediengestalter",
          period: "2015",
          company: "Simple GmbH",
          description: "Gestaltung von Webseiten",
        },
        bosch: {
          title: "Praktikant",
          period: "2014",
          company: "Bosch",
        },
        disability: {
          title: "Betreuer",
          period: "2013",
          company: "Behindertenheim",
        },
        fuchsfarm: {
          title: "Helfer",
          period: "2012",
          company: "Fuchsfarm",
        },
        helchenhof: {
          title: "Helfer",
          period: "2011",
          company: "Helchenhof",
        },
      },
      languages: "Sprachen",
      languageItems: {
        german: {
          name: "Deutsch",
          level: "Muttersprache",
        },
        turkish: {
          name: "Türkisch",
          level: "Muttersprache",
        },
        english: {
          name: "Englisch",
          level: "Fließend",
        },
        french: {
          name: "Französisch",
          level: "Grundkenntnisse",
        },
        spanish: {
          name: "Spanisch",
          level: "Grundkenntnisse",
        },
      },
      skills: "Fähigkeiten",
      skillsCategories: {
        design: {
          title: "Design",
          content: "UI/UX Design, Prototyping",
        },
        technical: {
          title: "Technisch",
          content: "IoT, Embedded Systems",
        },
        software: {
          title: "Software",
          content: "JavaScript, Python",
        },
        soft: {
          title: "Soft Skills",
          content: "Teamarbeit, Kommunikation",
        },
        personal: {
          title: "Persönlich",
          content: "Kreativ, Engagiert",
        },
        interests: {
          title: "Interessen",
          content: "Fotografie, Reisen",
        },
      },
    },
    en: {
      title: "About Me",
      hello: "Hello, I'm",
      bio: ["A few sentences about me in English.", "And a few more."],
      cv: "Resume",
      education: "Education",
      educationItems: {
        master: {
          title: "Master",
          period: "2020-2022",
          institution: "University",
          note: "Very good",
        },
        bachelor: {
          title: "Bachelor",
          period: "2016-2020",
          institution: "College",
        },
        ib: {
          title: "International Baccalaureate",
          period: "2014-2016",
          institution: "High School",
        },
        school: {
          title: "Abitur",
          period: "2008-2014",
          institution: "Secondary School",
        },
      },
      workExperience: "Work Experience",
      workItems: {
        boschSensor: {
          title: "Working Student",
          period: "2022-Present",
          company: "Bosch Sensortec",
        },
        simple: {
          title: "Web Developer",
          period: "2021-2022",
          company: "Simple GmbH",
        },
        bosch2021: {
          title: "Intern",
          period: "2021",
          company: "Bosch Sensortec",
        },
        bosch2019: {
          title: "Intern",
          period: "2019",
          company: "Bosch Sensortec",
        },
        mercedes: {
          title: "Intern",
          period: "2018",
          company: "Mercedes-Benz",
        },
      },
      internships: "Internships",
      internshipItems: {
        simple: {
          title: "Media Designer",
          period: "2015",
          company: "Simple GmbH",
          description: "Website Design",
        },
        bosch: {
          title: "Intern",
          period: "2014",
          company: "Bosch",
        },
        disability: {
          title: "Caregiver",
          period: "2013",
          company: "Disability Home",
        },
        fuchsfarm: {
          title: "Helper",
          period: "2012",
          company: "Fuchsfarm",
        },
        helchenhof: {
          title: "Helper",
          period: "2011",
          company: "Helchenhof",
        },
      },
      languages: "Languages",
      languageItems: {
        german: {
          name: "German",
          level: "Native",
        },
        turkish: {
          name: "Turkish",
          level: "Native",
        },
        english: {
          name: "English",
          level: "Fluent",
        },
        french: {
          name: "French",
          level: "Basic",
        },
        spanish: {
          name: "Spanish",
          level: "Basic",
        },
      },
      skills: "Skills",
      skillsCategories: {
        design: {
          title: "Design",
          content: "UI/UX Design, Prototyping",
        },
        technical: {
          title: "Technical",
          content: "IoT, Embedded Systems",
        },
        software: {
          title: "Software",
          content: "JavaScript, Python",
        },
        soft: {
          title: "Soft Skills",
          content: "Teamwork, Communication",
        },
        personal: {
          title: "Personal",
          content: "Creative, Dedicated",
        },
        interests: {
          title: "Interests",
          content: "Photography, Travel",
        },
      },
    },
  }

  const contactTranslations = {
    de: {
      title: "Kontakt",
      subtitle: "Nehmen Sie Kontakt mit mir auf!",
      contactInfo: "Kontaktinformationen",
      email: "E-Mail",
      phone: "Telefon",
      address: "Adresse",
      availability: "Verfügbarkeit",
      availabilityText: "Ich bin offen für neue Möglichkeiten. Kontaktieren Sie mich gerne!",
      sendMessage: "Senden Sie mir eine Nachricht",
      name: "Name",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "Ihre E-Mail",
      message: "Nachricht",
      messagePlaceholder: "Ihre Nachricht",
      sendButton: "Senden",
    },
    en: {
      title: "Contact",
      subtitle: "Get in touch with me!",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      address: "Address",
      availability: "Availability",
      availabilityText: "I am open to new opportunities. Feel free to contact me!",
      sendMessage: "Send me a message",
      name: "Name",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      message: "Message",
      messagePlaceholder: "Your Message",
      sendButton: "Send",
    },
  }

  // Event-Listener
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      setActivePage(item.dataset.page)
      selectedProject = null
      renderContent()
    })
  })

  languageToggle.addEventListener("click", () => {
    toggleLanguage()
    renderContent()
  })

  darkModeToggle.addEventListener("click", () => {
    toggleDarkMode()
    renderContent()
  })

  // Konami Code Event Listener
  document.addEventListener("keydown", (e) => {
    konamiSequence.push(e.key)
    if (konamiSequence.length > KONAMI_CODE.length) {
      konamiSequence.shift()
    }

    if (konamiSequence.join(",") === KONAMI_CODE.join(",")) {
      handleKonamiUnlock()
    }
  })

  // Funktionen
  function setActivePage(page) {
    activePage = page
    navItems.forEach((item) => {
      if (item.dataset.page === page) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  function toggleViewMode() {
    viewMode = viewMode === "grid" ? "gallery" : "grid"
    renderContent()
  }

  function toggleDarkMode() {
    darkMode = !darkMode
    document.body.classList.toggle("dark", darkMode)
    darkModeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'

    // Easter Egg: Wenn 5 mal geklickt, zeige eine Überraschung
    clickCount++
    if (clickCount === 5) {
      alert("🎉 Du hast ein Easter Egg gefunden! Drücke den Konami-Code für eine Überraschung: ↑↑↓↓←→←→ba")
      clickCount = 0
    }
  }

  function toggleLanguage() {
    language = language === "de" ? "en" : "de"
    subtitle.textContent =
      language === "de" ? "IoT Produktdesign und Entwicklung" : "IoT Product Design and Development"
    languageToggle.setAttribute("title", language === "de" ? "Switch to English" : "Zu Deutsch wechseln")
    languageToggle.setAttribute("aria-label", language === "de" ? "Switch to English" : "Zu Deutsch wechseln")
  }

  function handleKonamiUnlock() {
    if (!konamiUnlocked) {
      konamiUnlocked = true
      alert("🌟 Konami-Code aktiviert! Du hast einen magischen Cursor freigeschaltet!")

      // Magischen Cursor erstellen
      const cursor = document.createElement("div")
      cursor.className = "fixed w-8 h-8 pointer-events-none z-50"
      cursor.innerHTML = '<i class="fas fa-sparkles text-accent animate-sparkle"></i>'
      document.body.appendChild(cursor)

      // Cursor-Bewegung
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
        cursor.style.transform = "translate(-50%, -50%)"
      })
    }
  }

  function handleProjectClick(projectId) {
    selectedProject = projects.find((p) => p.id === projectId)
    window.scrollTo({ top: 0, behavior: "smooth" })
    renderContent()
  }

  function handleBackClick() {
    selectedProject = null
    renderContent()
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Validierung
    if (!name || !email || !message) {
      showFormStatus(
        language === "de" ? "Alle Felder müssen ausgefüllt sein." : "All fields must be filled out.",
        "error",
      )
      return
    }

    // In einer echten Anwendung würde hier ein E-Mail-Service verwendet werden
    // Für GitHub Pages simulieren wir einen erfolgreichen Versand
    console.log("E-Mail gesendet an: enissentuerk@hotmail.de")
    console.log("Von:", name, email)
    console.log("Nachricht:", message)

    showFormStatus(language === "de" ? "Nachricht erfolgreich gesendet!" : "Message sent successfully!", "success")

    form.reset()
  }

  function showFormStatus(message, type) {
    const statusDiv = document.getElementById("form-status")
    if (statusDiv) {
      statusDiv.textContent = message
      statusDiv.className =
        type === "success"
          ? "mb-6 p-4 rounded-md bg-green-100 text-green-800"
          : "mb-6 p-4 rounded-md bg-red-100 text-red-800"

      // Status nach 5 Sekunden zurücksetzen
      setTimeout(() => {
        statusDiv.textContent = ""
        statusDiv.className = "hidden"
      }, 5000)
    }
  }

  // Inhaltsrendering
  function renderContent() {
    switch (activePage) {
      case "PORTFOLIO":
        renderPortfolio()
        break
      case "ABOUT ME":
        renderAboutMe()
        break
      case "CONTACT":
        renderContact()
        break
    }

    // Reveal-Animation für neue Elemente
    initRevealAnimations()
  }

  function renderPortfolio() {
    if (selectedProject) {
      renderProjectDetail()
    } else {
      renderProjectList()
    }
  }

  function renderProjectList() {
    let html = `
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold reveal">PORTFOLIO</h1>
        <div class="flex items-center space-x-2">
          <button onclick="toggleViewMode()" class="p-2 rounded-md transition-all duration-300 ${viewMode === "grid" ? "bg-accent text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}" aria-label="Grid View" title="Grid View">
            <i class="fas fa-th"></i>
          </button>
          <button onclick="toggleViewMode()" class="p-2 rounded-md transition-all duration-300 ${viewMode === "gallery" ? "bg-accent text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}" aria-label="Gallery View" title="Gallery View">
            <i class="fas fa-image"></i>
          </button>
        </div>
      </div>
    `

    if (viewMode === "grid") {
      html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">'
      projects.forEach((project, index) => {
        html += `
          <div class="project-card group cursor-pointer reveal reveal-${index % 2 === 0 ? "up" : "right"}" data-delay="${index * 100}" onclick="handleProjectClick(${project.id})">
            <div class="relative w-full h-64 mb-2 overflow-hidden">
              <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
            <div class="mt-2 transform transition-transform duration-300 group-hover:translate-x-2">
              ${project.semester ? `<div class="text-sm text-gray-600">${language === "de" ? project.semester : project.semesterEn}</div>` : ""}
              <h2 class="text-xl font-bold mt-1">${project.title}</h2>
              ${project.subtitle ? `<div class="text-sm text-gray-600 mt-1">${language === "de" ? project.subtitle : project.subtitleEn}</div>` : ""}
              ${project.category ? `<div class="text-sm mt-1">${language === "de" ? project.category : project.categoryEn}</div>` : ""}
            </div>
          </div>
        `
      })
      html += "</div>"
    } else {
      html += '<div class="space-y-32">'
      projects.forEach((project, index) => {
        html += `
          <div class="group reveal" data-delay="${index * 150}">
            <div class="project-gallery cursor-pointer" onclick="handleProjectClick(${project.id})">
              <div class="parallax-container w-full h-full">
                <img src="${project.image}" alt="${project.title}" class="parallax-image" data-speed="0.1">
              </div>
              <div class="project-gallery-gradient"></div>
              <div class="project-gallery-overlay">
                <div class="text-sm mb-2">${language === "de" ? project.semester : project.semesterEn}</div>
                <h2 class="text-4xl font-bold mb-4 transform transition-transform duration-500 group-hover:translate-x-2">${project.title}</h2>
                ${project.subtitle ? `<div class="text-sm text-gray-400 mb-2">${language === "de" ? project.subtitle : project.subtitleEn}</div>` : ""}
                <p class="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  ${language === "de" ? project.description : project.descriptionEn}
                </p>
                <button class="btn mt-6 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0" onclick="event.stopPropagation(); handleProjectClick(${project.id})">
                  ${language === "de" ? "Projekt ansehen" : "View Project"}
                </button>
              </div>
            </div>
          </div>
        `
      })
      html += "</div>"
    }

    contentElement.innerHTML = html

    // Event-Listener für View-Mode-Toggle
    document.querySelectorAll('[onclick="toggleViewMode()"]').forEach((btn) => {
      btn.addEventListener("click", toggleViewMode)
    })

    // Event-Listener für Projekt-Klicks
    document.querySelectorAll('[onclick^="handleProjectClick"]').forEach((element) => {
      const projectId = Number.parseInt(element.getAttribute("onclick").match(/\d+/)[0])
      element.onclick = (e) => {
        e.stopPropagation()
        handleProjectClick(projectId)
      }
    })

    // Parallax-Effekt initialisieren
    if (viewMode === "gallery") {
      initParallaxEffect()
    }
  }

  function renderProjectDetail() {
    if (!selectedProject) return

    const project = selectedProject
    let html = `
      <div class="max-w-4xl mx-auto">
        <div class="reveal">
          <button onclick="handleBackClick()" class="flex items-center mb-8 text-lg relative group transition-all duration-300">
            <i class="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"></i>
            <span class="relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent after:left-0 after:bottom-0 group-hover:after:w-full after:transition-all after:duration-300">
              ${language === "de" ? "Zurück zum Portfolio" : "Back to Portfolio"}
            </span>
          </button>
        </div>

        <div class="reveal">
          ${project.category ? `<div class="text-sm mb-2">${language === "de" ? project.category : project.categoryEn}</div>` : ""}
          <h1 class="text-3xl font-bold mb-2">${project.title}</h1>
          ${project.subtitle ? `<div class="text-sm text-gray-600 mb-2">${language === "de" ? project.subtitle : project.subtitleEn}</div>` : ""}
          <div class="mb-8">
            ${project.semester ? `<div class="text-sm text-gray-600">${language === "de" ? project.semester : project.semesterEn}</div>` : ""}
            ${project.note ? `<div class="text-sm text-gray-600 mt-1">${language === "de" ? project.note : project.noteEn}</div>` : ""}
          </div>
        </div>

        <div class="reveal">
          <div class="relative w-full h-[70vh] mb-12 overflow-hidden group">
            <div class="parallax-container w-full h-full">
              <img src="${project.image}" alt="${project.title}" class="parallax-image" data-speed="0.1">
            </div>
          </div>
        </div>

        <div class="reveal">
          <div class="prose max-w-none mb-12">
            ${(language === "de" ? project.fullDescription : project.fullDescriptionEn)
              .split("\n\n")
              .map((paragraph) => `<p class="mb-6 text-base leading-relaxed">${paragraph.trim()}</p>`)
              .join("")}
          </div>
        </div>

        <div class="reveal" data-delay="200">
          <div class="flex flex-wrap gap-4 mb-12">
            ${
              project.link
                ? `
              <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                ${language === "de" ? project.linkText : project.linkTextEn || "View Documentation"}
              </a>
            `
                : ""
            }
            ${
              project.pdfLink
                ? `
              <a href="${project.pdfLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                ${language === "de" ? project.pdfLinkText : project.pdfLinkTextEn || "Download PDF"}
              </a>
            `
                : ""
            }
            ${
              project.videoLink
                ? `
              <a href="${project.videoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                ${language === "de" ? project.videoLinkText : project.videoLinkTextEn || "Watch Video"}
              </a>
            `
                : ""
            }
          </div>
        </div>
    `

    if (project.additionalImages && project.additionalImages.length > 0) {
      html += `
        <div class="reveal" data-delay="300">
          <h2 class="text-2xl font-bold mb-6">${language === "de" ? "Projekt Galerie" : "Project Gallery"}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            ${project.additionalImages
              .map(
                (img, index) => `
              <div class="relative w-full h-80 overflow-hidden group">
                <img src="${img}" alt="${project.title} - Image ${index + 1}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `
    }

    html += "</div>"
    contentElement.innerHTML = html

    // Event-Listener für Back-Button
    document.querySelector('[onclick="handleBackClick()"]').addEventListener("click", handleBackClick)

    // Parallax-Effekt initialisieren
    initParallaxEffect()
  }

  function renderAboutMe() {
    const t = aboutMeTranslations[language]

    const html = `
      <div class="max-w-4xl mx-auto mt-12">
        <div class="reveal">
          <h1 class="text-3xl font-bold mb-8">${t.title}</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div class="md:col-span-1">
            <div class="reveal reveal-left">
              <div class="overflow-hidden">
                <img src="images/profile.jpg" alt="Enis Sentürk" class="w-full object-cover mb-6 transition-transform duration-700 hover:scale-105">
              </div>
              <div>
                <h2 class="text-lg mb-1">${t.hello}</h2>
                <p class="text-2xl font-bold">ENIS SENTÜRK</p>
              </div>
            </div>
          </div>

          <div class="md:col-span-2">
            <div class="reveal reveal-right">
              <div class="space-y-6 text-base leading-relaxed">
                ${t.bio.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              </div>
            </div>
          </div>
        </div>

        <div class="reveal">
          <h2 class="text-2xl font-bold mb-8 border-b border-accent pb-2">${t.cv}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div class="reveal" data-delay="100">
              <h3 class="text-lg font-bold mb-4 text-accent">${t.education}</h3>
              <div class="space-y-6">
                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-graduation-cap text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.educationItems.master.title}</span>
                      <span class="text-gray-600">${t.educationItems.master.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.educationItems.master.institution}</div>
                    <div class="text-sm italic mt-1">${t.educationItems.master.note}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-graduation-cap text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.educationItems.bachelor.title}</span>
                      <span class="text-gray-600">${t.educationItems.bachelor.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.educationItems.bachelor.institution}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-graduation-cap text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.educationItems.ib.title}</span>
                      <span class="text-gray-600">${t.educationItems.ib.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.educationItems.ib.institution}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-graduation-cap text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.educationItems.school.title}</span>
                      <span class="text-gray-600">${t.educationItems.school.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.educationItems.school.institution}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="reveal" data-delay="200">
              <h3 class="text-lg font-bold mt-12 mb-4 text-accent">${t.workExperience}</h3>
              <div class="space-y-6">
                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-briefcase text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.workItems.boschSensor.title}</span>
                      <span class="text-gray-600">${t.workItems.boschSensor.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.workItems.boschSensor.company}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-briefcase text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.workItems.simple.title}</span>
                      <span class="text-gray-600">${t.workItems.simple.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.workItems.simple.company}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-briefcase text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.workItems.bosch2021.title}</span>
                      <span class="text-gray-600">${t.workItems.bosch2021.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.workItems.bosch2021.company}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-briefcase text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.workItems.bosch2019.title}</span>
                      <span class="text-gray-600">${t.workItems.bosch2019.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.workItems.bosch2019.company}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-briefcase text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.workItems.mercedes.title}</span>
                      <span class="text-gray-600">${t.workItems.mercedes.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.workItems.mercedes.company}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="reveal" data-delay="300">
              <h3 class="text-lg font-bold mb-4 text-accent">${t.internships}</h3>
              <div class="space-y-6">
                <div class="hover:translate-x-2 transition-transform duration-300 flex items-start gap-3">
                  <div class="w-8 h-8 flex items-center justify-center mt-1">
                    <i class="fas fa-palette text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.internshipItems.simple.title}</span>
                      <span class="text-gray-600">${t.internshipItems.simple.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.internshipItems.simple.company}</div>
                    <div class="text-sm mt-1">${t.internshipItems.simple.description}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-palette text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.internshipItems.bosch.title}</span>
                      <span class="text-gray-600">${t.internshipItems.bosch.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.internshipItems.bosch.company}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-user text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.internshipItems.disability.title}</span>
                      <span class="text-gray-600">${t.internshipItems.disability.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.internshipItems.disability.company}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-th-large text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.internshipItems.fuchsfarm.title}</span>
                      <span class="text-gray-600">${t.internshipItems.fuchsfarm.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.internshipItems.fuchsfarm.company}</div>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <i class="fas fa-th-large text-accent"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-medium">${t.internshipItems.helchenhof.title}</span>
                      <span class="text-gray-600">${t.internshipItems.helchenhof.period}</span>
                    </div>
                    <div class="text-sm text-gray-600">${t.internshipItems.helchenhof.company}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="reveal" data-delay="400">
              <h3 class="text-lg font-bold mt-12 mb-4 text-accent">${t.languages}</h3>
              <div class="space-y-4">
                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <span class="text-xl">🇩🇪</span>
                  </div>
                  <div class="ml-3 flex-1 flex justify-between">
                    <span class="font-medium">${t.languageItems.german.name}</span>
                    <span class="text-gray-600">${t.languageItems.german.level}</span>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <span class="text-xl">🇹🇷</span>
                  </div>
                  <div class="ml-3 flex-1 flex justify-between">
                    <span class="font-medium">${t.languageItems.turkish.name}</span>
                    <span class="text-gray-600">${t.languageItems.turkish.level}</span>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <span class="text-xl">🇬🇧</span>
                  </div>
                  <div class="ml-3 flex-1 flex justify-between">
                    <span class="font-medium">${t.languageItems.english.name}</span>
                    <span class="text-gray-600">${t.languageItems.english.level}</span>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <span class="text-xl">🇫🇷</span>
                  </div>
                  <div class="ml-3 flex-1 flex justify-between">
                    <span class="font-medium">${t.languageItems.french.name}</span>
                    <span class="text-gray-600">${t.languageItems.french.level}</span>
                  </div>
                </div>

                <div class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <span class="text-xl">🇪🇸</span>
                  </div>
                  <div class="ml-3 flex-1 flex justify-between">
                    <span class="font-medium">${t.languageItems.spanish.name}</span>
                    <span class="text-gray-600">${t.languageItems.spanish.level}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="reveal" data-delay="500">
              <div class="mb-16">
                <h3 class="text-lg font-bold mb-4 text-accent">${t.skills}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                  <div class="hover:translate-x-2 transition-transform duration-300">
                    <span class="font-medium">${t.skillsCategories.design.title}:</span> ${t.skillsCategories.design.content}
                  </div>
                  <div class="hover:translate-x-2 transition-transform duration-300">
                    <span class="font-medium">${t.skillsCategories.technical.title}:</span> ${t.skillsCategories.technical.content}
                  </div>
                  <div class="hover:translate-x-2 transition-transform duration-300">
                    <span class="font-medium">${t.skillsCategories.software.title}:</span> ${t.skillsCategories.software.content}
                  </div>
                  <div class="hover:translate-x-2 transition-transform duration-300">
                    <span class="font-medium">${t.skillsCategories.soft.title}:</span> ${t.skillsCategories.soft.content}
                  </div>
                  <div class="hover:translate-x-2 transition-transform duration-300">
                    <span class="font-medium">${t.skillsCategories.personal.title}:</span> ${t.skillsCategories.personal.content}
                  </div>
                  <div class="hover:translate-x-2 transition-transform duration-300">
                    <span class="font-medium">${t.skillsCategories.interests.title}:</span> ${t.skillsCategories.interests.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    contentElement.innerHTML = html
  }

  function renderContact() {
    const t = contactTranslations[language]

    const html = `
    <div class="max-w-3xl mx-auto mt-12">
      <div class="reveal">
        <h1 class="text-3xl font-bold mb-4">${t.title}</h1>
        <p class="mb-12 text-lg">${t.subtitle}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        <div class="reveal reveal-left">
          <div class="space-y-8">
            <h2 class="text-xl font-bold mb-6 border-b border-accent pb-2">${t.contactInfo}</h2>
            <ul class="space-y-6">
              <li class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div class="w-10 h-10 rounded-full bg-accent bg-opacity-10 flex items-center justify-center mr-4">
                  <i class="fas fa-envelope text-accent"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">${t.email}</p>
                  <a href="mailto:Enissentuerk@hotmail.de" class="font-medium hover:text-accent">
                    Enissentuerk@hotmail.de
                  </a>
                </div>
              </li>

              <li class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div class="w-10 h-10 rounded-full bg-accent bg-opacity-10 flex items-center justify-center mr-4">
                  <i class="fas fa-phone text-accent"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">${t.phone}</p>
                  <a href="tel:01734186952" class="font-medium hover:text-accent">
                    01734186952
                  </a>
                </div>
              </li>

              <li class="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div class="w-10 h-10 rounded-full bg-accent bg-opacity-10 flex items-center justify-center mr-4">
                  <i class="fas fa-map-marker-alt text-accent"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">${t.address}</p>
                  <p class="font-medium">Kreuzem 7/4, 72762 Reutlingen</p>
                </div>
              </li>
            </ul>

            <div class="pt-8 mt-8 border-t border-gray-200">
              <h3 class="text-lg font-semibold mb-4">${t.availability}</h3>
              <p class="text-gray-700">${t.availabilityText}</p>
            </div>
          </div>
        </div>

        <div class="reveal reveal-right">
          <div>
            <h2 class="text-xl font-bold mb-6 border-b border-accent pb-2">${t.sendMessage}</h2>
            
            <p class="mb-6">${language === "de" ? "Senden Sie mir eine E-Mail, um in Kontakt zu treten:" : "Send me an email to get in touch:"}</p>
            
            <a href="mailto:Enissentuerk@hotmail.de" class="btn inline-block">
              <i class="fas fa-envelope mr-2"></i> ${language === "de" ? "E-Mail senden" : "Send Email"}
            </a>
            
            <div class="mt-8">
              <p class="text-gray-700">
                ${
                  language === "de"
                    ? "Alternativ können Sie mich auch telefonisch unter der oben angegebenen Nummer erreichen oder mir über soziale Medien eine Nachricht senden."
                    : "Alternatively, you can also reach me by phone at the number listed above or send me a message via social media."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

    contentElement.innerHTML = html
  }

  // Hilfsfunktionen
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => {
              entry.target.classList.add("visible")
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    revealElements.forEach((element) => {
      observer.observe(element)
    })
  }

  function initParallaxEffect() {
    const parallaxImages = document.querySelectorAll(".parallax-image")

    const handleScroll = () => {
      parallaxImages.forEach((image) => {
        const container = image.closest(".parallax-container")
        if (!container) return

        const rect = container.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Berechne, wie weit das Element im Viewport ist (0 bis 1)
        const viewportPosition = 1 - (rect.top + rect.height) / (windowHeight + rect.height)

        // Begrenze den Bereich auf 0-1
        const normalizedPosition = Math.max(0, Math.min(1, viewportPosition))

        // Berechne den Offset basierend auf der Position und der Geschwindigkeit
        const speed = Number.parseFloat(image.dataset.speed) || 0.1
        const maxOffset = rect.height * 0.2 // Maximal 20% der Höhe verschieben
        const offset = normalizedPosition * maxOffset * speed

        image.style.transform = `translateY(${offset}px)`
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial ausführen
  }

  // Globale Funktionen für HTML-Aufrufe
  window.handleProjectClick = handleProjectClick
  window.handleBackClick = handleBackClick
  window.toggleViewMode = toggleViewMode

  // Initialisierung
  renderContent()

  // Dark Mode aus localStorage wiederherstellen
  if (localStorage.getItem("darkMode") === "true") {
    toggleDarkMode()
  }

  // Sprache aus localStorage wiederherstellen
  if (localStorage.getItem("language") === "en") {
    toggleLanguage()
    renderContent()
  }
})
