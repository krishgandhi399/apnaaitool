// ===== SITE SETTINGS =====
const SITE = {
  name: "Apna AI Tool",
  channel: "https://whatsapp.com/channel/YOUR-CHANNEL-LINK" // put your WhatsApp channel link here
};

// ===== POSTS: add a new { ... } block at the TOP. The easiest way: open write.html =====
// img = cover image link (optional) | hue = tile colour 0-360 | body = full article in HTML
const POSTS = [
  {
    slug: "bhashini-ai-guide",
    title: "Bhashini AI Complete Guide 2026: भारत सरकार का फ्री टूल",
    date: "2026-10-14", cat: "Bhashini", emoji: "🗣️", hue: 160, img: "",
    excerpt: "Bhashini क्या है, कैसे काम करता है और किन भारतीय भाषाओं को सपोर्ट करता है, सब कुछ एक जगह।",
    body: `<p>यहाँ अपना पूरा आर्टिकल पेस्ट करें।</p>
<h2>Bhashini AI क्या है?</h2><p>भारत की भाषाओं के बीच अनुवाद करने वाला सरकारी प्लेटफॉर्म।</p>
<h2>कैसे इस्तेमाल करें?</h2><p>स्टेप-बाय-स्टेप गाइड यहाँ लिखें।</p>
<h2>फायदे और नुकसान</h2><p>अपनी राय यहाँ लिखें।</p>`
  },
  {
    slug: "top-5-free-ai-tools",
    title: "हिंदी समझने वाले Top 5 Free AI Tools 2026",
    date: "2026-10-14", cat: "Free AI Tools", emoji: "🧰", hue: 35, img: "",
    excerpt: "Students और बिजनेस के लिए 5 फ्री AI टूल्स, जो हिंदी और हिंग्लिश अच्छे से समझते हैं।",
    body: `<p>यहाँ अपना पूरा आर्टिकल पेस्ट करें।</p>
<table><tr><th>टूल</th><th>सबसे अच्छा किसके लिए</th></tr><tr><td>Google Gemini</td><td>रिसर्च और सवाल-जवाब</td></tr></table>`
  },
  {
    slug: "raju-bhaiya-story",
    title: "राजू भैया की दुकान: 3 फ्री AI टूल्स की सच्ची कहानी",
    date: "2026-10-15", cat: "सच्ची कहानी", emoji: "🏪", hue: 280, img: "",
    excerpt: "एक छोटे दुकानदार ने तीन फ्री AI टूल्स से अपनी बिक्री कैसे बढ़ाई।",
    body: `<p>यहाँ अपना पूरा आर्टिकल पेस्ट करें।</p>`
  }
];

// ===== FREE AI TOOLS PAGE: add or edit tools here =====
const TOOLS = [
  { name: "ChatGPT", cat: "चैटबॉट", plan: "Free", hindi: "हाँ", desc: "सवाल-जवाब, लिखना, पढ़ाई और कोडिंग में मदद।", url: "https://chatgpt.com" },
  { name: "Google Gemini", cat: "चैटबॉट", plan: "Free", hindi: "हाँ", desc: "Google के साथ जुड़ा AI असिस्टेंट, रिसर्च के लिए अच्छा।", url: "https://gemini.google.com" },
  { name: "Claude", cat: "चैटबॉट", plan: "Free", hindi: "हाँ", desc: "लंबे डॉक्यूमेंट पढ़ने और साफ लिखने में मजबूत।", url: "https://claude.ai" },
  { name: "Microsoft Copilot", cat: "चैटबॉट", plan: "Free", hindi: "हाँ", desc: "Windows और Edge के साथ चलने वाला AI साथी।", url: "https://copilot.microsoft.com" },
  { name: "Bhashini", cat: "अनुवाद", plan: "Free", hindi: "हाँ", desc: "भारत सरकार का भारतीय भाषाओं का अनुवाद प्लेटफॉर्म।", url: "https://bhashini.gov.in" },
  { name: "Canva Magic Studio", cat: "डिजाइन", plan: "Freemium", hindi: "आंशिक", desc: "पोस्टर, थंबनेल और सोशल मीडिया डिजाइन बनाएं।", url: "https://www.canva.com" },
  { name: "Photoroom", cat: "डिजाइन", plan: "Freemium", hindi: "नहीं", desc: "प्रोडक्ट फोटो का बैकग्राउंड हटाकर साफ तस्वीर बनाएं।", url: "https://www.photoroom.com" },
  { name: "Perplexity", cat: "रिसर्च", plan: "Freemium", hindi: "हाँ", desc: "सोर्स के साथ जवाब देने वाला AI सर्च।", url: "https://www.perplexity.ai" }
];

