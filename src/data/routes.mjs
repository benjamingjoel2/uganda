// Gorilla-and-chimp combiner data. Road and flight times are planning
// estimates (hours) and are listed in FACTS-TO-VERIFY.md.

// Stops in west-bound order from Entebbe. The planner sorts chosen stops by
// `order` (reversed when starting from Kigali).
export const stops = [
  { id: 'jinja', name: 'Jinja, source of the Nile', short: 'Jinja', order: 1, nights: 2, airstrip: null, optional: true, page: 'jinja' },
  { id: 'murchison', name: 'Murchison Falls', short: 'Murchison', order: 2, nights: 2, airstrip: 'PAK', transfer: 0.5, optional: true, page: 'murchison-falls' },
  { id: 'kibale', name: 'Kibale Forest (chimpanzees)', short: 'Kibale', order: 3, nights: 2, airstrip: 'KSE', transfer: 1.5, page: 'kibale' },
  { id: 'qenp', name: 'Queen Elizabeth National Park', short: 'Queen Elizabeth', order: 4, nights: 2, airstrip: 'KSE', transfer: 1, optional: true, page: 'queen-elizabeth' },
  { id: 'buhoma', name: 'Bwindi · Buhoma (gorillas)', short: 'Buhoma', order: 5, nights: 3, airstrip: 'KHI', transfer: 1.25, sector: true, page: 'bwindi' },
  { id: 'ruhija', name: 'Bwindi · Ruhija (gorillas)', short: 'Ruhija', order: 5, nights: 3, airstrip: 'KHI', transfer: 2.75, sector: true, page: 'bwindi' },
  { id: 'rushaga', name: 'Bwindi · Rushaga (gorillas)', short: 'Rushaga', order: 5, nights: 3, airstrip: 'KIS', transfer: 1.25, sector: true, page: 'bwindi' },
  { id: 'nkuringo', name: 'Bwindi · Nkuringo (gorillas)', short: 'Nkuringo', order: 5, nights: 3, airstrip: 'KIS', transfer: 1.25, sector: true, page: 'bwindi' },
  { id: 'mgahinga', name: 'Mgahinga (golden monkeys)', short: 'Mgahinga', order: 6, nights: 2, airstrip: 'KIS', transfer: 0.5, optional: true, page: 'mgahinga' },
  { id: 'bunyonyi', name: 'Lake Bunyonyi (rest)', short: 'Bunyonyi', order: 7, nights: 2, airstrip: 'KIS', transfer: 2, optional: true, page: 'lake-bunyonyi' },
];

export const gateways = {
  entebbe: { id: 'entebbe', name: 'Entebbe (international airport)', short: 'Entebbe', airstrip: 'EBB', transfer: 0 },
  kigali: { id: 'kigali', name: 'Kigali, Rwanda (international airport)', short: 'Kigali', airstrip: null, transfer: 0 },
};

// Approximate road hours between places (unordered pairs).
export const road = {
  'entebbe|jinja': 3, 'entebbe|murchison': 5.5, 'entebbe|kibale': 6, 'entebbe|qenp': 7,
  'entebbe|buhoma': 9.5, 'entebbe|ruhija': 8.5, 'entebbe|rushaga': 9.5, 'entebbe|nkuringo': 10,
  'entebbe|mgahinga': 9.5, 'entebbe|bunyonyi': 7.5, 'entebbe|kigali': 9,
  'jinja|murchison': 6, 'jinja|kibale': 8, 'jinja|qenp': 9, 'jinja|buhoma': 11, 'jinja|ruhija': 10.5,
  'jinja|rushaga': 11, 'jinja|nkuringo': 11.5, 'jinja|mgahinga': 11, 'jinja|bunyonyi': 9.5, 'jinja|kigali': 11,
  'murchison|kibale': 6.5, 'murchison|qenp': 8, 'murchison|buhoma': 10, 'murchison|ruhija': 10,
  'murchison|rushaga': 11, 'murchison|nkuringo': 11, 'murchison|mgahinga': 11.5, 'murchison|bunyonyi': 10, 'murchison|kigali': 12,
  'kibale|qenp': 2.5, 'kibale|buhoma': 6, 'kibale|ruhija': 5.5, 'kibale|rushaga': 7, 'kibale|nkuringo': 7.5,
  'kibale|mgahinga': 8, 'kibale|bunyonyi': 6.5, 'kibale|kigali': 9,
  'qenp|buhoma': 4, 'qenp|ruhija': 4, 'qenp|rushaga': 6, 'qenp|nkuringo': 6.5, 'qenp|mgahinga': 6.5,
  'qenp|bunyonyi': 5, 'qenp|kigali': 8,
  'buhoma|mgahinga': 5, 'buhoma|bunyonyi': 4.5, 'buhoma|kigali': 7.5,
  'ruhija|mgahinga': 3.5, 'ruhija|bunyonyi': 2.5, 'ruhija|kigali': 6.5,
  'rushaga|mgahinga': 2, 'rushaga|bunyonyi': 1.75, 'rushaga|kigali': 4.5,
  'nkuringo|mgahinga': 1.5, 'nkuringo|bunyonyi': 2.5, 'nkuringo|kigali': 5,
  'mgahinga|bunyonyi': 2, 'mgahinga|kigali': 4, 'bunyonyi|kigali': 3.5,
};

// Approximate scheduled flight times (hours) between Ugandan airstrips.
export const airstrips = { EBB: 'Entebbe', PAK: 'Pakuba', KSE: 'Kasese', KHI: 'Kihihi', KIS: 'Kisoro' };
export const flights = {
  'EBB|PAK': 1.25, 'EBB|KSE': 1.25, 'EBB|KHI': 1.75, 'EBB|KIS': 1.75,
  'KSE|KHI': 0.5, 'KSE|KIS': 0.75, 'KHI|KIS': 0.5, 'PAK|KSE': 1,
};
