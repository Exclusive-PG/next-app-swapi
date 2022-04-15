import {useCollection} from "react-firebase-hooks/firestore"
import firebase from "../firebase/db";
import styles from "../styles/Search.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useRef,useState} from 'react'
const Search = () => {

const refInput = useRef();

const [searchFilms,setSearchFilms] = useState([]);
 
const SearchContent = async (text)=>{
console.log(text)

let films = []
let planets = []
const querySnapshot = await firebase.firestore()
.collection('films')
.orderBy('title')
.startAt(text).endAt(text + '~')
.get();

const querySnapshotPlanet = await firebase.firestore()
.collection('planets')
.where('name', '>=', text)
.where('name', '<=', text+ '\uf8ff')
.get();


querySnapshot.forEach(function (doc) {
    films.push({
    data: doc.data(),
  })
})

querySnapshotPlanet.forEach(function (doc) {
  planets.push({
  data: doc.data(),
})
})


setSearchFilms({films,planets})
console.log(searchFilms)

}

  return (
    <header className={styles.headerWrapper}>
      <div>Film</div> 
       {searchFilms?.films?.map(item=>(
          <div key={item.data.url}>{item.data.title} - {item.data.release_date} </div> 
      ))}
      <div>Planets</div>
      {searchFilms?.planets?.map(item=>(
          <div key={item.data.url}>{item.data.name} - {item.data.created} </div> 
      ))}

        <div className={styles.container}>
            <div className={styles.inputSearchWrapper}>
                <div className={styles.search_box}>
                    <input className={styles.search_txt} ref={refInput} type="text" name="" onChange={()=>SearchContent(refInput.current?.value)}  placeholder="Type to search"/>
                    <a className={styles.search_btn} onClick={()=>SearchContent(refInput.current?.value)}><FontAwesomeIcon icon={faSearch}  style={{ fontSize:26, color: "#DC3545" }}/></a>
                </div>
            </div>
        </div>

    </header>
  )
}


export default Search;