import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ne';

type Dict = Record<string, string>;

export const translations: Record<Lang, Dict> = {
  en: {
    'nav.home': 'Home', 'nav.phones': 'Phones', 'nav.exchange': 'Exchange',
    'nav.repair': 'Repair', 'nav.insights': 'Journal', 'nav.showroom': 'Showroom',

    'hero.locationLine': 'Indra Dev Marga, Bharatpur · Chitwan',
    'hero.askUs': 'Ask us',

    'bento.eyebrow': 'What we do',
    'bento.title1': 'Everything you need.', 'bento.title2': 'One place.',
    'bento.phones.label': 'Phones', 'bento.phones.sub': 'iPhone & Galaxy',
    'bento.exchange.label': 'Exchange', 'bento.exchange.sub': 'Trade in',
    'bento.repair.label': 'Repair', 'bento.repair.sub': 'Same-day service',
    'bento.accessories.label': 'Accessories', 'bento.accessories.sub': 'Cases & more',
    'bento.showroom.label': 'Showroom', 'bento.showroom.sub': 'Chitwan',
    'bento.explore': 'Explore', 'bento.latest': 'Latest iPhones & Galaxy',

    'gallery.eyebrow': 'At the showroom',
    'gallery.title1': 'Real devices.', 'gallery.title2': 'Real people.',

    'showroom.eyebrow': 'Chitwan · Nepal',
    'showroomFeature.title1': 'Come see it', 'showroomFeature.title2': 'in person.',
    'showroomFeature.subhead': 'Visit Apple Guru on Indra Dev Marga. Hold the devices. Ask real questions. Leave with confidence about what you bought.',
    'showroomFeature.stat1': 'Years of trust', 'showroomFeature.stat2': 'Happy customers',
    'showroomFeature.planVisit': 'Plan a visit', 'showroomFeature.directions': 'Directions',
    'showroomFeature.location': 'Location', 'showroomFeature.address': 'Indra Dev Marga, Bharatpur, Chitwan',

    'catalog.eyebrow': 'Catalog',
    'catalog.title1': 'Find your', 'catalog.title2': 'next device.',
    'catalog.subhead': 'Every iPhone, Galaxy, and accessory we carry — genuine stock, honest pricing, and every device available to try in the Bharatpur showroom.',
    'catalog.devices': 'devices',

    'exchange.eyebrow': 'Exchange',
    'exchange.heading': 'Value estimator',
    'exchange.subhead': 'Pick your device and its condition below for a ballpark number — not a final price.',
    'exchange.guideLink': 'How we calculate your trade-in value',

    'repair.eyebrow': 'Repair',
    'repair.title1': 'Repair with', 'repair.title2': 'a clear plan.',
    'repair.subhead': "Diagnosis first, honest options second, precision work third. We don't guess.",
    'repair.bookBtn': 'Book a repair',

    'showroomPage.eyebrow': 'Our Showroom',
    'showroomPage.title1': 'One original', 'showroomPage.title2': 'showroom.',
    'showroomPage.subhead': "Come to Indra Dev Marga. Hold the phones side by side. Talk to someone who uses this stuff every day.",
    'showroomPage.planVisit': 'Plan a visit',
    'showroomPage.directions': 'Get directions',
    'showroomPage.expect1t': 'Try before you buy', 'showroomPage.expect1d': 'Hold every model side by side before deciding.',
    'showroomPage.expect2t': 'Genuine stock only', 'showroomPage.expect2d': 'Every device we sell is authentic, never grey-market.',
    'showroomPage.expect3t': 'Real conversations', 'showroomPage.expect3d': 'Talk to staff who use this gear every day, not a script.',
    'showroomPage.expect4t': 'Exchange on the spot', 'showroomPage.expect4d': 'Bring your old phone and walk out with the new one.',
    'showroomPage.inside': 'Inside the showroom',

    'about.eyebrow': 'About Us',
    'about.title1': "Chitwan's own", 'about.title2': 'tech store.',
    'about.p1': "Apple Guru started with a simple idea — Bharatpur shouldn't need Kathmandu for a genuine iPhone, an honest trade-in, or a same-day repair. We built a showroom where you can hold the device before you buy it, talk to someone who actually knows it, and get a straight answer about what it's worth.",
    'about.p2': 'We carry Apple and Samsung flagships, run our own exchange and repair counter in-house, and stand behind every device that leaves our store.',
    'about.value1t': 'Genuine, always', 'about.value1d': 'Every device we sell or trade-in is authentic. No grey-market imports, no exceptions.',
    'about.value2t': 'Straight talk', 'about.value2d': "We tell you what a phone is actually worth and what it actually needs — no upselling.",
    'about.value3t': 'Local, for locals', 'about.value3d': 'Built for Chitwan. We speak your language, literally and otherwise.',
    'about.value4t': 'Hands that know', 'about.value4d': 'Our technicians work on these devices daily, not occasionally.',
    'about.ctaHeading': 'Come say hello.',
    'about.ctaSub': 'The best way to know us is to walk in. Indra Dev Marga, Bharatpur.',
    'about.visitShowroom': 'Visit the showroom', 'about.messageUs': 'Message us',

    'warranty.eyebrow': 'Warranty',
    'warranty.title1': 'Covered,', 'warranty.title2': 'clearly explained.',
    'warranty.subhead': "Every device from Apple Guru comes with a standard warranty. Here's exactly what's covered, what isn't, and what to do if something goes wrong.",
    'warranty.faqHeading': 'Common questions',
    'warranty.askClaim': 'Ask about a claim',
    'warranty.goRepair': 'Go to Repair',
    'warranty.plan1.title': 'Standard warranty', 'warranty.plan1.badge': 'Included',
    'warranty.plan1.desc': 'Comes with every new device we sell — no extra cost.',
    'warranty.plan1.p1': 'Covers manufacturing defects', 'warranty.plan1.p2': 'Free diagnostic at our counter', 'warranty.plan1.p3': 'Genuine replacement parts only',
    'warranty.plan2.title': 'Extended protection', 'warranty.plan2.badge': 'Optional',
    'warranty.plan2.desc': 'Added coverage for accidental damage, on top of the standard warranty.',
    'warranty.plan2.p1': 'Screen and battery coverage', 'warranty.plan2.p2': 'Priority same-day service', 'warranty.plan2.p3': 'Discounted accidental-damage repairs',
    'warranty.faq1.q': 'What does the standard warranty NOT cover?',
    'warranty.faq1.a': 'Accidental damage — drops, water, or cracked screens — is not covered under the standard manufacturing warranty. Extended protection covers this.',
    'warranty.faq2.q': 'How long does a warranty claim take?',
    'warranty.faq2.a': 'Most diagnostics are done the same day you bring the device in. Repairs under warranty are typically completed within 24–48 hours.',
    'warranty.faq3.q': 'Do I need the original receipt?',
    'warranty.faq3.a': 'Yes — bring your purchase receipt or invoice from Apple Guru so we can verify the warranty period.',
    'warranty.faq4.q': 'Can I buy the extended plan after I already bought the phone?',
    'warranty.faq4.a': 'It is best added at the time of purchase, but ask our team — a short grace period may apply depending on the model.',

    'footer.services': 'Services', 'footer.company': 'Company', 'footer.contact': 'Contact',
  },
  ne: {
    'nav.home': 'गृहपृष्ठ', 'nav.phones': 'फोनहरू', 'nav.exchange': 'एक्सचेन्ज',
    'nav.repair': 'मर्मत', 'nav.insights': 'जर्नल', 'nav.showroom': 'शोरूम',

    'hero.locationLine': 'इन्द्र देव मार्ग, भरतपुर · चितवन',
    'hero.askUs': 'सोध्नुहोस्',

    'bento.eyebrow': 'हामी के गर्छौं',
    'bento.title1': 'तपाईंलाई चाहिने सबै कुरा।', 'bento.title2': 'एउटै ठाउँमा।',
    'bento.phones.label': 'फोनहरू', 'bento.phones.sub': 'आईफोन र ग्यालेक्सी',
    'bento.exchange.label': 'एक्सचेन्ज', 'bento.exchange.sub': 'पुरानो साटौं',
    'bento.repair.label': 'मर्मत', 'bento.repair.sub': 'सोही दिन सेवा',
    'bento.accessories.label': 'एक्सेसरीज', 'bento.accessories.sub': 'केस र अन्य',
    'bento.showroom.label': 'शोरूम', 'bento.showroom.sub': 'चितवन',
    'bento.explore': 'हेर्नुहोस्', 'bento.latest': 'नवीनतम आईफोन र ग्यालेक्सी',

    'gallery.eyebrow': 'शोरूममा',
    'gallery.title1': 'वास्तविक डिभाइसहरू।', 'gallery.title2': 'वास्तविक मानिसहरू।',

    'showroom.eyebrow': 'चितवन · नेपाल',
    'showroomFeature.title1': 'भेट्न आउनुहोस्', 'showroomFeature.title2': 'स्वयं।',
    'showroomFeature.subhead': 'इन्द्र देव मार्गमा एप्पल गुरु भ्रमण गर्नुहोस्। डिभाइसहरू समात्नुहोस्। वास्तविक प्रश्नहरू सोध्नुहोस्। तपाईंले किन्नुभएको कुराको बारेमा विश्वस्त भएर जानुहोस्।',
    'showroomFeature.stat1': 'वर्षको भरोसा', 'showroomFeature.stat2': 'खुसी ग्राहकहरू',
    'showroomFeature.planVisit': 'भ्रमणको योजना बनाउनुहोस्', 'showroomFeature.directions': 'दिशा निर्देशन',
    'showroomFeature.location': 'स्थान', 'showroomFeature.address': 'इन्द्र देव मार्ग, भरतपुर, चितवन',

    'catalog.eyebrow': 'सूची',
    'catalog.title1': 'आफ्नो', 'catalog.title2': 'अर्को डिभाइस भेट्नुहोस्।',
    'catalog.subhead': 'हामीले राख्ने हरेक आईफोन, ग्यालेक्सी, र एक्सेसरी — वास्तविक स्टक, इमानदार मूल्य, र भरतपुर शोरूममा प्रत्येक डिभाइस प्रयोग गरेर हेर्न मिल्छ।',
    'catalog.devices': 'डिभाइसहरू',

    'exchange.eyebrow': 'एक्सचेन्ज',
    'exchange.heading': 'मूल्य अनुमानक',
    'exchange.subhead': 'अनुमानित मूल्यको लागि तलबाट आफ्नो डिभाइस र यसको अवस्था छान्नुहोस् — यो अन्तिम मूल्य होइन।',
    'exchange.guideLink': 'हामी तपाईंको एक्सचेन्ज मूल्य कसरी गणना गर्छौं',

    'repair.eyebrow': 'मर्मत',
    'repair.title1': 'स्पष्ट योजनासाथ', 'repair.title2': 'मर्मत।',
    'repair.subhead': 'पहिले निदान, त्यसपछि इमानदार विकल्पहरू, अनि सटीक काम। हामी अनुमान गर्दैनौं।',
    'repair.bookBtn': 'मर्मत बुक गर्नुहोस्',

    'showroomPage.eyebrow': 'हाम्रो शोरूम',
    'showroomPage.title1': 'एउटा वास्तविक', 'showroomPage.title2': 'शोरूम।',
    'showroomPage.subhead': 'इन्द्र देव मार्गमा आउनुहोस्। फोनहरू छेउछेउमा राखेर हेर्नुहोस्। हरेक दिन यो प्रयोग गर्ने व्यक्तिसँग कुरा गर्नुहोस्।',
    'showroomPage.planVisit': 'भ्रमणको योजना बनाउनुहोस्',
    'showroomPage.directions': 'दिशा निर्देशन पाउनुहोस्',
    'showroomPage.expect1t': 'किन्नु अघि प्रयोग गर्नुहोस्', 'showroomPage.expect1d': 'निर्णय गर्नु अघि प्रत्येक मोडेल छेउछेउमा राखेर हेर्नुहोस्।',
    'showroomPage.expect2t': 'वास्तविक स्टक मात्र', 'showroomPage.expect2d': 'हामीले बेच्ने हरेक डिभाइस वास्तविक हो, कहिल्यै ग्रे-मार्केट होइन।',
    'showroomPage.expect3t': 'वास्तविक कुराकानी', 'showroomPage.expect3d': 'हरेक दिन यो प्रयोग गर्ने कर्मचारीसँग कुरा गर्नुहोस्, स्क्रिप्ट होइन।',
    'showroomPage.expect4t': 'तुरुन्तै एक्सचेन्ज', 'showroomPage.expect4d': 'आफ्नो पुरानो फोन ल्याउनुहोस् र नयाँ फोन लिएर जानुहोस्।',
    'showroomPage.inside': 'शोरूम भित्र',

    'about.eyebrow': 'हाम्रोबारे',
    'about.title1': 'चितवनकै आफ्नै', 'about.title2': 'टेक स्टोर।',
    'about.p1': 'एप्पल गुरुको सुरुवात एउटा सरल विचारबाट भयो — भरतपुरलाई वास्तविक आईफोन, इमानदार एक्सचेन्ज, वा सोही दिनको मर्मतको लागि काठमाडौं जान पर्दैन। हामीले यस्तो शोरूम बनायौं जहाँ तपाईं किन्नु अघि डिभाइस समात्न सक्नुहुन्छ, यसलाई साँच्चै बुझ्ने व्यक्तिसँग कुरा गर्न सक्नुहुन्छ, र यसको मूल्यको बारेमा सोझो जवाफ पाउन सक्नुहुन्छ।',
    'about.p2': 'हामी एप्पल र स्यामसंगका फ्ल्यागसिप मोडेलहरू राख्छौं, आफ्नै एक्सचेन्ज र मर्मत काउन्टर सञ्चालन गर्छौं, र हाम्रो पसलबाट जाने हरेक डिभाइसको जिम्मेवारी लिन्छौं।',
    'about.value1t': 'सधैं वास्तविक', 'about.value1d': 'हामीले बेच्ने वा एक्सचेन्ज गर्ने हरेक डिभाइस वास्तविक हो। कुनै ग्रे-मार्केट आयात छैन, कुनै अपवाद छैन।',
    'about.value2t': 'सोझो कुरा', 'about.value2d': 'हामी तपाईंलाई फोनको वास्तविक मूल्य र यसलाई वास्तवमा के चाहिन्छ भनेर बताउँछौं — कुनै जबर्जस्ती बिक्री छैन।',
    'about.value3t': 'स्थानीय, स्थानीयका लागि', 'about.value3d': 'चितवनको लागि बनाइएको। हामी तपाईंको भाषा बोल्छौं, शाब्दिक र अन्य रूपमा पनि।',
    'about.value4t': 'जान्ने हातहरू', 'about.value4d': 'हाम्रा प्राविधिकहरूले यी डिभाइसहरूमा दैनिक काम गर्छन्, कहिलेकाहीं मात्र होइन।',
    'about.ctaHeading': 'आएर नमस्ते भन्नुहोस्।',
    'about.ctaSub': 'हामीलाई चिन्ने उत्तम तरिका भनेको भित्र आउनु हो। इन्द्र देव मार्ग, भरतपुर।',
    'about.visitShowroom': 'शोरूम भ्रमण गर्नुहोस्', 'about.messageUs': 'हामीलाई सन्देश पठाउनुहोस्',

    'warranty.eyebrow': 'वारेन्टी',
    'warranty.title1': 'सुरक्षित,', 'warranty.title2': 'स्पष्ट रूपमा बताइएको।',
    'warranty.subhead': 'एप्पल गुरुबाट आउने हरेक डिभाइसमा मानक वारेन्टी हुन्छ। के समावेश छ, के छैन, र केही समस्या भएमा के गर्ने भनेर यहाँ स्पष्ट रूपमा बताइएको छ।',
    'warranty.faqHeading': 'सामान्य प्रश्नहरू',
    'warranty.askClaim': 'दाबीको बारेमा सोध्नुहोस्',
    'warranty.goRepair': 'मर्मतमा जानुहोस्',
    'warranty.plan1.title': 'मानक वारेन्टी', 'warranty.plan1.badge': 'समावेश',
    'warranty.plan1.desc': 'हामीले बेच्ने हरेक नयाँ डिभाइससँग आउँछ — कुनै अतिरिक्त शुल्क छैन।',
    'warranty.plan1.p1': 'निर्माण त्रुटिहरू समेट्छ', 'warranty.plan1.p2': 'हाम्रो काउन्टरमा नि:शुल्क निदान', 'warranty.plan1.p3': 'वास्तविक फेरबदल पार्टहरू मात्र',
    'warranty.plan2.title': 'विस्तारित सुरक्षा', 'warranty.plan2.badge': 'वैकल्पिक',
    'warranty.plan2.desc': 'मानक वारेन्टीको माथि, दुर्घटनावश क्षतिको लागि थप सुरक्षा।',
    'warranty.plan2.p1': 'स्क्रिन र ब्याट्री कभरेज', 'warranty.plan2.p2': 'प्राथमिकता सोही दिन सेवा', 'warranty.plan2.p3': 'दुर्घटनावश क्षतिको मर्मतमा छुट',
    'warranty.faq1.q': 'मानक वारेन्टीले के समेट्दैन?',
    'warranty.faq1.a': 'दुर्घटनावश क्षति — खस्नु, पानी, वा फुटेको स्क्रिन — मानक निर्माण वारेन्टी अन्तर्गत समेटिँदैन। विस्तारित सुरक्षाले यसलाई समेट्छ।',
    'warranty.faq2.q': 'वारेन्टी दाबीमा कति समय लाग्छ?',
    'warranty.faq2.a': 'धेरैजसो निदान तपाईंले डिभाइस ल्याएकै दिन हुन्छ। वारेन्टी अन्तर्गतको मर्मत सामान्यतया २४–४८ घण्टाभित्र पूरा हुन्छ।',
    'warranty.faq3.q': 'के मलाई मूल रसिद चाहिन्छ?',
    'warranty.faq3.a': 'हो — वारेन्टी अवधि प्रमाणित गर्न एप्पल गुरुबाटको खरिद रसिद वा इनभ्वाइस ल्याउनुहोस्।',
    'warranty.faq4.q': 'के म फोन किनिसकेपछि विस्तारित योजना किन्न सक्छु?',
    'warranty.faq4.a': 'यो किन्ने समयमै थप्नु उत्तम हो, तर हाम्रो टोलीलाई सोध्नुहोस् — मोडेल अनुसार छोटो मौका अवधि लागू हुन सक्छ।',

    'footer.services': 'सेवाहरू', 'footer.company': 'कम्पनी', 'footer.contact': 'सम्पर्क',
  },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('ag-lang');
      return saved === 'ne' ? 'ne' : 'en';
    } catch { return 'en'; }
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'ne' ? 'ne' : 'en';
    document.documentElement.classList.toggle('lang-ne', lang === 'ne');
    try { localStorage.setItem('ag-lang', lang); } catch { /* noop */ }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => translations[lang][key] ?? translations.en[key] ?? key;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
