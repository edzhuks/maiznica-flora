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
  return s.replace(/[&"'<>]/g, (c) => lookup[c])
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

module.exports = {
  isPositiveInteger,
  centsToEuro,
  getPrice,
  gramsToKilos,
  isInteger,
  formatDate,
  escapeHTML,
  makeOrderID,
}
