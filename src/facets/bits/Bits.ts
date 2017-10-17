/**
 * Simplifies instrumenting code
 * @param top heading for message 
 * @param thing suitable for JSON serialization
 */
export function traceThing(top:string, thing?) {

  // Allow for quick disable
  if(top.charAt(0)==='^')return;

  // Allow for callback eg to find and kill circular references
  const callback=false ? null : (key, value) => {
    if(false)console.log(key);
    return '|notifiable_|elements_|'.includes(key)?key:value;
  };
  
  // Construct body
  const tail=!thing?'':JSON.stringify(thing, callback, 1);
  
  // Issue complete message
  console.log(top, tail);
}
/** Swaps an array element with one of its neighbours. 
 * @param source the array to modify
 * @param index of the element to be swapped
 * @param down sets the direction of the swap
 */
export function swapArrayElement(source: any[], index, down) {
  /* 
  1. Define source indices of elements to be swapped.
  2. Define output indices to swap them to.
  3. Split the source array around the swap indices.
  4. Reassemble with the swapped elements.
  */

  //  Debug?
  traceThing('^swapArrayElement', { index: index, down: down });

  //  Guard against string!
  const indexNum=Number(index);

  // Define source and target indices
  const lowerFrom = down?indexNum:indexNum+1,
    upperFrom = down?indexNum-1:indexNum;
  const lowerTo = down ? indexNum-1 : indexNum,
    upperTo = down ? indexNum : indexNum+1;

  //  Check for out of bounds
  const names=['index','lowerFrom','upperFrom','lowerTo','upperTo'];
  [indexNum,lowerFrom,upperFrom,lowerTo,upperTo].forEach((n,at)=>{

      // Index out of bounds?
      if(n<0||n>=source.length)throw new Error(`Index out of range: ${names[at]}=${n}`);
    });

  //  Debug?
  traceThing('^swapArrayElement', { lowerFrom: lowerFrom, upperFrom: upperFrom,
     lowerTo: lowerTo, upperTo:upperTo });

  //  Define unaffected regions
  const top = source.slice(0, lowerTo), tail = source.slice(upperTo+1);

  // Assemble output
  const shifted = top.concat(source[lowerFrom],source[upperFrom],tail);

  //  Debug?
  traceThing('^swapArrayElement~', false?{top:top,tail:tail}:shifted);

  // Rebuild source
  source.splice(0,source.length,shifted);

  // Final check?
  traceThing('swapArrayElement~~', source);
}