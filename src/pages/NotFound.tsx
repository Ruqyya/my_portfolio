import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-[88rem] flex-col justify-center px-5 pt-24 md:px-10">
      <p className="mono text-signal">404</p>
      <h1 className="mt-4 text-[clamp(3rem,8vw,6.6rem)] font-medium leading-none">This page isn't on the chart.</h1>
      <p className="mt-6 max-w-md text-ink-2">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="mt-10 inline-flex h-14 w-fit items-center rounded-full bg-forest px-7 font-semibold text-on-forest">
        Back to home
      </Link>
    </div>
  );
}
