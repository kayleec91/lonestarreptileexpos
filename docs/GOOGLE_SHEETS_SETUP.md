# Google Sheets setup for Lone Star Reptile Expos

The website uses Google Sheets as the easy control panel for expo dates, ticket links, vendors, and vendor applications.

## Tabs to create

Use these exact tab names:

- Locations
- Add Expo
- Events
- Vendors
- Vendor Submissions

The website only reads the Events and Vendors tabs. The Locations and Add Expo tabs are your easy data-entry tools.

---

## 1. Locations tab

Create a tab named `Locations`.

Put these headers in row 1:

locationId | name | city | state | venue | address

Add one row for each expo location you use. Example:

Arlington | Arlington Reptile Expo | Arlington | TX | Knights of Columbus | 2625 S Cooper St, Arlington, TX 76015
Amarillo | Amarillo Reptile Expo | Amarillo | TX | Amarillo Civic Center Complex | 401 S Buchanan St, Amarillo, TX 79101
Schertz | Schertz Reptile Expo | Schertz | TX | Schertz Civic Center | 1400 Schertz Pkwy, Schertz, TX 78154
North Richland Hills | North Richland Hills Reptile Expo | North Richland Hills | TX | NYTEX Sports Centre | 8851 Ice House Dr, North Richland Hills, TX 76180

Add your other regular locations as additional rows.

`locationId` is also what connects vendors to a location. For example, all Arlington dates use `Arlington` as the locationId, so the same Arlington vendor list can appear for every Arlington show date.

---

## 2. Events tab

Create or update the `Events` tab so row 1 has exactly these headers:

id | locationId | name | city | state | startDate | endDate | venue | address | ticketLink

You no longer need `status` or `featured`.

The website automatically:

- hides an event after its end date passes
- formats the display date from startDate and endDate
- shows every future event on the Events page
- shows only the next upcoming date for each location on the Home page

For example, if there are three future Arlington dates, the Events page shows all three, but the Home page only shows the earliest Arlington date.

Do not manually type new events here once Add Expo is set up. Use the Add Expo tab instead.

---

## 3. Add Expo tab

Create a tab named `Add Expo`.

Set it up like this:

A1: ADD NEW EXPO
A3: Location
A4: Start Date
A5: End Date
A6: Ticket Link

You will enter/select values in B3:B6.

### Create the Location dropdown

1. Click cell B3.
2. Go to Data > Data validation.
3. Under Criteria, choose Dropdown (from a range).
4. Enter this range:

`Locations!A2:A`

5. Turn on Reject input if that option is available.
6. Click Done.

Now B3 will contain a dropdown of your locationIds, such as Arlington, Amarillo, and Schertz.

### Format the date fields

1. Select B4 and B5.
2. Go to Format > Number > Date.
3. You can now click the calendar icon to choose the dates.

### Ticket Link

Paste the Ticket Tailor or other ticket URL into B6.

### Add the expo to the Events tab

After installing the Apps Script below, refresh the Google Sheet.

A new menu will appear at the top called:

`Website Tools`

Choose:

`Website Tools > Add Expo to Events`

The script will automatically:

- look up the selected location in the Locations tab
- copy the location name, city, state, venue, and address
- create a unique event ID using the location plus the start date
- append the new event to the Events tab
- sort the Events tab by start date
- clear the Add Expo form for the next show

### Optional: make an Add Expo button

If you prefer a big button instead of the Website Tools menu:

1. Go to Insert > Drawing.
2. Make a rectangle that says `ADD EXPO`.
3. Save and place it on the Add Expo tab.
4. Click the drawing, then click the three dots on it.
5. Choose Assign script.
6. Type exactly:

`addExpoFromForm`

Now clicking that button will add the expo to the Events tab.

---

## 4. Vendors tab

Use these headers:

id | name | category | description | eventIds | website | instagram

Important: `eventIds` now refers to the LOCATION, not an individual show date.

Examples:

- An Arlington vendor should use `Arlington`
- A Schertz vendor should use `Schertz`
- A vendor attending both locations can use `Arlington,Schertz`

This means every Arlington show automatically uses the same Arlington vendor list, even when there are multiple Arlington dates.

If description is blank, the website leaves it blank.

---

## 5. Vendor Submissions tab

Use these headers:

Timestamp | Business Name | Contact Name | Email | Phone | Show ID | Show Name | Show Dates | Show Venue | Table Type | Category | Animals Products | Website | Message | Status

The vendor form still stores the exact show date selected, so two Arlington dates remain separate when someone applies for a booth.

---

## 6. Install or update the Apps Script

In the Google Sheet:

1. Go to Extensions > Apps Script.
2. Replace the existing script with the code from `scripts/google-apps-script.js`.
3. Click Save.
4. Run the `onOpen` function once if Google asks for authorization.
5. Return to the Sheet and refresh the browser tab.
6. Confirm you see the `Website Tools` menu.

If the website is already using an Apps Script web app:

1. In Apps Script, click Deploy > Manage deployments.
2. Click the pencil/edit icon on the existing web app deployment.
3. Under Version, choose New version.
4. Click Deploy.
5. Keep the same `/exec` URL if Google keeps the existing deployment URL.

If Google gives you a brand-new `/exec` URL, update `VITE_GOOGLE_APPS_SCRIPT_URL` in Vercel and redeploy.

---

## 7. How the Home and Events pages work

### Home page

The Home page sorts all future events by start date and keeps only the first upcoming event for each `locationId`.

Example future rows:

Arlington - January 10
Arlington - March 14
Amarillo - February 7
Schertz - February 21

The Home page shows:

Arlington - January 10
Amarillo - February 7
Schertz - February 21

It does not show the March Arlington show on Home because the January Arlington show is the next Arlington date.

### Events page

The Events page shows all future expo dates, including multiple Arlington dates.

### Expiration

You do not delete old events. After the event's `endDate` passes, it automatically stops appearing on the website.

---

## 8. Vendor table pricing built into the form

Arlington and Amarillo:
1 8ft table = $125
2 8ft tables = $225
3 8ft tables = $275
4 8ft tables = $325
5 8ft tables = $375
6 8ft tables = $425
7 8ft tables = $475
8 8ft tables = $525

Schertz:
1 6ft table = $115
2 6ft tables = $215
3 6ft tables = $265
4 6ft tables = $315
5 6ft tables = $365
6 6ft tables = $415
7 6ft tables = $465
8 6ft tables = $515

North Richland Hills:
1 8ft table = $150
2 8ft tables = $250
3 8ft tables = $325
4 8ft tables = $375
5 8ft tables = $425
6 8ft tables = $475
7 8ft tables = $525
8 8ft tables = $575
