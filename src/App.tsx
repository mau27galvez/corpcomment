import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import HashtagList from "./components/HashtagList";
import Main from "./components/Main";

export type FeedbackItem = {
  id: number;
  upVoteCount: number;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};

function App() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addToList = (text: string) => {
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
      upVoteCount: 0,
      badgeLetter: badgeLetter,
      company: companyName,
      text,
      daysAgo: 0,
    };

    setFeedbackList([newFeedbackItem, ...feedbackList]);
  };

  const upVote = (id: number) => {
    const updatedFeedbackList = feedbackList.map((feedbackItem) => {
      if (feedbackItem.id === id) {
        return { ...feedbackItem, upVoteCount: feedbackItem.upVoteCount + 1 };
      }

      return feedbackItem;
    });

    setFeedbackList(updatedFeedbackList);
  }

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
        feedbackList={feedbackList}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <HashtagList />
    </div>
  )
}

export default App;
