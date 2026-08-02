import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // This is a static scaffold. To make the form work, connect it to a form backend
    // such as Formspree (https://formspree.io), Basin, or Vercel's serverless functions.
    // For now, we just simulate a successful submission.
    setStatus('success');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-band-accent focus:outline-none focus:ring-1 focus:ring-band-accent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-band-accent focus:outline-none focus:ring-1 focus:ring-band-accent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-band-accent focus:outline-none focus:ring-1 focus:ring-band-accent"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-band-accent px-6 py-3 text-sm font-bold text-white hover:bg-fuchsia-500 transition-colors"
      >
        Send Message
      </button>

      {status === 'success' && (
        <p className="text-sm text-green-400 text-center">
          Thanks for reaching out. (This is a placeholder — connect a form backend to receive real messages.)
        </p>
      )}
    </form>
  );
}
