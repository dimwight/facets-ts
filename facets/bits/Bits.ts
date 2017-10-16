export function traceThing(msg:string, thing) {
  if(msg.charAt(0)!='^')
    console.info((true?'':'Facets') + msg, JSON.stringify(thing, true ? null : (key, value) => {
      console.log(key)
      return value
    }, 1))
}
export function swapArrayElement(a: any[], index: number, down: boolean) {
  traceThing('^swapArrayElement', { index: index, down: down })
  let lowerFrom = down?index:index+1, upperFrom = down?index-1:index;
  let lowerTo = down ? index-1 : index,upperTo = down ? index : index+1;
  traceThing('^swapArrayElement', { lowerFrom: lowerFrom, upperFrom: upperFrom,
     lowerTo: lowerTo, upperTo: upperTo })
  let top = a.slice(0, lowerTo), tail = a.slice(upperTo+1),
    shifted = top.concat(a[lowerFrom],a[upperFrom],tail)
  traceThing('swapArrayElement~', false?{top:top,tail:tail}:shifted)
}