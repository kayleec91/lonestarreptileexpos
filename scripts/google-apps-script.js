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
    .filter(row => String(row.status || "active").toLowerCase() === "active")
    .filter(row => {
      const endDate = new Date(row.endDate);
      endDate.setHours(23, 59, 59, 999);
      return endDate >= today;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function getVendors(eventId) {
  const sheet = getSheet(SHEET_VENDORS);
  const rows = getRows(sheet);

  if (!eventId) return rows;

  return rows.filter(row =>
    String(row.eventIds || "")
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

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
