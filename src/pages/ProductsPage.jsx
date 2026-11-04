import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import {
  ArrowRight,
  ArrowUpRight,
  X,
  Sparkles,
  Layers3,
  Monitor,
  Cpu,
  CheckCircle2,
  MoveUpRight,
  Quote,
} from "lucide-react";

import {
  products,
  productCategories,
} from "../data/products";

import "../sections/Products.css";

const ProductsPage = () => {

  // =============================================
  // STATES
  // =============================================

  const [activeType, setActiveType] = useState("software");
  const [activeCategory, setActiveCategory] = useState("All Software");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const productsExplorerRef = useRef(null);


  // =============================================
  // CATEGORY DATA
  // =============================================

  const currentCategories = productCategories[activeType] || [];

  const allCategory =
    activeType === "software"
      ? "All Software"
      : "All Devices";


  // =============================================
  // PRODUCT COUNTS
  // =============================================

  const softwareCount = useMemo(
    () => products.filter(
      (product) => product.type === "software"
    ).length,
    []
  );

  const deviceCount = useMemo(
    () => products.filter(
      (product) => product.type === "device"
    ).length,
    []
  );


  // =============================================
  // PRODUCT FILTERING
  // =============================================

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesType = product.type === activeType;

      const matchesCategory =
        activeCategory === allCategory ||
        product.category === activeCategory;

      return matchesType && matchesCategory;

    });

  }, [activeType, activeCategory, allCategory]);


  // =============================================
  // CHANGE SOFTWARE / DEVICE
  // =============================================

  const handleTypeChange = (type) => {
    if (type !== "software" && type !== "device") {
      return;
    }

    setActiveType(type);

    setActiveCategory(
      type === "software"
        ? "All Software"
        : "All Devices"
    );

    setSelectedProduct(null);

    // Smooth scroll to product explorer
    requestAnimationFrame(() => {
      productsExplorerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  // =============================================
  // CHANGE CATEGORY
  // =============================================

  const handleCategoryChange = (category) => {

    setActiveCategory(category);

  };


  // =============================================
  // GET A QUOTE
  // =============================================

  const handleQuote = (product) => {

    const params = new URLSearchParams({
      product: product.name,
      type: product.type,
    });

    setSelectedProduct(null);

    navigate(`/get-quote?${params.toString()}`);

  };


  // =============================================
  // MODAL SCROLL & ESCAPE HANDLING
  // =============================================

  useEffect(() => {

    if (!selectedProduct) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {

      if (event.key === "Escape") {
        setSelectedProduct(null);
      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {

      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [selectedProduct]);


  // =============================================
  // RENDER
  // =============================================

  return (

    <section
      className="gs-products gs-products-page"
      id="products"
    >

      {/* BACKGROUND EFFECTS */}

      <div className="products-glow products-glow-one" />
      <div className="products-glow products-glow-two" />
      <div className="products-grid-bg" />


      <div className="products-container">


        {/* =====================================
                    PAGE HEADER
                ====================================== */}

        <header className="products-heading">

          <div className="products-eyebrow">
            <Sparkles size={15} />

            <span>OUR DIGITAL ECOSYSTEM</span>
          </div>

          <h1>
            Solutions That <span>Move Business Forward.</span>
          </h1>

          <p>
            Discover our innovative software and device
            solutions designed to simplify operations,
            improve productivity and empower your business.
          </p>

        </header>


        {/* =====================================
                    SOLUTION TYPE SELECTOR
                ====================================== */}

        <div className="solution-switcher">

          {/* SOFTWARE TAB */}

          <button
            type="button"
            className={`solution-switch-card ${activeType === "software" ? "active" : ""
              }`}
            onClick={() => handleTypeChange("software")}
            aria-pressed={activeType === "software"}
          >

            <span className="switch-icon">
              <Layers3 size={23} />
            </span>

            <span className="switch-content">

              <small>EXPLORE OUR</small>

              <strong>Software Solutions</strong>

              <span>
                {softwareCount} solutions available
              </span>

            </span>

            <span className="switch-arrow">
              <ArrowUpRight size={20} />
            </span>

            <span className="switch-active-line" />

          </button>


          {/* DEVICE TAB */}

          <button
            type="button"
            className={`solution-switch-card ${activeType === "device" ? "active" : ""
              }`}
            onClick={() => handleTypeChange("device")}
            aria-pressed={activeType === "device"}
          >

            <span className="switch-icon device-switch-icon">
              <Cpu size={23} />
            </span>

            <span className="switch-content">

              <small>EXPLORE OUR</small>

              <strong>Device Solutions</strong>

              <span>
                {deviceCount} devices available
              </span>

            </span>

            <span className="switch-arrow">
              <ArrowUpRight size={20} />
            </span>

            <span className="switch-active-line" />

          </button>

        </div>


        {/* =====================================
                    PRODUCT EXPLORER
                ====================================== */}

        <div
          className="products-explorer"
          ref={productsExplorerRef}
        >

          {/* EXPLORER HEADER */}

          <div className="products-explorer-top">

            <div>

              <span className="explorer-eyebrow">
                {activeType === "software"
                  ? "SOFTWARE COLLECTION"
                  : "DEVICE COLLECTION"}
              </span>

              <h2>
                {activeType === "software"
                  ? "Software Products"
                  : "Device Products"}
              </h2>

            </div>

            <div className="explorer-count">

              <span className="count-dot" />

              Showing{" "}
              <strong>{filteredProducts.length}</strong>
              {" "}of{" "}

              <strong>
                {activeType === "software"
                  ? softwareCount
                  : deviceCount}
              </strong>

              {" "}solutions

            </div>

          </div>


          {/* =====================================
                        CATEGORY FILTER
                    ====================================== */}

          <div className="products-filter">

            <div className="filter-label">
              FILTER BY CATEGORY
            </div>

            <div className="filter-buttons">

              {currentCategories.map((category) => (

                <button
                  key={category}
                  type="button"
                  className={`filter-btn ${activeCategory === category
                      ? "active"
                      : ""
                    }`}
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  aria-pressed={
                    activeCategory === category
                  }
                >

                  {category}

                  {activeCategory === category && (
                    <span className="filter-active-dot" />
                  )}

                </button>

              ))}

            </div>

          </div>


          {/* =====================================
                        PRODUCT GRID
                    ====================================== */}

          {filteredProducts.length > 0 ? (

            <div
              className="products-grid"
              key={`${activeType}-${activeCategory}`}
            >

              {filteredProducts.map((product, index) => {

                const ProductIcon = product.icon || Monitor;

                return (

                  <article
                    className={`product-card ${product.featured ? "featured" : ""
                      }`}
                    key={product.id}
                    style={{
                      animationDelay: `${index * 0.07}s`,
                    }}
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="product-image-wrap">

                      <img
                        className="product-image"
                        src={product.image}
                        alt={
                          product.imageAlt ||
                          product.name
                        }
                        loading="lazy"
                      />

                      <div className="product-image-overlay" />

                      <div className="product-image-top">

                        <span className="product-image-number">
                          {product.number}
                        </span>

                        {product.featured && (

                          <span className="product-featured">

                            <Sparkles size={11} />

                            FEATURED

                          </span>

                        )}

                      </div>

                      <div className="product-image-icon">

                        <ProductIcon size={22} />

                      </div>

                      <div className="product-image-caption">

                        <span>
                          GAMMASOFT SOLUTIONS
                        </span>

                        <MoveUpRight size={17} />

                      </div>

                    </div>


                    {/* PRODUCT CONTENT */}

                    <div className="product-card-content">

                      <span className="product-tag">
                        {product.tag}
                      </span>

                      <h3>{product.name}</h3>

                      <p>{product.description}</p>

                    </div>


                    {/* PRODUCT ACTION */}

                    <div className="product-card-bottom">

                      <span>
                        {activeType === "software"
                          ? "Explore Software"
                          : "Explore Device"}
                      </span>

                      <button
                        type="button"
                        className="product-explore-btn"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                        aria-label={`Explore ${product.name}`}
                      >

                        <ArrowUpRight size={19} />

                      </button>

                    </div>

                    <div className="product-card-glow" />

                  </article>

                );

              })}

            </div>

          ) : (

            /* EMPTY STATE */

            <div className="products-empty">

              {activeType === "software" ? (
                <Monitor size={35} />
              ) : (
                <Cpu size={35} />
              )}

              <h3>
                No products found
              </h3>

              <p>
                No products are currently available
                in this category.
              </p>

              <button
                type="button"
                className="empty-quote-btn"
                onClick={() => {
                  setActiveCategory(allCategory);
                }}
              >
                View All {
                  activeType === "software"
                    ? "Software"
                    : "Devices"
                }

                <ArrowUpRight size={17} />

              </button>

            </div>

          )}

        </div>


        {/* =====================================
                    BOTTOM CTA
                ====================================== */}

        <div className="products-bottom">

          <div>

            <span className="bottom-eyebrow">
              HAVE A UNIQUE IDEA?
            </span>

            <h3>
              Let's build something
              <span> extraordinary.</span>
            </h3>

          </div>

          <button
            type="button"
            className="products-cta"
            onClick={() => navigate("/get-quote")}
          >

            Discuss Your Project

            <ArrowRight size={18} />

          </button>

        </div>

      </div>


      {/* =====================================
                PRODUCT DETAILS MODAL
            ====================================== */}

      {selectedProduct && (

        <div
          className="product-modal-backdrop"
          onMouseDown={(event) => {

            if (event.target === event.currentTarget) {
              setSelectedProduct(null);
            }

          }}
        >

          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="product-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >

              <X size={21} />

            </button>


            {/* MODAL IMAGE */}

            <div className="modal-image">

              <img
                src={selectedProduct.image}
                alt={
                  selectedProduct.imageAlt ||
                  selectedProduct.name
                }
              />

              <div className="modal-image-overlay" />

              <div className="modal-image-label">

                <Sparkles size={13} />

                GAMMASOFT SOLUTIONS

              </div>

            </div>


            {/* MODAL CONTENT */}

            <div className="product-modal-content">

              <span className="modal-category">

                {selectedProduct.type === "software"
                  ? "SOFTWARE SOLUTION"
                  : "DEVICE SOLUTION"}

                {" / "}

                {selectedProduct.category}

              </span>


              <h2 id="product-modal-title">
                {selectedProduct.name}
              </h2>


              <p className="modal-description">
                {selectedProduct.description}
              </p>


              <div className="modal-divider" />


              {/* FEATURES */}

              <h3 className="modal-features-heading">

                <Layers3 size={18} />

                Key Features & Capabilities

              </h3>


              <div className="modal-features-grid">

                {(selectedProduct.features || []).map(
                  (feature, index) => (

                    <div
                      className="modal-feature"
                      key={index}
                    >

                      <CheckCircle2 size={17} />

                      <span>{feature}</span>

                    </div>

                  )
                )}

              </div>


              {/* MODAL CTA */}

              <div className="modal-bottom">

                <div className="modal-bottom-info">

                  <span>
                    INTERESTED IN THIS SOLUTION?
                  </span>

                  <strong>
                    Let's discuss your requirements.
                  </strong>

                </div>


                <button
                  type="button"
                  className="modal-quote-btn"
                  onClick={() =>
                    handleQuote(selectedProduct)
                  }
                >

                  <Quote size={17} />

                  Get a Quote

                  <ArrowUpRight size={17} />

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>

  );

};

export default ProductsPage;
