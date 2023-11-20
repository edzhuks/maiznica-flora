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

export { centsToEuro, toEnglishAlphabet, gramsToKilos, addVat }
