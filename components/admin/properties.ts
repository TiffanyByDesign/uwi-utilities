/**
 * Admin — property register. The key model point: METERS BELONG TO THE PROPERTY
 * (the location), not the resident. A resident is a time-bounded tenancy link;
 * when they move, the tenancy ends and the meters stay put — the next reading is
 * the handover baseline for whoever moves in.
 * Design-only prototype.
 */

export type Occupancy = 'occupied' | 'vacant'

export type Tenancy = { resident: string; from: string; to: string | null }

export type Property = {
  code: string
  address: string
  hall: string
  rooms: number
  occupancy: Occupancy
  resident: string | null
  since: string | null
  elecMeter: string
  waterMeter: string
  elecReading: number
  waterReading: number
  history: Tenancy[]
}

export const PROPERTIES: Property[] = [
  { code: 'IRV-A11', address: 'Block A, House 11', hall: 'Irvine Hall', rooms: 3, occupancy: 'occupied', resident: 'Danielle Foster', since: '02 Sep 2025', elecMeter: 'E-123-40130-124', waterMeter: 'W-556-90212-087', elecReading: 12_475, waterReading: 187_900, history: [{ resident: 'Danielle Foster', from: 'Sep 2025', to: null }, { resident: 'Renee Blake', from: 'Sep 2023', to: 'Jun 2025' }] },
  { code: 'IRV-A10', address: 'Block A, House 10', hall: 'Irvine Hall', rooms: 3, occupancy: 'occupied', resident: 'Francis McKoy', since: '02 Sep 2025', elecMeter: 'E-123-40129-124', waterMeter: 'W-556-90211-087', elecReading: 12_030, waterReading: 182_300, history: [{ resident: 'Francis McKoy', from: 'Sep 2025', to: null }, { resident: 'Damion Clarke', from: 'Sep 2023', to: 'Jun 2025' }] },
  { code: 'IRV-B03', address: 'Block B, House 3', hall: 'Irvine Hall', rooms: 3, occupancy: 'vacant', resident: null, since: null, elecMeter: 'E-123-40131-124', waterMeter: 'W-556-90213-087', elecReading: 15_640, waterReading: 201_780, history: [{ resident: 'Tessa Morgan', from: 'Sep 2023', to: 'Jun 2026' }] },
  { code: 'PRE-C02', address: 'Block C, House 2', hall: 'Preston Hall', rooms: 3, occupancy: 'occupied', resident: 'Marcus Grant', since: '02 Sep 2025', elecMeter: 'E-123-40145-124', waterMeter: 'W-556-90225-087', elecReading: 9_820, waterReading: 164_500, history: [{ resident: 'Marcus Grant', from: 'Sep 2025', to: null }] },
  { code: 'TAY-A02', address: 'Block A, House 2', hall: 'Taylor Hall', rooms: 3, occupancy: 'occupied', resident: 'Andre Campbell', since: '02 Sep 2025', elecMeter: 'E-123-40160-124', waterMeter: 'W-556-90240-087', elecReading: 22_010, waterReading: 220_400, history: [{ resident: 'Andre Campbell', from: 'Sep 2025', to: null }] },
]

export function propertyByCode(code: string) {
  return PROPERTIES.find((p) => p.code.toLowerCase() === code.toLowerCase())
}
