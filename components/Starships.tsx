
import styles from "../styles/Films.module.scss"
import Link from 'next/link'
//@ts-ignore
import { checkEmptyList,errorMessage , checkId} from "../global_func/func.ts"
import { CurrentCharacter, CurrentFilm, CurrentStarship , Starship} from "../types/type"


type Props ={
    starship:Starship
    characters:Array<CurrentCharacter>
    film:Array<CurrentFilm>
    starships:Array<CurrentStarship>
}


const Starship:React.FC<Props> = ({starship,characters,film,starships})=>{

const {data} = starship[0]
const {name,model,manufacturer,starship_class,passengers,crew,films,pilots,url} = data;

    return(
        <div className={styles.currentFilmWrapper}>
            <div className={`${styles.HeadlineLinks} ${styles.MainName}`}>{name}</div>
            <div className={styles.HeadlineLinks}><strong>Model</strong><span className={styles.FieldValue}> - {model} </span></div>
            <div className={styles.HeadlineLinks}><strong>Manufacturer</strong><span className={styles.FieldValue}> - {manufacturer}</span></div>
            <div className={styles.HeadlineLinks}><strong>Class</strong><span className={styles.FieldValue}> - {starship_class}</span></div>
            <div className={styles.HeadlineLinks}><strong>Passengers</strong><span className={styles.FieldValue}> - {passengers}</span></div>
            <div className={styles.HeadlineLinks}><strong>Crew</strong><span className={styles.FieldValue}> - {crew}</span></div>
        
            <br/>

        <div><strong className={styles.HeadlineLinks}>Films :</strong> {film?.map(doc=>
        //@ts-ignore
        films?.includes(doc.data().url) &&
        //@ts-ignore
        <span key={doc.data().url} className={styles.elementSearching}>
        {/* @ts-ignore */}
        <strong><Link href={`/films/${doc.data().episode_id}`}><a>{doc.data().title}</a></Link> </strong>
        </span> )}  </div>

        <br/>
        
        <div><strong className={styles.HeadlineLinks}>Pilots :</strong> {
     checkEmptyList(characters,pilots) ?   
characters?.map(doc=>
    //@ts-ignore
  pilots.includes(doc.data().url) &&
  //@ts-ignore
  <span key={doc.data().url} className={styles.elementSearching}>
      {/* @ts-ignore */}
    <strong><Link href={`/characters/${doc.data().url}`}><a>{doc.data().name}</a></Link></strong></span> ) : 
    <span className={styles.elementSearchingError}>{errorMessage()}</span>
    }  </div>

        <br/>

    <div> 
    <strong className={styles.HeadlineLinks}> Other starships :</strong> {
       checkId(starships,url) ?
    starships?.map(doc=>
         //@ts-ignore
        doc.data().url !== url &&
        //@ts-ignore
  <span key={doc.data().url} className={styles.elementSearching}>
      {/*  @ts-ignore */}
    <Link href={`/starships/${doc.data().url}`}><a>{doc.data().name} </a></Link></span> 
 ) : <span className={styles.elementSearchingError}>{errorMessage()}</span>} 
     </div>


        
        </div>
    )
}

export default Starship;