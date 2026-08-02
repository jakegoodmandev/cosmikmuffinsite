import tourDates from '../data/tour-dates.json';

export default function TourList() {
  const sortedDates = [...tourDates].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="space-y-4">
      {sortedDates.map((show) => {
        const date = new Date(show.date);
        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

        return (
          <div
            key={show.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4 sm:p-6"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-band-accent">
                {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h3 className="text-xl font-bold text-white">{show.venue}</h3>
              <p className="text-white/70">{show.city}</p>
            </div>

            <div className="flex items-center gap-3">
              {show.soldOut ? (
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/50">
                  Sold Out
                </span>
              ) : isPast ? (
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/50">
                  Past Show
                </span>
              ) : (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-band-accent px-6 py-2 text-sm font-bold text-white hover:bg-fuchsia-500"
                >
                  Tickets
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
