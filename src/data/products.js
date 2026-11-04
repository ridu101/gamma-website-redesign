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
            "https://www.partnertechcorp.com/upload/catalog_b/ALL_catalog_23B13_Al3KfIj8sK.webp",
        imageAlt: "Black metal POS cash drawer",
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
            "https://cdn.cloudbf.com/thumb/format/mini_xsize/files/75/img/2023/12/27/202312271146290173100.jpg.webp",
        imageAlt: "Black touchscreen POS terminal",
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
            "https://image.made-in-china.com/2f0j00nCshdGWfZzuH/Compact-All-in-One-POS-with-Printer.jpg",
        imageAlt: "All-in-one POS terminal with built-in printer",
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
            "https://cdn.cloudbf.com/thumb/format/mini_xsize/files/75/img/2023/12/27/202312271146290173100.jpg.webp",
        imageAlt: "Integrated touchscreen POS system",
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
            "https://i5.walmartimages.com/asr/a6b1546d-fe18-4350-9650-9df1c63c3084.1c1cb9f685eaba1bb1b019d2b591de52.jpeg",
        imageAlt: "Wireless handheld barcode scanner",
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
            "https://static.inkstation.com.au/pi/683453/0/barcode_scanner_is_1102dw_m4_4.jpg",
        imageAlt: "Black cordless barcode scanner",
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
            "https://cdn.prod.website-files.com/5d9a4a1fc33c893b3b802b79/601ad9eb03a61abd296989d8_eacedf5c-cfc4-4369-9341-f0c57a0a3b74.jpeg",
        imageAlt: "Black thermal receipt printer",
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
            "https://ueeshop.ly200-cdn.com/u_file/UPAW/UPAW955/2401/products/12/6b1c716c0a.png?x-oss-process=image%2Fresize%2Cm_lfit%2Ch_800%2Cw_800",
        imageAlt: "POS pole-mounted customer display",
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
            "https://static1.redcart.pl/templates/images/thumb/8272/1500/1500/pl/0/templates/images/products/8272/b92dd3c3a7b1bf8e0fdec1ca0e7abc11.png",
        imageAlt: "Desktop barcode label printer",
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