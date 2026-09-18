Skip to content
kayleec91
lonestarreptileexpos
Repository navigation
Code
Issues
Pull requests
Agents
Actions
Projects
Security and quality
lonestarreptileexpos/src/lib
/
data.ts
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

No wrap
Editing data.ts file contents
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
export interface Event {
  id: string;
  name: string;
  city: string;
  state: string;
  locationId?: string;
  dates: string;
  startDate: string;
  endDate: string;
  venue: string;
  address: string;
  hours: string;
  admission: {
    adult: number;
    child: number;
    under5: string;
  };
  ticketLink: string;
  vendorListLink: string;
  registerLink: string;
  mapEmbed?: string;
  status?: "active" | "inactive";
  featured?: boolean;
  faqs: Array<{ question: string; answer: string }>;
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string;
  eventIds: string[];
  website?: string;
  instagram?: string;
}

Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
