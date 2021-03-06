export function toDirection(num) {
  switch (num) {
    case 0:
      return "N";
    case 1:
      return "W";
    case 2:
      return "S";
    case 3:
      return "E";
    default:
      return "N";
  }
}

export function checkWithinRange(a, b, r){
  return ((a*a+b*b)<=(r*r));
}