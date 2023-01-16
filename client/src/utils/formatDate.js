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
  let str = date
  ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
  : '';
    str = str.split(' ')
    if(str[0].startsWith("about")){
      str.shift()
      isDay= true
    }
    str.pop()


    if(isDay){
      if(String(str[1].startsWith("h"))){
      str[1] = "hr"
    }else if(String(str[1].startsWith("m"))){
      str[1] = "min"
    } else if(String(str[1].startsWith("s"))){
      str[1] = "secs ago"
    } 
    } else{
      str[1] = "d"
    }


    

  return str.join(' ')
 
}