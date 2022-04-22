import styles from "../../styles/Films.module.scss";
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from "react-firebase-hooks/firestore";
import Search from "../../components/Search";
import Starship from "../../components/Starships";
import Head from "next/head";
import { get } from "../../global_func/func.ts";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RefreshCurrentStarshipAC } from "../../Redux/reducers/reducerCurrentItem";

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
	const [films] = useCollection(firebase.firestore().collection("films"), {});
	const [characters] = useCollection(firebase.firestore().collection("characters"), {});
	const [starships] = useCollection(firebase.firestore().collection("starships"), {});

	const { currentStarship } = useSelector((state) => state.reducerCurrentItem);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(RefreshCurrentStarshipAC(data));
	}, [data]);

	return (
		<main>
			<Head>
				<title>Starship - {data?.name}</title>
			</Head>
			<div className={styles.container}>
				<Navbar />
				<section className={styles.mainBlock}>
					<Search />
					<Starship starship={currentStarship} film={films?.docs} characters={characters?.docs} starships={starships?.docs} />
				</section>
			</div>
		</main>
	);
};

export default CurrentStarship;
