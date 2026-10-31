
import {
  Monitor,
  ShoppingCart,
  Users,
  Package,
  Store,
  UserCog,
  BarChart3,
  GraduationCap,
  Code2,
} from "lucide-react";

export const products = [
  {
    id: 1,
    name: "POS Pro Suite",
    category: "Business Management",
    description:
      "A powerful point-of-sale solution with smart inventory, seamless billing, sales tracking and real-time business analytics.",
    icon: ShoppingCart,
    tag: "Retail & Restaurant",
    number: "01",
    featured: true,
  },
  {
    id: 2,
    name: "ERP.Enterprise",
    category: "Enterprise Software",
    description:
      "Manage your entire business ecosystem with integrated finance, HR, supply chain and manufacturing solutions.",
    icon: Monitor,
    tag: "Enterprise",
    number: "02",
  },
  {
    id: 3,
    name: "Customer 360 CRM",
    category: "Business Management",
    description:
      "Build stronger customer relationships with sales automation, customer insights and intelligent support management.",
    icon: Users,
    tag: "CRM Platform",
    number: "03",
  },
  {
    id: 4,
    name: "StockMaster",
    category: "Business Management",
    description:
      "Simplify inventory operations with real-time stock tracking, barcode integration and automated low-stock alerts.",
    icon: Package,
    tag: "Inventory",
    number: "04",
  },
  {
    id: 5,
    name: "GammaShop",
    category: "E-Commerce",
    description:
      "Launch your digital storefront with customizable e-commerce features, payment integration and mobile compatibility.",
    icon: Store,
    tag: "E-Commerce",
    number: "05",
    featured: true,
  },
  {
    id: 6,
    name: "PeopleCore HR",
    category: "Enterprise Software",
    description:
      "An integrated HR management platform for payroll, employee attendance, leave management and performance reviews.",
    icon: UserCog,
    tag: "Human Resources",
    number: "06",
  },
  {
    id: 7,
    name: "DataVision BI",
    category: "Enterprise Software",
    description:
      "Transform business data into actionable insights through interactive dashboards, KPI tracking and AI-driven analytics.",
    icon: BarChart3,
    tag: "Business Intelligence",
    number: "07",
  },
  {
    id: 8,
    name: "EduSoft Suite",
    category: "Education",
    description:
      "A complete educational management system covering admissions, student records, grades, fees and parent communication.",
    icon: GraduationCap,
    tag: "Education",
    number: "08",
  },
  {
    id: 9,
    name: "Custom Solutions",
    category: "Custom Development",
    description:
      "Purpose-built digital solutions tailored to your business requirements across web, mobile and desktop platforms.",
    icon: Code2,
    tag: "Tailored Software",
    number: "09",
  },
];

export const productCategories = [
  "All Solutions",
  "Business Management",
  "Enterprise Software",
  "E-Commerce",
  "Education",
  "Custom Development",
];
