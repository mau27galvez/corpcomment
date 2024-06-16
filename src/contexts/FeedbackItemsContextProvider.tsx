import { createContext, useMemo, useState } from "react";
import { useFeedbackItems } from "../lib/useFeedbackItems";

export type FeedbackItem = {
    id: number;
    text: string;
    upvoteCount: number;
    daysAgo: number;
    company: string;
    badgeLetter: string;
};

type FeedbackItemContext = {
    feedbackList: FeedbackItem[];
    companiesList: string[];
    isLoading: boolean;
    errorMessage: string;
    addToList: (text: string) => void;
    upVote: (id: number) => void;
    displayedFeedbackList: FeedbackItem[];
    setCompanyFilter: (company: string | null) => void;
};

export const FeedbackItemsContext = createContext<FeedbackItemContext | null>(null);

export default function FeedbackItemsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        feedbackList,
        isLoading,
        errorMessage,
        setFeedbackList
    } = useFeedbackItems();

    const companiesList = useMemo(() => feedbackList
        .map((feedbackItem) => feedbackItem.company)
        .filter((company, index, companies) => companies.indexOf(company) === index), [feedbackList]);
    const [companyFilter, setCompanyFilter] = useState<string | null>(null);
    const displayedFeedbackList = useMemo(() => companyFilter
        ? feedbackList.filter((feedbackItem) => feedbackItem.company === companyFilter)
        : feedbackList, [companyFilter, feedbackList]);

    const addToList = async (text: string) => {
        const companyName = text
            .split(" ")
            .find(word => word.startsWith("#"))
            ?.slice(1);

        if (!companyName) {
            return;
        }

        const badgeLetter = companyName[0].toUpperCase();

        const newFeedbackItem = {
            id: new Date().getTime(),
            text,
            upvoteCount: 0,
            badgeLetter: badgeLetter,
            company: companyName,
            daysAgo: 0,
        };

        setFeedbackList([newFeedbackItem, ...feedbackList]);

        await fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
            {
                method: "POST",
                body: JSON.stringify(newFeedbackItem),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
    };

    const upVote = (id: number) => {
        const updatedFeedbackList = feedbackList.map(feedbackItem => {
            if (feedbackItem.id === id) {
                return { ...feedbackItem, upvoteCount: feedbackItem.upvoteCount + 1 };
            }

            return feedbackItem;
        });

        setFeedbackList(updatedFeedbackList);
    };

    return <FeedbackItemsContext.Provider value={{
        feedbackList,
        companiesList,
        isLoading,
        errorMessage,
        addToList,
        upVote,
        displayedFeedbackList,
        setCompanyFilter,
    }}>{children}</FeedbackItemsContext.Provider>;
}


