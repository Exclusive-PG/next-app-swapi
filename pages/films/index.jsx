import styles from "../../styles/Films.module.scss";
import Navbar from "../../components/Nav";
import React from "react";
import Head from "next/head";
import Search from "../../components/Search";
import RootPages from "../../components/RootPages";

export default function Films() {
	return (
		<main>
			<Head>
				<title>Films</title>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
					crossOrigin="anonymous"
				></link>
			</Head>

			<div className={styles.container}>
				<Navbar />
				<section className={styles.mainBlock}>
					<Search />
					<RootPages headline={"Star Wars Films"} />
				</section>
			</div>
		</main>
	);
}
