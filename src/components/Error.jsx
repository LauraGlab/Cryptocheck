import "./../css/components/Error.css";

export default function Error({
  title = "Oops! Something went wrong",
  message = "We couldn't load the data. Please try again later or check the URL.",
}) {
  return (
    <div className="errorWindow">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}