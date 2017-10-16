export function traceThing(msg, thing){
  console.info('Facets'+msg,JSON.stringify(thing,true?null:(key,value)=>{
    console.log(key)
    return value
  },1))
}
export function shiftArrayElement(a:any[],index:number,up:boolean){
  traceThing('shiftArrayElement',a)

  traceThing('shiftArrayElement~',a)
}