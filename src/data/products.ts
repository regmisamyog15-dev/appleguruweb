import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'Pro power, drawn in titanium.',
    description: 'The new Pro Max arrives with a refined camera system, a larger canvas for creation, and the kind of battery life that makes a long day feel short.',
    priceRange: 'Rs. 2.35 Lakh – 2.75 Lakh',
    featured: true,
    editorialHighlight: 'New arrival',
    image: '/assets/stitch/ultra_premium_photorealistic_product_campaign_featuring_the_iphone_17_pro_max..png',
    colors: [{ name: 'Graphite Titanium', hex: '#737982' }, { name: 'Blue Titanium', hex: '#3b6fa8' }],
    keySpecs: ['ProMotion display with Always-On', 'Next-generation Pro silicon', 'Pro camera system with optical zoom', 'USB-C connectivity'],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty & Guru Care'
  },
  {
    id: 'iphone-air',
    name: 'iPhone Air',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'Lighter than your expectations.',
    description: 'A remarkably thin iPhone with a bright edge-to-edge display, effortless camera capture, and the quiet confidence of a phone made for everyday carry.',
    priceRange: 'Rs. 1.55 Lakh – 1.85 Lakh',
    featured: true,
    editorialHighlight: 'The light edit',
    image: '/assets/stitch/ultra_minimal_premium_product_photograph_of_the_iphone_air_emphasizing_its.png',
    colors: [{ name: 'Silver', hex: '#d9dde4' }, { name: 'Sky Blue', hex: '#9bb8d8' }],
    keySpecs: ['Ultra-thin aluminum design', 'Bright Super Retina display', 'All-day battery', 'USB-C connectivity'],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty & Guru Care'
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'A very good place to start.',
    description: 'Dynamic Island, a 48MP camera, and USB-C in a color-forward design that still feels unmistakably iPhone.',
    priceRange: 'Rs. 92K – 1.15 Lakh',
    featured: true,
    editorialHighlight: 'Everyday favourite',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
    colors: [{ name: 'Blue', hex: '#6b9de6' }, { name: 'Black', hex: '#181d28' }],
    keySpecs: ['6.1-inch Super Retina XDR display', 'A16 Bionic chip', '48MP main camera', 'USB-C connector'],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty'
  },
  {
    id: 'galaxy-s26',
    name: 'Galaxy S26',
    brand: 'Samsung',
    category: 'Samsung',
    tagline: 'Galaxy, your way.',
    description: 'A composed flagship with a precise camera system, Galaxy intelligence, and an S Pen-ready ecosystem that adapts to the way you work.',
    priceRange: 'Rs. 1.75 Lakh – 2.15 Lakh',
    featured: true,
    editorialHighlight: 'New Galaxy',
    image: '/assets/stitch/ultra_premium_photorealistic_product_advertisement_for_the_samsung_galaxy_s26.png',
    colors: [{ name: 'Titanium Graphite', hex: '#3f454d' }, { name: 'Titanium Blue', hex: '#385b84' }],
    keySpecs: ['Dynamic AMOLED 2X display', 'Galaxy AI features', 'Pro-grade camera array', 'Integrated S Pen'],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Samsung Warranty'
  },
  {
    id: 'galaxy-z-fold-7',
    name: 'Galaxy Z Fold 7',
    brand: 'Samsung',
    category: 'Samsung',
    tagline: 'Make room for more.',
    description: 'A thinner, brighter foldable that moves from pocket-sized phone to spacious workspace in a single considered gesture.',
    priceRange: 'Rs. 2.35 Lakh – 2.75 Lakh',
    featured: true,
    editorialHighlight: 'Form factor shift',
    image: '/assets/stitch/premium_photorealistic_product_photograph_of_the_samsung_galaxy_z_fold7._one.png',
    colors: [{ name: 'Silver Shadow', hex: '#b7b9bd' }, { name: 'Navy', hex: '#243a63' }],
    keySpecs: ['Large foldable Dynamic AMOLED display', 'Slim Armor Aluminum frame', 'Multi-window productivity', 'All-day foldable battery'],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Samsung Warranty'
  },
  // --- APPLE IPHONES ---
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'Natural titanium in your hand. The camera you rely on.',
    description: 'A 6.9-inch display with slimmer borders that disappears when you watch footage. Grade 5 titanium that feels remarkably light, paired with the tactile Camera Control button for instant framing.',
    priceRange: 'Rs. 2.15 Lakh – 2.55 Lakh',
    featured: true,
    editorialHighlight: 'Showroom Spotlight',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Desert Titanium', hex: '#bfa78f' },
      { name: 'Natural Titanium', hex: '#9c968f' },
      { name: 'White Titanium', hex: '#ebebe6' },
      { name: 'Black Titanium', hex: '#2c2c2f' }
    ],
    keySpecs: [
      '6.9" ProMotion 120Hz display with Always-On',
      'A18 Pro silicon with quiet thermal efficiency',
      '48MP Fusion camera with 5x optical telephoto',
      'Tactile Camera Control sensor button',
      'Warm Grade 5 titanium contour'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty & Guru Care'
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'Surgical capability in a phone that fits your pocket.',
    description: 'The exact same camera system and A18 Pro silicon as the Pro Max, built into a compact 6.3-inch titanium body. One of the most balanced phones Apple has ever made.',
    priceRange: 'Rs. 1.85 Lakh – 2.15 Lakh',
    featured: true,
    editorialHighlight: 'Daily Pick',
    image: 'https://images.unsplash.com/photo-1696446702183-11bf204e30eb?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Natural Titanium', hex: '#9c968f' },
      { name: 'Desert Titanium', hex: '#bfa78f' },
      { name: 'Black Titanium', hex: '#2c2c2f' },
      { name: 'White Titanium', hex: '#ebebe6' }
    ],
    keySpecs: [
      '6.3" ProMotion 120Hz display with fluid touch',
      'A18 Pro processor for everyday speed',
      '5x optical zoom tetraprism lens',
      'Action button and Camera Control',
      'Second-generation Ceramic Shield'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty & Guru Care'
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'The lightweight titanium pioneer. All-day battery.',
    description: 'The first iPhone with contoured titanium edges and universal USB-C charging. Tested by hundreds of our Chitwan customers for battery endurance that easily spans two days.',
    priceRange: 'Rs. 1.65 Lakh – 1.95 Lakh',
    featured: false,
    image: 'https://images.unsplash.com/photo-1695048065059-d4bf454bf0ce?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Natural Titanium', hex: '#9c968f' },
      { name: 'Blue Titanium', hex: '#2f3b4c' },
      { name: 'Black Titanium', hex: '#2c2c2f' }
    ],
    keySpecs: [
      '6.7" Super Retina XDR OLED ProMotion',
      'A17 Pro silicon with smooth gaming',
      '5x optical zoom telephoto camera',
      'Universal USB-C charging port',
      'Customizable Action button'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Showroom Certified & Verified'
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'Light in the palm. Sharp in every portrait.',
    description: 'Noticeably lighter than stainless steel iPhones, with smooth rounded edges that feel comfortable without a case. Crisp 3x optical portraits and USB-3 transfers.',
    priceRange: 'Rs. 1.40 Lakh – 1.65 Lakh',
    featured: false,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Natural Titanium', hex: '#9c968f' },
      { name: 'White Titanium', hex: '#ebebe6' },
      { name: 'Black Titanium', hex: '#2c2c2f' }
    ],
    keySpecs: [
      '6.1" ProMotion 120Hz display',
      'A17 Pro flagship chip',
      '48MP primary sensor with multi-focal lenses',
      'USB-C connectivity',
      'Custom Action button'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Showroom Certified & Verified'
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'Dynamic Island and proven endurance.',
    description: 'The phone that introduced the intuitive Dynamic Island at the top of your screen. Finished in surgical-grade stainless steel with deep, rich colors and stellar battery life.',
    priceRange: 'Rs. 1.20 Lakh – 1.45 Lakh',
    featured: false,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Deep Purple', hex: '#483c50' },
      { name: 'Space Black', hex: '#212124' },
      { name: 'Gold', hex: '#fae7cf' }
    ],
    keySpecs: [
      '6.7" OLED display with Dynamic Island',
      'A16 Bionic processing power',
      '48MP main sensor with Photonic Engine',
      'Emergency SOS & crash detection',
      'Stainless steel polished chassis'
    ],
    stockStatus: 'Limited Stock',
    warranty: 'Showroom Certified & Verified'
  },
  {
    id: 'iphone-13-pro-max',
    name: 'iPhone 13 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    tagline: 'The undisputed battery champion.',
    description: 'Renowned among phone lovers for having one of the longest battery lives in smartphone history. The model that brought buttery 120Hz ProMotion to the iPhone.',
    priceRange: 'Rs. 95K – 1.15 Lakh',
    featured: false,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Sierra Blue', hex: '#9ab3c9' },
      { name: 'Graphite', hex: '#3a3a3d' },
      { name: 'Alpine Green', hex: '#3f4c3d' }
    ],
    keySpecs: [
      '6.7" 120Hz ProMotion display',
      'A15 Bionic performance',
      'Dedicated macro photography mode',
      'Outstanding two-day battery life'
    ],
    stockStatus: 'Limited Stock',
    warranty: 'Showroom Certified & Verified'
  },

  // --- SAMSUNG FLAGSHIPS ---
  {
    id: 'galaxy-s25-ultra',
    name: 'Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'Samsung',
    tagline: 'Flat titanium frame. Built-in S-Pen. Quiet intelligence.',
    description: 'Completely flat glass front and back with rounded titanium corners for effortless grip. Snapdragon 8 Elite power with seamless multi-language translation and a 200MP camera.',
    priceRange: 'Rs. 1.95 Lakh – 2.25 Lakh',
    featured: true,
    editorialHighlight: 'Android Benchmark',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Titanium Silver', hex: '#d1d5db' },
      { name: 'Titanium Black', hex: '#18181b' },
      { name: 'Titanium Blue', hex: '#3b82f6' }
    ],
    keySpecs: [
      '6.8" Dynamic AMOLED 2X flat display with Anti-reflective glass',
      'Snapdragon 8 Elite flagship processor',
      '200MP primary camera with 5x optical telephoto',
      'Built-in S-Pen for sketching and notes',
      'Galaxy AI live call translation'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Samsung Warranty'
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Samsung',
    tagline: 'Zero glare in direct sunlight. The zoom champion.',
    description: 'Corning Gorilla Armor cuts reflections by 75%, making reading messages in bright Chitwan sunshine effortless. Unmatched 100x Space Zoom and all-day endurance.',
    priceRange: 'Rs. 1.55 Lakh – 1.85 Lakh',
    featured: false,
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Titanium Gray', hex: '#71717a' },
      { name: 'Titanium Black', hex: '#18181b' },
      { name: 'Titanium Yellow', hex: '#fef08a' }
    ],
    keySpecs: [
      '6.8" Quad HD+ 2600-nit Dynamic AMOLED 2X',
      'Snapdragon 8 Gen 3 platform',
      '200MP camera with ProVisual Engine',
      'Integrated S-Pen stylus',
      '7 years of guaranteed software updates'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Warranty & Guru Support'
  },
  {
    id: 'galaxy-z-fold-6',
    name: 'Galaxy Z Fold 6',
    brand: 'Samsung',
    category: 'Samsung',
    tagline: 'Your phone unfolds into a book in your hands.',
    description: 'A slim, squared cover screen for quick texts, which opens into a spacious 7.6-inch tablet. Read PDFs, manage spreadsheets, or watch videos with two apps side-by-side.',
    priceRange: 'Rs. 2.10 Lakh – 2.45 Lakh',
    featured: true,
    editorialHighlight: 'Form Factor Shift',
    image: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Silver Shadow', hex: '#9ca3af' },
      { name: 'Navy', hex: '#1e3a8a' },
      { name: 'Pink', hex: '#fbcfe8' }
    ],
    keySpecs: [
      '7.6" Main Foldable Dynamic AMOLED 2X + 6.3" Cover screen',
      'Dual-rail hinge with Armor Aluminum frame',
      'Snapdragon 8 Gen 3 for multitasking',
      'Dual-screen live translation mode'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Samsung Warranty'
  },
  {
    id: 'galaxy-z-flip-6',
    name: 'Galaxy Z Flip 6',
    brand: 'Samsung',
    category: 'Samsung',
    tagline: 'Folds neatly in half. Fits any shirt pocket.',
    description: 'Closes into a satisfying compact square. Reply to messages and frame selfies on the outer FlexWindow screen without even opening the phone.',
    priceRange: 'Rs. 1.25 Lakh – 1.45 Lakh',
    featured: false,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Blue', hex: '#60a5fa' },
      { name: 'Mint', hex: '#6ee7b7' },
      { name: 'Yellow', hex: '#fde047' }
    ],
    keySpecs: [
      '3.4" Super AMOLED outer screen + 6.7" Main screen',
      '50MP wide camera with 2x optical zoom',
      'Hands-free FlexCam tabletop video recording',
      'Vapor chamber cooling system'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Samsung Warranty'
  },

  // --- MAC & WEARABLES ---
  {
    id: 'macbook-pro-m4',
    name: 'MacBook Pro 14" / 16"',
    brand: 'Apple',
    category: 'Mac',
    tagline: 'Quiet power. 24-hour battery for serious work.',
    description: 'Built for video editors, coders, and creators who need uninterrupted battery life. The Liquid Retina XDR screen reveals true blacks and up to 1,600 nits of brightness.',
    priceRange: 'Rs. 2.45 Lakh – 3.65 Lakh',
    featured: true,
    editorialHighlight: 'Creator Studio',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Space Black', hex: '#1c1c1e' },
      { name: 'Silver', hex: '#e2e2e5' }
    ],
    keySpecs: [
      'Apple M4 / M4 Pro / M4 Max silicon options',
      'Liquid Retina XDR display with nano-texture option',
      'Thunderbolt 5 high-speed data transfer',
      'Full-size physical function key row',
      'Up to 24 hours of real battery life'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty'
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air 13" / 15"',
    brand: 'Apple',
    category: 'Mac',
    tagline: 'Whisper quiet. Weighs almost nothing.',
    description: 'An all-aluminum laptop that has no fans, never gets noisy, and slips into any backpack. Lasts all day on a single charge with crisp Liquid Retina text.',
    priceRange: 'Rs. 1.55 Lakh – 1.95 Lakh',
    featured: false,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Midnight', hex: '#1b222c' },
      { name: 'Starlight', hex: '#e8e2d5' },
      { name: 'Space Gray', hex: '#48484a' },
      { name: 'Silver', hex: '#e2e2e5' }
    ],
    keySpecs: [
      'Apple M3 chip with 8-core CPU',
      'Fanless, completely silent thermal design',
      'Dual external display support with lid closed',
      'MagSafe magnetic quick-release charging'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty'
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 & Series 10',
    brand: 'Apple',
    category: 'Audio & Wearables',
    tagline: 'Worn on your wrist. Ticking with your day.',
    description: 'Braided solo loops and grade 5 titanium cases designed for everyday comfort. Tracks your heart rate, sleep stages, and silent haptic reminders throughout the day.',
    priceRange: 'Rs. 68K – 1.35 Lakh',
    featured: true,
    editorialHighlight: 'Wearable Essential',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Natural Titanium', hex: '#9c968f' },
      { name: 'Deep Navy', hex: '#1e3a8a' },
      { name: 'Product Red', hex: '#b91c1c' }
    ],
    keySpecs: [
      'Always-on wide-angle OLED display',
      'ECG, Blood Oxygen, and Sleep Apnea detection',
      'Precision dual-frequency GPS',
      'Braided solo loop comfort fit'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty'
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd Gen, USB-C)',
    brand: 'Apple',
    category: 'Audio & Wearables',
    tagline: 'Quiet when you want it. Clear when someone speaks.',
    description: 'Adaptive audio that softens Bharatpur street traffic noise while letting voices through when someone speaks to you. USB-C case with built-in speaker and lanyard loop.',
    priceRange: 'Rs. 36K – 42K',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Gloss White', hex: '#ffffff' }
    ],
    keySpecs: [
      'Pro-level active noise cancellation',
      'Adaptive audio with transparency mode',
      'Personalized spatial audio with head tracking',
      'MagSafe USB-C case with precision finding'
    ],
    stockStatus: 'In Stock at Showroom',
    warranty: 'Genuine Apple Warranty'
  }
];

export const priceDisclaimer = "Prices and availability may vary based on storage configuration and market rates. Contact Apple Guru for current in-store details.";
