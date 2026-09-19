import { useEffect, useMemo, useRef } from "react";

type TicketTailorWidgetProps = {
  ticketLink: string;
};

const WIDGET_SCRIPT = "https://cdn.tickettailor.com/js/widgets/min/widget.js";

function getTicketTailorUrl(ticketLink: string) {
  const eventId = ticketLink.match(/\/(\d+)(?:[/?#]|$)/)?.[1];
  if (!eventId) return "";

  const params = new URLSearchParams({
    ref: "website_widget",
    show_search_filter: "true",
    show_date_filter: "true",
    show_sort: "true",
    show_event_name: "false",
    show_venue: "false",
  });

  return `https://www.tickettailor.com/events/lonestarreptileexpos/${eventId}/select-date?${params.toString()}`;
}

export function TicketTailorWidget({ ticketLink }: TicketTailorWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetUrl = useMemo(() => getTicketTailorUrl(ticketLink), [ticketLink]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !widgetUrl) return;

    container.innerHTML = "";

    const fallback = document.createElement("div");
    fallback.className = "tt-widget-fallback";
    fallback.innerHTML = `<p><a href="${widgetUrl}" target="_blank" rel="noopener noreferrer">Click here to buy tickets</a><br /><small><a href="https://www.tickettailor.com?rf=wdg_15979" class="tt-widget-powered">Sell tickets online with Ticket Tailor</a></small></p>`;
    container.appendChild(fallback);

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT;
    script.dataset.url = widgetUrl;
    script.dataset.type = "inline";
    script.dataset.inlineMinimal = "true";
    script.dataset.inlineShowLogo = "false";
    script.dataset.inlineBgFill = "false";
    script.dataset.inlineInheritRefFromUrlParam = "";
    script.dataset.inlineRef = "website_widget";
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [widgetUrl]);

  if (!widgetUrl) return null;

  return <div ref={containerRef} className="tt-widget min-h-28" />;
}
