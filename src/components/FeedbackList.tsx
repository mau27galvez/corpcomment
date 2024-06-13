import { TriangleUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export type FeedbackItem = {
  id: number;
  upVoteCount: number;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};

export default function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    }

    fetchData();
  }, []);

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
        <span>{feedbackItem.upVoteCount}</span>
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
