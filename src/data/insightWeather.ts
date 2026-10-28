import type { InsightWeatherResponse } from '../types/nasa';

// Archived NASA response: https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0
// Retrieved on 2026-10-28. NASA returned sols from 2020-10-20 through 2020-10-26.
export const insightWeatherArchive: InsightWeatherResponse = {
  '675': {
    'Last_UTC': '2020-10-20T19:11:55Z',
    'Northern_season': 'early winter',
    'Southern_season': 'early summer',
    'AT': {
      'av': -62.314,
      'ct': 177556,
      'mn': -96.872,
      'mx': -15.908,
    },
    'PRE': {
      'av': 750.563,
      'ct': 887776,
      'mn': 722.0901,
      'mx': 768.791,
    },
    'HWS': {
      'av': 7.233,
      'ct': 88628,
      'mn': 1.051,
      'mx': 22.455,
    },
    'WD': {
      'most_common': {
        'compass_point': 'WNW',
      },
    },
  },
  '676': {
    'Last_UTC': '2020-10-21T19:51:31Z',
    'Northern_season': 'early winter',
    'Southern_season': 'early summer',
    'AT': {
      'av': -62.812,
      'ct': 177554,
      'mn': -96.912,
      'mx': -16.499,
    },
    'PRE': {
      'av': 749.09,
      'ct': 887777,
      'mn': 722.473,
      'mx': 767.1426,
    },
    'HWS': {
      'av': 8.526,
      'ct': 88250,
      'mn': 1.11,
      'mx': 26.905,
    },
    'WD': {
      'most_common': {
        'compass_point': 'WNW',
      },
    },
  },
  '677': {
    'Last_UTC': '2020-10-22T20:31:06Z',
    'Northern_season': 'mid winter',
    'Southern_season': 'mid summer',
    'AT': {
      'av': -63.056,
      'ct': 177556,
      'mn': -97.249,
      'mx': -16.853,
    },
    'PRE': {
      'av': 748.698,
      'ct': 887776,
      'mn': 720.5873,
      'mx': 767.4249,
    },
    'HWS': {
      'av': 7.887,
      'ct': 88610,
      'mn': 0.511,
      'mx': 23.197,
    },
    'WD': {
      'most_common': {
        'compass_point': 'WNW',
      },
    },
  },
  '678': {
    'Last_UTC': '2020-10-23T21:10:41Z',
    'Northern_season': 'mid winter',
    'Southern_season': 'mid summer',
    'AT': {
      'av': -62.562,
      'ct': 177556,
      'mn': -97.728,
      'mx': -9.055,
    },
    'PRE': {
      'av': 743.741,
      'ct': 887777,
      'mn': 717.7254,
      'mx': 760.2834,
    },
    'HWS': {
      'av': 5.246,
      'ct': 86963,
      'mn': 0.244,
      'mx': 18.399,
    },
    'WD': {
      'most_common': {
        'compass_point': 'WNW',
      },
    },
  },
  '679': {
    'Last_UTC': '2020-10-24T21:50:16Z',
    'Northern_season': 'mid winter',
    'Southern_season': 'mid summer',
    'AT': {
      'av': -62.551,
      'ct': 177554,
      'mn': -96.644,
      'mx': -11.561,
    },
    'PRE': {
      'av': 744.529,
      'ct': 887776,
      'mn': 719.4178,
      'mx': 763.2724,
    },
    'HWS': {
      'av': 5.565,
      'ct': 87171,
      'mn': 0.231,
      'mx': 19.409000000000002,
    },
    'WD': {
      'most_common': {
        'compass_point': 'WNW',
      },
    },
  },
  '680': {
    'Last_UTC': '2020-10-25T22:29:51Z',
    'Northern_season': 'mid winter',
    'Southern_season': 'mid summer',
    'AT': {
      'av': -61.789,
      'ct': 168902,
      'mn': -96.811,
      'mx': -15.298,
    },
    'PRE': {
      'av': 743.99,
      'ct': 887767,
      'mn': 717.1398,
      'mx': 764.0093,
    },
    'HWS': {
      'av': 6.517,
      'ct': 88478,
      'mn': 0.275,
      'mx': 24.235,
    },
    'WD': {
      'most_common': {
        'compass_point': 'WNW',
      },
    },
  },
  '681': {
    'Last_UTC': '2020-10-26T23:09:26Z',
    'Northern_season': 'mid winter',
    'Southern_season': 'mid summer',
    'AT': {
      'av': -62.434,
      'ct': 88778,
      'mn': -95.447,
      'mx': -4.444,
    },
    'PRE': {
      'av': 743.55,
      'ct': 887777,
      'mn': 718.463,
      'mx': 760.2244,
    },
    'HWS': {
      'av': 5.632,
      'ct': 87184,
      'mn': 0.228,
      'mx': 18.577,
    },
    'WD': {
      'most_common': {
        'compass_point': 'WNW',
      },
    },
  },
  'sol_keys': [
    '675',
    '676',
    '677',
    '678',
    '679',
    '680',
    '681',
  ],
};
