import {useCollection} from "react-firebase-hooks/firestore"
import firebase from "../firebase/db";
import styles from "../styles/Search.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const Search = () => {
//  const[filmsList,filmLoading,filmError]= useCollection(firebase.firestore().collection("films"),{})

// if(!filmLoading && filmsList){
// console.log(filmsList)
   
// }
// if(filmError){
//     console.log(filmError.message)
// }
 
  return (
    <header className={styles.headerWrapper}>
      
        <div className={styles.container}>
            <div className={styles.inputSearchWrapper}>
                <div className={styles.search_box}>
                    <input className={styles.search_txt} type="text" name="" placeholder="Type to search"/>
                    <a className={styles.search_btn}><FontAwesomeIcon icon={faSearch}  style={{ fontSize:26, color: "#DC3545" }}/></a>
                </div>
            </div>
        </div>

    </header>
  )
}


export default Search;