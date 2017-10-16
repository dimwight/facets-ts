export function traceThing(msg:string, thing) {
  if(msg.charAt(0)!='^')
    console.info((true?'':'Facets') + msg, JSON.stringify(thing, true ? null : (key, value) => {
      console.log(key)
      return value
    }, 1))
}
/** Swaps an array element with one of its neighbours. 
 * @param a the array
 * @param index of the element to be swap
 * @param down the direction of the swap
 */
export function swapArrayElement(a: any[], index: number, down: boolean) {
  traceThing('^swapArrayElement', { index: index, down: down })
  const lowerFrom = down?index:index+1, upperFrom = down?index-1:index,
   lowerTo = down ? index-1 : index,upperTo = down ? index : index+1;
  const names=['index','lowerFrom','upperFrom','lowerTo','upperTo'];
  [index,lowerFrom,upperFrom,lowerTo,upperTo].forEach((n,at)=>{
    if(n<0||n>=a.length)throw new Error(`Index out of range: ${names[at]}=${n}`)
  })
  traceThing('^swapArrayElement', { lowerFrom: lowerFrom, upperFrom: upperFrom,
     lowerTo: lowerTo, upperTo: upperTo })
    const top = a.slice(0, lowerTo), tail = a.slice(upperTo+1),
    shifted = top.concat(a[lowerFrom],a[upperFrom],tail);
  traceThing('^swapArrayElement~', false?{top:top,tail:tail}:shifted)
  a.splice(0,a.length,shifted);
  traceThing('swapArrayElement~~', a)
}