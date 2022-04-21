import styles from "../styles/Films.module.scss";
import Link from "next/link";

const Planet = ({ planet, filmsList, planetsList }) => {
	const { data } = planet[0];
	const { name, climate, population, terrain, gravity, films, url } = data;

	return (
		<div className={styles.currentFilmWrapper}>
			<div className={`${styles.HeadlineLinks} ${styles.MainName}`}>{name}</div>
			<div>
				<strong className={styles.HeadlineLinks}>Climate</strong>
				<span className={styles.FieldValue}> - {climate} </span>
			</div>
			<div>
				<strong className={styles.HeadlineLinks}>Population</strong>
				<span className={styles.FieldValue}> - {population}</span>
			</div>
			<div>
				<strong className={styles.HeadlineLinks}>Terrain</strong>
				<span className={styles.FieldValue}> - {terrain}</span>
			</div>
			<div>
				<strong className={styles.HeadlineLinks}>Gravity</strong>
				<span className={styles.FieldValue}> - {gravity}</span>
			</div>

			<br />
			<div>
				<strong className={styles.HeadlineLinks}> Films :</strong>{" "}
				{filmsList?.map(
					(doc) =>
						films.includes(doc.data().url) && (
							<span key={doc.data().url} className={styles.elementSearching}>
								<Link href={`/films/${doc.data().episode_id}`}>{doc.data().title}</Link>
							</span>
						)
				)}
			</div>
			<br />

			<div>
				{" "}
				<strong className={styles.HeadlineLinks}>Other planets: </strong>{" "}
				{planetsList?.map(
					(doc) =>
						doc.data().url !== url && (
							<span key={doc.data().url} className={styles.elementSearching}>
								<Link href={`/planets/${doc.data().url}`}>{doc.data().name}</Link>
							</span>
						)
				)}{" "}
			</div>
		</div>
	);
};

export default Planet;
