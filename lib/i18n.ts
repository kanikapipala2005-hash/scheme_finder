import type { Language } from "./app-context";

type Dict = Record<string, { en: string; hi: string }>;

const dict: Dict = {
  tagline: { en: "Sahi Yojana, Sahi Samay", hi: "सही योजना, सही समय" },
  navHome: { en: "Home", hi: "होम" },
  navSchemes: { en: "All Schemes", hi: "सभी योजनाएँ" },
  navShortlist: { en: "Shortlisted", hi: "शॉर्टलिस्ट" },
  navLearn: { en: "Learn", hi: "जानकारी" },
  langToggle: { en: "हिंदी", hi: "English" },
  homeTitle: {
    en: "Find Government Schemes Made For You",
    hi: "आपके लिए बनी सरकारी योजनाएँ खोजें",
  },
  homeSubtitle: {
    en: "Answer a few simple questions and discover welfare schemes you may be eligible for — transparent, rule-based matching.",
    hi: "कुछ सरल सवालों के जवाब दें और अपने लिए उपयुक्त कल्याणकारी योजनाएँ खोजें — पारदर्शी, नियम-आधारित मिलान।",
  },
  startNow: { en: "Find My Schemes", hi: "मेरी योजनाएँ खोजें" },
  browseAll: { en: "Browse All Schemes", hi: "सभी योजनाएँ देखें" },
  formHeading: { en: "Tell Us About Yourself", hi: "अपने बारे में बताएं" },
  formSubheading: {
    en: "The more accurately you answer, the better your matches.",
    hi: "जितना सटीक उत्तर देंगे, उतने ही बेहतर मिलान मिलेंगे।",
  },
  state: { en: "State", hi: "राज्य" },
  location: { en: "Location", hi: "स्थान" },
  rural: { en: "Rural", hi: "ग्रामीण" },
  urban: { en: "Urban", hi: "शहरी" },
  ageGroup: { en: "Age Group", hi: "आयु वर्ग" },
  gender: { en: "Gender", hi: "लिंग" },
  occupation: { en: "Occupation", hi: "व्यवसाय" },
  incomeRange: { en: "Annual Family Income", hi: "वार्षिक पारिवारिक आय" },
  category: { en: "Category", hi: "श्रेणी" },
  familySize: { en: "Family Size", hi: "परिवार का आकार" },
  hasBplCard: { en: "Do you have a BPL card?", hi: "क्या आपके पास बीपीएल कार्ड है?" },
  hasDisability: { en: "Person with disability?", hi: "दिव्यांग व्यक्ति?" },
  ownsPuccaHouse: {
    en: "Do you currently own a pucca house?",
    hi: "क्या आपके पास वर्तमान में पक्का घर है?",
  },
  yes: { en: "Yes", hi: "हाँ" },
  no: { en: "No", hi: "नहीं" },
  findSchemes: { en: "Find Matching Schemes", hi: "मिलान योजनाएँ खोजें" },
  resultsTitle: { en: "Your Matching Schemes", hi: "आपकी मिलान योजनाएँ" },
  eligible: { en: "Potentially Eligible", hi: "संभावित रूप से पात्र" },
  moreInfo: { en: "More Information Required", hi: "अधिक जानकारी आवश्यक" },
  notMet: { en: "Eligibility Criteria Not Met", hi: "पात्रता मानदंड पूरे नहीं" },
  sortBy: { en: "Sort by", hi: "क्रमबद्ध करें" },
  filterCategory: { en: "Category", hi: "श्रेणी" },
  all: { en: "All", hi: "सभी" },
  matchScore: { en: "Match", hi: "मिलान" },
  applyNow: { en: "Apply Now", hi: "अभी आवेदन करें" },
  viewDetails: { en: "View Details", hi: "विवरण देखें" },
  shortlist: { en: "Shortlist", hi: "शॉर्टलिस्ट" },
  shortlisted: { en: "Shortlisted", hi: "शॉर्टलिस्ट किया" },
  requiredDocuments: { en: "Required Documents", hi: "आवश्यक दस्तावेज़" },
  eligibility: { en: "Eligibility Check", hi: "पात्रता जांच" },
  applicationProcess: { en: "How to Apply", hi: "आवेदन कैसे करें" },
  intendedBeneficiaries: { en: "Intended Beneficiaries", hi: "परिवर्ती लाभार्थी" },
  benefits: { en: "Benefits", hi: "लाभ" },
  ministry: { en: "Ministry", hi: "मंत्रालय" },
  documentChecklist: { en: "Document Checklist", hi: "दस्तावेज़ चेकलिस्ट" },
  downloadPdf: { en: "Download / Print", hi: "डाउनलोड / प्रिंट" },
  noShortlisted: { en: "You haven't shortlisted any schemes yet.", hi: "आपने अभी तक कोई योजना शॉर्टलिस्ट नहीं की है।" },
  backHome: { en: "Back to Home", hi: "होम पर वापस" },
  disclaimer: {
    en: "Results are preliminary and based on sample data. Please verify with official government portals before applying.",
    hi: "परिणाम प्रारंभिक हैं और नमूना डेटा पर आधारित हैं। आवेदन से पहले कृपया आधिकारिक सरकारी पोर्टल से सत्यापित करें।",
  },
  learnTitle: { en: "Learn About Government Schemes", hi: "सरकारी योजनाओं के बारे में जानें" },
};

export function t(key: keyof typeof dict, lang: Language): string {
  const entry = dict[key];
  return entry ? entry[lang] : String(key);
}
