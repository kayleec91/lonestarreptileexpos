import { useEffect, useMemo, useRef } from "react";

interface TicketTailorWidgetProps {
  ticketLink: string;
}

function createWidgetUrl(ticketLink: string) {
  const eventId = ticketLink.match(
    /\/(\d+)(?:[/?#]|$)/
  )?.[1];

  if (!eventId) {
    return "";
  }

  return (
    `https://www.tickettailor.com/events/` +
    `lonestarreptileexpos/${eventId}/select-date` +
    `?ref=website_widget` +
    `&show_search_filter=true` +
    `&show_date_filter=true` +
    `&show_sort=true` +
    `&show_event_name=false` +
    `&show_venue=false`
  );
}

export function TicketTailorWidget({
  ticketLink,
}: TicketTailorWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  const widgetUrl = useMemo(
    () => createWidgetUrl(ticketLink),
    [ticketLink]
  );

  useEffect(() => {
    const container = widgetRef.current;

    if (!container || !widgetUrl) {
      return;
    }

    container.innerHTML = "";

    const fallback = document.createElement("div");
    fallback.className = "tt-widget-fallback";

    const fallbackText =
      document.createElement("p");

    const fallbackLink =
      document.createElement("a");

    fallbackLink.href = widgetUrl;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener noreferrer";
    fallbackLink.textContent =
      "Ticket checkout is loading";

    fallbackText.appendChild(fallbackLink);
    fallback.appendChild(fallbackText);
    container.appendChild(fallback);

    const script = document.createElement("script");

    script.src =
      "https://cdn.tickettailor.com/js/widgets/min/widget.js" +
      `?refresh=${Date.now()}`;

    script.async = true;

    script.setAttribute(
      "data-url",
      widgetUrl
    );

    script.setAttribute(
      "data-type",
      "inline"
    );

    script.setAttribute(
      "data-inline-minimal",
      "true"
    );

    script.setAttribute(
      "data-inline-show-logo",
      "false"
    );

    script.setAttribute(
      "data-inline-bg-fill",
      "false"
    );

    script.setAttribute(
      "data-inline-inherit-ref-from-url-param",
      ""
    );

    script.setAttribute(
      "data-inline-ref",
      "website_widget"
    );

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [widgetUrl]);

  if (!widgetUrl) {
    return (
      <div className="rounded-xl bg-muted p-6 text-center">
        Ticket sales are not available for this event.
      </div>
    );
  }

  return (
    <div
      ref={widgetRef}
      className="tt-widget min-h-[180px] w-full"
    />
  );
}
