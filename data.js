// Projektdaten
const projects = [
  {
    id: 0,
    title: "PathAware",
    description:
      "Eine innovative App zur Unterstützung von Wanderern mit detaillierten Informationen über Wanderwege und deren Beschaffenheit.",
    descriptionEn: "An innovative app supporting hikers with detailed information about trails and their conditions.",
    image: "images/pathaware-cover.png",
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
      "images/pathaware-mockup.png",
      "images/pathaware-mockup-2.png",
      "images/pathaware-app-mockup.png",
      "images/pathaware-meldung-fotografie.png",
      "images/pathaware-meldung-tour.png",
      "images/pathaware-mockup-hand.png",
      "images/pathaware-realistische-map.png",
      "images/paul-und-enis-mit-app.png",
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
    image: "images/placeholder.jpg",
    fullDescription: `MULTIM8 repräsentiert ein grundlegendes Redesign eines Multimeters, das speziell auf die Bedürfnisse von Einsteigern im technischen Bereich zugeschnitten ist.

    Herkömmliche Multimeter sind oft mit einer Vielzahl von Symbolen auf dem Display überladen, verfügen über einen standardisierten Drehknopf zur Auswahl verschiedener Modi und bieten mehrere Anschlüsse für die Testspitzen, was für Anfänger überwältigend sein kann.

    In unserem nutzerzentrierten Designansatz haben wir drei Kernfunktionen definiert: Spannungsmessung, Durchgangsprüfung und Widerstandsmessung. Jede dieser Funktionen erhielt einen eigenen, klar gekennzeichneten Button für eine intuitive Bedienung. Zusätzlich haben wir entsprechende Beschriftungen hinzugefügt, um das Verständnis der verwendeten Symbole zu erleichtern.

    Unser finales Produkt ist ein Multimeter, das die wesentlichen Hauptfunktionen abdeckt und durch sein vereinfachtes Gehäusedesign sowie die erklärende Benutzerführung auf dem Display Einsteigern den effizienten Umgang mit dem Gerät ermöglicht. MULTIM8 überbrückt die Kluft zwischen technischer Komplexität und Benutzerfreundlichkeit, indem es die Einstiegshürde für technische Messgeräte deutlich senkt.`,
    fullDescriptionEn: `MULTIM8 represents a fundamental redesign of a multimeter, specifically tailored to the needs of beginners in the technical field.

    Conventional multimeters are often overloaded with a variety of symbols on the display, feature a standardized rotary knob for selecting different modes, and offer multiple connections for test probes, which can be overwhelming for beginners.

    In our user-centered design approach, we defined three core functions: voltage measurement, continuity testing, and resistance measurement. Each of these functions received its own clearly labeled button for intuitive operation. Additionally, we added corresponding labels to facilitate understanding of the symbols used.

    Our final product is a multimeter that covers the essential main functions and, through its simplified housing design and explanatory user guidance on the display, enables beginners to use the device efficiently. MULTIM8 bridges the gap between technical complexity and user-friendliness by significantly lowering the entry barrier for technical measuring devices.`,
    additionalImages: ["images/placeholder.jpg", "images/placeholder.jpg", "images/placeholder.jpg"],
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
    image: "images/placeholder.jpg",
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
    additionalImages: ["images/placeholder.jpg", "images/placeholder.jpg", "images/placeholder.jpg"],
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
    image: "images/placeholder.jpg",
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
    additionalImages: ["images/placeholder.jpg", "images/placeholder.jpg", "images/placeholder.jpg"],
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
    image: "images/placeholder.jpg",
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
    additionalImages: ["images/placeholder.jpg", "images/placeholder.jpg"],
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
    image: "images/placeholder.jpg",
    fullDescription: `Im Rahmen unserer Labwoche entschied ich mich für den Kurs Softrobotics. Meine Gruppe und ich arbeiteten an der Nachbildung der Funktion eines Greiferarms, indem wir Ventile einsetzten, die Luft in sechs verschiedene, miteinander verklebte Silikonkörper ein- und ausströmen ließen, gesteuert durch eine Tastenmatrix. Mit diesem Setup konnten wir den Arm um 360° neigen und dennoch den Greiferteil öffnen.

    Wir stellten Silikonteile her, um unsere Idee zu verwirklichen, und verwendeten zahlreiche MOSFETs, Verkabelungen, Ventile und Tasten, um unsere Design-Sprint-Vision zu finalisieren. Dieser Ansatz der weichen Robotik (Soft Robotics) bietet gegenüber herkömmlichen starren Robotersystemen mehrere Vorteile, darunter erhöhte Sicherheit bei der Interaktion mit Menschen, verbesserte Anpassungsfähigkeit an unregelmäßige Oberflächen und eine natürlichere Bewegung.

    Das Projekt demonstriert die Möglichkeiten pneumatischer Systeme in der Robotik und zeigt, wie mit relativ einfachen Materialien komplexe Bewegungsmuster erzeugt werden können. Die Erfahrung vermittelte wertvolle Einblicke in die interdisziplinären Bereiche der Materialwissenschaft, Pneumatik und Steuerungstechnik, die für die Entwicklung innovativer IoT-Produkte von entscheidender Bedeutung sind.`,
    fullDescriptionEn: `As part of our lab week, I chose the Softrobotics course. My group and I worked on recreating the function of a gripper arm by using valves that allowed air to flow in and out of six different silicone bodies glued together, controlled by a button matrix. With this setup, we could tilt the arm 360° and still open the gripper part.

    We created silicone parts to realize our idea and used numerous MOSFETs, wiring, valves, and buttons to finalize our design sprint vision. This soft robotics approach offers several advantages over conventional rigid robot systems, including increased safety when interacting with humans, improved adaptability to irregular surfaces, and more natural movement.

    The project demonstrates the possibilities of pneumatic systems in robotics and shows how complex movement patterns can be generated with relatively simple materials. The experience provided valuable insights into the interdisciplinary fields of materials science, pneumatics, and control engineering, which are crucial for the development of innovative IoT products.`,
    additionalImages: ["images/placeholder.jpg", "images/placeholder.jpg"],
    semester: "3. Semester IoT",
    semesterEn: "3rd Semester IoT",
    note: "4-Day Design Sprint",
    noteEn: "4-Day Design Sprint",
  },
]

