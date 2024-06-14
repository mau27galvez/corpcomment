export default function HashtagList({
  companiesList,
  onHashtagClick,
}: {
  companiesList: string[],
  onHashtagClick: (company: string) => void;
}) {
  return (
    <aside>
        <ul className="hashtags">
            {
              companiesList.map((company) =>
                <HashtagListItem key={company} company={company} onHashtagClick={onHashtagClick} />
              )
            }
        </ul>
    </aside>
  )
}

  function HashtagListItem({
    company,
    onHashtagClick
  }: {
    company: string,
    onHashtagClick: (company: string) => void;
  }) {
  return (
    <li>
      <button onClick={() => onHashtagClick(company)}>#{company}</button>
    </li>
  );
}
