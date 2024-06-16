import { useFeedbackItemsContext } from "../lib/useFeedbackItemsContext";

export default function HashtagList() {
  const { companiesList } = useFeedbackItemsContext();

  return (
    <aside>
        <ul className="hashtags">
            {
              companiesList.map((company) =>
                <HashtagListItem key={company} company={company} />
              )
            }
        </ul>
    </aside>
  )
}

  function HashtagListItem({
    company,
  }: {
    company: string,
  }) {
  const { setCompanyFilter } = useFeedbackItemsContext();

  return (
    <li>
      <button onClick={() => setCompanyFilter(company)}>#{company}</button>
    </li>
  );
}
