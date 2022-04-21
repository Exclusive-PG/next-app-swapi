import styles from "../styles/404.module.scss";
import { useEffect, useState } from "react";
import { RedirectToGoal } from "../global_func/func.ts";
import { useRouter } from "next/router";

const Custom404 = () => {
	const [timer, setTimer] = useState(5);

	const router = useRouter();
	const REDIRECT_TIMER_SEC = 0;

	useEffect(() => {
		setTimeout(() => RedirectToGoal(router, "/"), timer * 1000);
	}, []);

	useEffect(() => {
		timer !== REDIRECT_TIMER_SEC && setInterval(() => setTimer(timer - 1), 1000);
	}, [timer]);

	return (
		<main className={styles.Wrapper404Page}>
			<div className={styles.contentWrapper}>
				<div className={styles.headline}>
					<h1>404 Page</h1>
					<h2> Jedi,something went wrong ... </h2>
					<h2 style={{ marginTop: "50px" }}> Redirecting to home in {timer} sec </h2>
				</div>
			</div>
		</main>
	);
};

export default Custom404;
