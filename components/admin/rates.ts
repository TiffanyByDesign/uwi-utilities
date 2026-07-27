/**
 * Admin — utility rate tables. Electricity follows the real JPS tariff shape;
 * water is a placeholder to be swapped for the real NWC tariff before use.
 * These are the same figures the bill maths uses, kept here for editing.
 */

export type RateLine = { key: string; label: string; detail: string; amount: number }
export type RateGroup = { title: string; lines: RateLine[] }
export type UtilityRates = {
  id: 'electricity' | 'water'
  name: string
  provider: string
  effective: string
  placeholder: boolean
  groups: RateGroup[]
}

export const RATES: Record<'electricity' | 'water', UtilityRates> = {
  electricity: {
    id: 'electricity',
    name: 'Electricity',
    provider: 'Jamaica Public Service (JPS)',
    effective: '1 June 2026',
    placeholder: false,
    groups: [
      {
        title: 'Energy — tiered',
        lines: [
          { key: 'e1', label: 'Energy 1st', detail: 'first 100 kWh', amount: 8.31 },
          { key: 'e2', label: 'Energy next', detail: 'each kWh after 100', amount: 23.86 },
        ],
      },
      {
        title: 'Pass-throughs — every kWh',
        lines: [
          { key: 'fuel', label: 'Fuel charge', detail: 'per kWh, all consumption', amount: 24.335 },
          { key: 'ipp', label: 'IPP charge', detail: 'per kWh, all consumption', amount: 11.63 },
        ],
      },
    ],
  },
  water: {
    id: 'water',
    name: 'Water',
    provider: 'National Water Commission (NWC)',
    effective: '1 April 2026',
    placeholder: true,
    groups: [
      {
        title: 'Service charge — fixed',
        lines: [{ key: 'rental', label: 'Meter rental', detail: 'per account per month', amount: 1132 }],
      },
      {
        title: 'Consumption — per 1,000 gal',
        lines: [
          { key: 'b1', label: 'Band 1', detail: 'first 3,000 gal', amount: 950 },
          { key: 'b2', label: 'Band 2', detail: '3,001–9,000 gal', amount: 1890 },
          { key: 'b3', label: 'Band 3', detail: 'each 1,000 gal after 9,000', amount: 2640 },
        ],
      },
      {
        title: 'Adjustment',
        lines: [{ key: 'x', label: 'X-Factor', detail: 'per 1,000 gal', amount: 210 }],
      },
    ],
  },
}
