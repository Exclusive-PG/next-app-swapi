import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";
import store from "../Redux/store";
import { createWrapper } from "next-redux-wrapper";
import App from "next/app";
config.autoAddCss = false;

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={store}>
				<Component {...pageProps}></Component>
			</Provider>
		);
	}
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
