export function trace(msg, thing){
  console.info('Facets'+msg,JSON.stringify(thing,false?null:(key,value)=>{
    console.log(key)
    return value
  },1))
}