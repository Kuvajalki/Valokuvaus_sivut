export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, service, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return { statusCode: 400, body: "Missing fields" };
    }

    // *** TÄRKEÄ ***
    // Vaihda tähän MailerSend domainisi "from:" osoite,
    // esim: noreply@trial-1234abcd.mlsender.net
    const FROM_EMAIL = "noreply@YOUR-MAILERSEND-DOMAIN.com";

    // *** MINNE POSTI LÄHETETÄÄN ***
    const TO_EMAIL = "sinun.sahkoposti@jokin.fi";

    const payload = {
      from: {
        email: FROM_EMAIL,
        name: "Kuvajälki yhteydenotto",
      },
      to: [
        {
          email: TO_EMAIL,
          name: "Kuvajälki",
        },
      ],
      subject: `Uusi yhteydenotto – ${name}`,
      text: `
Nimi: ${name}
Sähköposti: ${email}
Palvelu: ${service}

Viesti:
${message}
      `
    };

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("MailerSend error:", err);
      return { statusCode: 500, body: "MailerSend error" };
    }

    return { statusCode: 200, body: "OK" };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Server error" };
  }
}
