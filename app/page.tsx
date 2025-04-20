"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowLeft, Grid, ImageIcon, Sparkles, Moon, Sun, Globe } from "lucide-react"
import { sendEmail } from "./actions"
import { Reveal } from "@/components/reveal-animation"
import { ParallaxImage } from "@/components/parallax-image"
import { KonamiCode } from "@/components/konami-code"
import { Icon } from "@/components/icon"

// Blau als Akzentfarbe definieren
const accentColor = "#0066cc"

// Define projects with your content
const projects = [
  {
    id: 0,
    title: "PathAware",
    description:
      "Eine innovative App zur Unterstützung von Wanderern mit detaillierten Informationen über Wanderwege und deren Beschaffenheit.",
    descriptionEn: "An innovative app supporting hikers with detailed information about trails and their conditions.",
    image: "/images/pathaware-cover.png",
    fullDescription: `PathAware ist meine Bachelorarbeit im Studiengang Internet der Dinge an der Hochschule für Gestaltung Schwäbisch Gmünd.

    In dieser umfassenden Abschlussarbeit im 7. Semester entwickelte ich ein Gestaltungsprojekt, das meine erworbenen Kenntnisse in Recherche, Konzeption und Entwurf in einem praxisnahen Kontext demonstriert.

    PathAware revolutioniert die Wandererfahrung durch eine intuitive App, die präzise Informationen über Wanderwege bereitstellt. Die Anwendung ermöglicht Nutzern, fundierte Entscheidungen über ihre Routen zu treffen, indem sie detaillierte Daten zu Wegbeschaffenheit, Steigungsprofilen, Schwierigkeitsgraden und weiteren relevanten Faktoren visualisiert.

    Das Projekt vereint GPS-Tracking, innovative Datenvisualisierung und durchdachte Benutzererfahrung zu einem nahtlosen und informativen Wandererlebnis. Durch den gezielten Einsatz von IoT-Technologien und Sensordaten bietet PathAware eine zukunftsweisende Lösung für Outdoor-Enthusiasten aller Erfahrungsstufen.

    Der Entwicklungsprozess umfasste eine tiefgreifende Nutzerrecherche, iteratives Prototyping verschiedener Interface-Konzepte und die komplexe Integration von Kartendaten mit Informationen zur Wegbeschaffenheit. Das Resultat ist eine benutzerfreundliche App, die Wanderern hilft, sicherere, angenehmere und ihren Fähigkeiten entsprechende Routen zu planen und zu erleben.`,
    fullDescriptionEn: `PathAware is my bachelor thesis in the Internet of Things program at Hochschule für Gestaltung Schwäbisch Gmünd.

    In this comprehensive final project in the 7th semester, I developed a design project that demonstrates my acquired knowledge in research, conception, and design in a practical context.

    PathAware revolutionizes the hiking experience through an intuitive app that provides precise information about hiking trails. The application enables users to make informed decisions about their routes by visualizing detailed data on trail conditions, elevation profiles, difficulty levels, and other relevant factors.

    The project combines GPS tracking, innovative data visualization, and thoughtful user experience into a seamless and informative hiking experience. Through the targeted use of IoT technologies and sensor data, PathAware offers a forward-looking solution for outdoor enthusiasts of all experience levels.

    The development process included in-depth user research, iterative prototyping of various interface concepts, and the complex integration of map data with information on trail conditions. The result is a user-friendly app that helps hikers plan and experience safer, more enjoyable routes that match their abilities.`,
    additionalImages: [
      "/images/pathaware-mockup.png",
      "/images/pathaware-mockup-2.png",
      "/images/pathaware-app-mockup.png",
      "/images/pathaware-meldung-fotografie.png",
      "/images/pathaware-meldung-tour.png",
      "/images/pathaware-mockup-hand.png",
      "/images/pathaware-realistische-map.png",
      "/images/paul-und-enis-mit-app.png",
    ],
    semester: "7. Semester IoT",
    semesterEn: "7th Semester IoT",
    link: "https://ausstellung.hfg-gmuend.de/w-2425/projekte/path-aware/studiengang:iot",
    linkText: "Zur Ausstellungsseite",
    linkTextEn: "View Exhibition Page",
    pdfLink: "https://ausstellung.hfg-gmuend.de/w-2425/projekte/path-aware/studiengang:iot",
    pdfLinkText: "Dokumentation (PDF)",
    pdfLinkTextEn: "Documentation (PDF)",
    category: "Bachelorarbeit",
    categoryEn: "Bachelor Thesis",
  },
  {
    id: 1,
    title: "MULTIM8",
    description:
      "Ein innovatives Redesign eines Multimeters, speziell konzipiert für Einsteiger im technischen Bereich.",
    descriptionEn:
      "An innovative redesign of a multimeter, specifically designed for beginners in the technical field.",
    image: "/placeholder.svg?height=600&width=800",
    fullDescription: `MULTIM8 repräsentiert ein grundlegendes Redesign eines Multimeters, das speziell auf die Bedürfnisse von Einsteigern im technischen Bereich zugeschnitten ist.

    Herkömmliche Multimeter sind oft mit einer Vielzahl von Symbolen auf dem Display überladen, verfügen über einen standardisierten Drehknopf zur Auswahl verschiedener Modi und bieten mehrere Anschlüsse für die Testspitzen, was für Anfänger überwältigend sein kann.

    In unserem nutzerzentrierten Designansatz haben wir drei Kernfunktionen definiert: Spannungsmessung, Durchgangsprüfung und Widerstandsmessung. Jede dieser Funktionen erhielt einen eigenen, klar gekennzeichneten Button für eine intuitive Bedienung. Zusätzlich haben wir entsprechende Beschriftungen hinzugefügt, um das Verständnis der verwendeten Symbole zu erleichtern.

    Unser finales Produkt ist ein Multimeter, das die wesentlichen Hauptfunktionen abdeckt und durch sein vereinfachtes Gehäusedesign sowie die erklärende Benutzerführung auf dem Display Einsteigern den effizienten Umgang mit dem Gerät ermöglicht. MULTIM8 überbrückt die Kluft zwischen technischer Komplexität und Benutzerfreundlichkeit, indem es die Einstiegshürde für technische Messgeräte deutlich senkt.`,
    fullDescriptionEn: `MULTIM8 represents a fundamental redesign of a multimeter, specifically tailored to the needs of beginners in the technical field.

    Conventional multimeters are often overloaded with a variety of symbols on the display, feature a standardized rotary knob for selecting different modes, and offer multiple connections for test probes, which can be overwhelming for beginners.

    In our user-centered design approach, we defined three core functions: voltage measurement, continuity testing, and resistance measurement. Each of these functions received its own clearly labeled button for intuitive operation. Additionally, we added corresponding labels to facilitate understanding of the symbols used.

    Our final product is a multimeter that covers the essential main functions and, through its simplified housing design and explanatory user guidance on the display, enables beginners to use the device efficiently. MULTIM8 bridges the gap between technical complexity and user-friendliness by significantly lowering the entry barrier for technical measuring devices.`,
    additionalImages: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    semester: "4. Semester IoT",
    semesterEn: "4th Semester IoT",
    link: "https://ausstellung.hfg-gmuend.de/w-2223/projekte/multim8",
    linkText: "Dokumentation",
    linkTextEn: "Documentation",
    category: "Interface Design II",
    categoryEn: "Interface Design II",
  },
  {
    id: 2,
    title: "Sight Guide",
    description:
      "Eine spezialisierte Anwendung, die als Trainingswerkzeug für Menschen auf dem Weg zur Erblindung dient.",
    descriptionEn: "A specialized application that serves as a training tool for people on the path to blindness.",
    image: "/placeholder.svg?height=600&width=800",
    fullDescription: `In einer Zeit fortschreitender technologischer Entwicklung bot uns unser Kurs zu Smart Tools die außergewöhnliche Gelegenheit, Menschen auf dem Weg zur Erblindung zu unterstützen. Durch den Einsatz intelligenter Werkzeuge können wir nicht nur eine grundlegende Orientierungshilfe bieten, sondern auch bei der Bewältigung des Alltags unterstützen.

    Diese Werkzeuge eröffnen innovative Lösungsansätze, die die Lebensqualität von Menschen mit Sehverlust erheblich verbessern können. Von Navigationshilfen bis hin zum Aufgabenmanagement zielt unser Projekt darauf ab, die Kraft der Technologie zu nutzen, um Menschen mit Sehbehinderungen zu stärken und ihre Integration in die Gesellschaft zu erleichtern.

    Wir haben eine Anwendung entwickelt, die als Trainingswerkzeug für Menschen auf dem Weg zur Erblindung dient und sich speziell auf die Nutzung von Smart-Stick-Technologie und das Erlernen von Braille mit dem Braillet konzentriert. Diese Anwendung ermöglicht es Benutzern, reale Szenarien wie den Arbeitsweg zu simulieren und dabei den Umgang mit einem Smart Stick zur Navigation zu üben. Darüber hinaus bietet sie interaktive Lektionen zum Erlernen von Braille mit dem Braillet-Gerät, wodurch Benutzer ihre taktilen Lesefähigkeiten unterwegs verbessern können. Mit diesem innovativen Ansatz möchten wir praktische Trainingsmöglichkeiten bieten, die Menschen mit Sehbehinderungen befähigen, sich anzupassen und in ihrem täglichen Leben zu gedeihen.

    Im Rahmen unseres Smart Tools-Kurses entwickelten wir ein Kit, bestehend aus einem Designprototyp einer Anwendung, einem funktionalen Prototyp des "Smart Stick" und einem Designprototyp des Braillclet. Ich arbeitete an der Anwendung und dem "Smart Stick".

    Der Smart Stick verfügt über die Funktionalität, mit einem Hall-Sensor den Abstand zum nächsten Hindernis zu messen. Wenn ein Hindernis zu nahe ist, vibriert der Smart Stick. Der Smart Stick ist für das Erlernen täglicher Routen und den Umgang mit einem weißen Stock konzipiert.

    Das Braillclet ist ein Konzept für einen Scanner, der geschriebene Sprache liest und in Braille übersetzt. Das Braillclet verfügt außerdem über einen Sprachrekorder und einen Lautsprecher, um wichtige Orte für den Smart Stick aufzuzeichnen, wie z.B. "hier ist eine unmarkierte Verkehrsstelle".`,
    fullDescriptionEn: `In an era of advancing technological development, our Smart Tools course offered us the extraordinary opportunity to support people on the path to blindness. Through the use of intelligent tools, we can not only provide basic orientation assistance but also support in managing everyday life.

    These tools open up innovative solution approaches that can significantly improve the quality of life for people with vision loss. From navigation aids to task management, our project aims to harness the power of technology to empower people with visual impairments and facilitate their integration into society.

    We have developed an application that serves as a training tool for people on the path to blindness, specifically focusing on the use of smart stick technology and learning Braille with the Braillet. This application allows users to simulate real-life scenarios such as commuting to work while practicing the use of a smart stick for navigation. Additionally, it offers interactive lessons for learning Braille with the Braillet device, enabling users to improve their tactile reading skills on the go. With this innovative approach, we aim to provide practical training opportunities that empower people with visual impairments to adapt and thrive in their daily lives.

    As part of our Smart Tools course, we developed a kit consisting of a design prototype of an application, a functional prototype of the "Smart Stick," and a design prototype of the Braillclet. I worked on the application and the "Smart Stick."

    The Smart Stick has the functionality to measure the distance to the nearest obstacle with a Hall sensor. If an obstacle is too close, the Smart Stick vibrates. The Smart Stick is designed for learning daily routes and handling a white cane.

    The Braillclet is a concept for a scanner that reads written language and translates it into Braille. The Braillclet also has a voice recorder and a speaker to record important places for the Smart Stick, such as "here is an unmarked traffic stop."`,
    additionalImages: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    semester: "4. Semester IoT",
    semesterEn: "4th Semester IoT",
    link: "https://ausstellung.hfg-gmuend.de/s-2323/projekte/sight-guide",
    linkText: "Dokumentation",
    linkTextEn: "Documentation",
    category: "Smart Tools",
    categoryEn: "Smart Tools",
  },
  {
    id: 3,
    title: "Foodbox",
    description:
      "Ein nachhaltiger Ansatz zum Teilen von Lebensmitteln in der Nachbarschaft durch innovative Technologie.",
    descriptionEn: "A sustainable approach to neighborhood food sharing through innovative technology.",
    image: "/placeholder.svg?height=600&width=800",
    fullDescription: `Im dritten Semester absolvierten wir einen Kurs namens Prototyping/Redesign, in dem wir eine Idee aufgreifen und zu einem funktionierenden Prototyp weiterentwickeln sollten. Wir entschieden uns, das Problem überschüssiger Lebensmittel mit einer nachhaltigen Lösung anzugehen.

    Unsere Foodbox repräsentiert einen nachhaltigen Ansatz zum Teilen von Lebensmitteln in der Nachbarschaft. Überschüssige Lebensmittel können gespendet und von interessierten Empfängern abgeholt werden, die auf gespendete Lebensmittel angewiesen sind. Dies ermöglicht es Spendern, Lebensmittelverschwendung zu vermeiden, und Empfängern, Lebensmittel direkt in ihrer Nachbarschaft zu erhalten. Im Zentrum der Foodbox steht eine KI, die Lebensmittel erkennt und als Schlüssel für die Box dient.

    Die Foodbox wird durch eine App unterstützt, die den Standort und den Bestand der Boxen anzeigt und während des Spenden- oder Abholprozesses als Schnittstelle für die Foodbox fungiert.

    Eine KI erkennt die Lebensmittel und verwendet sie als Schlüssel für die Box, was einen sicheren und kontrollierten Zugang gewährleistet.

    Das Konzept wird durch eine intuitive App unterstützt, die die Standorte und den Bestand der Boxen anzeigt und während des Spenden- oder Abholprozesses als Schnittstelle für die Foodbox dient. Dieses System schafft ein geschlossenes Ökosystem für Lebensmittelspenden, das Verschwendung reduziert und gleichzeitig Bedürftigen hilft.`,
    fullDescriptionEn: `In the third semester, we completed a course called Prototyping/Redesign, in which we had to take an idea and develop it into a working prototype. We decided to address the problem of excess food with a sustainable solution.

    Our Foodbox represents a sustainable approach to sharing food in the neighborhood. Excess food can be donated and collected by interested recipients who rely on donated food. This allows donors to avoid food waste and recipients to receive food directly in their neighborhood. At the heart of the Foodbox is an AI that recognizes food and serves as a key for the box.

    The Foodbox is supported by an app that displays the location and inventory of the boxes and acts as the interface for the Foodbox during the donation or collection process.

    An AI recognizes the food and uses it as a key for the box, ensuring secure and controlled access.

    The concept is supported by an intuitive app that displays the locations and inventory of the boxes and serves as the interface for the Foodbox during the donation or collection process. This system creates a closed ecosystem for food donations that reduces waste while helping those in need.`,
    additionalImages: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    semester: "3. Semester IoT",
    semesterEn: "3rd Semester IoT",
    link: "https://ausstellung.hfg-gmuend.de/w-2223/projekte/foodbox/studiengang:dp",
    linkText: "Dokumentation",
    linkTextEn: "Documentation",
    videoLink: "https://youtube.com/watch?v=AIleHmXAPgE",
    videoLinkText: "Produkt-Video",
    videoLinkTextEn: "Product Video",
    category: "Prototyping/Redesign",
    categoryEn: "Prototyping/Redesign",
  },
  {
    id: 4,
    title: "MIELE HACKATHON",
    subtitle: "2-Day Design Sprint",
    subtitleEn: "2-Day Design Sprint",
    description:
      "Eine innovative Kreislaufwirtschaftslösung für Miele-Produkte, entwickelt während eines intensiven Design Sprints.",
    descriptionEn:
      "An innovative circular economy solution for Miele products, developed during an intensive design sprint.",
    image: "/placeholder.svg?height=600&width=800",
    fullDescription: `Im Rahmen unseres Nachhaltigkeitskurses nahmen wir am Miele Circular Economy Hackathon teil, der vom Impact Hub Berlin veranstaltet wurde. Wir entwickelten eine Anwendung als Lösung für das Problem, dass Produkte weggeworfen werden, obwohl sie leicht repariert werden könnten. Unsere Anwendung basierte auf der Idee, KI und eine Datenbank mit Aufnahmen einwandfrei funktionierender Waschmaschinen zu implementieren, um diese mit defekten Geräten und deren Geräuschen zu vergleichen, wie in unserem Beispiel gezeigt.

    Unsere Kreislaufwirtschaftslösung adressierte Probleme im Produktlebenszyklus durch einen systematischen Ansatz:
    1. Nutzung der APP zur Diagnose
    2. KI-gestützte Problemanalyse
    3. Lösungsvorschläge durch die App
    4. Entscheidung zwischen Reparatur oder Entsorgung
    5. Bei Bedarf Kauf eines neuen Geräts
    6. Rücksendung des alten Geräts an Miele
    7. Recycling der alten Teile durch Miele

    Dieser ganzheitliche Ansatz fördert nicht nur die Langlebigkeit von Produkten, sondern schafft auch ein geschlossenes System, das Ressourcen schont und die Umweltbelastung minimiert. Unser Konzept wurde während eines intensiven zweitägigen Design Sprints entwickelt und demonstriert die Möglichkeiten, wie Technologie zur Förderung nachhaltiger Konsumpraktiken eingesetzt werden kann.`,
    fullDescriptionEn: `As part of our sustainability course, we participated in the Miele Circular Economy Hackathon, hosted by Impact Hub Berlin. We developed an application as a solution to the problem of products being thrown away when they could easily be repaired. Our application was based on the idea of implementing AI and a database of recordings of perfectly functioning washing machines to compare with defective devices and their sounds, as shown in our example.

    Our circular economy solution addressed problems in the product lifecycle through a systematic approach:
    1. Using the APP for diagnosis
    2. AI-supported problem analysis
    3. Solution suggestions through the app
    4. Decision between repair or disposal
    5. Purchase of a new device if needed
    6. Return of the old device to Miele
    7. Recycling of the old parts by Miele

    This holistic approach not only promotes product longevity but also creates a closed system that conserves resources and minimizes environmental impact. Our concept was developed during an intensive two-day design sprint and demonstrates the possibilities of how technology can be used to promote sustainable consumption practices.`,
    additionalImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    semester: "4. Semester IoT",
    semesterEn: "4th Semester IoT",
    link: "https://shorturl.at/luBSZ",
    linkText: "Link zum Beitrag unserer Universität",
    linkTextEn: "Link to our university's post",
    note: "2-Day Design Sprint",
    noteEn: "2-Day Design Sprint",
  },
  {
    id: 5,
    title: "Softrobotics",
    subtitle: "4-Day Design Sprint",
    subtitleEn: "4-Day Design Sprint",
    description:
      "Nachbildung der Funktion eines Greiferarms durch innovative Verwendung von Ventilen und Silikonkörpern.",
    descriptionEn: "Recreation of the function of a gripper arm through innovative use of valves and silicone bodies.",
    image: "/placeholder.svg?height=600&width=800",
    fullDescription: `Im Rahmen unserer Labwoche entschied ich mich für den Kurs Softrobotics. Meine Gruppe und ich arbeiteten an der Nachbildung der Funktion eines Greiferarms, indem wir Ventile einsetzten, die Luft in sechs verschiedene, miteinander verklebte Silikonkörper ein- und ausströmen ließen, gesteuert durch eine Tastenmatrix. Mit diesem Setup konnten wir den Arm um 360° neigen und dennoch den Greiferteil öffnen.

    Wir stellten Silikonteile her, um unsere Idee zu verwirklichen, und verwendeten zahlreiche MOSFETs, Verkabelungen, Ventile und Tasten, um unsere Design-Sprint-Vision zu finalisieren. Dieser Ansatz der weichen Robotik (Soft Robotics) bietet gegenüber herkömmlichen starren Robotersystemen mehrere Vorteile, darunter erhöhte Sicherheit bei der Interaktion mit Menschen, verbesserte Anpassungsfähigkeit an unregelmäßige Oberflächen und eine natürlichere Bewegung.

    Das Projekt demonstriert die Möglichkeiten pneumatischer Systeme in der Robotik und zeigt, wie mit relativ einfachen Materialien komplexe Bewegungsmuster erzeugt werden können. Die Erfahrung vermittelte wertvolle Einblicke in die interdisziplinären Bereiche der Materialwissenschaft, Pneumatik und Steuerungstechnik, die für die Entwicklung innovativer IoT-Produkte von entscheidender Bedeutung sind.`,
    fullDescriptionEn: `As part of our lab week, I chose the Softrobotics course. My group and I worked on recreating the function of a gripper arm by using valves that allowed air to flow in and out of six different silicone bodies glued together, controlled by a button matrix. With this setup, we could tilt the arm 360° and still open the gripper part.

    We created silicone parts to realize our idea and used numerous MOSFETs, wiring, valves, and buttons to finalize our design sprint vision. This soft robotics approach offers several advantages over conventional rigid robot systems, including increased safety when interacting with humans, improved adaptability to irregular surfaces, and more natural movement.

    The project demonstrates the possibilities of pneumatic systems in robotics and shows how complex movement patterns can be generated with relatively simple materials. The experience provided valuable insights into the interdisciplinary fields of materials science, pneumatics, and control engineering, which are crucial for the development of innovative IoT products.`,
    additionalImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    semester: "3. Semester IoT",
    semesterEn: "3rd Semester IoT",
    note: "4-Day Design Sprint",
    noteEn: "4-Day Design Sprint",
  },
]

