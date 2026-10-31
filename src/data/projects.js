import {
  Monitor,
  GraduationCap,
  PhoneCall,
  BriefcaseBusiness,
  Tv,
  Users,
  Network,
  Code2,
} from "lucide-react";

export const projects = [
  {
    id: 1,
    number: "01",
    name: "Gamma POS",
    category: "Business Software",
    subtitle: "Point of Sale & Accounting Software",
    description:
      "A complete POS and accounting solution designed to simplify retail and wholesale business operations.",
    details:
      "Gamma POS is an integrated business management and accounting solution for organizations, retail stores, warehouses and wholesale businesses. It helps manage financial records, purchases, sales, transactions and complex calculations from one platform.",
    features: [
      "Sales and purchase management",
      "Inventory and stock tracking",
      "Business accounting and financial reports",
      "Customer and supplier management",
      "Online and offline functionality",
      "Retail and wholesale business support",
    ],
    suitableFor:
      "Fashion houses, saree shops, shoe stores, cosmetic shops, departmental stores, electronics shops and mobile shops.",
    icon: Monitor,
    tag: "Business Management",
    color: "orange",
  },

  {
    id: 2,
    number: "02",
    name: "Institute Management",
    category: "Education Technology",
    subtitle: "Complete Educational Institution Management",
    description:
      "A web-based education management platform that makes institutional operations smarter and more transparent.",
    details:
      "Institute Management Software is a web and internet-based platform designed to improve the quality, efficiency and reputation of educational institutions. It centralizes academic and administrative activities in one system.",
    features: [
      "Student information management",
      "Admission and enrollment management",
      "Academic and examination management",
      "Fee and payment management",
      "Administrative activity management",
      "Centralized web-based platform",
    ],
    suitableFor:
      "Schools, colleges, madrasas, kindergartens and other educational institutions.",
    icon: GraduationCap,
    tag: "Education",
    color: "purple",
  },

  {
    id: 3,
    number: "03",
    name: "Voice Bulk SMS & Call",
    category: "Communication Technology",
    subtitle: "Voice Call Blasting & Campaign Management",
    description:
      "Reach your customers instantly with scheduled voice messages and promotional call campaigns.",
    details:
      "Voice Bulk SMS and Voice Call Blasting is a communication service that allows businesses to record or schedule voice messages and deliver them to subscribers through automated voice calls.",
    features: [
      "Automated voice call campaigns",
      "Scheduled message delivery",
      "Recorded voice message broadcasting",
      "Promotional campaign support",
      "Subscriber communication",
      "IPTSP-based voice call campaigns",
    ],
    suitableFor:
      "Businesses, service providers, organizations and companies that need large-scale customer communication.",
    icon: PhoneCall,
    tag: "Communication",
    color: "blue",
  },

  {
    id: 4,
    number: "04",
    name: "IT Consultancy",
    category: "IT Services",
    subtitle: "Technology Strategy & Professional IT Guidance",
    description:
      "Expert IT guidance to help organizations improve efficiency and solve technology challenges.",
    details:
      "Our IT consultancy service helps businesses understand their current technology infrastructure, identify operational challenges and implement suitable IT solutions. We provide practical recommendations aligned with business goals.",
    features: [
      "IT infrastructure assessment",
      "Technology planning and strategy",
      "System and workflow optimization",
      "Technical problem analysis",
      "IT solution recommendations",
      "Digital transformation guidance",
    ],
    suitableFor:
      "Businesses and organizations looking to improve their IT infrastructure, technology strategy and operational efficiency.",
    icon: BriefcaseBusiness,
    tag: "Consultancy",
    color: "green",
  },

  {
    id: 5,
    number: "05",
    name: "Digital CATV Solution",
    category: "Telecommunication",
    subtitle: "Digital Cable Television Management Solution",
    description:
      "A comprehensive solution for modern cable television service operations and digital delivery.",
    details:
      "Modern CATV systems provide much more than traditional television broadcasting. They can support digital video delivery, high-speed data services, voice telephony, networking and interactive services. Our digital CATV solution supports the management of these complex operations.",
    features: [
      "Digital cable TV infrastructure support",
      "Signal processing and distribution",
      "Digital video delivery",
      "Subscriber service management support",
      "Networking and data service integration",
      "Modern CATV operations support",
    ],
    suitableFor:
      "Cable television operators and organizations providing digital television and related communication services.",
    icon: Tv,
    tag: "CATV",
    color: "purple",
  },

  {
    id: 6,
    number: "06",
    name: "Subscriber Management System",
    category: "Telecommunication",
    subtitle: "Centralized Subscriber & Billing Management",
    description:
      "A centralized platform for managing subscribers, billing, service provisioning and customer support.",
    details:
      "Subscriber Management System (SMS) is a software platform for subscription-based service providers. It helps manage subscriber accounts, billing, service provisioning and customer support from a centralized system.",
    features: [
      "Subscriber account management",
      "Billing and payment management",
      "Service provisioning",
      "Subscription tracking",
      "Customer support management",
      "Centralized subscriber database",
    ],
    suitableFor:
      "Cable TV operators, internet service providers, telecommunication companies and subscription-based businesses.",
    icon: Users,
    tag: "Subscriber Management",
    color: "blue",
  },

  {
    id: 7,
    number: "07",
    name: "Networking Solution",
    category: "Networking & Infrastructure",
    subtitle: "Enterprise Networking & Connectivity Solutions",
    description:
      "Reliable networking solutions that connect devices, systems and users across business environments.",
    details:
      "Our networking solutions combine hardware, software and technical services to facilitate communication and data exchange between devices, systems and users within an organization or across multiple locations.",
    features: [
      "Network infrastructure planning",
      "LAN and WAN connectivity",
      "Network hardware integration",
      "Device and system connectivity",
      "Resource sharing and collaboration",
      "Business network infrastructure support",
    ],
    suitableFor:
      "Businesses, offices, institutions and organizations requiring reliable network connectivity and infrastructure.",
    icon: Network,
    tag: "Networking",
    color: "green",
  },

  {
    id: 8,
    number: "08",
    name: "Custom Software Solutions",
    category: "Software Development",
    subtitle: "Tailored Digital Solutions for Businesses",
    description:
      "Custom-built software solutions designed around your business requirements and operational needs.",
    details:
      "We provide customized software development solutions to address specific business challenges. Our approach focuses on understanding requirements and developing practical digital solutions for modern organizations.",
    features: [
      "Custom web application development",
      "Business process automation",
      "Desktop software solutions",
      "Mobile application solutions",
      "System integration",
      "Requirement-based development",
    ],
    suitableFor:
      "Startups, enterprises, institutions and businesses looking for software tailored to their requirements.",
    icon: Code2,
    tag: "Custom Development",
    color: "orange",
  },
];

export const projectCategories = [
  "All Projects",
  "Business Software",
  "Education Technology",
  "Communication Technology",
  "IT Services",
  "Telecommunication",
  "Networking & Infrastructure",
  "Software Development",
];