
import { useEffect, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    MessageCircle,
    Send,
    Sparkles,
    ShieldCheck,
    Clock3,
    Headphones,
    Package,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { CONTACT_CONFIG } from "../config/contactConfig";
import { submitQuoteRequest } from "../services/quoteService";

import QuoteSuccessModal from "../components/quote/QuoteSeccessModal";

import "./QuotePage.css";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    productName: "",
    productType: "",
};

const services = [
    "Website Design & Development",
    "Web Application Development",
    "Mobile App Development",
    "UI/UX Design",
    "E-commerce Development",
    "Software Development",
    "Digital Marketing",
    "IT Support & Consulting",
    "Other",
];

const formatProductType = (type) => {
    if (!type) return "";

    const normalizedType = type.toLowerCase();

    if (normalizedType === "software") return "Software Solution";
    if (normalizedType === "device") return "Device Solution";

    return type;
};

const QuotePage = () => {
    const [searchParams] = useSearchParams();

    // Product information from Products page
    const selectedProduct = searchParams.get("product")?.trim() || "";
    const selectedType = searchParams.get("type")?.trim() || "";

    const [formData, setFormData] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDemo, setIsDemo] = useState(false);
    const [error, setError] = useState("");

    // Automatically update product information from URL
    useEffect(() => {
        setFormData((previous) => ({
            ...previous,
            productName: selectedProduct,
            productType: selectedType,
        }));
    }, [selectedProduct, selectedType]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const result = await submitQuoteRequest({
                ...formData,
                source: "GammaSoft Website",
                submittedAt: new Date().toISOString(),
            });

            setIsDemo(Boolean(result.demo));
            setShowSuccess(true);

            // Keep selected product information after submission
            setFormData({
                ...initialForm,
                productName: selectedProduct,
                productType: selectedType,
            });
        } catch (submissionError) {
            setError(
                submissionError.message ||
                    "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWhatsApp = () => {
        const number = CONTACT_CONFIG.whatsappNumber;

        if (!number || number.includes("X")) {
            setError("WhatsApp contact will be available soon.");
            return;
        }

        let message =
            "Hello GammaSoft, I would like to discuss a project.";

        if (selectedProduct) {
            message += ` I am interested in ${selectedProduct}.`;
        }

        if (selectedType) {
            message += ` Product type: ${formatProductType(selectedType)}.`;
        }

        const encodedMessage = encodeURIComponent(message);

        window.open(
            `https://wa.me/${number}?text=${encodedMessage}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <>
            <main className="gs-quote-page">

                {/* =====================================
                    HERO
                ====================================== */}

                <section className="gs-quote-hero">
                    <div className="gs-quote-hero-grid" />
                    <div className="gs-quote-hero-glow" />

                    <div className="gs-quote-container">
                        <div className="gs-quote-hero-content">

                            <span className="gs-quote-eyebrow">
                                <Sparkles size={14} />
                                LET'S BUILD SOMETHING GREAT
                            </span>

                            <h1>
                                Let's Turn Your
                                <span> Ideas Into Reality.</span>
                            </h1>

                            <p>
                                Have a project in mind? Tell us what you're planning.
                                Our team will understand your requirements and help
                                you find the right digital solution.
                            </p>

                            <div className="gs-quote-hero-points">
                                <span>
                                    <CheckCircle2 size={16} />
                                    Personalized Solutions
                                </span>

                                <span>
                                    <CheckCircle2 size={16} />
                                    Expert Consultation
                                </span>

                                <span>
                                    <CheckCircle2 size={16} />
                                    Clear Project Planning
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="gs-quote-hero-bottom">
                        <span>GAMMASOFT / GET A QUOTE</span>
                        <span>01 — PROJECT INQUIRY</span>
                    </div>
                </section>

                {/* =====================================
                    FORM SECTION
                ====================================== */}

                <section className="gs-quote-content">
                    <div className="gs-quote-container">

                        <div className="gs-quote-layout">

                            {/* LEFT INFORMATION */}

                            <aside className="gs-quote-info">

                                <span className="gs-quote-section-label">
                                    START A CONVERSATION
                                </span>

                                <h2>
                                    Tell Us About
                                    <span> Your Idea.</span>
                                </h2>

                                <p>
                                    Every great project starts with a conversation.
                                    Share your idea, goals and requirements. We'll
                                    help you explore the next steps.
                                </p>

                                <div className="gs-quote-benefits">

                                    <div className="gs-quote-benefit">
                                        <div className="gs-quote-benefit-icon">
                                            <ShieldCheck size={21} />
                                        </div>

                                        <div>
                                            <h3>Requirement Focused</h3>
                                            <p>
                                                Solutions aligned with your business goals.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="gs-quote-benefit">
                                        <div className="gs-quote-benefit-icon">
                                            <Clock3 size={21} />
                                        </div>

                                        <div>
                                            <h3>Timely Communication</h3>
                                            <p>
                                                Our team will review your inquiry.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="gs-quote-benefit">
                                        <div className="gs-quote-benefit-icon">
                                            <Headphones size={21} />
                                        </div>

                                        <div>
                                            <h3>Expert Guidance</h3>
                                            <p>
                                                Discuss your project with our team.
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <div className="gs-quote-whatsapp-box">
                                    <div className="gs-quote-whatsapp-icon">
                                        <MessageCircle size={22} />
                                    </div>

                                    <div>
                                        <h3>Prefer a quick chat?</h3>
                                        <p>
                                            Connect with us through WhatsApp.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleWhatsApp}
                                        aria-label="Chat with GammaSoft on WhatsApp"
                                    >
                                        <ArrowUpRight size={19} />
                                    </button>
                                </div>

                            </aside>

                            {/* FORM */}

                            <div className="gs-quote-form-card">

                                <div className="gs-quote-form-heading">
                                    <div>
                                        <span>PROJECT INQUIRY FORM</span>
                                        <h2>Get Your Free Quote</h2>
                                        <p>
                                            Fill in the details below. Fields marked
                                            with * are required.
                                        </p>
                                    </div>

                                    <div className="gs-quote-form-heading-icon">
                                        <Send size={23} />
                                    </div>
                                </div>

                                {/* SELECTED PRODUCT INFORMATION */}

                                {selectedProduct && (
                                    <div className="gs-quote-selected-product">
                                        <div className="gs-quote-selected-product-icon">
                                            <Package size={21} />
                                        </div>

                                        <div className="gs-quote-selected-product-info">
                                            <span>YOUR SELECTED PRODUCT</span>
                                            <h3>{selectedProduct}</h3>

                                            {selectedType && (
                                                <p>
                                                    {formatProductType(selectedType)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>

                                    <div className="gs-quote-form-grid">

                                        {/* NAME */}

                                        <div className="gs-quote-field">
                                            <label htmlFor="quote-name">
                                                Full Name <span>*</span>
                                            </label>

                                            <input
                                                id="quote-name"
                                                type="text"
                                                name="name"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                autoComplete="name"
                                                required
                                                maxLength={100}
                                            />
                                        </div>

                                        {/* EMAIL */}

                                        <div className="gs-quote-field">
                                            <label htmlFor="quote-email">
                                                Work Email <span>*</span>
                                            </label>

                                            <input
                                                id="quote-email"
                                                type="email"
                                                name="email"
                                                placeholder="you@company.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                autoComplete="email"
                                                required
                                                maxLength={150}
                                            />
                                        </div>

                                        {/* PHONE */}

                                        <div className="gs-quote-field">
                                            <label htmlFor="quote-phone">
                                                Phone Number <span>*</span>
                                            </label>

                                            <input
                                                id="quote-phone"
                                                type="tel"
                                                name="phone"
                                                placeholder="+880 1XXXXXXXXX"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                autoComplete="tel"
                                                required
                                                maxLength={30}
                                            />
                                        </div>

                                        {/* COMPANY */}

                                        <div className="gs-quote-field">
                                            <label htmlFor="quote-company">
                                                Company Name
                                            </label>

                                            <input
                                                id="quote-company"
                                                type="text"
                                                name="company"
                                                placeholder="Your company or organization"
                                                value={formData.company}
                                                onChange={handleChange}
                                                autoComplete="organization"
                                                maxLength={150}
                                            />
                                        </div>

                                        {/* SERVICE */}

                                        <div className="gs-quote-field">
                                            <label htmlFor="quote-service">
                                                Service Required <span>*</span>
                                            </label>

                                            <select
                                                id="quote-service"
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select a service
                                                </option>

                                                {services.map((service) => (
                                                    <option
                                                        key={service}
                                                        value={service}
                                                    >
                                                        {service}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* BUDGET */}

                                        <div className="gs-quote-field">
                                            <label htmlFor="quote-budget">
                                                Estimated Budget
                                            </label>

                                            <select
                                                id="quote-budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select your budget
                                                </option>
                                                <option value="Under $500">
                                                    Under $500
                                                </option>
                                                <option value="$500 - $1,000">
                                                    $500 - $1,000
                                                </option>
                                                <option value="$1,000 - $3,000">
                                                    $1,000 - $3,000
                                                </option>
                                                <option value="$3,000 - $5,000">
                                                    $3,000 - $5,000
                                                </option>
                                                <option value="$5,000+">
                                                    $5,000+
                                                </option>
                                                <option value="Not sure yet">
                                                    Not sure yet
                                                </option>
                                            </select>
                                        </div>

                                        {/* TIMELINE */}

                                        <div className="gs-quote-field gs-quote-field-full">
                                            <label htmlFor="quote-timeline">
                                                Expected Timeline
                                            </label>

                                            <select
                                                id="quote-timeline"
                                                name="timeline"
                                                value={formData.timeline}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select a timeline
                                                </option>
                                                <option value="As soon as possible">
                                                    As soon as possible
                                                </option>
                                                <option value="Within 2-4 weeks">
                                                    Within 2-4 weeks
                                                </option>
                                                <option value="Within 1-3 months">
                                                    Within 1-3 months
                                                </option>
                                                <option value="3+ months">
                                                    3+ months
                                                </option>
                                                <option value="Flexible">
                                                    Flexible
                                                </option>
                                            </select>
                                        </div>

                                        {/* PROJECT DETAILS */}

                                        <div className="gs-quote-field gs-quote-field-full">
                                            <label htmlFor="quote-message">
                                                Tell Us About Your Project <span>*</span>
                                            </label>

                                            <textarea
                                                id="quote-message"
                                                name="message"
                                                rows="6"
                                                placeholder="Describe your project, goals, features and any specific requirements..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                minLength={10}
                                                maxLength={5000}
                                            />
                                        </div>

                                    </div>

                                    {error && (
                                        <div
                                            className="gs-quote-error"
                                            role="alert"
                                        >
                                            {error}
                                        </div>
                                    )}

                                    <div className="gs-quote-submit-area">

                                        <p>
                                            <ShieldCheck size={15} />
                                            Your project information will be handled
                                            confidentially.
                                        </p>

                                        <button
                                            type="submit"
                                            className="gs-quote-submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    Submitting...
                                                    <span className="gs-quote-spinner" />
                                                </>
                                            ) : (
                                                <>
                                                    Submit Project Inquiry
                                                    <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>
                    </div>
                </section>

                {/* =====================================
                    BOTTOM CTA
                ====================================== */}

                <section className="gs-quote-bottom">
                    <div className="gs-quote-container">
                        <div className="gs-quote-bottom-inner">

                            <div>
                                <span>HAVE A QUESTION?</span>
                                <h2>
                                    Let's create something
                                    <strong> meaningful.</strong>
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={handleWhatsApp}
                                className="gs-quote-bottom-button"
                            >
                                Chat with Our Team
                                <MessageCircle size={18} />
                            </button>

                        </div>
                    </div>
                </section>

                {/* SUCCESS MODAL */}

                <QuoteSuccessModal
                    isOpen={showSuccess}
                    isDemo={isDemo}
                    onClose={() => setShowSuccess(false)}
                />

            </main>
        </>
    );
};

export default QuotePage;
