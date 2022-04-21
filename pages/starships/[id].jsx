import styles from "../../styles/Films.module.scss";
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from "react-firebase-hooks/firestore";

import Search from "../../components/Search";
import Starship from "../../components/Starships";
import Head from "next/head";
import { get } from "../../global_func/func.ts";

export const getServerSideProps = async (context) => {
	const { id } = context.params;

	let starship = await get(id, "starships", "url", firebase);

	if (!starship.length) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			starship,
			id,
		},
	};
};

const CurrentStarship = ({ starship, id }) => {
	const { data } = starship[0];

	const [films, filmsLoading, filmsLoadingError] = useCollection(firebase.firestore().collection("films"), {});

	const [characters, charactersLoading, charactersLoadingError] = useCollection(firebase.firestore().collection("characters"), {});

	const [starships, starshipsLoading, starshipsLoadingError] = useCollection(firebase.firestore().collection("starships"), {});
	return (
		<main>
			<Head>
				<title>Starship - {data?.name}</title>
			</Head>
			<div className={styles.container}>
				<Navbar />

				<section className={styles.mainBlock}>
					<Search />
					<Starship starship={starship} film={films?.docs} characters={characters?.docs} starships={starships?.docs} />
				</section>
			</div>
		</main>
	);
};

export default CurrentStarship;
