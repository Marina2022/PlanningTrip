export const EVENT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

export const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`, `July`, `Aug`];

export const EVENT_TYPES_IN = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

export const EVENT_TYPES_TO = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

export const EVENT_OFFERS = [
  {
    type: `taxi`,
    offers: [
      {
        title: `Upgrade to a business class`,
        price: 120,
      },
      {
        title: `Choose the radio station`,
        price: 30,
      },
    ],
  },
  {
    type: `transport`,
    offers: [
      {
        title: `Upgrade to a business class`,
        price: 120,
      },
      {
        title: `Choose the radio station`,
        price: 30,
      },
    ],
  },
  {
    type: `check-in`,
    offers: [
      {
        title: `Upgrade to a business class`,
        price: 120,
      },
      {
        title: `Choose the radio station`,
        price: 30,
      },
    ],
  },
  {
    type: `bus`,
    offers: [
      {
        title: `Upgrade to a business class`,
        price: 180,
      },
      {
        title: `Choose the radio station`,
        price: 30,
      },
    ],
  },
  {
    type: `flight`,
    offers: [
      {
        title: `Upgrade to a business class`,
        price: 170,
      },
      {
        title: `Free drinks`,
        price: 100,
      },
      {
        title: `Blankets`,
        price: 50,
      },
      {
        title: `TV`,
        price: 10,
      },
    ],
  },
  {
    type: `train`,
    offers: [
      {
        title: `Lunch`,
        price: 220,
      },
      {
        title: `TV`,
        price: 20,
      },
    ],
  },
  {
    type: `drive`,
    offers: [
      {
        title: `good company`,
        price: 100,
      },
      {
        title: `conditioner`,
        price: 20,
      },
      {
        title: `music`,
        price: 205,
      },
    ],
  },
];

export const filters = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};
