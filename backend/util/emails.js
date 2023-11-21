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
} = require('./functions')

const verificationEmailHtml = (link) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      http-equiv="x-ua-compatible"
      content="ie=edge" />
    <title>Email Confirmation</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
    <style type="text/css">
      /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
              format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
              format('woff');
        }
      }
      /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
      /**
   * Remove extra space added to tables and cells in Outlook.
   */
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
      /**
   * Better fluid images in Internet Explorer.
   */
      img {
        -ms-interpolation-mode: bicubic;
      }
      /**
   * Remove blue links for iOS devices.
   */
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
      /**
   * Fix centering issues in Android 4.4.
   */
      div[style*='margin: 16px 0;'] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      /**
   * Collapse table borders to avoid space between cells.
   */
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
    </style>
  </head>
  <body style="background-color: #e9ecef">
    <!-- start preheader -->
    <div
      class="preheader"
      style="
        display: none;
        max-width: 0;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        line-height: 1px;
        color: #fff;
        opacity: 0;
      ">
      Follow the instructions to verify your email address.
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%">
      <!-- start logo -->
      <tr>
        <td
          align="center"
          bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
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
                  href="https://maiznica-flora.onrender.com"
                  target="_blank"
                  style="display: inline-block">
                  <img
                    src="https://maiznica.lv/wp-content/themes/maiznica/img/logo.png"
                    alt="Logo"
                    border="0"
                    width="48"
                    style="
                      display: block;
                      width: 48px;
                      max-width: 48px;
                      min-width: 48px;
                    " />
                </a>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
      <!-- end logo -->

      <!-- start hero -->
      <tr>
        <td
          align="center"
          bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px">
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 36px 24px 0;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  border-top: 3px solid #d4dadf;
                ">
                <h1
                  style="
                    margin: 0;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    line-height: 48px;
                  ">
                  Confirm Your Email Address
                </h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
      <!-- end hero -->

      <!-- start copy block -->
      <tr>
        <td
          align="center"
          bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
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
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                ">
                <p style="margin: 0">
                  Tap the button below to confirm your email address. If you
                  didn't create an account with
                  <a href="https://maiznica-flora.onrender.com/"
                    >Maiznica Flora</a
                  >, you can safely delete this email.
                </p>
              </td>
            </tr>
            <!-- end copy -->

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
                            bgcolor="#1a82e2"
                            style="border-radius: 6px">
                            <a
                              href="${link}"
                              target="_blank"
                              style="
                                display: inline-block;
                                padding: 16px 36px;
                                font-family: 'Source Sans Pro', Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 6px;
                              "
                              >Verify Email</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end button -->

            <!-- start copy -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                ">
                <p style="margin: 0">
                  If that doesn't work, copy and paste the following link in
                  your browser:
                </p>
                <p style="margin: 0; font-size:12px;">
                  <a
                    href="${link}"
                    target="_blank"
                    >${link}</a
                  >
                </p>
              </td>
            </tr>
            <!-- end copy -->
          </table>
          <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
      <!-- end copy block -->
      <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          
          <!-- start unsubscribe -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            </td>
          </tr>
          <!-- end unsubscribe -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->
    </table>
    <!-- end body -->
  </body>
