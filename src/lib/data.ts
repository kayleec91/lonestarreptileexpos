export function getDefaultFaqs(cityOrVenue = "") {
  const location = cityOrVenue.toLowerCase();
  const hasAtm = location.includes("north richland") || location.includes("nrh") || location.includes("amarillo");
  const isArlington = location.includes("arlington");
  const isNorthRichlandHills = location.includes("north richland") || location.includes("nrh") || location.includes("nytex");
  const isAmarillo = location.includes("amarillo");
  const isSchertz = location.includes("schertz") || location.includes("san antonio");

  const parkingAnswer = isNorthRichlandHills
    ? "Yes. Parking is available at the venue, with additional parking in the school parking lot across the street."
    : "Yes, parking is available on-site or nearby. Check each venue for details.";

  const accessibilityAnswer = isArlington
    ? "Yes. Strollers and wheelchairs are allowed, but the Arlington expo can become crowded and tight during busy times."
    : "Yes. Strollers and wheelchairs are allowed.";

  let foodAnswer = "Food and drink options vary by venue.";

  if (isArlington) {
    foodAnswer = "Yes. The venue has a bar serving drinks, beer, and snacks. The venue also prepares and sells lunch.";
  } else if (isNorthRichlandHills) {
    foodAnswer = "NYTEX Sports Centre has a restaurant and bar. Food and drinks are not allowed inside the expo area.";
  } else if (isAmarillo) {
    foodAnswer = "Yes. A concession stand is available. Alcohol is not available.";
  } else if (isSchertz) {
    foodAnswer = "Vending machines are available. Alcohol is not available.";
  }

  return [
    { question: "Is parking available?", answer: parkingAnswer },
    { question: "Are children allowed?", answer: "Yes. Lone Star Reptile Expos are family-friendly events, and kids 6 and under are free." },
    { question: "Can I purchase tickets at the door?", answer: "Yes. Tickets may be purchased at the door with cash or card." },
    { question: "Are tickets valid for both days?", answer: "Yes. Admission is valid for both Saturday and Sunday." },
    { question: "Can I leave and return to the expo?", answer: "Yes. Keep your Saturday wristband or show your hand stamp when returning." },
    { question: "Are strollers and wheelchairs allowed?", answer: accessibilityAnswer },
    { question: "Are food and drinks available?", answer: foodAnswer },
    { question: "Is there an ATM?", answer: hasAtm ? "Yes, an ATM is available at this location." : "Not at this location. We recommend bringing cash because some vendors may not accept cards." },
    { question: "What forms of payment are accepted for admission?", answer: "Cash and cards are accepted for admission. Vendor payment options may differ." },
    { question: "Do vendors accept cards?", answer: "Many vendors accept cards, but bringing cash is recommended." },
    { question: "Can I bring my pet?", answer: "Yes. Guests may bring pets inside our venues. Please keep your pet safely under control at all times." },
    { question: "Are venomous animals allowed?", answer: "No. Venomous animals are not permitted at Lone Star Reptile Expos." },
    { question: "Can attendees sell animals or products at the expo?", answer: "No. Only registered, paid vendors may sell animals or products inside the venue." },
  ];
}


