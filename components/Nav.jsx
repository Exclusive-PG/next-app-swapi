import {useCollection} from "react-firebase-hooks/firestore"
import firebase from "../firebase/db";
import styles from "../styles/Nav.module.scss"
import Link from 'next/link'
import {useRouter} from "next/router"
const Navbar = () => {
  
  const {asPath} = useRouter();
  


 const[filmsList,filmLoading,filmError]= useCollection(firebase.firestore().collection("films"),{})

if(!filmLoading && filmsList){
console.log(filmsList)
   
}
if(filmError){
    console.log(filmError.message)
}


   
  return (
    <article className={styles.articleWrapper}>
      
        <div className={styles.container}>
        {
          filmsList?.docs?.map(doc=><Link  href={`/films/${doc.data().episode_id}`} key={doc.data().uid}>
            
            <div  className={asPath ===`/films/${doc.data().episode_id}` ? `${styles.activeLink} ${styles.item}` : styles.item}>{doc.data().title}</div>
            
            </Link>)
        }
        </div>

      



    </article>
  )
}


export default Navbar;