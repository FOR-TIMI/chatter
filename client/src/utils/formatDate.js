import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatTime(date){
  let isDay = false
  let dateFormat = date
  ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
  : '';
    
    let str = dateFormat.split(' ')
    if(str[0].startsWith("about")){
      str.shift()
      isDay= true
    }
    str.pop()


    if(isDay){
      if(String(str[1].startsWith("h"))){
      str[1] = Number(str[0]) > 1 ? "hrs" : "hr"
    }else if(String(str[1].startsWith("m"))){
      str[1] = Number(str[0]) > 1 ? "mins" : "min"
    }
    return str.join(' ')
    } else{
      return dateFormat
    }


    

 
}