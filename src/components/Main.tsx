import { FeedbackItem } from "../App";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

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