// ===== PROMPTS PAGE: add or edit prompts here =====
const PROMPTS = [
  { cat: "पढ़ाई", title: "कोई भी टॉपिक आसान भाषा में", text: "तुम एक अच्छे टीचर हो। मुझे [टॉपिक] कक्षा [क्लास] के स्तर पर आसान हिंदी में समझाओ। पहले एक रोज़मर्रा का उदाहरण दो, फिर 5 मुख्य बातें लिखो, और आखिर में 3 प्रैक्टिस सवाल दो।" },
  { cat: "बिजनेस", title: "दुकान के लिए Instagram कैप्शन", text: "मेरी [दुकान का नाम] [शहर] में [सामान] बेचती है। [त्योहार] सेल के लिए 5 छोटे Instagram कैप्शन हिंदी में लिखो। हर एक में एक इमोजी और एक कॉल-टू-एक्शन हो।" },
  { cat: "कमाई", title: "फ्रीलांस सर्विस के आइडिया", text: "मुझे [स्किल] आती है और मैं रोज़ [घंटे] घंटे दे सकता हूँ। AI टूल्स की मदद से शुरू की जा सकने वाली 5 फ्रीलांस सर्विस बताओ। हर एक के लिए पहला कदम और शुरुआती कीमत भी लिखो।" },
  { cat: "लिखना", title: "ब्लॉग पोस्ट की आउटलाइन", text: "मुझे '[टॉपिक]' पर ब्लॉग पोस्ट लिखनी है। हिंदी में आउटलाइन दो: आकर्षक टाइटल, 6 हेडिंग, हर हेडिंग के नीचे 2 पॉइंट, और अंत में 5 FAQ।" },
  { cat: "नौकरी", title: "इंटरव्यू की तैयारी", text: "मैं [पद] के इंटरव्यू की तैयारी कर रहा हूँ। इस पद के संभावित सवाल एक-एक करके पूछो और मेरे हर जवाब पर सुधार के सुझाव दो।" },
  { cat: "सोशल मीडिया", title: "30 सेकंड की रील स्क्रिप्ट", text: "[टॉपिक] पर 30 सेकंड की रील की स्क्रिप्ट हिंदी में लिखो: पहले 3 सेकंड में हुक, बीच में 3 मुख्य बातें, अंत में फॉलो करने की अपील।" }
];

// ===== FOOTER PAGES =====
const PAGES = {
  about: { title: "About us", html: "<p>Apna AI Tool पर आपको फ्री AI टूल्स और AI से जुड़ी हर जानकारी आसान हिंदी में मिलती है।</p>" },
  contact: { title: "Contact us", html: "<p>हमें ईमेल करें: <a href='mailto:your-email@example.com'>your-email@example.com</a></p>" },
  privacy: { title: "Privacy Policy", html: "<p>यहाँ अपनी Privacy Policy लिखें (किसी फ्री Privacy Policy Generator से बनवा सकते हैं)।</p>" },
  disclaimer: { title: "Disclaimer", html: "<p>इस साइट की जानकारी सिर्फ शैक्षणिक उद्देश्य के लिए है।</p>" },
  terms: { title: "Terms and Conditions", html: "<p>यहाँ अपनी नियम और शर्तें लिखें।</p>" }
};
