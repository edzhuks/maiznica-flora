const {
  BACKEND_URL,
  EMAIL_PASS,
  FRONTEND_URL,
  EMAIL_HOST,
  EMAIL_NAME,
  EMAIL_PASSWORD,
} = require('./config')
const nodemailer = require('nodemailer')
const {
  getPrice,
  centsToEuro,
  gramsToKilos,
  escapeHTML,
  formatDate,
} = require('./functions')
const { basicEmailHtml, receiptEmail } = require('./email_templates')

const sendEmail = (email, { subject, text, html }) => {
  var smtpTransport = nodemailer.createTransport({
    host: EMAIL_HOST,
    auth: {
      user: EMAIL_NAME,
      pass: EMAIL_PASSWORD,
    },
  })
  var mailOptions = {
    from: EMAIL_NAME,
    to: email,
    bcc: EMAIL_NAME,
    subject: subject,
    text: text,
    html: html,
  }
  return smtpTransport.sendMail(mailOptions)
}

const sendVerificationEmail = (email, token) => {
  const link = `${BACKEND_URL}/api/users/verifyEmail/${token}`
  return sendEmail(email, {
    subject: 'Apstipriniet e-pastu',
    text: `verify your email by clicking the link below\n${link}`,
    html: basicEmailHtml({
      title: 'Apstiprini e-pasta adresi',
      content: ' Klikšķini, lai apstiprinātu šo e-pasta adresi.',
      action: {
        text: 'Apstiprināt e-pastu',
        link: `${BACKEND_URL}/api/users/verifyEmail/${token}`,
      },
      footer: `<p style="margin: 0">
                  Ja poga nestrādā, iekopē šo saiti savā pārlūkā:
                </p>
                <p style="margin: 0; font-size: 12px">
                  <a href="${link}">${link}</a>
                </p>`,
    }),
  })
}
const sendResetEmail = (email, token) => {
  const link = `${FRONTEND_URL}/finish_reset_password?token=${token}`
  return sendEmail(email, {
    subject: 'Password reset',
    text: `Reset your password by clicking the link below\n${link}`,
    html: basicEmailHtml({
      title: 'Izveido jaunu paroli',
      content: 'Klikšķini, lai izveidotu jaunu paroli.',
      action: {
        text: 'Izveidot jaunu paroli',
        link,
      },
      footer: `<p style="margin: 0">
                  Ja poga nestrādā, iekopē šo saiti savā pārlūkā:
                </p>
                <p style="margin: 0; font-size: 12px">
                  <a href="${link}">${link}</a>
                </p>`,
    }),
  })
}
const sendContactFormEmail = (businessEmails, name, message, email) => {
  return sendEmail(businessEmails, {
    subject: 'Jauns epasts no saziņas formas',
    text: `No: ${name}\nE-pasts: ${email}\nZiņa: ${message}`,
  })
}
const sendContactFormConfirmEmail = (email, name, message) => {
  return sendEmail(email, {
    subject: 'Jūs nosūtījāt ziņu Maiznīcai Flora',
    text: `No: ${name}\nE-pasts: ${email}\nZiņa: ${message}`,
    html: basicEmailHtml({
      title: 'Jūs nosūtījāt ziņu Maiznīcai Flora',
      content: message,
    }),
  })
}
const sendContactFormFailedEmail = (email, message) => {
  return sendEmail(email, {
    subject: 'Jūsu nosūtītā ziņa netika saņemta',
    text: `Jūsu nosūtītā ziņa netika saņemta, lūdzu sazinieties ar mums pa epastu.\nZiņa:${message}`,
  })
}
const sendReadyForPickupEmail = (email, message) => {
  return sendEmail(email, {
    subject: 'Jauna ziņa par pasūtījumu',
    text: message,
    html: basicEmailHtml({
      title: 'Jauna ziņa par jūsu pasūtījumu',
      content: message,
    }),
  })
}
const sendReceiptEmail = (email, order, orderURL) => {
  return sendEmail(email, {
    subject: 'Maiznīcas Flora internetveikala rēķins',
    text: `Paldies, ka iepirkāties Maiznīcas Flora internetveikalā!\nPasūtījums #${
      order.prettyID
    }\n${formatDate(order.datePlaced)}\n${order.content
      .map(
        (item) => `
          ${item.product.name.lv} ${gramsToKilos(
          item.product.weight
        )}\t${centsToEuro(getPrice(item))}\t${item.quantity}\t${centsToEuro(
          getPrice(item) * item.quantity
        )}`
      )
      .join('\n')}\nStarpsumma \t ${centsToEuro(
      order.subtotal
    )}\nPiegāde \t ${centsToEuro(
      order.deliveryCost
    )}\nPavisam kopā (ar PVN) \t ${centsToEuro(
      order.total
    )}\nPVN \t ${centsToEuro(order.vat)}\nPiegādes adrese\n${(() => {
      switch (order.deliveryMethod) {
        case 'courrier':
          return `${order.courrierAddress.name} ${
            order.courrierAddress.surname
          }\n${order.courrierAddress.phone}\n${order.courrierAddress.street} ${
            order.courrierAddress.house || ''
          }-${order.courrierAddress.apartment || ''}\n${
            order.courrierAddress.city
          }`
        case 'bakery':
          return `Ražotne: Vecvaltes\nKrimuldas pagasts,\nSiguldas novads\nLatvija, LV-2144\nReģ nr. 50003251341\nTālrunis: +371 67521291\nE-pasts: flora@maiznica.lv`
        case 'pickupPoint':
          return `${order.pickupPointData.name} ${order.pickupPointData.surname}\n${order.pickupPointData.phone}\n${order.pickupPointData.id} `
      }
    })()}\nPiegādes veids\n${(() => {
      switch (order.deliveryMethod) {
        case 'courrier':
          return 'Piegāde ar kurjeru'
        case 'bakery':
          return 'Saņemšana maiznīcā'
        case 'pickupPoint':
          return 'DPD pakomāts'
      }
    })()} \n${
      order.businessComments
        ? `Pasūtītāja rekvizīti: ${order.businessComments}`
        : ''
    }\n${order.generalComments ? `Komentāri: ${order.generalComments}` : ''}\n${
      order.deliveryComments
        ? `Piegādes komentāri: ${order.deliveryComments}`
        : ''
    }\nApskatīt sūtījumu: ${orderURL}
   `,
    html: receiptEmail(order, orderURL),
  })
}

module.exports = {
  sendVerificationEmail,
  sendResetEmail,
  sendReceiptEmail,
  sendContactFormConfirmEmail,
  sendContactFormEmail,
  sendContactFormFailedEmail,
  sendReadyForPickupEmail,
}
