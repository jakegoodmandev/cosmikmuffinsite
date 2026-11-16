import clsx from 'clsx';
import showDates from '../data/show-dates.json';

export default function ShowList() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedDates = [...showDates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (sortedDates.length === 0) {
    return (
      <p className="text-white/60">No show dates right now. Check back soon.</p>
    );
  }

  return (
    <ul className="divide-y divide-white/10">
      {sortedDates.map((show) => {
        const date = new Date(show.date);
        const isPast = date < today;

        return (
          <li
            key={show.id}
            className="flex flex-col gap-2 py-4 transition-colors hover:bg-white/5 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-x-6 sm:py-5"
          >
            <p
              className={clsx(
                'text-sm font-medium',
                isPast ? 'text-white/40' : 'text-white',
              )}
            >
              {date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </p>

            <div className="space-y-0.5">
              <h3
                className={clsx(
                  'text-base font-bold',
                  isPast ? 'text-white/40' : 'text-white',
                )}
              >
                {show.venue}
              </h3>
              <p
                className={clsx(
                  'text-sm',
                  isPast ? 'text-white/30' : 'text-white/70',
                )}
              >
                {show.address ?? show.city}
              </p>
              {show.lineup && (
                <ul className="space-y-0.5 pt-2 text-sm text-white/80">
                  {show.lineup.map((band) => (
                    <li key={band}>{band}</li>
                  ))}
                </ul>
              )}
              {show.details && (
                <p className="pt-2 text-sm text-white/70">{show.details}</p>
              )}
              {show.poster && (
                <a
                  href={show.poster.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View full-size show poster (opens in a new tab)"
                  className="mt-4 block max-w-56 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-band-accent"
                >
                  <img
                    src={show.poster.src}
                    alt={show.poster.alt}
                    width={show.poster.width}
                    height={show.poster.height}
                    loading="lazy"
                    className="h-auto w-full rounded-lg"
                  />
                </a>
              )}
            </div>

            <div className="sm:text-right">
              {show.soldOut ? (
                <span className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-white/50">
                  Sold Out
                </span>
              ) : isPast ? (
                <span className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-white/40">
                  Past Show
                </span>
              ) : (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-band-accent px-5 py-1.5 text-sm font-bold text-white hover:bg-fuchsia-500"
                >
                  Tickets
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
