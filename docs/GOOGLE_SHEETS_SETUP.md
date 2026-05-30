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
dates
startDate
endDate
venue
address
hours
adultAdmission
childAdmission
kids6UnderAdmission
ticketLink
vendorListLink
registerLink
status
featured

Important:

Use dates like 2027-07-10 in startDate and endDate.
Use active or inactive in status.
Use yes in featured if you want that show emphasized.
Kids 6 and under are free. Put Free in kids6UnderAdmission.
Each location can have its own ticketLink.
Each location can have its own vendorListLink.
registerLink can be blank. The site will use the built-in registration form.

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

arlington-jul-2026,nrh-nov-2026

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

For local testing, create a file named .env and add:

VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

For Vercel or Netlify, add this as an environment variable in the project settings:

VITE_GOOGLE_APPS_SCRIPT_URL

Then redeploy the site.


## Vendor table pricing currently built into the form

Arlington and Amarillo:
1 8ft table = $125
2 8ft tables = $225
3 8ft tables = $275
4 8ft tables = $325
Additional 8ft tables = $50 each

Schertz:
1 6ft table = $115
2 6ft tables = $215
3 6ft tables = $265
4 6ft tables = $315
Additional 6ft tables = $50 each

North Richland Hills:
1 8ft table = $150
2 8ft tables = $250
3 8ft tables = $325
4 8ft tables = $375
Additional 8ft tables = $50 each

Important: the vendor form now submits Show ID, Show Name, Show Dates, and Show Venue so multiple Arlington shows can be separated clearly.
