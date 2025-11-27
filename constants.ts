
import { Project, SkillNode, Coordinates, ProfileData, CaseStudy } from './types';

export const PERSONAL_INFO = {
  name: "COLLINS OJEABU",
  role: "WEB DESIGNER & DEV",
  location: "WARSAW, PL",
  availability: "OPEN FOR COMMISSIONS",
  email: "hello@collinsojeabu.com"
};

export const GEODATA: Coordinates = {
  lat: "52° 13' 47\" N",
  lng: "21° 00' 42\" E",
  location: "WARSAW_TERMINAL_01"
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Signal",
    client: "BOLSTER",
    category: "DASHBOARD",
    type: 'dashboard',
    year: "2024",
    featured: true,
    description: "A comprehensive threat intelligence dashboard featuring real-time attack vector mapping and takedown metrics.",
    tech: ["React", "D3.js", "WebSocket"],
    link: "#",
    imageType: 'chart-complex',
    stats: [
        { label: "Total Takedowns", value: "17,249", trend: 'up' },
        { label: "Scans", value: "5,870" }
    ]
  },
  {
    id: "02",
    title: "CheckPhish AI",
    client: "BOLSTER",
    category: "DASHBOARD",
    type: 'dashboard',
    year: "2023",
    description: "AI-driven domain monitoring interface for detecting phishing attempts in real-time.",
    tech: ["Next.js", "TensorFlow.js"],
    link: "#",
    imageType: 'chart-simple',
    stats: [
        { label: "High Risk", value: "324" }
    ]
  },
  {
    id: "03",
    title: "POPMART",
    client: "POPMART",
    category: "WEBSITE",
    type: 'website',
    year: "2023",
    description: "Immersive e-commerce experience for collectible art toys with 3D product configurators.",
    tech: ["Three.js", "Shopify"],
    link: "#",
    imageType: '3d-character'
  },
  {
    id: "04",
    title: "LiStyle AI",
    client: "INTERNAL",
    category: "APP",
    type: 'app',
    year: "2024",
    description: "Personal styling assistant application using generative AI for outfit recommendations.",
    tech: ["React Native", "OpenAI"],
    link: "#",
    imageType: 'mobile-ui'
  },
  {
    id: "05",
    title: "Abuse Mailbox",
    client: "BOLSTER",
    category: "DASHBOARD",
    type: 'dashboard',
    year: "2023",
    description: "Automated email threat analysis tool for enterprise security teams.",
    tech: ["Vue.js", "Python"],
    link: "#",
    imageType: 'table-ui'
  }
];

export const SKILLS: string[] = [
  "FRAMER", "FIGMA", "MOTION DESIGN", "REACT.JS", "NEXT.JS", "TYPESCRIPT", 
  "WEBGL", "CREATIVE DEV", "TAILWIND CSS", "NODE.JS", "UI/UX"
];

export const SKILL_MATRIX: SkillNode[] = [
  { name: "Frontend Arch", level: 95, category: "dev" },
  { name: "Motion Design", level: 92, category: "design" },
  { name: "UI Systems", level: 88, category: "design" },
  { name: "Backend Logic", level: 75, category: "dev" },
];

