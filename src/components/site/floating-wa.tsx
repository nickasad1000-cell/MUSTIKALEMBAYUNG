import { waLink, site } from "@/lib/site";

export function FloatingWa() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat WhatsApp ${site.name}`}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 transition-transform duration-300 ease-brand hover:scale-105 active:scale-95"
    >
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.7.7 5.3 2 7.6L.7 31.3l7.9-2c2.2 1.2 4.7 1.9 7.4 1.9 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.7c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.5-.3-.5a12.4 12.4 0 0 1-1.9-6.6C3.2 9 9 3.2 16 3.2S28.8 9 28.8 16 23 28.5 16 28.5zm6.9-9.3c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4s1.5 3.9 1.7 4.2c.2.3 2.9 4.4 7 6.2 1 .4 1.7.7 2.3.9 1 .3 1.9.3 2.6.2.8-.1 2.3-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5z" />
      </svg>
    </a>
  );
}
