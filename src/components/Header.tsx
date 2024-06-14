import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Patter from "./Patter";

export default function Header({
  onAddToList,
}: {
  onAddToList: (text: string) => void;
}) {
  return (
    <header>
        <Patter />
        <Logo />
        <PageHeading />
        <FeedbackForm onAddToList={onAddToList} />
    </header>
  )
}
