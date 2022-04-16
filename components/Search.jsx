import firebase from "../firebase/db";
import styles from "../styles/Search.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useRef,useState,useEffect} from 'react'
import { SearchFirebase } from "../global_func/func";
import  Link  from 'next/link';

const Search = () => {

const refInput = useRef();

const refInputActive = useRef();
const [searchFilms,setSearchFilms] = useState([]);

const [openSearchBar, setSearchBar] = useState(false)


const SearchContent = async (text = "")=>{
let films = await SearchFirebase(text,'films','title',firebase) || []
let planets =  await SearchFirebase(text,'planets','name',firebase) || []
let characters = await SearchFirebase(text,'characters','name',firebase) || []
let starships = await SearchFirebase(text,'starships','name',firebase) || []

setSearchFilms({films,planets,characters,starships})

}

console.log(openSearchBar)

  return (
    <header className={styles.headerWrapper}>


    <div className={!openSearchBar ? `${styles.SearchPopUp} ${styles.InactivePopUp}` : `${styles.SearchPopUp} ${styles.activePopUp}`}>
       <div className={styles.container}>
            <div className={styles.inputSearchWrapper}>
                <div className={`${styles.searchBoxPopUp}`}>
                    <input className={styles.search_txt} ref={refInputActive} type="text" name="" onChange={()=>SearchContent(refInputActive.current?.value)}  placeholder="Type to search"/>
                    <a className={styles.search_btn} onClick={()=>SearchContent(refInputActive.current?.value)}><FontAwesomeIcon icon={faSearch}  style={{ fontSize:26, color: "#DC3545" }}/></a>
                </div>
                <div className={styles.closeSearchPopup } onClick={()=>setSearchBar(false)}>
                <FontAwesomeIcon icon={faXmark} style={{ fontSize:50, color: "#DC3545" }}/>
                </div>
                
            </div>
        </div>  
      <div className={styles.WrapperTextContent}>
        <div className={styles.DataRenderSearch}>
            <div className={styles.elementSearching}>Films ({searchFilms?.films?.length ? searchFilms?.films?.length : "0"})</div> 
            {searchFilms?.films?.map(item=>(
                <Link href={`/films/${item.data.episode_id}`}  key={item.data.url}  ><div onClick={()=>setSearchBar(false)}>{item.data.title} ({item.data.release_date.split("-")[0]}) </div></Link> 
            ))}

            <div className={styles.elementSearching}>Planets ({searchFilms?.planets?.length ? searchFilms?.planets?.length : "0"})</div>
            {searchFilms?.planets?.map(item=>(
                <Link href={`/planets/${item.data.url}`} key={item.data.url} ><div onClick={()=>setSearchBar(false)}>{item.data.name} - {item.data.terrain} </div></Link>
            ))}

              <div className={styles.elementSearching}>Character ({searchFilms?.characters?.length ? searchFilms?.characters?.length : "0"})</div>
            {searchFilms?.characters?.map(item=>(
                <Link href={`/characters/${item.data.url}`} key={item.data.url} ><div onClick={()=>setSearchBar(false)}>{item.data.name} ({item.data.birth_year})</div></Link> 
            ))}
            
          <div className={styles.elementSearching}>Starships ({searchFilms?.starships?.length ? searchFilms?.starships?.length : "0"})</div>
            {searchFilms?.starships?.map(item=>(
                <Link href={`/starships/${item.data.url}`} key={item.data.url}  ><div onClick={()=>setSearchBar(false)}>{item.data.name} ({item.data.model}) </div></Link>  
            ))}


            </div>
            
      </div>

  </div>

        <div className={styles.container}>
          <center><h2 className={styles.Headline}>Fast Search</h2></center>
            <div className={styles.inputSearchWrapper}>
                <div className={styles.search_box}>
                    <input className={styles.search_txt} ref={refInput} type="text" name="" onChange={()=>SearchContent(refInput.current?.value)}  placeholder="Type to search"/>
                    <a className={styles.search_btn} onClick={()=>{setSearchBar(true);SearchContent(" ")}}><FontAwesomeIcon icon={faSearch}  style={{ fontSize:26, color: "#DC3545" }}/></a>
                </div>
            </div>
        </div>

    </header>
  )
}
//SearchContent(refInput.current?.value)

export default Search;