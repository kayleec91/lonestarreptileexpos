import {
  useEffect,
  useMemo,
  useRef,
} from "react";

interface TicketTailorWidgetProps {
  ticketLink: string;
}

const TICKET_TAILOR_SCRIPT =
  "https://cdn.tickettailor.com/js/widgets/min/widget.js";

function createWidgetUrl(ticketLink: string) {
  const eventId = ticketLink.match(
    /\/(\d+)(?:[/?#]|$)/
  )?.[1];

  if (!eventId) {
    return "";
  }

  const parameters = new URLSearchParams({
    ref: "website_widget",
    show_search_filter: "true",
    show_date_filter: "true",
    show_sort: "true",
    show_event_name: "false",
    show_venue: "false",
  });

  return (
    `https://www.tickettailor.com/events/` +
    `lonestarreptileexpos/${eventId}/select-date?` +
    parameters.toString()
  );
}

export function TicketTailorWidget({
  ticketLink,
}: TicketTailorWidgetProps) {
  const widgetRef =
    useRef<HTMLDivElement>(null);

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

    const fallback =
      document.createElement("div");

    fallback.className =
      "tt-widget-fallback";

    fallback.innerHTML = `
      <p>
        <a
          href="${widgetUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here if ticket checkout does not load
        </a>
      </p>
    `;

    const script =
      document.createElement("script");

    script.src = TICKET_TAILOR_SCRIPT;

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

    container.appendChild(fallback);
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
    <div className="min-h-[180px] w-full">
      <div
        ref={widgetRef}
        className="tt-widget"
      />
    </div>
  );
}
