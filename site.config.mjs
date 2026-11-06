// ─────────────────────────────────────────────────────────────────────────────
// Brand configuration. Everything that identifies the business lives here:
// name, contact details, address, URLs, palette and fonts. Change these values
// and run `npm run build` to re-brand the whole site.
// ─────────────────────────────────────────────────────────────────────────────
export default {
  brand: {
    name: 'Nile Source Safaris',
    shortName: 'Nile Source',
    tagline: 'Uganda, from the source.',
    description:
      'Uganda planned by forest sector, river and swamp: gorillas in Bwindi, chimps in Kibale, the Nile at its source and the birds that make this the primate and birding capital of Africa.',
  },

  // Canonical domain (used for canonical links, sitemap and JSON-LD).
  siteUrl: 'https://nilesourcesafaris.tourground.com',
  // Where the site is currently deployed (Vercel). Filled in after deployment.
  liveUrl: 'https://uganda-delta.vercel.app',

  contact: {
    // The only email address used anywhere on the site.
    email: 'nilesourcesafaris@tourground.com',
  },

  // Registered business address: Spaces, AHA Towers, Kampala (IWG's premium
  // coworking brand in Nakasero, Kampala's central business district).
  address: {
    venue: 'Spaces AHA Towers',
    line1: '4th Floor, AHA Towers',
    street: 'Plot 7 Lourdel Road',
    district: 'Nakasero',
    city: 'Kampala',
    country: 'Uganda',
    countryCode: 'UG',
    geo: { lat: 0.3312724, lng: 32.5784651 },
  },

  // Enquiry form delivery. FormSubmit forwards submissions to the email above
  // (no account needed; the first submission sends a one-time activation email).
  form: {
    endpoint: 'https://formsubmit.co/nilesourcesafaris@tourground.com',
    ajaxEndpoint: 'https://formsubmit.co/ajax/nilesourcesafaris@tourground.com',
  },

  // Theme: CROWN AND PAPYRUS. All text/ground pairs used are WCAG AA (see README).
  palette: {
    mist: '#F2F1EC', // page ground (morning mist)
    forest: '#16201A', // forest dark: text, header, dark bands, footer
    crane: '#575C61', // crane grey: secondary text, grey bands
    papyrus: '#3B5E2B', // papyrus green: links, buttons, focus, green bands
    crown: '#E2B23C', // crown gold: accent on dark grounds only
    crownInk: '#7E5C0E', // gold-family labels on light grounds
    reed: '#DCE3C6', // young reed: alternate ground
    swamp: '#4E3B2A', // swamp-water brown: warm dark bands
    line: 'rgba(22,32,26,.16)',
  },

  fonts: {
    display: { family: 'Rozha One', file: 'rozha-one-400.woff2', weight: 400 },
    text: [
      { family: 'Mukta', file: 'mukta-400.woff2', weight: 400 },
      { family: 'Mukta', file: 'mukta-600.woff2', weight: 600 },
    ],
  },
};
