// import '../styles/globals.css'
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//antd css
import "antd/dist/antd.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../public/styles/styles.css";
import "../public/styles/globals.css";
import Nav from "../components/Nav";
import { Provider } from "../context";
import Footer from "./../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
