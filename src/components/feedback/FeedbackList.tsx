import { TriangleUpIcon } from "@radix-ui/react-icons";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { FeedbackItem } from "../App";

export default function FeedbackList({
  feedbackList,
  isLoading,
  errorMessage,
}: {
  feedbackList: FeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
}) {
return (
  <ol className="feedback-list">
    {isLoading && <Spinner />}
    {errorMessage && <ErrorMessage message={errorMessage} />}
    {feedbackList.map(feedbackItem =>
      <FeedbackListItem key={feedbackItem.id} feedbackItem={feedbackItem} />
    )}
  </ol>
);
}

export function FeedbackListItem({ feedbackItem }: { feedbackItem: FeedbackItem; }) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo}d</p>
    </li>
  );
}
