import { RepairService } from '../types';

export const repairServices: RepairService[] = [
  {
    id: 'display-glass',
    title: 'Display & Glass Restoration',
    shortDesc: 'Restoring authentic color accuracy, 120Hz ProMotion/LTPO refresh rate, and factory True Tone calibration.',
    fullDesc: 'We specialize in surgical-grade OLED and glass refurbishment. Whether you need front outer glass de-lamination using cryogenic separation or full OEM-spec panel replacement, we preserve your device’s original touch sensitivity, color gamut, and display serial pairing.',
    image: 'https://images.unsplash.com/photo-1592839719941-8e2651039d01?q=80&w=1000&auto=format&fit=crop',
    symptoms: [
      'Cracked outer glass with intact touch',
      'Green screen of death or vertical lines',
      'Unresponsive touch zones',
      'Black ink spots (OLED leakage)',
      'Flickering backlight at high brightness'
    ],
    procedure: 'Thermal extraction, OCA vacuum lamination, anti-bubble chamber curing, and software display-IC eprom serialization.',
    turnaroundTime: '45 to 90 Minutes (Same Day)',
    guarantee: 'Genuine testing guarantee + Touch responsiveness guarantee'
  },
  {
    id: 'battery-power',
    title: 'Power Systems & Battery Calibration',
    shortDesc: 'Battery health rejuvenation, spot-welding flex cable transfer, and motherboard charging circuit diagnostics.',
    fullDesc: 'Diminishing battery capacity cripples peak processor performance. We install high-density cobalt cells, transfer original BMS flex circuits with microscopic spot welding to avoid "Unknown Part" system flags, and diagnose parasitic drain on PMIC chips.',
    image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=1000&auto=format&fit=crop',
    symptoms: [
      'Battery health below 80% with performance throttling',
      'Device shutting down randomly at 20%-30%',
      'Swollen rear back glass or screen lift',
      'Excessive heat during standby or charging',
      'Boot-looping on Apple / Samsung logo'
    ],
    procedure: 'BMS chip micro-welding, non-stretch adhesive application, cycle counter reset, and multi-stage load diagnostics.',
    turnaroundTime: '30 to 60 Minutes',
    guarantee: 'High-cycle OEM-spec performance guarantee'
  },
  {
    id: 'logic-board',
    title: 'Logic Board Micro-Soldering (Level 3)',
    shortDesc: 'Deep component-level diagnostics, short circuit isolation, and thermal camera IC tracing under stereoscopic microscopes.',
    fullDesc: 'When other shops claim your phone is "dead" or "unfixable", Apple Guru’s Lab takes over. We resolve motherboard sandwich desoldering, reballing AP processors, repairing damaged traces, and reviving water-damaged devices to salvage critical data.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    symptoms: [
      'Complete no-power condition (0.00A current draw)',
      'Liquid or water damage exposure',
      'No service / searching for network / baseband error',
      'Audio IC failure (greyed out microphone / speaker icon)',
      'Kernel panic logs and spontaneous restarts'
    ],
    procedure: 'Ultrasonic chemical bath, infrared thermal imaging, microscopic BGA pad reballing, and jumper wire micro-bridging.',
    turnaroundTime: '24 to 48 Hours (Complex procedure)',
    guarantee: 'Data preservation priority + comprehensive board diagnostic'
  },
  {
    id: 'optics-camera',
    title: 'Optics Array & Sensor Repair',
    shortDesc: 'Optical Image Stabilization (OIS) repair, sapphire crystal lens replacement, and camera sensor cleaning.',
    fullDesc: 'Modern triple and quad-camera arrays require cleanroom-level care. We fix mechanical OIS vibration buzz, replace cracked sapphire camera glass rings with zero dust ingress, and align periscope telephoto prisms.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
    symptoms: [
      'Camera shaking uncontrollably or buzzing sound',
      'Cracked external camera lens protective glass',
      'Black spots or purple hazing in captured photos',
      '0.5x Ultra-wide or 5x Telephoto failing to switch',
      'Face ID / TrueDepth sensor error'
    ],
    procedure: 'Laser de-glazing of camera ring, sensor motor stabilization overhaul, and dual-axis optical alignment.',
    turnaroundTime: '45 to 60 Minutes',
    guarantee: 'Zero-dust clean lens seal & crystal clarity'
  },
  {
    id: 'acoustics-mic',
    title: 'Acoustics & Microphone Array',
    shortDesc: 'Micro-mesh acoustic cleaning, loudspeaker replacement, and beamforming microphone array restoration.',
    fullDesc: 'Dust, moisture, and pocket lint clog precision speaker grilles over time, drastically reducing call volume. We perform hydrophobic sonic mesh cleaning and replace blown drivers to deliver crisp, distortion-free spatial audio.',
    image: 'https://images.unsplash.com/photo-1615144883196-1c0bd6057a62?q=80&w=1000&auto=format&fit=crop',
    symptoms: [
      'Muffled caller voice through the earpiece',
      'Loudspeaker crackling or distorting at high volume',
      'Callers cannot hear you on voice calls or WhatsApp',
      'Siri or voice recording fails to detect audio'
    ],
    procedure: 'Sonic transducer mesh clearing, acoustic gasket resealing, and flex module replacement.',
    turnaroundTime: '30 to 45 Minutes',
    guarantee: 'Crystal-clear acoustic response'
  },
  {
    id: 'chassis-housing',
    title: 'Chassis & Laser Back Glass Replacement',
    shortDesc: 'Laser-guided rear glass stripping, Grade 5 titanium housing realignment, and structural frame renewal.',
    fullDesc: 'Replacing rear glass on modern glass-sandwich flagships without damaging MagSafe coils or wireless charging ribbons requires high-precision cold-laser engraving. We strip shattered glass cleanly and bind OEM-spec back panels with industrial structural epoxy.',
    image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=1000&auto=format&fit=crop',
    symptoms: [
      'Shattered back glass exposing wireless charging coil',
      'Bent or dented titanium or aluminum midframe',
      'Damaged buttons (volume, power, action button)',
      'Loose camera trim or frame separation'
    ],
    procedure: 'CNC laser rear glass stripping, structural chassis hydraulic flattening, and airtight adhesive clamp curing.',
    turnaroundTime: '2 to 3 Hours',
    guarantee: 'Seamless factory-flush fitment & MagSafe compatibility'
  }
];
