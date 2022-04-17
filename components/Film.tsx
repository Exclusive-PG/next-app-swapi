
import styles from "../styles/Film.module.scss"
import { CurrentFilm } from "../types/type";



const Film:React.FC<CurrentFilm>  = ({data})=>{
const {title,producer,release_date,director,opening_crawl} = data;

    return(
        <div className={styles.currentFilmWrapper}>
        <div className={styles.NameFilm}>{title}</div>
        <div><strong className={styles.NameField}>Producer</strong> - {producer}</div>
        <div><strong className={styles.NameField}>Release date</strong> - {
        //@ts-ignore
        release_date.replaceAll("-"," ")
        }</div>
        <div><strong className={styles.NameField}>Director</strong> - {director}</div>
        <div><strong className={styles.NameField}>Opening crawl</strong> -  {opening_crawl}</div>
        </div>
    )
}

export default Film;