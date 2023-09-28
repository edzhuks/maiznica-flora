const isPositiveInteger = (str) => {
  return str >>> 0 === parseFloat(str)
}

module.exports = { isPositiveInteger }
