import styles from "../styles/RootComponent.module.scss";

const RootPages = ({ headline }) => {
	return (
		<div className={styles.currentFilmWrapper}>
			<center>
				<h2 className={styles.headlineRoot}>{headline}</h2>
			</center>
		</div>
	);
};

export default RootPages;
