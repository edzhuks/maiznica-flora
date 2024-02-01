const isPositiveInteger = (str) => {
  return str >>> 0 === parseFloat(str)
}
const isInteger = (str) => {
  return /^-?\d+$/.test(str)
}
const centsToEuro = (cents) => {
  const euros = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  })
  return euros.format(cents / 100)
}

const getPrice = (item) => {
  if (
    item.product.discount &&
    Date.parse(item.product.discount.startDate) <= new Date() &&
    Date.parse(item.product.discount.endDate) >= new Date()
  ) {
    return item.product.discount.discountPrice
  } else if (
    item.product.bulkThreshold &&
    item.product.bulkThreshold <= item.quantity
  ) {
    return item.product.bulkPrice
  }
  return item.product.price
}
const deliveryCosts = {
  bakery: 0,
  pickupPoint: 330,
  courrier: 599,
}
const thresholds = {
  bakery: undefined,
  pickupPoint: 2500,
  courrier: undefined,
}
const getDeliveryCost = (total, deliveryMethod) => {
  if (thresholds[deliveryMethod]) {
    if (total >= thresholds[deliveryMethod]) {
      return 0
    } else {
      return deliveryCosts[deliveryMethod]
    }
  } else {
    return deliveryCosts[deliveryMethod]
  }
}
const getSubtotal = (content) => {
  return content
    .map((i) => getPrice(i) * i.quantity)
    .reduce((acc, cur) => acc + cur, 0)
}
const gramsToKilos = (grams) => {
  const kilos = new Intl.NumberFormat('en-EU', {
    minimumFractionDigits: 1,
  })
  return grams < 1000 ? `${grams}g` : `${kilos.format(grams / 1000)}kg`
}
const escapeHTML = (s) => {
  if (!s) {
    return ''
  }
  let lookup = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
    '<': '&lt;',
    '>': '&gt;',
  }
  return s.replaceAll(/[&"'<>]/g, (c) => lookup[c])
}
const formatDate = (date) => {
  const formatterFull = new Intl.DateTimeFormat('lv-LV', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return formatterFull.format(date)
}

const makeOrderID = () => {
  const formatterFull = new Intl.DateTimeFormat('lv-LV', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const parts = formatterFull.formatToParts(new Date())
  return `${parts[4].value}${parts[0].value}${parts[2].value}-${Math.floor(
    Math.random() * (10000000 - 1000000) + 1000000
  )}`
}

const toEnglishAlphabet = (text) => {
  return text
    .replaceAll('ā', 'a')
    .replaceAll('č', 'c')
    .replaceAll('ē', 'e')
    .replaceAll('ģ', 'g')
    .replaceAll('ļ', 'l')
    .replaceAll('ķ', 'k')
    .replaceAll('ī', 'i')
    .replaceAll('ņ', 'n')
    .replaceAll('š', 's')
    .replaceAll('ū', 'u')
    .replaceAll('ž', 'z')
    .replaceAll('ŗ', 'r')
    .replaceAll('Ā', 'A')
    .replaceAll('Č', 'C')
    .replaceAll('Ē', 'E')
    .replaceAll('Ģ', 'G')
    .replaceAll('Ļ', 'L')
    .replaceAll('Ķ', 'K')
    .replaceAll('Ī', 'I')
    .replaceAll('Ņ', 'N')
    .replaceAll('Š', 'S')
    .replaceAll('Ū', 'U')
    .replaceAll('Ž', 'Z')
    .replaceAll('Ŗ', 'R')
}

module.exports = {
  isPositiveInteger,
  centsToEuro,
  getPrice,
  gramsToKilos,
  isInteger,
  formatDate,
  escapeHTML,
  makeOrderID,
  getDeliveryCost,
  getSubtotal,
  toEnglishAlphabet,
}
