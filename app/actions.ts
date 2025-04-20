"use server"

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validierung
  if (!name || !email || !message) {
    return { error: "Alle Felder müssen ausgefüllt sein." }
  }

  try {
    // In einer echten Anwendung würde hier ein E-Mail-Service wie Nodemailer, SendGrid, etc. verwendet werden
    // Für dieses Beispiel simulieren wir einen erfolgreichen Versand
    console.log("E-Mail gesendet an: enissentuerk@hotmail.de")
    console.log("Von:", name, email)
    console.log("Nachricht:", message)

    // In einer echten Anwendung würde hier der E-Mail-Versand stattfinden
    // await sendEmailWithService(name, email, message, 'enissentuerk@hotmail.de')

    return { success: true }
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error)
    return { error: "Beim Senden der Nachricht ist ein Fehler aufgetreten." }
  }
}
