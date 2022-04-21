

export const SaveData = (key:string,value:Object) =>{
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


		//Save data to LocalStorage
		// SaveData("data__search", {
		// 	data: {
		// 		search_txt: text,
		// 		date_search: Date.now(),
		// 		res: {
		// 			films,
		// 			planets,
		// 			characters,
		// 			starships,
		// 		},
		// 	},
		// });