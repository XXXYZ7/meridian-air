/* ============================================================
   SITE CONFIG: the only file the client needs to edit.
   Every value marked CHANGE ME is a placeholder.
   Leave a value empty ('') to hide or disable that feature.
   ============================================================ */
window.SITE = {

  company: {
    name: 'Meridian Air',                       // CHANGE ME: shown in header, footer, page titles
    legalName: 'Meridian Air LLC',              // CHANGE ME: used on Privacy and Terms
    address: '8008 Herb Kelleher Way, Dallas, TX 75235', // CHANGE ME: real mailing address
    phone: '(214) 555-0142',                    // CHANGE ME
    email: 'ops@meridianair.example',           // CHANGE ME: where enquiries and legal contact go
    hours: 'Ops desk staffed 24/7',             // CHANGE ME
    baseCode: 'KDAL',                           // CHANGE ME: home-base airport (must exist in airports below)
    logo: '',                                   // e.g. 'assets/logo.svg' or 'assets/logo.png'. Empty uses the default mark
    social: { instagram: '', linkedin: '', facebook: '' }  // full URLs, optional
  },

  brand: {
    accent: '#0b6bcb',        // buttons and links on light backgrounds
    accentOnDark: '#5aaeff',  // accent on the dark header, hero and dark theme
    hero: '#0a1522',          // dark header, hero and footer background
    heroImage: ''             // e.g. 'assets/hero.jpg'. Empty keeps the plain dark hero
  },

  hero: {
    eyebrow: 'Part 135 charter · Part 141 flight school',
    title: 'Texas charter. Real flight training.',
    lead: 'Turboprops and light jets out of Dallas Love Field, with a flight school on the same ramp. Request a quote in a minute or book a discovery flight this week.',
    showBoard: true           // sample departures board. Set false for a real site unless you feed real data
  },

  /* Contact form. Create a free form at formspree.io, then paste its URL here. */
  form: {
    endpoint: '',             // CHANGE ME: e.g. 'https://formspree.io/f/abcdwxyz'
    subject: 'New website enquiry',
    interests: ['Charter', 'Discovery flight', 'Flight training program', 'Pilot careers']
  },

  /* Analytics. Plausible needs no cookie banner. Google Analytics shows a consent banner. */
  analytics: {
    plausibleDomain: '',      // CHANGE ME: e.g. 'meridianair.com'
    gaId: ''                  // optional: e.g. 'G-XXXXXXXXXX'
  },

  pricing: {
    fboFee: 450,              // airport and FBO fees per landing
    segmentFee: 5.5,          // federal segment fee per flight segment (confirm current amount)
    exciseTax: 0.075,         // federal excise tax on charter transportation
    minHours: 1,              // minimum billable flight hours
    note: 'One-way estimate. Final price is confirmed in your written quote.'
  },

  /* Charter fleet. kt = cruise speed, rng = range in nm, rate = $ per flight hour.
     photo: path like 'assets/king-air.jpg' (16:9 works best). Empty hides the photo. */
  fleet: [
    { code: 'B350', name: 'King Air 350',   seats: 9, kt: 312, rng: 1700, rate: 3200, photo: '', desc: 'Roomy cabin, short-field capable. The workhorse for regional trips.' },
    { code: 'C25B', name: 'Citation CJ3',   seats: 6, kt: 416, rng: 1900, rate: 3800, photo: '', desc: 'Light jet speed for longer legs and tight schedules.' },
    { code: 'PC12', name: 'Pilatus PC-12',  seats: 8, kt: 270, rng: 1700, rate: 2400, photo: '', desc: 'One engine, big cabin, and access to small airports.' },
    { code: 'C208', name: 'Cessna Caravan', seats: 9, kt: 186, rng: 900,  rate: 2000, photo: '', desc: 'Low cost per seat for short hops and group travel.' }
  ],

  /* Airports offered in the estimator: code: [name, latitude, longitude] */
  airports: {
    KDAL: ['Dallas Love Field', 32.847, -96.852],
    KAUS: ['Austin', 30.194, -97.670],
    KHOU: ['Houston Hobby', 29.645, -95.279],
    KSAT: ['San Antonio', 29.534, -98.470],
    KOKC: ['Oklahoma City', 35.393, -97.601],
    KAPA: ['Denver Centennial', 39.570, -104.849],
    KVNY: ['Van Nuys', 34.210, -118.489],
    KTEB: ['Teterboro', 40.850, -74.061],
    KPBI: ['Palm Beach', 26.683, -80.096]
  },

  school: {
    instructorRate: 62,       // $ per dual hour
    discovery: { name: 'Discovery flight', desc: '30 min with an instructor', price: 199 },
    trainers: [ { name: 'Piper PA-28', rate: 165 }, { name: 'Diamond DA42', rate: 245 } ],
    /* total / dual = typical hours. Cost = total x trainer rate + dual x instructor rate. */
    programs: [
      { name: 'Private pilot',     desc: 'Typical 65 flight hours, 45 dual',  total: 65,  dual: 45, trainer: 0 },
      { name: 'Instrument rating', desc: 'Typical 40 hours, 35 dual',         total: 40,  dual: 35, trainer: 0 },
      { name: 'Commercial pilot',  desc: 'Typical 120 hours, 60 dual',        total: 120, dual: 60, trainer: 0 }
    ]
  },

  /* Sample departures shown in the hero board (only when hero.showBoard is true) */
  departures: [
    ['09:10', 'KDAL-KAUS', 'B350', 'Boarding'], ['10:40', 'KDAL-KHOU', 'C25B', 'On time'],
    ['12:15', 'KSAT-KDAL', 'PC12', 'On time'],  ['13:30', 'KDAL-KOKC', 'C208', 'Delayed 15m'],
    ['15:05', 'KAPA-KDAL', 'C25B', 'On time']
  ],

  legal: {
    effective: 'October 15, 2026',   // CHANGE ME: date the policies take effect
    governingState: 'Texas',         // CHANGE ME
    operatorNote: 'Charter flights are operated by Meridian Air LLC under its FAA Part 135 air carrier certificate.', // CHANGE ME
    cancellation: 'Charter cancellations made more than 72 hours before departure are refunded in full less any non-recoverable costs. Within 72 hours, the flight charge for the minimum billable time applies.', // CHANGE ME with client policy
    review: true                     // shows a "draft pending legal review" banner. Set false after a lawyer approves
  },

  dashboardUrl: 'dashboard.html'
};
