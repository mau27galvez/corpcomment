import { useState, useEffect } from "react";
import Footer from "./layout/Footer";
import HashtagList from "../components/HashtagList";
import Main from "./layout/Main";

export type FeedbackItem = {
  id: number;
  text: string;
  upvoteCount: number;
  daysAgo: number;
  company: string;
  badgeLetter: string;
};

function App() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string | null>(null);

  const displayedFeedbackList = companyFilter
    ? feedbackList.filter((feedbackItem) => feedbackItem.company === companyFilter)
    : feedbackList;

  const companiesList = feedbackList
    .map((feedbackItem) => feedbackItem.company)
    .filter((company, index, companies) => companies.indexOf(company) === index);

  const addToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find(word => word.startsWith("#"))
      ?.slice(1);

    if (!companyName) {
      return;
    }

    const badgeLetter = companyName[0].toUpperCase();

    const newFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      badgeLetter: badgeLetter,
      company: companyName,
      daysAgo: 0,
    };

    setFeedbackList([newFeedbackItem, ...feedbackList]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newFeedbackItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const upVote = (id: number) => {
    const updatedFeedbackList = feedbackList.map((feedbackItem) => {
      if (feedbackItem.id === id) {
        return { ...feedbackItem, upVoteCount: feedbackItem.upvoteCount + 1 };
      }

      return feedbackItem;
    });

    setFeedbackList(updatedFeedbackList);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();
        setFeedbackList(data.feedbacks);
      } catch {
        setErrorMessage("Something went wrong. Please try again.");
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Main
        onAddToList={addToList}
        feedbackList={displayedFeedbackList}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <HashtagList companiesList={companiesList} onHashtagClick={setCompanyFilter} />
    </div>
  );
}

export default App;