function ProjectDetail({ project, onBack, language }) {
  if (!project) return null

  return (
    <div className="max-w-4xl mx-auto">
      <Reveal>
        <button onClick={onBack} className="flex items-center mb-8 text-lg relative group transition-all duration-300">
          <ArrowLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0066cc] after:left-0 after:bottom-0 group-hover:after:w-full after:transition-all after:duration-300">
            {language === "de" ? "Zurück zum Portfolio" : "Back to Portfolio"}
          </span>
        </button>
      </Reveal>

      <Reveal>
        {project.category && (
          <div className="text-sm mb-2">{language === "de" ? project.category : project.categoryEn}</div>
        )}
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        {project.subtitle && (
          <div className="text-sm text-gray-600 mb-2">{language === "de" ? project.subtitle : project.subtitleEn}</div>
        )}
        <div className="mb-8">
          {project.semester && (
            <div className="text-sm text-gray-600">{language === "de" ? project.semester : project.semesterEn}</div>
          )}
          {project.note && (
            <div className="text-sm text-gray-600 mt-1">{language === "de" ? project.note : project.noteEn}</div>
          )}
        </div>
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[70vh] mb-12 overflow-hidden group">
          <ParallaxImage
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full"
            speed={0.1}
          />
        </div>
      </Reveal>

      <Reveal>
        <div className="prose max-w-none mb-12">
          {(language === "de" ? project.fullDescription : project.fullDescriptionEn)
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index} className="mb-6 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="flex flex-wrap gap-4 mb-12">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              {language === "de" ? project.linkText : project.linkTextEn || "View Documentation"}
            </a>
          )}
          {project.pdfLink && (
            <a
              href={project.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              {language === "de" ? project.pdfLinkText : project.pdfLinkTextEn || "Download PDF"}
            </a>
          )}
          {project.videoLink && (
            <a
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              {language === "de" ? project.videoLinkText : project.videoLinkTextEn || "Watch Video"}
            </a>
          )}
        </div>
      </Reveal>

      {project.additionalImages && project.additionalImages.length > 0 && (
        <>
          <Reveal delay={300}>
            <h2 className="text-2xl font-bold mb-6">{language === "de" ? "Projekt Galerie" : "Project Gallery"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {project.additionalImages.map((img, index) => (
                <div key={index} className="relative w-full h-80 overflow-hidden group">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </>
      )}
    </div>
  )
}

// Aktualisiere die AboutMe-Funktion mit verbesserten Texten und dem Masterstudium

function AboutMe({ language }) {
  const translations = {
    title: language === "de" ? "ÜBER MICH" : "ABOUT ME",
    hello: language === "de" ? "Hallo, mein Name ist" : "Hello, my name is",
    bio: {
      de: [
        "Geboren am 24. Juli 1996 in Reutlingen, Deutschland, bin ich ein leidenschaftlicher Designer an der Schnittstelle von digitalem Produktdesign und Technologie. Derzeit absolviere ich einen Master in Strategischer Gestaltung und baue dabei auf meiner Grundlage im Digitalen Produktdesign von der Hochschule für Gestaltung Schwäbisch Gmünd auf.",
        "Mein beruflicher Werdegang hat mich mit vielfältigen Erfahrungen in verschiedenen Designdisziplinen ausgestattet. Bei Bosch Sensortech war ich sechs Monate lang als UI/UX-Designer tätig, wo ich interne Schnittstellen für Sensortestsysteme erheblich verbessert und damit die betriebliche Effizienz und Benutzerzufriedenheit im gesamten Unternehmen gesteigert habe.",
        "Während meines bereichernden sechsmonatigen Praktikums bei Simple GmbH in Köln habe ich an hochkarätigen Projekten mitgewirkt, darunter die visuelle Konzeption und Inhaltsentwicklung für die Beiersdorf Heritage Room Ausstellung. Diese Erfahrung ermöglichte es mir, modernste KI-Technologien für die Inhaltserstellung zu erkunden und gleichzeitig meine Videoproduktionsfähigkeiten zu verfeinern. Ich spielte auch eine Schlüsselrolle bei der Produktion von Videos für Preisverleihungen und der Entwicklung ansprechender Social-Media-Marketing-Animationen für Plattformen wie Instagram und LinkedIn.",
        "Neben meinen beruflichen Aktivitäten pflege ich Kreativität durch Musikkomposition und Zeichnen, während ich körperliche Disziplin durch regelmäßiges Fitnesstraining und wöchentliche Kickbox-Einheiten aufrechterhalte. Ich bin stolz auf effektive Führung, akribische Planung und einen kollaborativen Ansatz für Teamarbeit. Meine problemlösungsorientierte Denkweise und mein Engagement für Exzellenz treiben mich an, jede Herausforderung mit Bedacht und Entschlossenheit anzugehen, stets fokussiert auf das Erreichen bedeutungsvoller Ergebnisse und die Verwirklichung ambitionierter Visionen.",
      ],
      en: [
        "Born on July 24th, 1996, in Reutlingen, Germany, I am a passionate designer at the intersection of digital product design and technology. Currently pursuing a Master's degree in Strategic Design while building on my foundation in Digital Product Design from Hochschule für Gestaltung Schwäbisch Gmünd.",
        "My professional journey has equipped me with diverse experiences across design disciplines. At Bosch Sensortech, I served as a UI/UX designer for six months, where I significantly improved internal interfaces for sensor testing systems, enhancing operational efficiency and user satisfaction throughout the company.",
        "During my enriching six-month internship at Simple GmbH in Cologne, I contributed to high-profile projects including the visual conceptualization and content development for the Beiersdorf Heritage Room exhibition. This experience allowed me to explore cutting-edge AI technologies for content creation while refining my video production skills. I also played a key role in producing award ceremony videos and developing engaging social media marketing animations for platforms like Instagram and LinkedIn.",
        "Beyond my professional endeavors, I cultivate creativity through music composition and sketching, while maintaining physical discipline through regular fitness training and weekly kickboxing sessions. I pride myself on effective leadership, meticulous planning, and a collaborative approach to teamwork. My problem-solving mindset and commitment to excellence drive me to approach each challenge with thoughtfulness and determination, always focused on achieving meaningful outcomes and realizing ambitious visions.",
      ],
    },
    cv: language === "de" ? "LEBENSLAUF" : "CV",
    education: language === "de" ? "AUSBILDUNG" : "EDUCATION",
    workExperience: language === "de" ? "BERUFSERFAHRUNG" : "WORK EXPERIENCE",
    internships: language === "de" ? "PRAKTIKA" : "INTERNSHIPS",
    languages: language === "de" ? "SPRACHEN" : "LANGUAGES",
    skills: language === "de" ? "FÄHIGKEITEN & EIGENSCHAFTEN" : "SKILLS & ATTRIBUTES",
    skillsCategories: {
      design: {
        title: language === "de" ? "Design" : "Design",
        content:
          language === "de" ? "UI/UX, Produktdesign, Ausstellungsdesign" : "UI/UX, Product Design, Exhibition Design",
      },
      technical: {
        title: language === "de" ? "Technisch" : "Technical",
        content:
          language === "de"
            ? "Prototyping, IoT-Entwicklung, Sensorintegration"
            : "Prototyping, IoT Development, Sensor Integration",
      },
      software: {
        title: language === "de" ? "Software" : "Software",
        content: language === "de" ? "Adobe Creative Suite, Figma, Sketch" : "Adobe Creative Suite, Figma, Sketch",
      },
      soft: {
        title: language === "de" ? "Soft Skills" : "Soft Skills",
        content:
          language === "de" ? "Führung, Teamarbeit, Problemlösung" : "Leadership, Team Collaboration, Problem-solving",
      },
      personal: {
        title: language === "de" ? "Persönlich" : "Personal",
        content: language === "de" ? "Diszipliniert, Höflich, Kreativ" : "Disciplined, Courteous, Creative",
      },
      interests: {
        title: language === "de" ? "Interessen" : "Interests",
        content: language === "de" ? "Sport, Designstudien, Musik, Kunst" : "Sports, Design Studies, Music, Art",
      },
    },
    educationItems: {
      master: {
        title: language === "de" ? "Master of Arts in Strategischer Gestaltung" : "Master of Arts in Strategic Design",
        period: language === "de" ? "2024 - Heute" : "2024 - Present",
        institution:
          language === "de"
            ? "Hochschule für Gestaltung, Schwäbisch Gmünd"
            : "Hochschule für Gestaltung, Schwäbisch Gmünd",
        note: language === "de" ? "Derzeit im 1. Semester" : "Currently in 1st semester",
      },
      bachelor: {
        title:
          language === "de"
            ? "Bachelor of Arts in Internet der Dinge, Gestaltung vernetzter Systeme"
            : "Bachelor of Arts in Internet of Things, Design of Networked Systems",
        period: language === "de" ? "2020 - 2024" : "2020 - 2024",
        institution:
          language === "de"
            ? "Hochschule für Gestaltung, Schwäbisch Gmünd"
            : "Hochschule für Gestaltung, Schwäbisch Gmünd",
      },
      ib: {
        title: language === "de" ? "IB International Bund Berufsschulen" : "IB International Bund Vocational Schools",
        period: language === "de" ? "2017 - 2019" : "2017 - 2019",
        institution: language === "de" ? "Reutlingen" : "Reutlingen",
      },
      school: {
        title: language === "de" ? "Freie Georgenschule" : "Freie Georgenschule",
        period: language === "de" ? "2003 - 2017" : "2003 - 2017",
        institution: language === "de" ? "Reutlingen" : "Reutlingen",
      },
    },
    workItems: {
      boschSensor: {
        title: language === "de" ? "UI/UX Designer" : "UI/UX Designer",
        period: language === "de" ? "2023" : "2023",
        company: language === "de" ? "Bosch Sensor-Tech" : "Bosch Sensor-Tech",
      },
      simple: {
        title: language === "de" ? "Ausstellungsdesigner" : "Exhibition Designer",
        period: language === "de" ? "2023/24" : "2023/24",
        company: language === "de" ? "Simple GmbH, Köln" : "Simple GmbH, Cologne",
      },
      bosch2021: {
        title: language === "de" ? "Logistik-Spezialist" : "Logistics Specialist",
        period: language === "de" ? "2021" : "2021",
        company: language === "de" ? "Robert Bosch GmbH" : "Robert Bosch GmbH",
      },
      bosch2019: {
        title: language === "de" ? "Logistik-Spezialist" : "Logistics Specialist",
        period: language === "de" ? "2019" : "2019",
        company: language === "de" ? "Robert Bosch GmbH" : "Robert Bosch GmbH",
      },
      mercedes: {
        title: language === "de" ? "Logistik-Spezialist" : "Logistics Specialist",
        period: language === "de" ? "2020" : "2020",
        company: language === "de" ? "Mercedes Benz" : "Mercedes Benz",
      },
    },
    internshipItems: {
      simple: {
        title: language === "de" ? "Praktikant Ausstellungsdesign" : "Exhibition Design Intern",
        period: language === "de" ? "2023/24" : "2023/24",
        company: language === "de" ? "Simple GmbH, Köln" : "Simple GmbH, Cologne",
        description:
          language === "de"
            ? "Inhaltserstellung, Ausstellungsdesign und Multimedia-Produktion"
            : "Content creation, exhibition design, and multimedia production",
      },
      bosch: {
        title: language === "de" ? "Praktikant Mechatronik" : "Mechatronics Intern",
        period: language === "de" ? "2013" : "2013",
        company: language === "de" ? "Robert Bosch GmbH" : "Robert Bosch GmbH",
      },
      disability: {
        title: language === "de" ? "Praktikant Behindertenpflege" : "Disability Care Intern",
        period: language === "de" ? "2014" : "2014",
        company: language === "de" ? "Behindertenpflege Herrenberg" : "Disability Care Herrenberg",
      },
      fuchsfarm: {
        title: language === "de" ? "Landwirtschaftspraktikant" : "Agricultural Intern",
        period: language === "de" ? "2012" : "2012",
        company: language === "de" ? "Fuchsfarm in Albstadt" : "Fuchsfarm in Albstadt",
      },
      helchenhof: {
        title: language === "de" ? "Landwirtschaftspraktikant" : "Agricultural Intern",
        period: language === "de" ? "2011" : "2011",
        company: language === "de" ? "Helchenhof in Überlingen" : "Helchenhof in Überlingen",
      },
    },
    languageItems: {
      german: {
        name: language === "de" ? "Deutsch" : "German",
        level: language === "de" ? "Muttersprachler" : "Native proficiency",
      },
      turkish: {
        name: language === "de" ? "Türkisch" : "Turkish",
        level: language === "de" ? "Muttersprachler" : "Native proficiency",
      },
      english: {
        name: language === "de" ? "Englisch" : "English",
        level: language === "de" ? "Fließend" : "Professional proficiency",
      },
      french: {
        name: language === "de" ? "Französisch" : "French",
        level: language === "de" ? "Grundkenntnisse" : "Elementary proficiency",
      },
      spanish: {
        name: language === "de" ? "Spanisch" : "Spanish",
        level: language === "de" ? "Grundkenntnisse" : "Elementary proficiency",
      },
    },
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Reveal>
        <h1 className="text-3xl font-bold mb-8">{translations.title}</h1>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-1">
          <Reveal direction="left">
            <div className="overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Enis Sentürk"
                width={300}
                height={400}
                className="w-full object-cover mb-6 transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-lg mb-1">{translations.hello},</h2>
              <p className="text-2xl font-bold">ENIS SENTÜRK</p>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <Reveal direction="right">
            <div className="space-y-6 text-base leading-relaxed">
              {translations.bio[language === "de" ? "de" : "en"].map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <h2 className="text-2xl font-bold mb-8 border-b border-[#0066cc] pb-2">{translations.cv}</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <Reveal delay={100}>
            <h3 className="text-lg font-bold mb-4 text-[#0066cc]">{translations.education}</h3>
            <div className="space-y-6">
              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="education" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.educationItems.master.title}</span>
                    <span className="text-gray-600">{translations.educationItems.master.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.educationItems.master.institution}</div>
                  <div className="text-sm italic mt-1">{translations.educationItems.master.note}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="education" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.educationItems.bachelor.title}</span>
                    <span className="text-gray-600">{translations.educationItems.bachelor.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.educationItems.bachelor.institution}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="education" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.educationItems.ib.title}</span>
                    <span className="text-gray-600">{translations.educationItems.ib.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.educationItems.ib.institution}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="education" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.educationItems.school.title}</span>
                    <span className="text-gray-600">{translations.educationItems.school.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.educationItems.school.institution}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="text-lg font-bold mt-12 mb-4 text-[#0066cc]">{translations.workExperience}</h3>
            <div className="space-y-6">
              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="work" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.workItems.boschSensor.title}</span>
                    <span className="text-gray-600">{translations.workItems.boschSensor.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.workItems.boschSensor.company}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="work" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.workItems.simple.title}</span>
                    <span className="text-gray-600">{translations.workItems.simple.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.workItems.simple.company}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="work" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.workItems.bosch2021.title}</span>
                    <span className="text-gray-600">{translations.workItems.bosch2021.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.workItems.bosch2021.company}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="work" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.workItems.bosch2019.title}</span>
                    <span className="text-gray-600">{translations.workItems.bosch2019.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.workItems.bosch2019.company}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="work" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.workItems.mercedes.title}</span>
                    <span className="text-gray-600">{translations.workItems.mercedes.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.workItems.mercedes.company}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal delay={300}>
            <h3 className="text-lg font-bold mb-4 text-[#0066cc]">{translations.internships}</h3>
            <div className="space-y-6">
              <div className="hover:translate-x-2 transition-transform duration-300 flex items-start gap-3">
                <Icon name="internship" className="mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.internshipItems.simple.title}</span>
                    <span className="text-gray-600">{translations.internshipItems.simple.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.internshipItems.simple.company}</div>
                  <div className="text-sm mt-1">{translations.internshipItems.simple.description}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="internship" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.internshipItems.bosch.title}</span>
                    <span className="text-gray-600">{translations.internshipItems.bosch.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.internshipItems.bosch.company}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="healthcare" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.internshipItems.disability.title}</span>
                    <span className="text-gray-600">{translations.internshipItems.disability.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.internshipItems.disability.company}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="agriculture" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.internshipItems.fuchsfarm.title}</span>
                    <span className="text-gray-600">{translations.internshipItems.fuchsfarm.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.internshipItems.fuchsfarm.company}</div>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                <Icon name="agriculture" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{translations.internshipItems.helchenhof.title}</span>
                    <span className="text-gray-600">{translations.internshipItems.helchenhof.period}</span>
                  </div>
                  <div className="text-sm text-gray-600">{translations.internshipItems.helchenhof.company}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <h3 className="text-lg font-bold mt-12 mb-4 text-[#0066cc]">{translations.languages}</h3>
            <div className="space-y-4">
              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-xl">🇩🇪</span>
                </div>
                <div className="ml-3 flex-1 flex justify-between">
                  <span className="font-medium">{translations.languageItems.german.name}</span>
                  <span className="text-gray-600">{translations.languageItems.german.level}</span>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-xl">🇹🇷</span>
                </div>
                <div className="ml-3 flex-1 flex justify-between">
                  <span className="font-medium">{translations.languageItems.turkish.name}</span>
                  <span className="text-gray-600">{translations.languageItems.turkish.level}</span>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-xl">🇬🇧</span>
                </div>
                <div className="ml-3 flex-1 flex justify-between">
                  <span className="font-medium">{translations.languageItems.english.name}</span>
                  <span className="text-gray-600">{translations.languageItems.english.level}</span>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-xl">🇫🇷</span>
                </div>
                <div className="ml-3 flex-1 flex justify-between">
                  <span className="font-medium">{translations.languageItems.french.name}</span>
                  <span className="text-gray-600">{translations.languageItems.french.level}</span>
                </div>
              </div>

              <div className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-xl">🇪🇸</span>
                </div>
                <div className="ml-3 flex-1 flex justify-between">
                  <span className="font-medium">{translations.languageItems.spanish.name}</span>
                  <span className="text-gray-600">{translations.languageItems.spanish.level}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={500}>
        <div className="mb-16">
          <h3 className="text-lg font-bold mb-4 text-[#0066cc]">{translations.skills}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            <div className="hover:translate-x-2 transition-transform duration-300">
              <span className="font-medium">{translations.skillsCategories.design.title}:</span>{" "}
              {translations.skillsCategories.design.content}
            </div>
            <div className="hover:translate-x-2 transition-transform duration-300">
              <span className="font-medium">{translations.skillsCategories.technical.title}:</span>{" "}
              {translations.skillsCategories.technical.content}
            </div>
            <div className="hover:translate-x-2 transition-transform duration-300">
              <span className="font-medium">{translations.skillsCategories.software.title}:</span>{" "}
              {translations.skillsCategories.software.content}
            </div>
            <div className="hover:translate-x-2 transition-transform duration-300">
              <span className="font-medium">{translations.skillsCategories.soft.title}:</span>{" "}
              {translations.skillsCategories.soft.content}
            </div>
            <div className="hover:translate-x-2 transition-transform duration-300">
              <span className="font-medium">{translations.skillsCategories.personal.title}:</span>{" "}
              {translations.skillsCategories.personal.content}
            </div>
            <div className="hover:translate-x-2 transition-transform duration-300">
              <span className="font-medium">{translations.skillsCategories.interests.title}:</span>{" "}
              {translations.skillsCategories.interests.content}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

