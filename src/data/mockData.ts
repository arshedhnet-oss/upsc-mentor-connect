export type LanguageProficiency = "Native" | "Fluent" | "Conversational" | "Basic";

export interface MentorLanguage {
  language: string;
  proficiency: LanguageProficiency;
}

export const indianLanguages = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Odia",
  "Punjabi",
  "Assamese",
  "Maithili",
  "Sanskrit",
];

export const proficiencyLevels: LanguageProficiency[] = ["Native", "Fluent", "Conversational", "Basic"];

export interface Mentor {
  id: string;
  name: string;
  photo: string;
  optionalSubject: string;
  mainsAttempts: number;
  interviewAppearances: number;
  bio: string;
  rating: number;
  totalReviews: number;
  pricing: {
    audioPerMinute: number;
    videoPerMinute: number;
    audioPerHour: number;
    videoPerHour: number;
  };
  availability: string[];
  startingPrice: number;
  languages: MentorLanguage[];
  posts: Post[];
  reviews: Review[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  sessionType: "chat" | "audio" | "video";
}

export interface Session {
  id: string;
  mentorId: string;
  mentorName: string;
  date: string;
  time: string;
  type: "chat" | "audio" | "video";
  duration: number;
  cost: number;
  status: "upcoming" | "completed" | "cancelled";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const initials = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e3a5f&color=fff&size=256`;

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Aarav Sharma",
    photo: initials("Aarav Sharma"),
    optionalSubject: "Public Administration",
    mainsAttempts: 3,
    interviewAppearances: 2,
    bio: "AIR 45 in CSE 2019. Specialist in Public Administration with a structured approach to answer writing and essay preparation. Mentored 200+ aspirants.",
    rating: 4.9,
    totalReviews: 147,
    pricing: { audioPerMinute: 15, videoPerMinute: 25, audioPerHour: 750, videoPerHour: 1200 },
    availability: ["Mon", "Wed", "Fri", "Sat"],
    startingPrice: 15,
    languages: [{ language: "English", proficiency: "Fluent" }, { language: "Hindi", proficiency: "Native" }],
    posts: [
      { id: "p1", title: "How to Structure Your Pub Ad Answers", content: "The key to scoring well in Pub Ad is a clear structure. Start with a definition, move to dimensions, add case studies, and conclude with reform suggestions...", date: "2025-12-15", category: "Answer Writing" },
      { id: "p2", title: "My UPSC Journey: Lessons from 3 Attempts", content: "My first attempt was about understanding the exam. The second taught me depth. The third was about precision...", date: "2025-11-20", category: "Strategy" },
    ],
    reviews: [
      { id: "r1", userName: "Priya M.", rating: 5, comment: "Dr. Sharma's guidance on answer writing completely changed my approach. Scored 300+ in Pub Ad.", date: "2025-10-15", sessionType: "video" },
      { id: "r2", userName: "Rahul K.", rating: 5, comment: "Incredibly structured sessions. Worth every rupee.", date: "2025-09-20", sessionType: "audio" },
      { id: "r3", userName: "Sneha D.", rating: 4, comment: "Very knowledgeable. Could be more patient sometimes.", date: "2025-08-10", sessionType: "chat" },
    ],
  },
  {
    id: "2",
    name: "Meera Iyer",
    photo: initials("Meera Iyer"),
    optionalSubject: "Sociology",
    mainsAttempts: 2,
    interviewAppearances: 2,
    bio: "AIR 23 in CSE 2020. Former IAS officer turned full-time mentor. Expert in Sociology optional and GS Paper II. Known for her crisp, exam-focused guidance.",
    rating: 4.8,
    totalReviews: 203,
    pricing: { audioPerMinute: 20, videoPerMinute: 30, audioPerHour: 1000, videoPerHour: 1500 },
    availability: ["Tue", "Thu", "Sat", "Sun"],
    startingPrice: 20,
    languages: [{ language: "English", proficiency: "Fluent" }, { language: "Tamil", proficiency: "Native" }, { language: "Hindi", proficiency: "Conversational" }],
    posts: [
      { id: "p3", title: "Sociology Optional: A Complete Strategy", content: "Sociology is one of the most scoring optionals if approached with clarity. Focus on thinkers, Indian society topics, and contemporary issues...", date: "2025-12-01", category: "Strategy" },
    ],
    reviews: [
      { id: "r4", userName: "Amit P.", rating: 5, comment: "Meera Ma'am's sociology notes are gold. Her mentorship got me through mains.", date: "2025-11-01", sessionType: "video" },
      { id: "r5", userName: "Kavita S.", rating: 5, comment: "Best mentor for sociology. Period.", date: "2025-10-10", sessionType: "audio" },
    ],
  },
  {
    id: "3",
    name: "Vikram Rathore",
    photo: initials("Vikram Rathore"),
    optionalSubject: "History",
    mainsAttempts: 4,
    interviewAppearances: 3,
    bio: "AIR 12 in CSE 2018. History optional topper. Specializes in interview preparation and personality development for UPSC boards.",
    rating: 4.7,
    totalReviews: 178,
    pricing: { audioPerMinute: 18, videoPerMinute: 28, audioPerHour: 900, videoPerHour: 1400 },
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startingPrice: 18,
    posts: [
      { id: "p4", title: "Cracking the UPSC Interview", content: "The interview is not about knowledge — it's about personality. Here's how to present yourself authentically while being sharp...", date: "2025-12-10", category: "Interview" },
    ],
    reviews: [
      { id: "r6", userName: "Deepak R.", rating: 5, comment: "Vikram sir's mock interviews are incredibly realistic. Highly recommended.", date: "2025-11-05", sessionType: "video" },
    ],
  },
  {
    id: "4",
    name: "Anjali Deshmukh",
    photo: initials("Anjali Deshmukh"),
    optionalSubject: "Political Science",
    mainsAttempts: 2,
    interviewAppearances: 1,
    bio: "AIR 67 in CSE 2021. Young and dynamic mentor specializing in GS Paper I and Political Science. Known for contemporary issue analysis.",
    rating: 4.6,
    totalReviews: 92,
    pricing: { audioPerMinute: 12, videoPerMinute: 20, audioPerHour: 600, videoPerHour: 1000 },
    availability: ["Wed", "Thu", "Sat", "Sun"],
    startingPrice: 12,
    posts: [],
    reviews: [
      { id: "r7", userName: "Neha T.", rating: 5, comment: "Anjali di makes complex polity topics so simple to understand.", date: "2025-10-20", sessionType: "chat" },
    ],
  },
  {
    id: "5",
    name: "Rajesh Kumar Singh",
    photo: initials("Rajesh Kumar Singh"),
    optionalSubject: "Geography",
    mainsAttempts: 3,
    interviewAppearances: 2,
    bio: "AIR 34 in CSE 2017. Geography optional expert with deep knowledge of mapping and spatial analysis. 8 years of mentoring experience.",
    rating: 4.9,
    totalReviews: 256,
    pricing: { audioPerMinute: 22, videoPerMinute: 35, audioPerHour: 1100, videoPerHour: 1800 },
    availability: ["Mon", "Wed", "Fri"],
    startingPrice: 22,
    posts: [
      { id: "p5", title: "Map-Based Questions: A Scoring Opportunity", content: "Most aspirants ignore map-based questions. Here's why they shouldn't and how to prepare systematically...", date: "2025-11-25", category: "Strategy" },
    ],
    reviews: [
      { id: "r8", userName: "Suresh B.", rating: 5, comment: "Rajesh sir's geography sessions are phenomenal. Best in the market.", date: "2025-09-15", sessionType: "video" },
    ],
  },
  {
    id: "6",
    name: "Pooja Nair",
    photo: initials("Pooja Nair"),
    optionalSubject: "Anthropology",
    mainsAttempts: 2,
    interviewAppearances: 2,
    bio: "AIR 8 in CSE 2020. Top-ranked mentor with expertise in Anthropology optional and Ethics paper. Believes in holistic personality development.",
    rating: 5.0,
    totalReviews: 312,
    pricing: { audioPerMinute: 25, videoPerMinute: 40, audioPerHour: 1300, videoPerHour: 2000 },
    availability: ["Tue", "Thu", "Sat"],
    startingPrice: 25,
    posts: [
      { id: "p6", title: "Ethics Paper: Think, Don't Memorize", content: "The Ethics paper tests your moral compass, not your memory. Here's how to develop genuine ethical reasoning...", date: "2025-12-05", category: "Answer Writing" },
    ],
    reviews: [
      { id: "r9", userName: "Aishwarya K.", rating: 5, comment: "Pooja ma'am is a legend. Her ethics guidance alone is worth the price.", date: "2025-11-10", sessionType: "video" },
      { id: "r10", userName: "Mohit G.", rating: 5, comment: "Best mentor I've ever had. Cleared in my second attempt thanks to her.", date: "2025-10-01", sessionType: "audio" },
    ],
  },
  {
    id: "7",
    name: "Siddharth Jain",
    photo: initials("Siddharth Jain"),
    optionalSubject: "Mathematics",
    mainsAttempts: 1,
    interviewAppearances: 1,
    bio: "AIR 5 in CSE 2022. Mathematics optional topper. IIT background with exceptional problem-solving approach to UPSC preparation.",
    rating: 4.8,
    totalReviews: 68,
    pricing: { audioPerMinute: 20, videoPerMinute: 32, audioPerHour: 1000, videoPerHour: 1600 },
    availability: ["Mon", "Tue", "Sat", "Sun"],
    startingPrice: 20,
    posts: [],
    reviews: [
      { id: "r11", userName: "Arjun M.", rating: 5, comment: "Siddharth's analytical approach to UPSC is refreshing and effective.", date: "2025-10-25", sessionType: "video" },
    ],
  },
  {
    id: "8",
    name: "Kavitha Reddy",
    photo: initials("Kavitha Reddy"),
    optionalSubject: "Telugu Literature",
    mainsAttempts: 3,
    interviewAppearances: 2,
    bio: "AIR 29 in CSE 2019. Expert in essay writing and GS Paper IV (Ethics). Passionate about helping aspirants from regional language backgrounds.",
    rating: 4.5,
    totalReviews: 134,
    pricing: { audioPerMinute: 10, videoPerMinute: 18, audioPerHour: 500, videoPerHour: 900 },
    availability: ["Mon", "Wed", "Thu", "Fri", "Sun"],
    startingPrice: 10,
    posts: [
      { id: "p7", title: "Essay Writing: The Art of Scoring 150+", content: "A good UPSC essay has flow, substance, and originality. Start with a hook, build arguments logically, and end with vision...", date: "2025-11-30", category: "Answer Writing" },
    ],
    reviews: [
      { id: "r12", userName: "Lakshmi P.", rating: 5, comment: "Kavitha ma'am understands regional aspirants' challenges deeply.", date: "2025-09-30", sessionType: "chat" },
    ],
  },
  {
    id: "9",
    name: "Arjun Mehta",
    photo: initials("Arjun Mehta"),
    optionalSubject: "Philosophy",
    mainsAttempts: 2,
    interviewAppearances: 1,
    bio: "AIR 78 in CSE 2021. Philosophy optional expert. Known for making abstract concepts practical and exam-relevant.",
    rating: 4.4,
    totalReviews: 56,
    pricing: { audioPerMinute: 12, videoPerMinute: 20, audioPerHour: 600, videoPerHour: 1000 },
    availability: ["Tue", "Wed", "Fri", "Sat"],
    startingPrice: 12,
    posts: [],
    reviews: [
      { id: "r13", userName: "Tanvi S.", rating: 4, comment: "Good conceptual clarity. Helped me understand thinkers better.", date: "2025-08-20", sessionType: "audio" },
    ],
  },
  {
    id: "10",
    name: "Nandini Gupta",
    photo: initials("Nandini Gupta"),
    optionalSubject: "Economics",
    mainsAttempts: 2,
    interviewAppearances: 2,
    bio: "AIR 15 in CSE 2020. Economics optional and GS Paper III specialist. Former economic advisor with real-world policy insights.",
    rating: 4.7,
    totalReviews: 189,
    pricing: { audioPerMinute: 18, videoPerMinute: 28, audioPerHour: 900, videoPerHour: 1400 },
    availability: ["Mon", "Thu", "Sat", "Sun"],
    startingPrice: 18,
    posts: [
      { id: "p8", title: "Indian Economy: Beyond NCERT", content: "While NCERTs give you the base, scoring in GS III requires understanding current economic data, budget analysis, and policy implications...", date: "2025-12-08", category: "Strategy" },
    ],
    reviews: [
      { id: "r14", userName: "Rohit V.", rating: 5, comment: "Nandini ma'am's economic analysis sessions are world-class.", date: "2025-11-15", sessionType: "video" },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Shreya Agarwal",
    role: "AIR 42, CSE 2024",
    content: "This platform connected me with the perfect mentor who understood my weaknesses. The personalized guidance made all the difference in my preparation journey.",
    avatar: initials("Shreya Agarwal"),
  },
  {
    id: "t2",
    name: "Karthik Narayanan",
    role: "AIR 89, CSE 2024",
    content: "The video sessions with my mentor were incredibly valuable. Real-time doubt clearing and answer review saved me months of self-study time.",
    avatar: initials("Karthik Narayanan"),
  },
  {
    id: "t3",
    name: "Fatima Khan",
    role: "CSE 2025 Aspirant",
    content: "Finally a platform that takes UPSC mentorship seriously. The quality of mentors here is unmatched. Every session feels like a masterclass.",
    avatar: initials("Fatima Khan"),
  },
  {
    id: "t4",
    name: "Aditya Prakash",
    role: "AIR 156, CSE 2023",
    content: "I was struggling with my optional subject until I found my mentor here. The structured approach and regular sessions transformed my scores.",
    avatar: initials("Aditya Prakash"),
  },
];

export const mockSessions: Session[] = [
  { id: "s1", mentorId: "1", mentorName: "Dr. Aarav Sharma", date: "2026-03-10", time: "10:00 AM", type: "video", duration: 60, cost: 1200, status: "upcoming" },
  { id: "s2", mentorId: "2", mentorName: "Meera Iyer", date: "2026-02-28", time: "2:00 PM", type: "audio", duration: 45, cost: 750, status: "completed" },
  { id: "s3", mentorId: "6", mentorName: "Pooja Nair", date: "2026-02-20", time: "11:00 AM", type: "video", duration: 60, cost: 2000, status: "completed" },
  { id: "s4", mentorId: "5", mentorName: "Rajesh Kumar Singh", date: "2026-03-15", time: "4:00 PM", type: "chat", duration: 30, cost: 550, status: "upcoming" },
  { id: "s5", mentorId: "3", mentorName: "Vikram Rathore", date: "2026-01-15", time: "9:00 AM", type: "video", duration: 60, cost: 1400, status: "completed" },
];

export const optionalSubjects = [
  "Public Administration",
  "Sociology",
  "History",
  "Political Science",
  "Geography",
  "Anthropology",
  "Mathematics",
  "Philosophy",
  "Economics",
  "Telugu Literature",
  "Hindi Literature",
  "Law",
  "Psychology",
];