</html>
`
}
const resetEmailHtml = (link) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      http-equiv="x-ua-compatible"
      content="ie=edge" />
    <title>Email Confirmation</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
    <style type="text/css">
      /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
              format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
              format('woff');
        }
      }
      /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
      /**
   * Remove extra space added to tables and cells in Outlook.
   */
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
      /**
   * Better fluid images in Internet Explorer.
   */
      img {
        -ms-interpolation-mode: bicubic;
      }
      /**
   * Remove blue links for iOS devices.
   */
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
      /**
   * Fix centering issues in Android 4.4.
   */
      div[style*='margin: 16px 0;'] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      /**
   * Collapse table borders to avoid space between cells.
   */
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
    </style>
  </head>
  <body style="background-color: #e9ecef">
    <!-- start preheader -->
    <div
      class="preheader"
      style="
        display: none;
        max-width: 0;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        line-height: 1px;
        color: #fff;
        opacity: 0;
      ">
      Follow the instructions to reset your password.
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%">
      <!-- start logo -->
      <tr>
        <td
          align="center"
          bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
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
                  href="https://maiznica-flora.onrender.com"
                  target="_blank"
                  style="display: inline-block">
                  <img
                    src="https://maiznica.lv/wp-content/themes/maiznica/img/logo.png"
                    alt="Logo"
                    border="0"
                    width="48"
                    style="
                      display: block;
                      width: 48px;
                      max-width: 48px;
                      min-width: 48px;
                    " />
                </a>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
      <!-- end logo -->

      <!-- start hero -->
      <tr>
        <td
          align="center"
          bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px">
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 36px 24px 0;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  border-top: 3px solid #d4dadf;
                ">
                <h1
                  style="
                    margin: 0;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    line-height: 48px;
                  ">
                  Reset your password
                </h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
      <!-- end hero -->

      <!-- start copy block -->
      <tr>
        <td
          align="center"
          bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
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
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                ">
                <p style="margin: 0">
                  Tap the button below to reset your password. If you
                  did not initiate a password reset on 
                  <a href="https://maiznica-flora.onrender.com/"
                    >Maiznica Flora</a
                  >, you can delete this email.
                </p>
              </td>
            </tr>
            <!-- end copy -->

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
                            bgcolor="#1a82e2"
                            style="border-radius: 6px">
                            <a
                              href="${link}"
                              target="_blank"
                              style="
                                display: inline-block;
                                padding: 16px 36px;
                                font-family: 'Source Sans Pro', Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 6px;
                              "
                              >Reset password</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end button -->

            <!-- start copy -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                ">
                <p style="margin: 0">
                  If that doesn't work, copy and paste the following link in
                  your browser:
                </p>
                <p style="margin: 0; font-size:12px;">
                  <a
                    href="${link}"
                    target="_blank"
                    >${link}</a
                  >
                </p>
              </td>
            </tr>
            <!-- end copy -->
          </table>
          <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
      <!-- end copy block -->
      <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          
          <!-- start unsubscribe -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            </td>
          </tr>
          <!-- end unsubscribe -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->
    </table>
    <!-- end body -->
  </body>
</html>
`
}
const receiptEmail = (order) => {
  return `
  <!--

Follow me on
Dribbble: https://dribbble.com/supahfunk
Twitter: https://twitter.com/supahfunk
Codepen: https://codepen.io/supah/

-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> Order confirmation </title>
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width; initial-scale=1.0;" />
<style type="text/css">
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
  body { margin: 0; padding: 0; background: #eeeeee; }
  div, p, a, li, td { -webkit-text-size-adjust: none; }
  .ReadMsgBody { width: 100%; background-color: #ffffff; }
  .ExternalClass { width: 100%; background-color: #ffffff; }
  body { width: 100%; height: 100%; background-color: #eeeeee; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  html { width: 100%; }
  p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
  // .visibleMobile { display: none; }
  // .hiddenMobile { display: block; }

  // @media only screen and (max-width: 600px) {
  // body { width: auto !important; }
  // table[class=fullTable] { width: 96% !important; clear: both; }
  // table[class=fullPadding] { width: 85% !important; clear: both; }
  // table[class=col] { width: 45% !important; }
  // .erase { display: none; }
  // }

  // @media only screen and (max-width: 420px) {
  // table[class=fullTable] { width: 100% !important; clear: both; }
  // table[class=fullPadding] { width: 85% !important; clear: both; }
  // table[class=col] { width: 100% !important; clear: both; }
  // table[class=col] td { text-align: left !important; }
  // .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
  // .visibleMobile { display: block !important; }
  // .hiddenMobile { display: none !important; }
  // }
</style>


<!-- Header -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#eeeeee">
  <tr>
    <td height="20"></td>
  </tr>
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
        <tr >
          <td height="70"></td>
        </tr>

        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td colspan="1">
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                      <tbody>
                        <tr>
                          <td align="left"> <img src="https://maiznica.lv/wp-content/themes/maiznica/img/logo.png" width="32" height="32" alt="logo" border="0" /></td>
                        </tr>
                        <tr >
                          <td height="60"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                            Paldies, ka iepirkāties Maiznīcas Flora internetveikalā!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </td>
                    <td colspan="3">
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                      <tbody>
                        
                        <tr>
                          <td style="font-size: 21px; color: #45941e; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                            Rēķins
                          </td>
                        </tr>
                        <tr>
                        <tr >
                          <td height="60"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                            <small>Pasūtījums</small> #${order._id}<br />
                            <small>${order.datePlaced}</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr >
                          <td height="60"></td>
                        </tr>
                    <tr>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                        Produkts
                      </th>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
                       Cena
                      </th>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                        Skaits
                      </th>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                        Summa
                      </th>
                    </tr>
                    <tr>
                      <td height="1" style="background: #bebebe;" colspan="4"></td>
                    </tr>
                    <tr>
                      <td height="10" colspan="4"></td>
                    </tr>
                    ${order.content
                      .map(
                        (item) => `
                      <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #45941e;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article">
                        ${item.product.name.lv} ${gramsToKilos(
                          item.product.weight
                        )}
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;">${centsToEuro(
                        getPrice(item)
                      )}</td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="center">${
                        item.quantity
                      }</td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">${centsToEuro(
                        getPrice(item) * item.quantity
                      )}</td>
                    </tr>
                    <tr>
                      <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                    </tr>`
                      )
                      .join('')}
                   
                  
                  
                    <tr>
                    <td rowspan="4"></td>
                      <td colspan="2" style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        Starpsumma
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                        ${centsToEuro(order.subtotal)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                       Piegāde
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        ${centsToEuro(order.deliveryCost)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong>Pavisam kopā (ar PVN)</strong>
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong>${centsToEuro(order.total)}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right; "><small>PVN</small></td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right; ">
                        <small>${centsToEuro(order.vat)}</small>
                      </td>
                    </tr>
                  
                   
                    <tr>
                      <td colspan="4">
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr >
                               <td height="60"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>Piegādes adrese</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                              ${(() => {
                                                switch (order.deliveryMethod) {
                                                  case 'courrier':
                                                    return ` ${escapeHTML(
                                                      order.courrierAddress.name
                                                    )}
                                                                  ${escapeHTML(
                                                                    order
                                                                      .courrierAddress
                                                                      .surname
                                                                  )}<br>
                                                                  ${escapeHTML(
                                                                    order
                                                                      .courrierAddress
                                                                      .phone
                                                                  )}<br>
                                                                  ${escapeHTML(
                                                                    order
                                                                      .courrierAddress
                                                                      .street
                                                                  )} 
                                                                  ${escapeHTML(
                                                                    order
                                                                      .courrierAddress
                                                                      .house
                                                                  )}-${escapeHTML(
                                                      order.courrierAddress
                                                        .apartment
                                                    )}<br>
                                                                  ${escapeHTML(
                                                                    order
                                                                      .courrierAddress
                                                                      .city
                                                                  )}`
                                                  case 'bakery':
                                                    return `Ražotne: Vecvaltes<br>
                                                        Krimuldas pagasts,
                                                      <br>
                                                      Siguldas novads<br>Latvija, LV-2144
                                                      <br>
                                                      Reģ nr. 50003251341
                                                      <br>
                                                      Tālrunis: +371 67521291
                                                    <br>
                                                      E-pasts: flora@maiznica.lv`
                                                  case 'pickupPoint':
                                                    return ` ${escapeHTML(
                                                      order.pickupPointData.name
                                                    )}
                                                                  ${escapeHTML(
                                                                    order
                                                                      .pickupPointData
                                                                      .surname
                                                                  )}<br>
                                                                  ${escapeHTML(
                                                                    order
                                                                      .pickupPointData
                                                                      .phone
                                                                  )}<br>
                                                                  ${escapeHTML(
                                                                    order
                                                                      .pickupPointData
                                                                      .id
                                                                  )} 
                                                                  `
                                                }
                                              })()} 
                               
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        


                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr >
                              <td height="60"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>Piegādes veids</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
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
                    <tr>
                    <td>
                    ${
                      order.businessComments
                        ? `<table width="120" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr >
                               <td height="60"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>Pasūtītāja rekvizīti</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    ${order.businessComments}
                              </td>
                            </tr>
                          </tbody>
                        </table>`
                        : ''
                    }
                    ${
                      order.generalComments
                        ? `<table width="120" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr >
                               <td height="60"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>Komentāri</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    ${order.generalComments}
                              </td>
                            </tr>
                          </tbody>
                        </table>`
                        : ''
                    }
                    ${
                      order.deliveryComments
                        ? `<table width="120" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr >
                               <td height="60"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>Piegādes komentāri</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    ${order.deliveryComments}
                              </td>
                            </tr>
                          </tbody>
                        </table>`
                        : ''
                    }
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
  </tbody>
</table>
<!-- /Information -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#eeeeee">

  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
      <tr class="spacer">
          <td height="50"></td>
        </tr>  
      <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                    ${`${FRONTEND_URL}/orders/${order._id}`}
                  </td>
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
</table>`
}
const sendEmail = (email, { subject, text, html }) => {
  var smtpTransport = nodemailer.createTransport({
    host: EMAIL_HOST,
    auth: {
      user: EMAIL_NAME,
      pass: EMAIL_PASSWORD,
    },
  })
  var mailOptions = {
    from: 'noreply@maiznica.lv',
    to: email,
    subject: subject,
    text: text,
    html: html,
  }
  return smtpTransport.sendMail(mailOptions)
}

