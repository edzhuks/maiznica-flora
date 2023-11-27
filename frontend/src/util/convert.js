import { useSelector } from 'react-redux'

const centsToEuro = (cents) => {
  const euros = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  })
  return euros.format(cents / 100)
}
const addVat = (cents) => {
  return cents * 1.21
}
const gramsToKilos = (grams) => {
  const kilos = new Intl.NumberFormat('en-EU', {
    minimumFractionDigits: 1,
  })
  return grams < 1000 ? `${grams}g` : `${kilos.format(grams / 1000)}kg`
}
const gramsToKilosSimple = (grams) => {
  const kilos = new Intl.NumberFormat('en-EU', {
    minimumFractionDigits: 1,
  })
  return kilos.format(grams / 1000)
}
const toEnglishAlphabet = (text) => {
  return text
    .replace('ā', 'a')
    .replace('č', 'c')
    .replace('ē', 'e')
    .replace('ģ', 'g')
    .replace('ļ', 'l')
    .replace('ķ', 'k')
    .replace('ī', 'i')
    .replace('ņ', 'n')
    .replace('š', 's')
    .replace('ū', 'u')
    .replace('ž', 'z')
    .replace('ŗ', 'r')
    .replace('Ā', 'A')
    .replace('Č', 'C')
    .replace('Ē', 'E')
    .replace('Ģ', 'G')
    .replace('Ļ', 'L')
    .replace('Ķ', 'K')
    .replace('Ī', 'I')
    .replace('Ņ', 'N')
    .replace('Š', 'S')
    .replace('Ū', 'U')
    .replace('Ž', 'Z')
    .replace('Ŗ', 'R')
}

const useDateTimeFormat = () => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)

  const formatter = new Intl.DateTimeFormat(
    selectedLang === 'lv' ? 'lv-LV' : selectedLang === 'en' ? 'en-GB' : 'de-DE',
    {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }
  )
  const formatterFull = new Intl.DateTimeFormat(
    selectedLang === 'lv' ? 'lv-LV' : selectedLang === 'en' ? 'en-GB' : 'de-DE',
    {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  )
  const format = (date) => {
    return formatter.format(date)
  }
  const formatFull = (date) => {
    return formatterFull.format(date)
  }
  return { format, formatFull }
}
const countProducts = (contents) => {
  return contents.reduce((acc, cur) => acc + cur.quantity, 0)
}
const calculateWeight = (contents) => {
  return contents.reduce(
    (acc, cur) => acc + cur.quantity * cur.product.weight,
    0
  )
}
export {
  centsToEuro,
  countProducts,
  calculateWeight,
  toEnglishAlphabet,
  gramsToKilos,
  addVat,
  useDateTimeFormat,
  gramsToKilosSimple,
}
