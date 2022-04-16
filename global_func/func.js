 
export const checkEmptyList = (arrayCheck,currentArray) =>{

    let isRight = false;
    
      arrayCheck?.map(doc=>{
          
        if(currentArray?.includes(doc.data().url)){
            isRight = true;
              return true;
          }
            
        })
  
      if(isRight) return true;
        return false;
          
    }

export const checkId = (arrayCheck,id)=>{


    let isRight = false;
    
      arrayCheck?.map(doc=>{
          
        if(doc.data().url === id ){
            isRight = true;
              return true;
          }
            
        })
  
      if(isRight) return true;
        return false;
          
    
}


export const errorMessage = (text = "Not Found") => text;

export const RedirectToGoal = (router,path) => {
    router.push(path)
  }
  
  export async function get(id,collection,field,firebase){
    let docs = []
    
    const querySnapshot = await firebase.firestore()
    .collection(collection)
    .where(field,"==", id)
    .get();
  
    querySnapshot.forEach(function (doc) {
      docs.push({
        data: doc.data(),
      })
    })
  return docs;
  
  }

export async function SearchFirebase(textQuery,collection,orderBy,firebase){

  let QueryRes = [];

  const querySnapshot = await firebase.firestore()
  .collection(collection)
  .orderBy(orderBy)
  .startAt(textQuery.trim()).endAt(textQuery.trim() + '~')
  .get();
  
  querySnapshot.forEach(function (doc) {
    QueryRes.push({
    data: doc.data(),
  })
})

return  QueryRes

}