const sendVerificationEmail = (email, token) => {
  return sendEmail(email, {
    subject: 'Apstipriniet e-pastu',
    text: `verify your email by clicking the link below</br>${BACKEND_URL}/api/users/verifyEmail/${token}`,
    html: verificationEmailHtml(
      `${BACKEND_URL}/api/users/verifyEmail/${token}`
    ),
  })
}
const sendResetEmail = (email, token) => {
  return sendEmail(email, {
    subject: 'Password reset',
    text: `Reset your password by clicking the link below</br>${FRONTEND_URL}/finish_reset_password/?token=${token}`,
    html: resetEmailHtml(
      `${FRONTEND_URL}/finish_reset_password/?token=${token}`
    ),
  })
}
const sendContactFormEmail = (email, name, message) => {
  return sendEmail(email, {
    subject: 'Jauns epasts no saziņas formas',
    text: `No: ${name}\nE-pasts: ${email}\nZiņa: ${message}`,
  })
}
const sendContactFormConfirmEmail = (email, name, message) => {
  return sendEmail(email, {
    subject: 'Jūs noosūtījāt ziņu maiznīcai Flora',
    text: `No: ${name}\nE-pasts: ${email}\nZiņa: ${message}`,
  })
}
const sendContactFormFailedEmail = (email, message) => {
  return sendEmail(email, {
    subject: 'Jūsu nosūtītā ziņa netika saņemta',
    text: `Jūsu nosūtītā ziņa netika saņemta, lūdzu sazinieties ar mums pa epastu.\nZiņa:${message}`,
  })
}
const sendReceiptEmail = (email, order) => {
  return sendEmail(email, {
    subject: 'Maiznīcas Flora internetveikala rēķins',
    text: `Paldies, ka iepirkāties Maiznīcas Flora internetveikalā!\nPasūtījums #${
      order._id
    }\n${order.datePlaced}\n${order.content
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
    }\nApskatīt sūtījumu: ${`${FRONTEND_URL}/orders/${order._id}`}
   }`,
    html: receiptEmail(order),
  })
}

module.exports = {
  sendVerificationEmail,
  sendResetEmail,
  sendReceiptEmail,
  sendContactFormConfirmEmail,
  sendContactFormEmail,
  sendContactFormFailedEmail,
}
