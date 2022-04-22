
import styles from "../styles/Nav.module.scss";
import burgerMenuStyles from "../styles/NavbarBurger.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import StarWarsLogo from "./../public/star-wars-jedi-fallen-order-1.svg";
import { RedirectToGoal } from "../global_func/func.ts";
import { React} from "react";

const NavbarBurger = ({filmsList}) => {

	const router = useRouter();
	const { asPath } = router;
	return (
		<>
			<div className={`${styles.articleWrapper} ${burgerMenuStyles.navbarAdaptive}`} >
				<div className={styles.container}>
					<div className={styles.logo}>
						<Image src={StarWarsLogo} height={150} width={150} onClick={() => RedirectToGoal(router, "/films")} />
					</div>
					{filmsList?.map((doc) => (
						<Link href={`/films/${doc.data.episode_id}`} key={doc.data.uid} >
							<div className={asPath === `/films/${doc.data.episode_id}` ? `${styles.activeLink} ${styles.item}` : styles.item}>{doc.data.title}</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default NavbarBurger;
