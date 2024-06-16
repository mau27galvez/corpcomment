import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Patter from "../Patter";

export default function Header() {
  return (
    <header>
        <Patter />
        <Logo />
        <PageHeading />
        <FeedbackForm />
    </header>
  )
}
