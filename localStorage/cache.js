

export const SaveData = (key,value) =>{
try{
    let data = []

    localStorage.getItem(key) && (data = JSON.parse(localStorage.getItem(key)))
    data.push(value) 
    localStorage.setItem(key,JSON.stringify(data)) 
    console.log(data)
    
}catch(e){

    console.error(e)
}

}