// Übersetzungen für About Me
const aboutMeTranslations = {
  de: {
    title: "ÜBER MICH",
    hello: "Hallo, mein Name ist",
    bio: [
      "Geboren am 24. Juli 1996 in Reutlingen, Deutschland, bin ich ein leidenschaftlicher Designer an der Schnittstelle von digitalem Produktdesign und Technologie. Derzeit absolviere ich einen Master in Strategischer Gestaltung und baue dabei auf meiner Grundlage im Digitalen Produktdesign von der Hochschule für Gestaltung Schwäbisch Gmünd auf.",
      "Mein beruflicher Werdegang hat mich mit vielfältigen Erfahrungen in verschiedenen Designdisziplinen ausgestattet. Bei Bosch Sensortech war ich sechs Monate lang als UI/UX-Designer tätig, wo ich interne Schnittstellen für Sensortestsysteme erheblich verbessert und damit die betriebliche Effizienz und Benutzerzufriedenheit im gesamten Unternehmen gesteigert habe.",
      "Während meines bereichernden sechsmonatigen Praktikums bei Simple GmbH in Köln habe ich an hochkarätigen Projekten mitgewirkt, darunter die visuelle Konzeption und Inhaltsentwicklung für die Beiersdorf Heritage Room Ausstellung. Diese Erfahrung ermöglichte es mir, modernste KI-Technologien für die Inhaltserstellung zu erkunden und gleichzeitig meine Videoproduktionsfähigkeiten zu verfeinern. Ich spielte auch eine Schlüsselrolle bei der Produktion von Videos für Preisverleihungen und der Entwicklung ansprechender Social-Media-Marketing-Animationen für Plattformen wie Instagram und LinkedIn.",
      "Neben meinen beruflichen Aktivitäten pflege ich Kreativität durch Musikkomposition und Zeichnen, während ich körperliche Disziplin durch regelmäßiges Fitnesstraining und wöchentliche Kickbox-Einheiten aufrechterhalte. Ich bin stolz auf effektive Führung, akribische Planung und einen kollaborativen Ansatz für Teamarbeit. Meine problemlösungsorientierte Denkweise und mein Engagement für Exzellenz treiben mich an, jede Herausforderung mit Bedacht und Entschlossenheit anzugehen, stets fokussiert auf das Erreichen bedeutungsvoller Ergebnisse und die Verwirklichung ambitionierter Visionen.",
    ],
    cv: "LEBENSLAUF",
    education: "AUSBILDUNG",
    workExperience: "BERUFSERFAHRUNG",
    internships: "PRAKTIKA",
    languages: "SPRACHEN",
    skills: "FÄHIGKEITEN & EIGENSCHAFTEN",
    skillsCategories: {
      design: {
        title: "Design",
        content: "UI/UX, Produktdesign, Ausstellungsdesign",
      },
      technical: {
        title: "Technisch",
        content: "Prototyping, IoT-Entwicklung, Sensorintegration",
      },
      software: {
        title: "Software",
        content: "Adobe Creative Suite, Figma, Sketch",
      },
      soft: {
        title: "Soft Skills",
        content: "Führung, Teamarbeit, Problemlösung",
      },
      personal: {
        title: "Persönlich",
        content: "Diszipliniert, Höflich, Kreativ",
      },
      interests: {
        title: "Interessen",
        content: "Sport, Designstudien, Musik, Kunst",
      },
    },
    educationItems: {
      master: {
        title: "Master of Arts in Strategischer Gestaltung",
        period: "2024 - Heute",
        institution: "Hochschule für Gestaltung, Schwäbisch Gmünd",
        note: "Derzeit im 1. Semester",
      },
      bachelor: {
        title: "Bachelor of Arts in Internet der Dinge, Gestaltung vernetzter Systeme",
        period: "2020 - 2024",
        institution: "Hochschule für Gestaltung, Schwäbisch Gmünd",
      },
      ib: {
        title: "IB International Bund Berufsschulen",
        period: "2017 - 2019",
        institution: "Reutlingen",
      },
      school: {
        title: "Freie Georgenschule",
        period: "2003 - 2017",
        institution: "Reutlingen",
      },
    },
    workItems: {
      boschSensor: {
        title: "UI/UX Designer",
        period: "2023",
        company: "Bosch Sensor-Tech",
      },
      simple: {
        title: "Ausstellungsdesigner",
        period: "2023/24",
        company: "Simple GmbH, Köln",
      },
      bosch2021: {
        title: "Logistik-Spezialist",
        period: "2021",
        company: "Robert Bosch GmbH",
      },
      bosch2019: {
        title: "Logistik-Spezialist",
        period: "2019",
        company: "Robert Bosch GmbH",
      },
      mercedes: {
        title: "Logistik-Spezialist",
        period: "2020",
        company: "Mercedes Benz",
      },
    },
    internshipItems: {
      simple: {
        title: "Praktikant Ausstellungsdesign",
        period: "2023/24",
        company: "Simple GmbH, Köln",
        description: "Inhaltserstellung, Ausstellungsdesign und Multimedia-Produktion",
      },
      bosch: {
        title: "Praktikant Mechatronik",
        period: "2013",
        company: "Robert Bosch GmbH",
      },
      disability: {
        title: "Praktikant Behindertenpflege",
        period: "2014",
        company: "Behindertenpflege Herrenberg",
      },
      fuchsfarm: {
        title: "Landwirtschaftspraktikant",
        period: "2012",
        company: "Fuchsfarm in Albstadt",
      },
      helchenhof: {
        title: "Landwirtschaftspraktikant",
        period: "2011",
        company: "Helchenhof in Überlingen",
      },
    },
    languageItems: {
      german: {
        name: "Deutsch",
        level: "Muttersprachler",
      },
      turkish: {
        name: "Türkisch",
        level: "Muttersprachler",
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
  },
  en: {
    title: "ABOUT ME",
    hello: "Hello, my name is",
    bio: [
      "Born on July 24th, 1996, in Reutlingen, Germany, I am a passionate designer at the intersection of digital product design and technology. Currently pursuing a Master's degree in Strategic Design while building on my foundation in Digital Product Design from Hochschule für Gestaltung Schwäbisch Gmünd.",
      "My professional journey has equipped me with diverse experiences across design disciplines. At Bosch Sensortech, I served as a UI/UX designer for six months, where I significantly improved internal interfaces for sensor testing systems, enhancing operational efficiency and user satisfaction throughout the company.",
      "During my enriching six-month internship at Simple GmbH in Cologne, I contributed to high-profile projects including the visual conceptualization and content development for the Beiersdorf Heritage Room exhibition. This experience allowed me to explore cutting-edge AI technologies for content creation while refining my video production skills. I also played a key role in producing award ceremony videos and developing engaging social media marketing animations for platforms like Instagram and LinkedIn.",
      "Beyond my professional endeavors, I cultivate creativity through music composition and sketching, while maintaining physical discipline through regular fitness training and weekly kickboxing sessions. I pride myself on effective leadership, meticulous planning, and a collaborative approach to teamwork. My problem-solving mindset and commitment to excellence drive me to approach each challenge with thoughtfulness and determination, always focused on achieving meaningful outcomes and realizing ambitious visions.",
    ],
    cv: "CV",
    education: "EDUCATION",
    workExperience: "WORK EXPERIENCE",
    internships: "INTERNSHIPS",
    languages: "LANGUAGES",
    skills: "SKILLS & ATTRIBUTES",
    skillsCategories: {
      design: {
        title: "Design",
        content: "UI/UX, Product Design, Exhibition Design",
      },
      technical: {
        title: "Technical",
        content: "Prototyping, IoT Development, Sensor Integration",
      },
      software: {
        title: "Software",
        content: "Adobe Creative Suite, Figma, Sketch",
      },
      soft: {
        title: "Soft Skills",
        content: "Leadership, Team Collaboration, Problem-solving",
      },
      personal: {
        title: "Personal",
        content: "Disciplined, Courteous, Creative",
      },
      interests: {
        title: "Interests",
        content: "Sports, Design Studies, Music, Art",
      },
    },
    educationItems: {
      master: {
        title: "Master of Arts in Strategic Design",
        period: "2024 - Present",
        institution: "Hochschule für Gestaltung, Schwäbisch Gmünd",
        note: "Currently in 1st semester",
      },
      bachelor: {
        title: "Bachelor of Arts in Internet of Things, Design of Networked Systems",
        period: "2020 - 2024",
        institution: "Hochschule für Gestaltung, Schwäbisch Gmünd",
      },
      ib: {
        title: "IB International Bund Vocational Schools",
        period: "2017 - 2019",
        institution: "Reutlingen",
      },
      school: {
        title: "Freie Georgenschule",
        period: "2003 - 2017",
        institution: "Reutlingen",
      },
    },
    workItems: {
      boschSensor: {
        title: "UI/UX Designer",
        period: "2023",
        company: "Bosch Sensor-Tech",
      },
      simple: {
        title: "Exhibition Designer",
        period: "2023/24",
        company: "Simple GmbH, Cologne",
      },
      bosch2021: {
        title: "Logistics Specialist",
        period: "2021",
        company: "Robert Bosch GmbH",
      },
      bosch2019: {
        title: "Logistics Specialist",
        period: "2019",
        company: "Robert Bosch GmbH",
      },
      mercedes: {
        title: "Logistics Specialist",
        period: "2020",
        company: "Mercedes Benz",
      },
    },
    internshipItems: {
      simple: {
        title: "Exhibition Design Intern",
        period: "2023/24",
        company: "Simple GmbH, Cologne",
        description: "Content creation, exhibition design, and multimedia production",
      },
      bosch: {
        title: "Mechatronics Intern",
        period: "2013",
        company: "Robert Bosch GmbH",
      },
      disability: {
        title: "Disability Care Intern",
        period: "2014",
        company: "Disability Care Herrenberg",
      },
      fuchsfarm: {
        title: "Agricultural Intern",
        period: "2012",
        company: "Fuchsfarm in Albstadt",
      },
      helchenhof: {
        title: "Agricultural Intern",
        period: "2011",
        company: "Helchenhof in Überlingen",
      },
    },
    languageItems: {
      german: {
        name: "German",
        level: "Native proficiency",
      },
      turkish: {
        name: "Turkish",
        level: "Native proficiency",
      },
      english: {
        name: "English",
        level: "Professional proficiency",
      },
      french: {
        name: "French",
        level: "Elementary proficiency",
      },
      spanish: {
        name: "Spanish",
        level: "Elementary proficiency",
      },
    },
  },
}

// Übersetzungen für Kontakt
const contactTranslations = {
  de: {
    title: "KONTAKT",
    subtitle: "Ich freue mich auf Ihre Nachricht und neue Herausforderungen",
    contactInfo: "Kontaktinformationen",
    email: "Email",
    phone: "Telefon",
    address: "Adresse",
    availability: "Verfügbarkeit",
    availabilityText:
      "Ich bin offen für Projektanfragen, Kooperationen und neue berufliche Herausforderungen. Zögern Sie nicht, mich zu kontaktieren!",
    sendMessage: "Nachricht senden",
    name: "Name",
    namePlaceholder: "Ihr Name",
    emailPlaceholder: "Ihre Email-Adresse",
    message: "Nachricht",
    messagePlaceholder: "Ihre Nachricht",
    sendButton: "Nachricht senden",
    successMessage: "Nachricht erfolgreich gesendet!",
    errorMessage: "Ein Fehler ist aufgetreten.",
  },
  en: {
    title: "CONTACT",
    subtitle: "I look forward to your message and new challenges",
    contactInfo: "Contact Information",
    email: "Email",
    phone: "Phone",
    address: "Address",
    availability: "Availability",
    availabilityText:
      "I am open to project inquiries, collaborations, and new professional challenges. Don't hesitate to contact me!",
    sendMessage: "Send Message",
    name: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email address",
    message: "Message",
    messagePlaceholder: "Your message",
    sendButton: "Send Message",
    successMessage: "Message sent successfully!",
    errorMessage: "An error occurred.",
  },
}
