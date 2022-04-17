
import styles from "../styles/RootComponent.module.scss"

type Props = {
    headline:string
}

const RootPages:React.FC<Props>  = ({headline})=>{


    return(
        <div className={styles.currentFilmWrapper}>
            {/* @ts-ignore */}
                <center>
                   
                   <h2 className={styles.headlineRoot}>{headline}</h2>
                  
            {/* @ts-ignore */}   
                </center>
        </div>
    )
}

export default RootPages;