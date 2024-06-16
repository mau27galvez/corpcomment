import { useEffect, useState } from "react";
import { useFeedbackItemsContext } from "../../lib/useFeedbackItemsContext";

const MAX_FEEDBACK_LENGTH = 150;

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const remainingCharacters = MAX_FEEDBACK_LENGTH - feedback.length;
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { addToList } = useFeedbackItemsContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_FEEDBACK_LENGTH) {
      return;
    }

    setFeedback(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedback.trim() === "") {
      setIsValid(false);
      return;
    }

    if (!feedback.includes("#")) {
      setIsValid(false);
      return;
    }

    if ( feedback.split(" ").filter(word => word.startsWith("#"))[0].length < 2 ) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    addToList(feedback);
    setFeedback("");
  }

  useEffect(() => {
    const timeOut = setTimeout(() => setIsValid(null), 3000);

    return () => clearTimeout(timeOut);
  }, [isValid])

  return (
    <form
      className={`form ${isValid === true && 'form--valid'} ${isValid === false && 'form--invalid'}`}
      onSubmit={handleSubmit}
    >
      <textarea
        id="feedback-textarea"
        placeholder=" "
        spellCheck={false}
        value={feedback}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{remainingCharacters}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
