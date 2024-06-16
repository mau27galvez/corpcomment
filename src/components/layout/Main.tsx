import { FeedbackItem } from "../App";
import Header from "./Header";
import FeedbackList from "../feedback/FeedbackList";

export default function Main({
  feedbackList,
  isLoading,
  errorMessage,
  onAddToList,
  onUpVoteClick,
}: {
  feedbackList: FeedbackItem[],
  isLoading: boolean,
  errorMessage: string,
  onAddToList: (text: string) => void,
  onUpVoteClick: (id: number) => void,
}) {
  return (
    <main className="container">
      <Header onAddToList={onAddToList} />
      <FeedbackList
        feedbackList={feedbackList}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onUpVoteClick={onUpVoteClick}
      />
    </main>
  );
}
