// ===== SITE SETTINGS =====
const SITE = { name: "Apna AI Tool" };

// ===== YOUR POSTS (add a new { ... } block at the TOP to publish) =====
// hue: 0-360 colour of the post tile | body: full article in HTML
const POSTS = [
  {
    slug: "bhashini-ai-guide",
    title: "Bhashini AI Complete Guide 2026: भारत सरकार का फ्री टूल",
    date: "2026-10-14", cat: "Bhashini", emoji: "🗣️", hue: 160,
    excerpt: "Bhashini क्या है, कैसे काम करता है और किन भारतीय भाषाओं को सपोर्ट करता है, सब कुछ एक जगह।",
    body: `<p>यहाँ अपना पूरा आर्टिकल पेस्ट करें। आप सामान्य HTML इस्तेमाल कर सकते हैं।</p>
<h2>Bhashini AI क्या है?</h2>
<p>भारत की भाषाओं के बीच अनुवाद करने वाला सरकारी प्लेटफॉर्म।</p>`
  },
  {
    slug: "top-5-free-ai-tools",
    title: "हिंदी समझने वाले Top 5 Free AI Tools 2026",
    date: "2026-10-14", cat: "Free AI Tools", emoji: "🧰", hue: 35,
    excerpt: "Students और बिजनेस के लिए 5 फ्री AI टूल्स, जो हिंदी और हिंग्लिश अच्छे से समझते हैं।",
    body: `<p>यहाँ अपना पूरा आर्टिकल पेस्ट करें।</p>
<table><tr><th>टूल</th><th>सबसे अच्छा किसके लिए</th></tr><tr><td>Google Gemini</td><td>रिसर्च और सवाल-जवाब</td></tr></table>`
  },
  {
    slug: "raju-bhaiya-story",
    title: "राजू भैया की दुकान: 3 फ्री AI टूल्स की सच्ची कहानी",
    date: "2026-10-15", cat: "सच्ची कहानी", emoji: "🏪", hue: 280,
    excerpt: "एक छोटे दुकानदार ने तीन फ्री AI टूल्स से अपनी बिक्री कैसे बढ़ाई।",
    body: `<p>यहाँ अपना पूरा आर्टिकल पेस्ट करें।</p>`
  }
];

// ===== PAGES (footer links) =====
const PAGES = {
  about: { title: "About us", html: "<p>Apna AI Tool पर आपको फ्री AI टूल्स और AI से जुड़ी हर जानकारी आसान हिंदी में मिलती है।</p>" },
  contact: { title: "Contact us", html: "<p>हमें ईमेल करें: <a href='mailto:your-email@example.com'>your-email@example.com</a></p>" },
  privacy: { title: "Privacy Policy", html: "<p>यहाँ अपनी Privacy Policy लिखें (किसी फ्री Privacy Policy Generator से बनवा सकते हैं)।</p>" },
  disclaimer: { title: "Disclaimer", html: "<p>इस साइट की जानकारी सिर्फ शैक्षणिक उद्देश्य के लिए है।</p>" },
  terms: { title: "Terms and Conditions", html: "<p>यहाँ अपनी नियम और शर्तें लिखें।</p>" }
};
