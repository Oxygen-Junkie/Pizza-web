export const getDigits = (number: string) => {
  return number.replace(/\D/g, '')
}

export const checkPhone = (number: string) => {
  number = getDigits(number)!
  if (number.length === 11 && number.charAt(0).match('7'))
    return true

  else
    return false
}
