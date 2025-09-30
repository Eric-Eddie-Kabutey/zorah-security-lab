const SocialLink: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-3 bg-muted rounded-full hover:bg-accent transition-colors"
  >
    {children}
  </a>
);

export default SocialLink;