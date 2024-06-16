import { useState, useEffect } from "react";
import { FeedbackItem } from "../contexts/FeedbackItemsContextProvider";

export function useFeedbackItems() {
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
        };

        fetchData();
    }, []);

    return { feedbackList, isLoading, errorMessage, setFeedbackList };
}