import { FeedbackItem } from "../contexts/FeedbackItemsContextProvider";
import Header from "./layout/Header";
import FeedbackList from "./feedback/FeedbackList";

export default function Main({
  feedbackList,
  isLoading,
  errorMessage,
  onAddToList,
}: {
  feedbackList: FeedbackItem[],
  isLoading: boolean,
  errorMessage: string,
  onAddToList: (text: string) => void,
}) {
  return (
    <main className="container">
      <Header onAddToList={onAddToList} />
      <FeedbackList
        feedbackList={feedbackList}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  );
}
