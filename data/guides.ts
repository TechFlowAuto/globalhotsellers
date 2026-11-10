export type GuideCallout = {
  label: string
  title: string
  body: string
}

export type ProductVerdict = {
  productId: string
  award: string
  bestFor: string
  whyItWins: string
  tradeoff: string
}

export type BuyerCriterion = {
  title: string
  detail: string
}

export type GuideSection = {
  title: string
  paragraphs: string[]
  criteria?: BuyerCriterion[]
}

export type Guide = {
  slug: string
  eyebrow: string
  title: string
  description: string
  updatedAt: string
  readTime: string
  category: string
  heroNote: string
  quickAnswer: string
  callout: GuideCallout
  productVerdicts: ProductVerdict[]
  sections: GuideSection[]
  skipIf: string[]
  sources: { label: string; detail: string }[]
  keywords: string[]
}

export const guides: Guide[] = [
  {
    slug: 'best-wireless-earbuds-for-iphone',
    eyebrow: 'Everyday audio · buyer’s guide',
    title: 'Best Wireless Earbuds for iPhone in 2026: Which AirPods Actually Make Sense?',
    description:
      'A practical comparison of AirPods 4 and AirPods Pro 3, plus two lower-cost alternatives, based on fit, noise control, battery trade-offs and iPhone features.',
    updatedAt: '2026-11-10',
    readTime: '8 min read',
    category: 'Everyday Tech',
    heroNote:
      'The right choice depends less on specs than on where you will wear them: a noisy commute and a quiet office call for different earbuds.',
    quickAnswer:
      'For most iPhone users, AirPods 4 are the sensible default. Choose AirPods Pro 3 only if active noise cancellation and a secure fit matter enough to justify the price jump. If wired calls and zero charging anxiety matter more, Apple EarPods remain the budget benchmark.',
    callout: {
      label: 'Start here',
      title: 'Buy for your noisiest hour, not your quietest one',
      body:
        'If your main listening happens on a train, in an open office or on a plane, noise cancellation is the feature you will notice every day. In a quiet home office, it is often money better spent on comfort or a spare charging cable.',
    },
    productVerdicts: [
      {
        productId: 'B0DGHMNQ5Z',
        award: 'Best for most people',
        bestFor: 'iPhone owners who want a clean, light everyday pair without paying Pro prices.',
        whyItWins:
          'AirPods 4 hit the practical middle ground: a pocketable case, easy switching between Apple devices and a comfortable open fit for long calls and podcasts. They are simple in the way good everyday gear should be.',
        tradeoff:
          'The open design lets in more background noise, and battery life is a session-by-session decision rather than a weekend claim.',
      },
      {
        productId: 'B0FQFB8FMG',
        award: 'Best for noisy commutes',
        bestFor: 'Frequent travelers, open-office workers and anyone who wants the world to get quieter on demand.',
        whyItWins:
          'AirPods Pro 3 add active noise cancellation and a more secure in-ear fit. For a daily train, plane or shared-office routine, that is a real quality-of-life upgrade rather than a checkbox feature.',
        tradeoff:
          'They cost more, the silicone tips need occasional cleaning, and some people simply prefer the feeling of an open-fit earbud.',
      },
      {
        productId: 'B0DCH8VDXF',
        award: 'Best no-charging option',
        bestFor: 'Calls, video meetings and listeners who are tired of managing another battery.',
        whyItWins:
          'Apple EarPods with USB-C are inexpensive, require no pairing routine and always work when the phone has power. They remain an unusually good value for calls and casual listening.',
        tradeoff:
          'No wireless freedom, no noise cancellation, and the cable is a genuine inconvenience if you move around while listening.',
      },
      {
        productId: 'B00NJ2M33I',
        award: 'Best low-cost wired alternative',
        bestFor: 'Students and budget buyers who want a lightweight on-ear option for a desk or shared room.',
        whyItWins:
          'The Sony ZX series is inexpensive and easy to keep as a backup pair. It is a useful option when earbuds feel uncomfortable or when a second pair is needed without another sizable purchase.',
        tradeoff:
          'This is a basic wired headphone, not a travel-first design. Expect modest isolation and a more utilitarian feel.',
      },
    ],
    sections: [
      {
        title: 'The four things worth comparing',
        paragraphs: [
          'Earbud specs are easy to list and easy to misread. In daily use, four things matter more than a long feature sheet: whether the fit stays comfortable, how much noise the design lets in, how many calls you take, and whether you are willing to charge another device.',
          'Start with the environment where you will wear them most. Then decide whether a secure in-ear fit, a more open fit, or a cable is the least annoying option for you.',
        ],
        criteria: [
          {
            title: 'Fit and comfort',
            detail:
              'Open-fit earbuds feel lighter for some people; sealed in-ear designs stay put better during movement. Neither is universally more comfortable.',
          },
          {
            title: 'Noise control',
            detail:
              'Passive isolation comes from the seal. Active noise cancellation adds electronics. If you commute, this is usually the first feature to prioritize.',
          },
          {
            title: 'iPhone integration',
            detail:
              'Easy pairing and device switching are useful every day. Do not pay for a feature you will not use just because it appears in a comparison table.',
          },
          {
            title: 'Charging routine',
            detail:
              'Wireless earbuds are convenient until you forget the case. A wired backup pair can be more useful than a second set of wireless buds.',
          },
        ],
      },
      {
        title: 'Which one should you buy?',
        paragraphs: [
          'Choose AirPods 4 if you mostly listen at home, on walks, or in a quiet office and want a lightweight everyday pair. Choose AirPods Pro 3 if removing background noise is the reason you are shopping. Choose wired EarPods if your priority is a dependable pair for calls, or if you dislike charging accessories.',
          'Do not buy the most expensive model automatically. A comfortable pair you actually carry will produce more value than a more capable pair left in a drawer because the fit is wrong.',
        ],
      },
      {
        title: 'What we would not overpay for',
        paragraphs: [
          'A longer spec sheet does not guarantee a better commute. Spatial audio, voice features and case design are useful only when they match how you listen. For a first pair, prioritize fit, call clarity and a charging routine you can maintain.',
          'Prices and availability change frequently on Amazon. Check the live product page and current seller before ordering, especially when comparing a sale price against a standard price.',
        ],
      },
    ],
    skipIf: [
      'You mainly need hearing protection for loud machinery; choose dedicated protective gear instead.',
      'You want a pair for intense sport and cannot tolerate an open fit; try a purpose-built sport model.',
      'You refuse to clean silicone tips; an open-fit or wired option may be less maintenance.',
    ],
    sources: [
      {
        label: 'Apple product support',
        detail: 'Official feature and compatibility information for AirPods and EarPods.',
      },
      {
        label: 'Amazon product listings',
        detail: 'Current seller, price and review information. Check the live listing because prices and availability change.',
      },
    ],
    keywords: ['best wireless earbuds for iphone', 'airpods 4 vs airpods pro', 'airpods buying guide'],
  },
  {
    slug: 'robot-vacuum-for-pet-hair-small-apartment',
    eyebrow: 'Small-space cleaning · buyer’s guide',
    title: 'Robot Vacuum for Pet Hair in a Small Apartment: What Actually Helps',
    description:
      'A realistic guide to choosing a robot vacuum for pet hair when floor space is limited, including the one model worth considering from our current catalogue and the limits no robot can solve.',
    updatedAt: '2026-11-10',
    readTime: '7 min read',
    category: 'Small-Space Home',
    heroNote:
      'In a small apartment, a robot vacuum is judged by what it can reach, how often it gets stuck and how much maintenance it creates, not by the size of its spec sheet.',
    quickAnswer:
      'The Shark Matrix Clean is the strongest fit in our current catalogue for a pet-owning apartment: it combines carpet and hard-floor cleaning with a self-emptying base. The bigger decision is whether you have enough clear floor and a sensible place for the base; without those, even a good robot becomes a nuisance.',
    callout: {
      label: 'Reality check',
      title: 'A robot is a maintenance tool, not a magic pet-hair eraser',
      body:
        'It reduces the frequency of full vacuuming, but hair still wraps around brushes, furniture still creates tight gaps, and the base needs a home. Measure the clutter and charging space before you compare suction numbers.',
    },
    productVerdicts: [
      {
        productId: 'B09T4YZGQR',
        award: 'Best fit in our catalogue',
        bestFor: 'Pet owners in apartments with a mix of hard floors and rugs, plus enough room for a base.',
        whyItWins:
          'The Shark Matrix Clean is designed around the practical apartment problem: pet hair on several floor types, with a self-emptying base that reduces how often you handle the bin. It is a sensible all-round choice rather than a single-surface specialist.',
        tradeoff:
          'A self-emptying base takes up space, and no robot replaces edge cleaning or manual work around tight furniture. Check the current listing for the exact included accessories and price.',
      },
    ],
    sections: [
      {
        title: 'Measure the apartment before the machine',
        paragraphs: [
          'The most common mistake is buying a robot for the rooms you wish were clear. Count the places it can cross without lifting the device: under a sofa, between chair legs, around a pet bed. If a room is dominated by cables and clutter, begin with storage and a quick floor routine.',
          'Also choose the base location first. A self-emptying robot needs a stable spot with clearance and power. If that spot does not exist, a simpler vacuum may be a better apartment purchase than a feature-heavy model.',
        ],
        criteria: [
          {
            title: 'Floor mix',
            detail:
              'A pet-owning apartment often has hard floors plus a rug or two. Prioritize a model that is not limited to one surface.',
          },
          {
            title: 'Clearance and thresholds',
            detail:
              'Check door thresholds and furniture clearance. A robot cannot clean a route it cannot physically reach.',
          },
          {
            title: 'Hair maintenance',
            detail:
              'Brushes, wheels and filters need inspection. A model that is easy to turn over and clean is more useful than one with an impressive maximum suction figure.',
          },
          {
            title: 'Base footprint',
            detail:
              'Self-emptying is convenient but takes floor and wall space. Confirm you can live with the base every day.',
          },
        ],
      },
      {
        title: 'How to make a robot useful with pets',
        paragraphs: [
          'Run a short manual pickup before the robot starts, especially in the first week. Pet hair collects fastest where the animal rests, and a robot works better on a floor that is not already carrying loose toys, cords or food bowls.',
          'Use scheduled runs for maintenance cleaning, not as a replacement for the occasional deep clean. Keep the brush and filter clean, and check the bin or base as part of a weekly routine.',
        ],
      },
      {
        title: 'When a robot is the wrong purchase',
        paragraphs: [
          'If your pet regularly has accidents, if the apartment has many loose cables and low-clearance furniture, or if you cannot place a base without blocking a walkway, a cordless stick vacuum may be the more useful first purchase.',
          'Prices, model versions and included accessories change on Amazon. Verify the listing before buying, especially if a bundle or capacity claim is central to your decision.',
        ],
      },
    ],
    skipIf: [
      'Your apartment has no clear route between rooms or no viable spot for a charging base.',
      'You need to clean stairs as a primary task; a robot is not the right tool.',
      'You want zero maintenance; brushes and filters still need attention.',
    ],
    sources: [
      {
        label: 'Manufacturer product listing',
        detail: 'Current model features, included parts and compatibility information.',
      },
      {
        label: 'Amazon product listing',
        detail: 'Current price, seller and buyer review information. Verify details before ordering.',
      },
    ],
    keywords: ['robot vacuum for pet hair apartment', 'shark matrix clean review', 'best robot vacuum small apartment'],
  },
  {
    slug: 'small-home-office-power-strip-setup',
    eyebrow: 'Desk setup · practical guide',
    title: 'A Cleaner Small Home-Office Desk: Power, Cables and One Sensible Upgrade',
    description:
      'A simple buying guide for reducing desk cable clutter without buying a new desk, including how to choose a power strip and what to fix before adding more accessories.',
    updatedAt: '2026-11-10',
    readTime: '6 min read',
    category: 'Small-Space Home',
    heroNote:
      'A tidy desk is usually the result of fewer devices and better routing, not more organizers. Start with power placement and only then buy hardware.',
    quickAnswer:
      'For a compact desk, a surge protector with widely spaced outlets and USB ports can remove a surprising amount of clutter. The YISHU 6 ft power strip is a practical starting point in our current catalogue, but first count your plugs and decide where the strip will live.',
    callout: {
      label: 'Before you buy',
      title: 'Count plugs, then count again',
      body:
        'Include the charger you forgot: monitor, laptop, lamp, phone, speaker, router or watch. A strip with enough outlets but no room for bulky adapters is still the wrong strip.',
    },
    productVerdicts: [
      {
        productId: 'B09PDLBFKY',
        award: 'Practical desk upgrade',
        bestFor: 'Small desks with several low-power devices and a need for both standard outlets and USB charging.',
        whyItWins:
          'The YISHU strip offers eight widely spaced outlets, four USB ports and a six-foot cord. The spacing matters: it lets bulky adapters share the strip instead of blocking adjacent sockets.',
        tradeoff:
          'It is still a power strip, not a cable-management system. You will need a plan for routing the cord and placing the strip where it is reachable but not underfoot.',
      },
    ],
    sections: [
      {
        title: 'Fix the layout before buying organizers',
        paragraphs: [
          'Move the power source to the back edge of the desk, then decide which devices truly need to stay plugged in. A charger that is only used occasionally can live in a drawer. The goal is fewer cables crossing the work surface, not more boxes hiding the same clutter.',
          'Keep liquids and loose cables away from the power strip. If the desk is shared with children or pets, place the strip where it cannot be pulled or stepped on.',
        ],
        criteria: [
          {
            title: 'Outlet spacing',
            detail:
              'Bulky adapters need room. Widely spaced outlets are often more useful than a higher outlet count in a compact strip.',
          },
          {
            title: 'Cord length',
            detail:
              'Measure from the wall outlet to the desk before choosing. An overly long cord creates its own clutter.',
          },
          {
            title: 'USB demand',
            detail:
              'USB ports reduce charger clutter, but check what each port can power. Do not assume every port supports fast charging.',
          },
          {
            title: 'Placement and safety',
            detail:
              'The strip should be reachable, ventilated and away from foot traffic. Never daisy-chain power strips.',
          },
        ],
      },
      {
        title: 'A five-minute cable routine',
        paragraphs: [
          'Unplug everything, place the strip, then reconnect devices one at a time from least-used to most-used. Use the shortest cable that reaches. Label chargers you cannot identify, and remove any cable you have not used in the last month.',
          'If cables still cross the desk, route them along the back edge before buying clips or trays. Hardware should solve a specific remaining problem, not substitute for deciding where things belong.',
        ],
      },
      {
        title: 'What not to buy yet',
        paragraphs: [
          'Do not start with a large under-desk cable tray if your desk has no clearance or if you move the setup often. Do not buy a USB hub solely for cable management until you know which devices need data rather than power.',
          'Verify the power strip’s current rating and safety markings on the live product listing. Price and availability can change, and the listing should be checked before purchase.',
        ],
      },
    ],
    skipIf: [
      'You have only one or two devices; a single wall charger may be simpler and safer.',
      'You need to power high-current appliances; use a product and circuit rated for that load.',
      'Your desk has no safe place for a strip; solve the room layout first.',
    ],
    sources: [
      {
        label: 'Product safety guidance',
        detail: 'Use only correctly rated equipment and avoid daisy-chaining power strips.',
      },
      {
        label: 'Amazon product listing',
        detail: 'Current outlet layout, electrical rating, price and seller information.',
      },
    ],
    keywords: ['small home office desk setup', 'power strip for desk', 'desk cable management'],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug)
}
