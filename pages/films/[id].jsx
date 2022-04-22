import styles from "../../styles/Films.module.scss";
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
import Search from "../../components/Search";
import { checkEmptyList, errorMessage, get } from "./../../global_func/func.ts";
import Head from "next/head";
import Film from "./../../components/Film";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RefreshCurrentFilmAC } from "../../Redux/reducers/reducerCurrentItem";

export const getServerSideProps = async (context) => {
	const { id } = context.params;

	let films = await get(parseInt(id), "films", "episode_id", firebase);

	if (!films.length) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			films,
			id,
		},
	};
};

const CurrentFilm = ({ films, id }) => {
	const { data } = films[0];

	const [characters] = useCollection(firebase.firestore().collection("characters"), {});
	const [planets] = useCollection(firebase.firestore().collection("planets"), {});
	const [starships] = useCollection(firebase.firestore().collection("starships"), {});

	const { currentFilm } = useSelector((state) => state.reducerCurrentItem);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(RefreshCurrentFilmAC(data));
	}, [data]);

	return (
		<main>
			<Head>
				<title>Film - {currentFilm?.title}</title>
			</Head>

			<div className={styles.container}>
				<Navbar />

				<section className={styles.mainBlock}>
					<Search />
					<Film data={currentFilm} />

					<br />
					<div>
						<div className={styles.HeadlineLinks}>Characters :</div>{" "}
						{checkEmptyList(characters?.docs, currentFilm?.characters) ? (
							characters?.docs?.map(
								(doc) =>
									currentFilm.characters.includes(doc.data().url) && (
										<span key={doc.data().url} className={styles.elementSearching}>
											{" "}
											<Link href={`/characters/${doc.data().url}`}>{doc.data().name}</Link>{" "}
										</span>
									),
							)
						) : (
							<span className={styles.elementSearchingError}>{errorMessage()}</span>
						)}{" "}
					</div>

					<br />

					<div>
						<div className={styles.HeadlineLinks}>Planets :</div>{" "}
						{checkEmptyList(planets?.docs, currentFilm?.planets) ? (
							planets?.docs?.map(
								(doc) =>
									currentFilm?.planets.includes(doc.data().url) && (
										<span key={doc.data().url} className={styles.elementSearching}>
											{" "}
											<Link href={`/planets/${doc.data().url}`}>{doc.data().name}</Link>{" "}
										</span>
									),
							)
						) : (
							<span className={styles.elementSearchingError}>{errorMessage()}</span>
						)}
					</div>

					<br />

					<div>
						<div className={styles.HeadlineLinks}>Starships :</div>{" "}
						{checkEmptyList(starships?.docs, currentFilm?.starships) ? (
							starships?.docs?.map(
								(doc) =>
									currentFilm?.starships.includes(doc.data().url) && (
										<span key={doc.data().url} className={styles.elementSearching}>
											<Link href={`/starships/${doc.data().url}`}>{doc.data().name}</Link>{" "}
										</span>
									),
							)
						) : (
							<span className={styles.elementSearchingError}>{errorMessage()}</span>
						)}{" "}
					</div>
				</section>
			</div>
		</main>
	);
};

export default CurrentFilm;
