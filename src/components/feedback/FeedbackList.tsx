import { TriangleUpIcon } from "@radix-ui/react-icons";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { FeedbackItem } from "../App";
import { useState } from "react";

export default function FeedbackList({
  feedbackList,
  isLoading,
  errorMessage,
  onUpVoteClick,
}: {
  feedbackList: FeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  onUpVoteClick: (id: number) => void;
}) {
return (
  <ol className="feedback-list">
    {isLoading && <Spinner />}
    {errorMessage && <ErrorMessage message={errorMessage} />}
    {feedbackList.map(feedbackItem =>
      <FeedbackListItem
        key={feedbackItem.id}
        feedbackItem={feedbackItem}
        onUpVoteClick={onUpVoteClick}
      />
    )}
  </ol>
);
}

export function FeedbackListItem({
  feedbackItem,
  onUpVoteClick
}: {
  feedbackItem: FeedbackItem,
  onUpVoteClick: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpVoteClick = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.currentTarget.disabled = true;

    onUpVoteClick(id);
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
