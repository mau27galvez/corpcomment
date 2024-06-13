import { useState } from "react";

const MAX_FEEDBACK_LENGTH = 150;

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const remainingCharacters = MAX_FEEDBACK_LENGTH - feedback.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_FEEDBACK_LENGTH) {
      return;
    }

    setFeedback(e.target.value);
  };

  return (
    <form className="form">
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
