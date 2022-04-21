import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";

const socials = [
	{
		id: 1,
		icon: faGithub,
		link: "https://github.com/Exclusive-PG",
		color: "#fff",
		animationDelay: "1s",
	},
	{
		id: 2,
		icon: faInstagram,
		link: "https://www.instagram.com/exclusive_developer",
		color: "#D0228B",
		animationDelay: "2s",
	},
	{
		id: 3,
		icon: faTelegram,
		link: "https://t.me/developerFrontEnd",
		color: "#1086C1",
		animationDelay: "3s",
	},
];

export default function Home() {
	//const [burgerMenu,setBurgerMenu] = useState(false);

	return (
		<>
			<div className={styles.container}>
				<Head>
					<title>Star Wars App</title>
					<meta name="description" content="SWAPI Next App" />
					<link rel="icon" href="/favicon.ico" />
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
						crossOrigin="anonymous"
					></link>
				</Head>

				<main className={styles.main}>
					<div className={styles.backgroundPoster}></div>

					<section className={styles.main_wrapper}>
						<div className={`${styles.block_center} `}>
							<div className={`${styles.content} `}>
								{/*                  
                <div className={`${styles.hamburger} ${styles.c_hamburger} ${burgerMenu && styles.open}`} onClick={()=> setBurgerMenu(!burgerMenu)}>
                    <span className={`${styles.c_hamburger__line}`}></span>
                    <span className={`${styles.c_hamburger__line}`}></span>
                    <span className={`${styles.c_hamburger__line}`}></span>
                </div> */}

								<Link href={"/films"}>
									<button type="button" className={`${styles.entered_button}`}>
										Get started{" "}
									</button>
								</Link>

								<footer className={styles.LinkBlock}>
									<div className={styles.WrapperLink}>
										{socials.map((item) => (
											<a key={item.id} href={item.link}>
												<FontAwesomeIcon icon={item.icon} style={{ fontSize: "95px", color: item.color, animationDelay: item.animationDelay }} className={styles.itemLink} />
											</a>
										))}
									</div>
								</footer>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
}
