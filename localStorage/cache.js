

export const SaveData = (key,value) =>{

    let data = []
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
        
        if(Array.isArray(data)) {
            data.push(value)
            localStorage.setItem(key,JSON.stringify(data)) 
        }
           else  localStorage.setItem(key,JSON.stringify(value));
  
        
    }
    else localStorage.setItem(key,JSON.stringify(value));
}