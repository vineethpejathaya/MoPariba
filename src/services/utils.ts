export function GetInitialLetterOfString(str: string) {
  if (str) {
    const strArr = str.split(' ');
    if (strArr.length == 0) return '';
    const result = strArr?.map(item => item[0]).join('');
    return result;
  }

  return '';
}
