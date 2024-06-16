import { TriangleUpIcon } from "@radix-ui/react-icons";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { FeedbackItem } from "../../contexts/FeedbackItemsContextProvider";
import { useFeedbackItemsContext } from "../../lib/useFeedbackItemsContext";
import { useState } from "react";

export default function FeedbackList() {
  const { isLoading, errorMessage, displayedFeedbackList } = useFeedbackItemsContext();

return (
  <ol className="feedback-list">
    {isLoading && <Spinner />}
    {errorMessage && <ErrorMessage message={errorMessage} />}
    {displayedFeedbackList.map(feedbackItem =>
      <FeedbackListItem
        key={feedbackItem.id}
        feedbackItem={feedbackItem}
      />
    )}
  </ol>
);
}

export function FeedbackListItem({
  feedbackItem,
}: {
  feedbackItem: FeedbackItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { upVote } = useFeedbackItemsContext();

  const handleUpVoteClick = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.currentTarget.disabled = true;

    upVote(id);
  }

  return (
    <li
      className={`feedback ${isOpen ? 'feedback--expand' : ''}`}
      onClick={() => setIsOpen(prev => !prev)}
    >
      <button onClick={(e) => handleUpVoteClick(feedbackItem.id, e)}>
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
