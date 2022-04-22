import styles from "../../styles/Films.module.scss";
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from "react-firebase-hooks/firestore";
import Search from "../../components/Search";
import Head from "next/head";
import { get } from "../../global_func/func.ts";
import Character from "./../../components/Character";
import { useSelector, useDispatch } from "react-redux";
import { RefreshCurrentCharacterAC } from "../../Redux/reducers/reducerCurrentItem";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {
	const { id } = context.params;

	let characters = await get(id, "characters", "url", firebase);

	if (!characters.length) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			characters,
			id,
		},
	};
};

const CurrentCharacters = ({ characters, id }) => {
	const { data } = characters[0];
	const [planets] = useCollection(firebase.firestore().collection("planets"), {});
	const [films] = useCollection(firebase.firestore().collection("films"), {});
	const [starships] = useCollection(firebase.firestore().collection("starships"), {});
	const [charactersDB] = useCollection(firebase.firestore().collection("characters"), {});

	const { currentCharacter } = useSelector((state) => state.reducerCurrentItem);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(RefreshCurrentCharacterAC(data));
	}, [data]);

	return (
		<main>
			<Head>
				<title>Character - {currentCharacter?.name}</title>
			</Head>

			<div className={styles.container}>
				<Navbar />
				<section className={styles.mainBlock}>
					<Search />
					<Character character={currentCharacter} planets={planets?.docs} FilmsList={films?.docs} starshipsList={starships?.docs} charactersList={charactersDB?.docs} />
				</section>
			</div>
		</main>
	);
};

export default CurrentCharacters;
