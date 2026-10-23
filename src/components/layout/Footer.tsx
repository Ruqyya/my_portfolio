export default function Footer() {
  return (
    <footer className="surface-deep surface-deep-flat relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-5 py-10 text-sm text-ink-2 md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          <span className="serif text-lg text-ink">Creative Ruqyya</span> · Senior Product Designer · Lahore, working worldwide
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><a className="link-draw py-1" href="https://www.linkedin.com/in/ghulam-ruqyya-ab0318156/" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a className="link-draw py-1" href="https://www.behance.net/ghulamruqyya" target="_blank" rel="noreferrer">Behance</a></li>
          <li><a className="link-draw py-1" href="mailto:ghulamruqyya@gmail.com">Email</a></li>
        </ul>
      </div>
    </footer>
  );
}