// Aktualisiere die Contact-Funktion mit verbesserten Texten und Layout

function Contact({ onSubmit, formStatus, language }) {
  const translations = {
    title: language === "de" ? "KONTAKT" : "CONTACT",
    subtitle:
      language === "de"
        ? "Ich freue mich auf Ihre Nachricht und neue Herausforderungen"
        : "I look forward to your message and new challenges",
    contactInfo: language === "de" ? "Kontaktinformationen" : "Contact Information",
    email: language === "de" ? "Email" : "Email",
    phone: language === "de" ? "Telefon" : "Phone",
    address: language === "de" ? "Adresse" : "Address",
    availability: language === "de" ? "Verfügbarkeit" : "Availability",
    availabilityText:
      language === "de"
        ? "Ich bin offen für Projektanfragen, Kooperationen und neue berufliche Herausforderungen. Zögern Sie nicht, mich zu kontaktieren!"
        : "I am open to project inquiries, collaborations, and new professional challenges. Don't hesitate to contact me!",
    sendMessage: language === "de" ? "Nachricht senden" : "Send Message",
    name: language === "de" ? "Name" : "Name",
    namePlaceholder: language === "de" ? "Ihr Name" : "Your name",
    emailPlaceholder: language === "de" ? "Ihre Email-Adresse" : "Your email address",
    message: language === "de" ? "Nachricht" : "Message",
    messagePlaceholder: language === "de" ? "Ihre Nachricht" : "Your message",
    sendButton: language === "de" ? "Nachricht senden" : "Send Message",
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <Reveal>
        <h1 className="text-3xl font-bold mb-4">{translations.title}</h1>
        <p className="mb-12 text-lg">{translations.subtitle}</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        <Reveal direction="left">
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-6 border-b border-[#0066cc] pb-2">{translations.contactInfo}</h2>
            <ul className="space-y-6">
              <li className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] bg-opacity-10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#0066cc]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{translations.email}</p>
                  <a href="mailto:Enissentuerk@hotmail.de" className="font-medium hover:text-[#0066cc]">
                    Enissentuerk@hotmail.de
                  </a>
                </div>
              </li>

              <li className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] bg-opacity-10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#0066cc]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{translations.phone}</p>
                  <a href="tel:01734186952" className="font-medium hover:text-[#0066cc]">
                    01734186952
                  </a>
                </div>
              </li>

              <li className="hover:translate-x-2 transition-transform duration-300 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] bg-opacity-10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#0066cc]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{translations.address}</p>
                  <p className="font-medium">Kreuzem 7/4, 72762 Reutlingen</p>
                </div>
              </li>
            </ul>

            <div className="pt-8 mt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">{translations.availability}</h3>
              <p className="text-gray-700">{translations.availabilityText}</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right">
          <div>
            <h2 className="text-xl font-bold mb-6 border-b border-[#0066cc] pb-2">{translations.sendMessage}</h2>

            {formStatus.message && (
              <div
                className={`mb-6 p-4 rounded-md ${formStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {formStatus.message}
              </div>
            )}

            <form id="contact-form" action={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  {translations.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 focus:outline-none transition-all duration-300 focus:border-[#0066cc] focus:shadow-md rounded-md"
                  placeholder={translations.namePlaceholder}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  {translations.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 focus:outline-none transition-all duration-300 focus:border-[#0066cc] focus:shadow-md rounded-md"
                  placeholder={translations.emailPlaceholder}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  {translations.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full p-3 border border-gray-300 focus:outline-none transition-all duration-300 focus:border-[#0066cc] focus:shadow-md rounded-md"
                  placeholder={translations.messagePlaceholder}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#0066cc] text-white hover:bg-[#0055aa] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md rounded-md"
              >
                {translations.sendButton}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default function Home() {
  const [activePage, setActivePage] = useState("PORTFOLIO")
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewMode, setViewMode] = useState("gallery") // Geändert von "grid" zu "gallery" als Standard
  const [formStatus, setFormStatus] = useState({ message: "", type: "" })
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("de") // "de" für Deutsch, "en" für Englisch
  const [konamiUnlocked, setKonamiUnlocked] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorRef = useRef(null)

  // Easter Egg: Cursor Follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (konamiUnlocked) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [konamiUnlocked])

  // Easter Egg: Smooth Scrolling
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth"
    }
    return () => {
      if (typeof window !== "undefined") {
        document.documentElement.style.scrollBehavior = ""
      }
    }
  }, [])

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    // Scroll to top when opening a project
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBackClick = () => {
    setSelectedProject(null)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "gallery" : "grid")
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Easter Egg: Wenn 5 mal geklickt, zeige eine Überraschung
    setClickCount(clickCount + 1)
    if (clickCount === 4) {
      alert("🎉 Du hast ein Easter Egg gefunden! Drücke den Konami-Code für eine Überraschung: ↑↑↓↓←→←→ba")
      setClickCount(0)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de")
  }

  const handleKonamiUnlock = () => {
    setKonamiUnlocked(true)
    alert("🌟 Konami-Code aktiviert! Du hast einen magischen Cursor freigeschaltet!")
  }

  const handleFormSubmit = async (formData) => {
    const result = await sendEmail(formData)

    if (result.success) {
      setFormStatus({
        message: language === "de" ? "Nachricht erfolgreich gesendet!" : "Message sent successfully!",
        type: "success",
      })
      // Formular zurücksetzen
      document.getElementById("contact-form").reset()
    } else {
      setFormStatus({
        message: result.error || (language === "de" ? "Ein Fehler ist aufgetreten." : "An error occurred."),
        type: "error",
      })
    }

    // Status nach 5 Sekunden zurücksetzen
    setTimeout(() => {
      setFormStatus({ message: "", type: "" })
    }, 5000)
  }

  // Übersetzungsfunktion für die Navigation
  const getNavItems = () => {
    return language === "de" ? ["PORTFOLIO", "ABOUT ME", "CONTACT"] : ["PORTFOLIO", "ABOUT ME", "CONTACT"]
  }

  const renderContent = () => {
    switch (activePage) {
      case "ABOUT ME":
        return <AboutMe language={language} />
      case "PORTFOLIO":
        if (selectedProject) {
          return <ProjectDetail project={selectedProject} onBack={handleBackClick} language={language} />
        }
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <Reveal>
                <h1 className="text-3xl font-bold">PORTFOLIO</h1>
              </Reveal>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleViewMode}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === "grid"
                      ? `bg-[${accentColor}] text-white`
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label="Grid View"
                  title="Grid View"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={toggleViewMode}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === "gallery"
                      ? `bg-[${accentColor}] text-white`
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label="Gallery View"
                  title="Gallery View"
                >
                  <ImageIcon size={20} />
                </button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <Reveal key={project.id} delay={index * 100} direction={index % 2 === 0 ? "up" : "right"}>
                    <div
                      className="project-card group cursor-pointer transition-all duration-300 hover:shadow-xl"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="relative w-full h-64 mb-2 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      </div>
                      <div className="mt-2 transform transition-transform duration-300 group-hover:translate-x-2">
                        {project.semester && (
                          <div className="text-sm text-gray-600">
                            {language === "de" ? project.semester : project.semesterEn}
                          </div>
                        )}
                        <h2 className="text-xl font-bold mt-1">{project.title}</h2>
                        {project.subtitle && (
                          <div className="text-sm text-gray-600 mt-1">
                            {language === "de" ? project.subtitle : project.subtitleEn}
                          </div>
                        )}
                        {project.category && (
                          <div className="text-sm mt-1">
                            {language === "de" ? project.category : project.categoryEn}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="space-y-32">
                {projects.map((project, index) => (
                  <Reveal key={project.id} delay={index * 150}>
                    <div className="group">
                      <div
                        className="relative w-full h-[80vh] mb-4 overflow-hidden cursor-pointer"
                        onClick={() => handleProjectClick(project)}
                      >
                        <ParallaxImage
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full"
                          speed={0.1}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                          <div className="text-sm mb-2">
                            {language === "de" ? project.semester : project.semesterEn}
                          </div>
                          <h2 className="text-4xl font-bold mb-4 transform transition-transform duration-500 group-hover:translate-x-2">
                            {project.title}
                          </h2>
                          {project.subtitle && (
                            <div className="text-sm text-gray-400 mb-2">
                              {language === "de" ? project.subtitle : project.subtitleEn}
                            </div>
                          )}
                          <p className="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {language === "de" ? project.description : project.descriptionEn}
                          </p>
                          <button
                            className="mt-6 px-6 py-3 bg-[#0066cc] text-white rounded-md hover:bg-[#0055aa] transition-all duration-300 transform group-hover:translate-y-0 translate-y-10 opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProjectClick(project)
                            }}
                          >
                            {language === "de" ? "Projekt ansehen" : "View Project"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )
      case "CONTACT":
        return <Contact onSubmit={handleFormSubmit} formStatus={formStatus} language={language} />
      default:
        return null
    }
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      {konamiUnlocked && (
        <div
          ref={cursorRef}
          className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sparkles className="text-[#0066cc] animate-pulse" />
        </div>
      )}

      <KonamiCode onUnlock={handleKonamiUnlock} />

      <div className="container mx-auto px-4 py-8">
        <header className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-start">
              <div className="text-sm tracking-widest mb-1 text-[#0066cc]">@FREEZDIGITAL</div>
              <h1 className="text-4xl font-bold tracking-tight">ENIS SENTÜRK</h1>
              <p className="text-lg mt-1">UX/UI</p>
              <p className="text-sm mt-2">
                {language === "de" ? "IoT Produktdesign und Entwicklung" : "IoT Product Design and Development"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors mr-2"
                aria-label={language === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
                title={language === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
              >
                <Globe size={20} />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <nav className={`border-t border-b ${darkMode ? "border-gray-700" : "border-black"} py-4`}>
            <ul className="flex flex-wrap space-x-6 md:space-x-12">
              {getNavItems().map((page) => (
                <li key={page}>
                  <button
                    onClick={() => {
                      setActivePage(page)
                      setSelectedProject(null)
                    }}
                    className={cn(
                      "text-base tracking-wide hover:font-bold relative transition-all duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0066cc] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300",
                      activePage === page ? "font-bold after:w-full" : "font-normal",
                    )}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div>{renderContent()}</div>
      </div>
    </main>
  )
}
