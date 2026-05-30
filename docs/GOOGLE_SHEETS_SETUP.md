# Google Sheets setup for Lone Star Reptile Expos

## 1. Create the Google Sheet

Create a Google Sheet named:

Lone Star Reptile Expos Website Data

Create three tabs with these exact names:

Events
Vendors
Vendor Submissions

## 2. Events tab headers

Put these headers in row 1:

id
name
city
state
startDate
endDate
venue
address
ticketLink
status
featured

Only startDate and endDate are needed for the date display. The website will automatically convert:

2026-07-11 and 2026-07-12

to:

July 11th & 12th, 2026

Important:

Use dates like 2027-07-10 in startDate and endDate.
Use active or inactive in status.
Use yes in featured if you want that show emphasized.
Each location can have its own ticketLink.
Vendor registration links are built into the website automatically.
Vendor lists are pulled from the Vendors tab.
Admission defaults to Adults $10, Children (7-12) $5, Kids 6 and under free.
Hours default to Sat 10am-5pm and Sun 10am-4pm and only show on the event detail page.

Example row:

Arlington
Arlington Reptile Expo
Arlington
TX
2026-07-11
2026-07-12
Knights of Columbus
2625 S Cooper St, Arlington, TX 76015
https://www.tickettailor.com/events/lonestarreptileexpos/811240
active
yes

## 3. Vendors tab headers

Put these headers in row 1:

id
name
category
description
eventIds
website
instagram

Use event IDs separated by commas in eventIds, like:

Arlington,nrh-2026-11-14

The eventIds value must match the id from the Events tab exactly.

If description is blank, the site leaves it blank. It will not show “Vendor details coming soon.”

## 4. Vendor Submissions tab headers

Put these headers in row 1:

Timestamp
Business Name
Contact Name
Email
Phone
Show ID
Show Name
Show Dates
Show Venue
Table Type
Category
Animals Products
Website
Message
Status

The form submits Show ID, Show Name, Show Dates, and Show Venue so multiple Arlington dates stay separate.

## 5. Add the Apps Script

In the Google Sheet, go to:

Extensions > Apps Script

Paste the full code from:

scripts/google-apps-script.js

Then click:

Deploy > New deployment > Web app

Use these settings:

Execute as: Me
Who has access: Anyone

Copy the Web App URL that ends in /exec.

## 6. Connect the website

For Vercel, add this as an environment variable in the project settings:

VITE_GOOGLE_APPS_SCRIPT_URL

The value should be your Apps Script URL ending in /exec.

Then redeploy the site.

## Vendor table pricing built into the form

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
