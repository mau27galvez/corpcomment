import Footer from "./layout/Footer";
import HashtagList from "../components/HashtagList";
import Main from "./layout/Main";
import FeedbackItemsContextProvider from "../contexts/FeedbackItemsContextProvider";

function App() {
  return (
    <div className="app">
      <Footer />

      <FeedbackItemsContextProvider>
        <Main />

        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
