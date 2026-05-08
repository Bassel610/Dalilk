export default function DashboardPageHead({ title, hint }) {
  return (
    <div className="Dashboard-pageHead">
      <h1>{title}</h1>
      {hint ? <p>{hint}</p> : null}
    </div>
  );
}
