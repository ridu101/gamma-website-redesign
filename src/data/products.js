
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
    Printer,
    ScanBarcode,
    Barcode,
    Wallet,
} from "lucide-react";

// =============================================
// GAMMASOFT PRODUCTS
// Software: 9
// Devices: 9
// =============================================

export const products = [

    // =============================================
    // SOFTWARE SOLUTIONS
    // =============================================

    {
        id: 1,
        type: "software",
        name: "POS Pro Suite",
        category: "Business Management",
        description:
            "A powerful point-of-sale solution with smart inventory, seamless billing, sales tracking and real-time business analytics.",
        icon: ShoppingCart,
        tag: "Retail & Restaurant",
        number: "01",
        featured: true,
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
        imageAlt: "Modern retail point of sale system",
        features: [
            "Smart point-of-sale billing",
            "Inventory and stock management",
            "Real-time sales tracking",
            "Business analytics and reports",
            "Customer management",
        ],
    },

    {
        id: 2,
        type: "software",
        name: "ERP.Enterprise",
        category: "Enterprise Software",
        description:
            "Manage your entire business ecosystem with integrated finance, HR, supply chain and manufacturing solutions.",
        icon: Monitor,
        tag: "Enterprise",
        number: "02",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85",
        imageAlt: "Enterprise business analytics dashboard",
        features: [
            "Finance and accounting management",
            "Human resource management",
            "Supply chain management",
            "Manufacturing operations",
            "Centralized business reporting",
        ],
    },

    {
        id: 3,
        type: "software",
        name: "Customer 360 CRM",
        category: "Business Management",
        description:
            "Build stronger customer relationships with sales automation, customer insights and intelligent support management.",
        icon: Users,
        tag: "CRM Platform",
        number: "03",
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=85",
        imageAlt: "Team collaborating on customer management",
        features: [
            "Customer database management",
            "Sales pipeline tracking",
            "Customer interaction history",
            "Lead management",
            "Support and follow-up management",
        ],
    },

    {
        id: 4,
        type: "software",
        name: "StockMaster",
        category: "Business Management",
        description:
            "Simplify inventory operations with real-time stock tracking, barcode integration and automated low-stock alerts.",
        icon: Package,
        tag: "Inventory",
        number: "04",
        image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=85",
        imageAlt: "Warehouse inventory and stock management",
        features: [
            "Real-time inventory tracking",
            "Barcode integration",
            "Low-stock notifications",
            "Purchase and sales records",
            "Warehouse management",
        ],
    },

    {
        id: 5,
        type: "software",
        name: "GammaShop",
        category: "E-Commerce",
        description:
            "Launch your digital storefront with customizable e-commerce features, payment integration and mobile compatibility.",
        icon: Store,
        tag: "E-Commerce",
        number: "05",
        featured: true,
        image:
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1000&q=85",
        imageAlt: "E-commerce shopping experience",
        features: [
            "Customizable online storefront",
            "Product and order management",
            "Payment gateway integration",
            "Mobile-friendly shopping",
            "Sales and order analytics",
        ],
    },

    {
        id: 6,
        type: "software",
        name: "PeopleCore HR",
        category: "Enterprise Software",
        description:
            "An integrated HR management platform for payroll, employee attendance, leave management and performance reviews.",
        icon: UserCog,
        tag: "Human Resources",
        number: "06",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=85",
        imageAlt: "Human resources team collaboration",
        features: [
            "Employee information management",
            "Attendance tracking",
            "Payroll management",
            "Leave management",
            "Performance reviews",
        ],
    },

    {
        id: 7,
        type: "software",
        name: "DataVision BI",
        category: "Enterprise Software",
        description:
            "Transform business data into actionable insights through interactive dashboards, KPI tracking and AI-driven analytics.",
        icon: BarChart3,
        tag: "Business Intelligence",
        number: "07",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85",
        imageAlt: "Business intelligence data visualization",
        features: [
            "Interactive analytics dashboards",
            "KPI monitoring",
            "Business performance reports",
            "Data visualization",
            "AI-driven insights",
        ],
    },

    {
        id: 8,
        type: "software",
        name: "EduSoft Suite",
        category: "Education",
        description:
            "A complete educational management system covering admissions, student records, grades, fees and parent communication.",
        icon: GraduationCap,
        tag: "Education",
        number: "08",
        image:
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&q=85",
        imageAlt: "Modern digital education environment",
        features: [
            "Admission management",
            "Student records",
            "Grades and examination management",
            "Fee collection management",
            "Parent communication",
        ],
    },

    {
        id: 9,
        type: "software",
        name: "Custom Solutions",
        category: "Custom Development",
        description:
            "Purpose-built digital solutions tailored to your business requirements across web, mobile and desktop platforms.",
        icon: Code2,
        tag: "Tailored Software",
        number: "09",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=85",
        imageAlt: "Custom software development workspace",
        features: [
            "Custom web applications",
            "Mobile application development",
            "Desktop software",
            "API integrations",
            "Business-specific automation",
        ],
    },


    // =============================================
    // DEVICE SOLUTIONS
    // =============================================

    {
        id: 10,
        type: "device",
        name: "Cash Drawer ZH-405N",
        category: "POS Accessories",
        description:
            "A cash drawer designed for POS environments to support organized cash handling and daily retail transactions.",
        icon: Wallet,
        tag: "Cash Drawer",
        number: "10",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
        imageAlt: "Retail point of sale checkout environment",
        features: [
            "POS cash handling accessory",
            "Designed for retail checkout environments",
            "Supports organized cash management",
        ],
    },

    {
        id: 11,
        type: "device",
        name: "Model D100 - Screen Touch POS Terminal (Black)",
        category: "POS Terminal",
        description:
            "A touchscreen POS terminal designed for business checkout operations and point-of-sale environments.",
        icon: Monitor,
        tag: "Touch POS Terminal",
        number: "11",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
        imageAlt: "Point of sale checkout terminal",
        features: [
            "Touchscreen POS terminal",
            "Designed for business checkout",
            "Suitable for retail POS environments",
        ],
    },

    {
        id: 12,
        type: "device",
        name: "Model M6 - Touch POS with Built-in Printer (White)",
        category: "POS Terminal",
        description:
            "An integrated touchscreen POS terminal with a built-in printer for business transaction workflows.",
        icon: Printer,
        tag: "All-in-One POS",
        number: "12",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
        imageAlt: "POS checkout equipment",
        features: [
            "Touchscreen POS terminal",
            "Built-in printer",
            "Integrated checkout solution",
        ],
    },

    {
        id: 13,
        type: "device",
        name: "Model M5 - Integrated POS with Full Accessories",
        category: "POS Terminal",
        description:
            "An integrated POS solution supplied with accessories for point-of-sale and business checkout operations.",
        icon: Monitor,
        tag: "Integrated POS",
        number: "13",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
        imageAlt: "Integrated point of sale system",
        features: [
            "Integrated POS solution",
            "Supplied with accessories",
            "Designed for business checkout operations",
        ],
    },

    {
        id: 14,
        type: "device",
        name: "Wireless Barcode Scanner H510",
        category: "Barcode Scanner",
        description:
            "A wireless barcode scanner for product identification and barcode-based retail operations.",
        icon: ScanBarcode,
        tag: "Wireless Scanner",
        number: "14",
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=1000&q=85",
        imageAlt: "Barcode scanning equipment",
        features: [
            "Wireless barcode scanner",
            "Barcode-based product identification",
            "Designed for retail workflows",
        ],
    },

    {
        id: 15,
        type: "device",
        name: "Wireless Barcode Scanner 7100W (Black)",
        category: "Barcode Scanner",
        description:
            "A wireless barcode scanning device designed to support product scanning and checkout operations.",
        icon: ScanBarcode,
        tag: "Wireless Scanner",
        number: "15",
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=1000&q=85",
        imageAlt: "Barcode scanner device",
        features: [
            "Wireless barcode scanner",
            "Product barcode scanning",
            "Retail checkout support",
        ],
    },

    {
        id: 16,
        type: "device",
        name: "Thermal Receipt Printer T20",
        category: "Receipt Printer",
        description:
            "A thermal receipt printer designed for printing transaction receipts in POS and retail environments.",
        icon: Printer,
        tag: "Thermal Printer",
        number: "16",
        image:
            "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1000&q=85",
        imageAlt: "Thermal printing equipment",
        features: [
            "Thermal receipt printing",
            "Designed for POS environments",
            "Supports transaction receipt workflows",
        ],
    },

    {
        id: 17,
        type: "device",
        name: "POS Pole Display PD-8",
        category: "POS Accessories",
        description:
            "A POS pole display designed to present transaction information in customer-facing checkout environments.",
        icon: Monitor,
        tag: "Customer Display",
        number: "17",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
        imageAlt: "Customer-facing POS checkout display",
        features: [
            "POS pole display",
            "Customer-facing checkout accessory",
            "Designed for transaction information display",
        ],
    },

    {
        id: 18,
        type: "device",
        name: "Barcode Label Printer LP471",
        category: "Label Printer",
        description:
            "A barcode label printer designed to support barcode label production for product identification and inventory workflows.",
        icon: Barcode,
        tag: "Label Printer",
        number: "18",
        image:
            "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1000&q=85",
        imageAlt: "Label printing equipment",
        features: [
            "Barcode label printing",
            "Product identification support",
            "Inventory labeling workflows",
        ],
    },

];


// =============================================
// PRODUCT CATEGORIES
// IMPORTANT: Categories must match product.category
// =============================================

export const productCategories = {
    software: [
        "All Software",
        "Business Management",
        "Enterprise Software",
        "E-Commerce",
        "Education",
        "Custom Development",
    ],

    device: [
        "All Devices",
        "POS Terminal",
        "POS Accessories",
        "Barcode Scanner",
        "Receipt Printer",
        "Label Printer",
    ],
};
