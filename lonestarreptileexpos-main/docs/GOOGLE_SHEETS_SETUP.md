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
under5Admission
ticketLink
vendorListLink
registerLink
status
featured

Important:

Use dates like 2027-07-10 in startDate and endDate.
Use active or inactive in status.
Use yes in featured if you want that show emphasized.
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
Show
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
