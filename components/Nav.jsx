import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../firebase/db";
import styles from "../styles/Nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import StarWarsLogo from "./../public/star-wars-jedi-fallen-order-1.svg";
import { RedirectToGoal } from "../global_func/func.ts";
import { React, useState, useCallback, useEffect } from "react";
import NavbarBurger from "./NavbarBurger";
import { useSelector, useDispatch } from "react-redux";
import { GetDataFilmsNavAC } from "./../Redux/reducers/reducerNavbar";

const useMediaQuery = (width) => {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback((e) => {
		if (e.matches) {
			setTargetReached(true);
		} else {
			setTargetReached(false);
		}
	}, []);

	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${width}px)`);
		media.addListener(updateTarget);
		if (media.matches) {
			setTargetReached(true);
		}

		return () => media.removeListener(updateTarget);
	}, []);

	return targetReached;
};

const Navbar = () => {
	const router = useRouter();
	const { asPath } = router;
	const [burgerMenu, setBurgerMenu] = useState(false);
	const isBreakpoint = useMediaQuery(720);

	const [filmsList] = useCollection(firebase.firestore().collection("films"), {});

	const { filmsNav } = useSelector((state) => state.reducerNavbar);

	const dispatch = useDispatch();

	useEffect(() => {
		let QueryRes = [];

		filmsList?.forEach(function (doc) {
			QueryRes.push({
				data: doc.data(),
			});
		});
		dispatch(GetDataFilmsNavAC(QueryRes));
	}, [filmsList]);

	return (
		<>
			{!isBreakpoint ? (
				<article className={styles.articleWrapper}>
					<div className={styles.container}>
						<div className={styles.logo}>
							<Image src={StarWarsLogo} height={150} width={150} onClick={() => RedirectToGoal(router, "/films")} />
						</div>
						{filmsNav?.map((doc) => (
							<Link href={`/films/${doc.data.episode_id}`} key={doc.data.uid}>
								<div className={asPath === `/films/${doc.data.episode_id}` ? `${styles.activeLink} ${styles.item}` : styles.item}> {doc.data.title} </div>
							</Link>
						))}
					</div>
				</article>
			) : (
				<>
					<div className={` ${styles.c_hamburger} ${burgerMenu && styles.open}`} onClick={() => setBurgerMenu(!burgerMenu)}>
						<span className={`${styles.c_hamburger__line}`}></span>
						<span className={`${styles.c_hamburger__line}`}></span>
						<span className={`${styles.c_hamburger__line}`}></span>
					</div>

					{burgerMenu && <NavbarBurger filmsList={filmsNav} />}
				</>
			)}
		</>
	);
};

export default Navbar;
