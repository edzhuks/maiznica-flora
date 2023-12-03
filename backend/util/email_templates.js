const {
  getPrice,
  centsToEuro,
  gramsToKilos,
  escapeHTML,
  formatDate,
} = require('./functions')

const basicEmailHtml = ({ title, content, action, footer }) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      http-equiv="x-ua-compatible"
      content="ie=edge" />
    <title>${title}</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        background: #eeeeee;
        font-family: 'Roboto', sans-serif;
        color: #eee !important;
      }
      div,
      p,
      a,
      li,
      td {
        -webkit-text-size-adjust: none;
      }

      body {
        width: 100%;
        height: 100%;
        background-color: #eeeeee;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        background-color: #eee;
      }
      html {
        width: 100%;
      }
      p {
        padding: 0 !important;
        margin-top: 0 !important;
        margin-right: 0 !important;
        margin-bottom: 0 !important;
        margin-left: 0 !important;
      }
      a {
        color: #45941e !important;
      }
    </style>
  </head>
  <body>
    <!-- start body -->
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      bgcolor="#eee">
      <!-- start logo -->
      <tr>
        <td align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px">
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 36px 24px">
                <a
                  href="https://www.maiznica.lv"
                  target="_blank"
                  style="display: inline-block">
                  <img
                    src="https://www.maiznica.lv/images/logo-lv.png"
                    alt="Logo"
                    border="0"
                    width="48"
                    style="
                      display: block;
                      width: 64px;
                      max-width: 64px;
                      min-width: 64px;
                    " />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- end logo -->

      <!-- start hero -->
      <tr>
        <td align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
            bgcolor="#eee">
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 36px 24px 0;
                  font-family: 'Roboto Slab', serif;
                  border-radius: 10px 10px 0 0;
                ">
                <h1
                  style="
                    margin: 0;
                    font-size: 28px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    line-height: 48px;
                  ">
                  ${title}
                </h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- end hero -->

      <!-- start copy block -->
      <tr>
        <td
          align="center"
          bgcolor="#eee">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px">
            <!-- start copy -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Roboto', sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                ">
                <p style="margin: 0;
  white-space: pre-line;
                ">${content}</p>
              </td>
            </tr>
            <!-- end copy -->

            ${
              action
                ? `
            <!-- start button -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%">
                  <tr>
                    <td
                      align="center"
                      bgcolor="#ffffff"
                      style="padding: 12px">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0">
                        <tr>
                          <td
                            align="center"
                            bgcolor="#45941e"
                            style="border-radius: 6px">
                            <a
                              href="${action.link}"
                              target="_blank"
                              style="
                                display: inline-block;
                                font-family: 'Roboto Slab', serif;
                                font-size: 16px;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 5px 10px;
                                border-radius: 2px;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                color: white !important;
                              "
                              >${action.text}</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end button -->`
                : ''
            }

           ${
             footer
               ? `<!-- start copy -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family:'Roboto' sans-serif;
                  font-size: 12px;
                  line-height: 24px;
                ">
                ${footer}
              </td>
            </tr>
            <!-- end copy -->`
               : ''
           }
          </table>
        </td>
      </tr>
      <!-- end copy block -->
    </table>
    <table
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      align="center"
      class="fullTable"
      bgcolor="#eeeeee">
      <tr>
        <td>
          <table
            width="600"
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            class="fullTable"
            bgcolor="#ffffff"
            style="border-radius: 0 0 10px 10px">
            <tr class="spacer">
              <td height="30"></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td height="20"></td>
      </tr>
    </table>
    <!-- end body -->
  </body>
</html>
`
}

const receiptEmail = (order, orderURL) => {
  return `
  <meta
  http-equiv="Content-Type"
  content="text/html; charset=utf-8" />
<title>Order confirmation</title>
<meta
  name="robots"
  content="noindex,nofollow" />
<meta
  name="viewport"
  content="width=device-width; initial-scale=1.0;" />
<style type="text/css">
  body {
    margin: 0;
    padding: 0;
    background: #eeeeee;
    font-family: 'Roboto', sans-serif;
  }
  div,
  p,
  a,
  li,
  td {
    -webkit-text-size-adjust: none;
  }

  body {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }
  html {
    width: 100%;
  }
  p {
    padding: 0 !important;
    margin-top: 0 !important;
    margin-right: 0 !important;
    margin-bottom: 0 !important;
    margin-left: 0 !important;
  }
