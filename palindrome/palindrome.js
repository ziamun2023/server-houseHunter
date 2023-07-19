function isPalindrome(str) {
 
  const cleanedString = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  const length = cleanedString.length;
  for (let i = 0; i < Math.floor(length / 2); i++) {
    if (cleanedString[i] !== cleanedString[length - 1 - i]) {
      return false;
    }
  }
  return true;
}
console.log(isPalindrome("hehhw"))

