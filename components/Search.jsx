import {useCollection} from "react-firebase-hooks/firestore"
import firebase from "../firebase/db";
import styles from "../styles/Search.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useRef,useState} from 'react'
const Search = () => {
//  const[filmsList,filmLoading,filmError]= useCollection(firebase.firestore().collection("films"),{})

// if(!filmLoading && filmsList){
// console.log(filmsList)
   
// }
// if(filmError){
//     console.log(filmError.message)
// }

const refInput = useRef();

const [searchFilms,setSearchFilms] = useState([]);
 
const SearchContent = async (text)=>{
console.log(text)

let films = []

const querySnapshot = await firebase.firestore()
.collection('films')
.where("title","==", text)
.get();


querySnapshot.forEach(function (doc) {
    films.push({
    data: doc.data(),
  })
})

setSearchFilms(films)
console.log(searchFilms)

}

  return (
    <header className={styles.headerWrapper}>
      {searchFilms?.map(item=>(
          <div>{item.data.title} - {item.data.release_date} </div> 
      ))}
        <div className={styles.container}>
            <div className={styles.inputSearchWrapper}>
                <div className={styles.search_box}>
                    <input className={styles.search_txt} ref={refInput} type="text" name=""  placeholder="Type to search"/>
                    <a className={styles.search_btn} onClick={()=>SearchContent(refInput.current?.value)}><FontAwesomeIcon icon={faSearch}  style={{ fontSize:26, color: "#DC3545" }}/></a>
                </div>
            </div>
        </div>

    </header>
  )
}


export default Search;