export const PROFILE_DATA: ProfileData = {
  pillars: [
    {
      icon: "monitor",
      title: "Inspired by Art",
      desc: "I believe software is the modern canvas. My work prioritizes aesthetics without compromising structural integrity.",
      tags: ["WebGL", "Spline", "Creative Direction"]
    },
    {
      icon: "code",
      title: "Curiosity = Dev",
      desc: "I don't just design; I build. Understanding the medium allows me to push boundaries effectively.",
      tags: ["React", "TypeScript", "Node.js"]
    },
    {
      icon: "cursor",
      title: "Product Designer",
      desc: "Solving real problems for real users. Data-driven decisions meet intuitive interaction patterns.",
      tags: ["Figma", "User Research", "Prototyping"]
    },
    {
      icon: "plus",
      title: "People",
      desc: "Technology is for humans. I thrive in collaborative environments where empathy drives development.",
      tags: ["Leadership", "Mentoring", "Agile"]
    }
  ],
  persona: {
    traits: [
      { label: "Empathetic", value: 85 },
      { label: "Detail-focused", value: 72 },
      { label: "Curious", value: 95 },
      { label: "Creative", value: 88 },
      { label: "Adaptable", value: 78 },
      { label: "Logic", value: 82 }
    ],
    goals: [
      "Designs logic with empathy",
      "Finds beauty in systems",
      "Where technology becomes intuitive"
    ]
  },
  experience: [
    { city: "Boston", coords: "42.3601° N, 71.0589° W", years: "2020-2022" },
    { city: "San Francisco", coords: "37.7749° N, 122.4194° W", years: "2022-2025" },
    { city: "New York", coords: "40.7128° N, 74.0060° W", years: "2019-2020" },
    { city: "Suzhou", coords: "31.2989° N, 120.5853° E", years: "2018-2019" }
  ],
  testimonials: [
    {
      role: "Senior Product Manager",
      company: "Google",
      quote: "Collins translates complex requirements into elegant interfaces effortlessly.",
      shape: "triangle"
    },
    {
      role: "VP of AI Research",
      company: "Bolster",
      quote: "A rare breed of designer who understands the code behind the pixels.",
      shape: "square"
    },
    {
      role: "VP of Marketing",
      company: "Startup",
      quote: "He doesn't just build websites; he builds brand experiences.",
      shape: "circle"
    },
    {
      role: "Digital Designer",
      company: "Agency",
      quote: "His attention to motion and interaction detail is unmatched.",
      shape: "diamond"
    }
  ]
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "CS-01",
    title: "PROJECT SIGNAL",
    client: "BOLSTER",
    year: "2024",
    tags: ["Data Viz", "Cybersecurity", "React"],
    visualType: "dashboard",
    heroMetric: "REDUCING INCIDENT REACTION TIME BY 82%",
    context: {
        role: "Lead Product Designer & Dev",
        timeline: "8 Weeks",
        team: "2 Backend Eng, 1 PM",
        stack: ["React", "D3.js", "WebSockets"]
    },
    narrative: {
        problem: "Security analysts were drowning in tabular data. The legacy system required 15 clicks to visualize a single threat vector, leading to an average response time of 45 minutes per incident. Critical takedowns were being missed due to cognitive overload.",
        research: "I conducted 12 user interviews with SOC analysts. The core insight: They didn't need more data; they needed *pattern recognition*. They were mentally building graphs that the UI should have provided.",
        process: "We moved from a 'Spreadsheet First' to a 'Graph First' mentality. I prototyped a Node-Link visualization engine using D3.js to test if analysts could identify threat clusters visually. The initial tests showed a 3x speed improvement in identification.",
        solution: "The final dashboard aggregates thousands of signals into a real-time, interactive threat map. We implemented 'risk radii'—visual indicators that allow analysts to assess severity at a glance without reading logs.",
        impact: "The new system dropped average response times from 45 mins to 8 mins. The 'Visual Triage' feature is now the default view for 95% of enterprise users."
    },
    stats: [
        { label: "Response Time", value: "-82%" },
        { label: "Analyst Efficiency", value: "4x" },
        { label: "Adoption Rate", value: "95%" }
    ]
  },
  {
    id: "CS-02",
    title: "POPMART GLOBAL",
    client: "POPMART",
    year: "2023",
    tags: ["E-commerce", "3D", "Conversion"],
    visualType: "mobile",
    heroMetric: "INCREASING MYSTERY BOX SALES BY 45%",
    context: {
        role: "Creative Developer",
        timeline: "12 Weeks",
        team: "Design Agency + In-house Devs",
        stack: ["Three.js", "Shopify", "React-Spring"]
    },
    narrative: {
        problem: "Popmart's physical stores thrive on the thrill of the 'Blind Box'—shaking a box to guess the toy inside. Their e-commerce site was a flat, static catalog that failed to capture this emotional hook, leading to stagnating sales in the mystery category.",
        research: "We found that the 'Unboxing Ritual' was key to the brand's identity. Digital users felt cheated out of the experience. We needed to simulate physics and anticipation in a browser environment.",
        process: "I built a physics-based 3D box engine using Cannon.js and Three.js. We iterated on the 'Shake' interaction—using device accelerometers on mobile and mouse-shake velocity on desktop to trigger haptic feedback and sound cues.",
        solution: "A fully immersive digital unboxing flow. Users can pick a specific box from a virtual shelf, shake it to hear 'weight' hints, and tear open the digital foil. It gamified the purchase path.",
        impact: "The 'Mystery' category saw a 45% uplift in sales. Session duration tripled as users spent time 'shaking' different boxes. The feature became the core of their marketing campaign."
    },
    stats: [
        { label: "Sales Uplift", value: "+45%" },
        { label: "Session Duration", value: "3.5x" },
        { label: "Cart Completion", value: "+22%" }
    ]
  },
  {
    id: "CS-03",
    title: "ABUSE MAILBOX",
    client: "ENTERPRISE SEC",
    year: "2023",
    tags: ["Automation", "AI", "UX"],
    visualType: "system",
    heroMetric: "ZERO FALSE POSITIVES IN Q1 2024",
    context: {
        role: "UX Engineer",
        timeline: "6 Months",
        team: "Security Research Team",
        stack: ["Vue.js", "Python", "TensorFlow"]
    },
    narrative: {
        problem: "The client received 50,000+ reported phishing emails weekly. Manual triage was impossible, and their existing automation rules were too aggressive, blocking legitimate CEO communications (False Positives) which eroded trust in the security team.",
        research: "We analyzed the manual triage workflow. Analysts were spending 80% of their time checking simple headers (DKIM/SPF). They needed a tool to handle the 'obvious' cases so they could focus on sophisticated spear-phishing.",
        process: "We designed a 'Confidence Score' system. Instead of a binary Block/Allow, we introduced a 'Gray Zone' UI for human review, sorted by AI confidence. I created a 'DNA Strand' visualization for email headers to highlight spoofing instantly.",
        solution: "A split-pane triage interface. The left pane handles high-confidence AI actions (Auto-Remediate). The right pane offers a rapid-review workflow for the 'Gray Zone'.",
        impact: "92% of threats are now auto-remediated. The remaining 8% are processed 5x faster using the DNA visualizer. Most importantly: Zero false positives reported in the first quarter."
    },
    stats: [
        { label: "Auto-Remediation", value: "92%" },
        { label: "False Positives", value: "0" },
        { label: "Eng Hours Saved", value: "120/wk" }
    ]
  }
];