</style>
<table
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  class="fullTable"
  bgcolor="#eeeeee">
  <tr>
    <td height="20"></td>
  </tr>
  <tr>
    <td>
      <table
        width="600"
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="center"
        class="fullTable"
        bgcolor="#ffffff"
        style="border-radius: 10px 10px 0 0">
        <tr>
          <td height="70"></td>
        </tr>

        <tr>
          <td>
            <table
              width="480"
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="fullPadding">
              <tbody>
                <tr>
                  <td colspan="1">
                    <table
                      width="220"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td align="left">
                            <img
                              src="https://www.maiznica.lv/images/logo-lv.png"
                              width="32"
                              height="32"
                              alt="logo"
                              border="0" />
                          </td>
                        </tr>
                        <tr>
                          <td height="60"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 12px;
                              color: #5b5b5b;
                              font-family: 'Open Sans', sans-serif;
                              line-height: 18px;
                              vertical-align: top;
                              text-align: left;
                            ">
                            Paldies, ka iepirkāties Maiznīcas Flora
                            internetveikalā!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td colspan="3">
                    <table
                      width="220"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="right"
                      class="col">
                      <tbody>
                        <tr>
                          <td
                            style="
                              font-size: 21px;
                              color: #45941e;
                              letter-spacing: -1px;
                              font-family: 'Open Sans', sans-serif;
                              line-height: 1;
                              vertical-align: top;
                              text-align: right;
                            ">
                            Rēķins
                          </td>
                        </tr>
                        <tr>
                          <td height="60"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 12px;
                              color: #5b5b5b;
                              font-family: 'Open Sans', sans-serif;
                              line-height: 18px;
                              vertical-align: top;
                              text-align: right;
                            ">
                            <small>Pasūtījums</small> #${order.prettyID}
                            <br />
                            <small>${formatDate(order.datePlaced)}</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td height="60"></td>
                </tr>
                <tr>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      font-weight: normal;
                      line-height: 1;
                      vertical-align: top;
                      padding: 0 10px 7px 0;
                    "
                    width="52%"
                    align="left">
                    Produkts
                  </th>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      font-weight: normal;
                      line-height: 1;
                      vertical-align: top;
                      padding: 0 0 7px;
                    "
                    align="left">
                    Cena
                  </th>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      font-weight: normal;
                      line-height: 1;
                      vertical-align: top;
                      padding: 0 0 7px;
                    "
                    align="center">
                    Skaits
                  </th>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #1e2b33;
                      font-weight: normal;
                      line-height: 1;
                      vertical-align: top;
                      padding: 0 0 7px;
                    "
                    align="right">
                    Summa
                  </th>
                </tr>
                <tr>
                  <td
                    height="1"
                    style="background: #bebebe"
                    colspan="4"></td>
                </tr>
                <tr>
                  <td
                    height="10"
                    colspan="4"></td>
                </tr>
                ${order.content
                  .map(
                    (item) => `
                <tr>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #45941e;
                      line-height: 18px;
                      vertical-align: top;
                      padding: 10px 0;
                    "
                    class="article">
                    ${item.product.name.lv} ${gramsToKilos(item.product.weight)}
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      line-height: 18px;
                      vertical-align: top;
                      padding: 10px 0;
                    ">
                    ${centsToEuro(getPrice(item))}
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      line-height: 18px;
                      vertical-align: top;
                      padding: 10px 0;
                    "
                    align="center">
                    ${item.quantity}
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #1e2b33;
                      line-height: 18px;
                      vertical-align: top;
                      padding: 10px 0;
                    "
                    align="right">
                    ${centsToEuro(getPrice(item) * item.quantity)}
                  </td>
                </tr>
                <tr>
                  <td
                    height="1"
                    colspan="4"
                    style="border-bottom: 1px solid #e4e4e4"></td>
                </tr>
                `
                  )
                  .join('')}
                <tr>
                  <td rowspan="4"></td>
                  <td
                    colspan="2"
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                    ">
                    Starpsumma
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                      white-space: nowrap;
                    "
                    width="80">
                    ${centsToEuro(order.subtotal)}
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                    ">
                    Piegāde
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                    ">
                    ${centsToEuro(order.deliveryCost)}
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                    ">
                    <strong>Pavisam kopā (ar PVN)</strong>
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                    ">
                    <strong>${centsToEuro(order.total)}</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #b0b0b0;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                    ">
                    <small>PVN</small>
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #b0b0b0;
                      line-height: 22px;
                      vertical-align: top;
                      text-align: right;
                    ">
                    <small>${centsToEuro(order.vat)}</small>
                  </td>
                </tr>
                <tr>
                  <td height="30"></td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    style="
                      font-size: 12px;
                      color: #5b5b5b;
                      font-family: 'Open Sans', sans-serif;
                      line-height: 18px;
                      vertical-align: top;
                      text-align: left;
                    ">
                    <p> Varat sekot savam pasūtījumam savā profilā:<br/>
                    <a href="${orderURL}">
                    ${orderURL}</a></p>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    ${
                      order.businessComments
                        ? `
                    <table
                      width="120"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td height="30"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 11px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 1;
                              vertical-align: top;
                            ">
                            <strong>Pasūtītāja rekvizīti</strong>
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="100%"
                            height="10"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 12px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 20px;
                              vertical-align: top;
                            ">
                            ${order.businessComments}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      width="40"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td height="20"></td>
                        </tr>
                      </tbody>
                    </table>
                    `
                        : ''
                    } ${
    order.generalComments
      ? `
                    <table
                      width="120"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td height="30"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 11px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 1;
                              vertical-align: top;
                            ">
                            <strong>Komentāri</strong>
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="100%"
                            height="10"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 12px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 20px;
                              vertical-align: top;
                            ">
                            ${order.generalComments}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      width="40"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td height="20"></td>
                        </tr>
                      </tbody>
                    </table>
                    `
      : ''
  } ${
    order.deliveryComments
      ? `
                    <table
                      width="120"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td height="30"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 11px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 1;
                              vertical-align: top;
                            ">
                            <strong>Piegādes komentāri</strong>
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="100%"
                            height="10"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 12px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 20px;
                              vertical-align: top;
                            ">
                            ${order.deliveryComments}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    `
      : ''
  }
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <table
                      width="220"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td height="30"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 11px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 1;
                              vertical-align: top;
                            ">
                            <strong>Piegādes adrese</strong>
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="100%"
                            height="10"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 12px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 20px;
                              vertical-align: top;
                            ">
                            ${(() => {
                              switch (order.deliveryMethod) {
                                case 'courrier':
                                  return ` ${escapeHTML(
                                    order.courrierAddress.name
                                  )} ${escapeHTML(
                                    order.courrierAddress.surname
                                  )}<br />
                            ${escapeHTML(order.courrierAddress.phone)}<br />
                            ${escapeHTML(order.courrierAddress.street)}
                            ${escapeHTML(
                              order.courrierAddress.house
                            )}-${escapeHTML(
                                    order.courrierAddress.apartment
                                  )}<br />
                            ${escapeHTML(order.courrierAddress.city)}`
                                case 'bakery':
                                  return `Ražotne: Vecvaltes<br />
                            Krimuldas pagasts,
                            <br />
                            Siguldas novads<br />Latvija, LV-2144
                            <br />
                            Reģ nr. 50003251341
                            <br />
                            Tālrunis: +371 67521291
                            <br />
                            E-pasts: flora@maiznica.lv`
                                case 'pickupPoint':
                                  return ` ${escapeHTML(
                                    order.pickupPointData.name
                                  )}
                            ${escapeHTML(order.pickupPointData.surname)}<br />
                            ${escapeHTML(order.pickupPointData.phone)}<br />
                            ${escapeHTML(order.pickupPointData.id)} `
                              }
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      width="220"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="left"
                      class="col">
                      <tbody>
                        <tr>
                          <td height="30"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 11px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 1;
                              vertical-align: top;
                            ">
                            <strong>Piegādes veids</strong>
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="100%"
                            height="10"></td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 12px;
                              font-family: 'Open Sans', sans-serif;
                              color: #5b5b5b;
                              line-height: 20px;
                              vertical-align: top;
                            ">
                            ${(() => {
                              switch (order.deliveryMethod) {
                                case 'courrier':
                                  return 'Piegāde ar kurjeru'
                                case 'bakery':
                                  return 'Saņemšana maiznīcā'
                                case 'pickupPoint':
                                  return 'DPD pakomāts'
                              }
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<table
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  class="fullTable"
  bgcolor="#eeeeee">
  <tr>
    <td>
      <table
        width="600"
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="center"
        class="fullTable"
        bgcolor="#ffffff"
        style="border-radius: 0 0 10px 10px">
        <tr class="spacer">
          <td height="50"></td>
        </tr>
        <tr>
          <td>
            <table
              width="480"
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="fullPadding">
              <tbody>
                <tr>
                  <td
                    style="
                      font-size: 12px;
                      color: #5b5b5b;
                      font-family: 'Open Sans', sans-serif;
                      line-height: 18px;
                      vertical-align: top;
                      text-align: left;
                    "></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="spacer">
          <td height="50"></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td height="20"></td>
  </tr>
</table>
`
}

module.exports = { basicEmailHtml, receiptEmail }
