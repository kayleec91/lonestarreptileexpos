const SHEET_EVENTS = "Events";
const SHEET_VENDORS = "Vendors";
const SHEET_VENDOR_SUBMISSIONS = "Vendor Submissions";

function doGet(e) {
  const action = e.parameter.action || "events";

  if (action === "events") {
    return jsonResponse(getEvents());
  }

  if (action === "vendors") {
    return jsonResponse(getVendors(e.parameter.eventId));
  }

  return jsonResponse({ success: false, message: "Invalid action." });
}

function doPost(e) {
  try {
    const action = e.parameter.action;
    const payload = e.parameter.payload ? JSON.parse(e.parameter.payload) : {};

    if (action === "vendorApplication") {
      saveVendorApplication(payload);
      return jsonResponse({ success: true, message: "Vendor application saved." });
    }

    return jsonResponse({ success: false, message: "Invalid action." });
  } catch (error) {
    return jsonResponse({ success: false, message: error.message });
  }
}

function getEvents() {
  const sheet = getSheet(SHEET_EVENTS);
  const rows = getRows(sheet);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return rows
    .map(row => {
      const startDate = String(row.startDate || "").trim();
      const endDate = String(row.endDate || startDate).trim();
      const city = String(row.city || row.id || row.name || "").trim();
      return {
        ...row,
        id: String(row.id || createEventId(city, startDate)).trim(),
        name: String(row.name || `${city} Reptile Expo`).trim(),
        city,
        state: String(row.state || "TX").trim(),
        startDate,
        endDate,
        dates: String(row.dates || formatDisplayDate(startDate, endDate)).trim(),
        status: String(row.status || "active").trim(),
        featured: String(row.featured || "").trim()
      };
    })
    .filter(row => String(row.status || "active").toLowerCase() === "active")
    .filter(row => row.startDate && row.endDate)
    .filter(row => {
      const endDate = new Date(`${row.endDate}T23:59:59`);
      return endDate >= today;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function getVendors(eventId) {
  const sheet = getSheet(SHEET_VENDORS);
  const rows = getRows(sheet);

  if (!eventId) return rows;

  return rows.filter(row =>
    String(row.eventIds || row.eventId || row.event || "")
      .split(",")
      .map(item => item.trim())
      .includes(eventId)
  );
}

function saveVendorApplication(data) {
  const sheet = getSheet(SHEET_VENDOR_SUBMISSIONS);

  sheet.appendRow([
    new Date(),
    data.businessName || "",
    data.contactName || "",
    data.email || "",
    data.phone || "",
    data.selectedEvent || "",
    data.selectedEventName || "",
    data.selectedEventDates || "",
    data.selectedEventVenue || "",
    data.tableType || "",
    data.category || "",
    data.animalsProducts || "",
    data.website || "",
    data.message || "",
    "New"
  ]);
}

function getSheet(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error(`Missing sheet tab: ${name}`);
  return sheet;
}

function getRows(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(header => String(header).trim());

  return values.slice(1).map(row => {
    const item = {};
    headers.forEach((header, index) => {
      const value = row[index];
      item[header] = value instanceof Date
        ? Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd")
        : value;
    });
    return item;
  });
}

function createEventId(city, startDate) {
  const citySlug = String(city || "event")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return startDate ? `${citySlug}-${startDate}` : citySlug;
}

function ordinal(day) {
  if (day >= 11 && day <= 13) return `${day}th`;
  const last = day % 10;
  if (last === 1) return `${day}st`;
  if (last === 2) return `${day}nd`;
  if (last === 3) return `${day}rd`;
  return `${day}th`;
}

function formatDisplayDate(startDate, endDate) {
  if (!startDate) return "";

  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate || startDate}T12:00:00`);
  const startMonth = Utilities.formatDate(start, Session.getScriptTimeZone(), "MMMM");
  const endMonth = Utilities.formatDate(end, Session.getScriptTimeZone(), "MMMM");
  const startDay = ordinal(start.getDate());
  const endDay = ordinal(end.getDate());
  const year = Utilities.formatDate(end, Session.getScriptTimeZone(), "yyyy");

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
    return `${startMonth} ${startDay}, ${year}`;
  }

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay} & ${endDay}, ${year}`;
  }

  return `${startMonth} ${startDay} & ${endMonth} ${endDay}, ${year}`;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
