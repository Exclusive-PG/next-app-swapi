import {useCollection} from "react-firebase-hooks/firestore"
import firebase from "../firebase/db";
import styles from "../styles/Nav.module.scss"
import Link from 'next/link'
import {useRouter} from "next/router"
import Image from "next/image"

// @ts-ignore
import StarWarsLogo from "./../public/star-wars-jedi-fallen-order-1.svg";
//@ts-ignore
import { RedirectToGoal } from '../global_func/func.ts';

const Navbar:React.FC = () => {
  
  const router = useRouter();
  const {asPath} = router;

// @ts-ignore
const[filmsList,filmLoading,filmError]= useCollection(firebase.firestore().collection("films"),{}) 



  return (
    <article className={styles.articleWrapper}>
      
        <div className={styles.container}>
          <div className={styles.logo} >
          <Image src={StarWarsLogo} height={150} width={150} onClick = {()=>RedirectToGoal(router,"/films")} />
        </div>
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