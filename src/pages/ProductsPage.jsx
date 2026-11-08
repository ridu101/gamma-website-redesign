
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
  RefreshCw,
} from "lucide-react";

import api from "../services/api";
import "../sections/Products.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeType, setActiveType] = useState("software");
  const [activeCategory, setActiveCategory] = useState("All Software");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const productsExplorerRef = useRef(null);

  // =============================================
  // FETCH PRODUCTS
  // =============================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      const result = response.data?.data;

      const productList = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      setProducts(productList);
    } catch (err) {
      console.error("Products API Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =============================================
  // NORMALIZE PRODUCT TYPE
  // =============================================

  const getProductType = (product) => {
    const value = String(
      product.product_type || product.type || "software"
    ).toLowerCase();

    if (value === "device" || value === "hardware") {
      return "device";
    }

    return "software";
  };

  // =============================================
  // CATEGORY DATA
  // =============================================

  const softwareCategories = useMemo(() => {
    return [
      "All Software",
      ...new Set(
        products
          .filter((product) => getProductType(product) === "software")
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const deviceCategories = useMemo(() => {
    return [
      "All Devices",
      ...new Set(
        products
          .filter((product) => getProductType(product) === "device")
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const currentCategories =
    activeType === "software"
      ? softwareCategories
      : deviceCategories;

  const allCategory =
    activeType === "software"
      ? "All Software"
      : "All Devices";

  // =============================================
  // PRODUCT COUNTS
  // =============================================

  const softwareCount = useMemo(
    () =>
      products.filter(
        (product) => getProductType(product) === "software"
      ).length,
    [products]
  );

  const deviceCount = useMemo(
    () =>
      products.filter(
        (product) => getProductType(product) === "device"
      ).length,
    [products]
  );

  // =============================================
  // PRODUCT FILTERING
  // =============================================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesType =
        getProductType(product) === activeType;

      const matchesCategory =
        activeCategory === allCategory ||
        product.category === activeCategory;

      return matchesType && matchesCategory;
    });
  }, [products, activeType, activeCategory, allCategory]);

  // =============================================
  // CHANGE SOFTWARE / DEVICE
  // =============================================

  const handleTypeChange = (type) => {
    if (type !== "software" && type !== "device") return;

    setActiveType(type);

    setActiveCategory(
      type === "software" ? "All Software" : "All Devices"
    );

    setSelectedProduct(null);

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
  // OPEN PRODUCT DETAILS
  // =============================================

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // =============================================
  // GET A QUOTE
  // =============================================

  const handleQuote = (product) => {
    const params = new URLSearchParams({
      product: product.title,
      type: getProductType(product),
    });

    setSelectedProduct(null);

    navigate(`/get-quote?${params.toString()}`);
  };

  // =============================================
  // PRODUCT IMAGE
  // =============================================

  const getProductImage = (product) => {
    if (!product.image) return "";

    if (
      product.image.startsWith("http://") ||
      product.image.startsWith("https://")
    ) {
      return product.image;
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(
      /\/api\/?$/,
      ""
    );

    return `${baseURL}/storage/${product.image.replace(/^\/+/, "")}`;
  };

  // =============================================
  // PRODUCT FEATURES
  // =============================================

  const getProductFeatures = (product) => {
    if (Array.isArray(product.features)) {
      return product.features;
    }

    if (Array.isArray(product.technologies)) {
      return product.technologies;
    }

    if (typeof product.features === "string") {
      try {
        const parsed = JSON.parse(product.features);

        if (Array.isArray(parsed)) return parsed;
      } catch {
        return product.features
          .split("\n")
          .filter(Boolean);
      }
    }

    return [];
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

      window.removeEventListener("keydown", handleKeyDown);
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

        {/* PAGE HEADER */}

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

        {/* SOFTWARE / DEVICE SWITCHER */}

        <div className="solution-switcher">

          <button
            type="button"
            className={`solution-switch-card ${
              activeType === "software" ? "active" : ""
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
              <span>{softwareCount} solutions available</span>
            </span>

            <span className="switch-arrow">
              <ArrowUpRight size={20} />
            </span>

            <span className="switch-active-line" />
          </button>

          <button
            type="button"
            className={`solution-switch-card ${
              activeType === "device" ? "active" : ""
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
              <span>{deviceCount} devices available</span>
            </span>

            <span className="switch-arrow">
              <ArrowUpRight size={20} />
            </span>

            <span className="switch-active-line" />
          </button>

        </div>

        {/* PRODUCT EXPLORER */}

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

          {/* CATEGORY FILTER */}

          <div className="products-filter">
            <div className="filter-label">
              FILTER BY CATEGORY
            </div>

            <div className="filter-buttons">
              {currentCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-btn ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}

                  {activeCategory === category && (
                    <span className="filter-active-dot" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* LOADING STATE */}

          {loading ? (
            <div className="products-empty">
              <RefreshCw
                size={35}
                className="products-loading-icon"
              />

              <h3>Loading Products...</h3>

              <p>
                Please wait while we fetch the latest products.
              </p>
            </div>
          ) : error ? (
            <div className="products-empty">
              <Monitor size={35} />

              <h3>Unable to Load Products</h3>

              <p>{error}</p>

              <button
                type="button"
                className="empty-quote-btn"
                onClick={fetchProducts}
              >
                Try Again
                <RefreshCw size={17} />
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (

            /* PRODUCT GRID */

            <div
              className="products-grid"
              key={`${activeType}-${activeCategory}`}
            >
              {filteredProducts.map((product, index) => {
                const ProductIcon =
                  activeType === "software" ? Monitor : Cpu;

                const productName =
                  product.title || "Untitled Product";

                return (
                  <article
                    className={`product-card ${
                      product.is_featured ? "featured" : ""
                    }`}
                    key={product.id}
                    style={{
                      animationDelay: `${index * 0.07}s`,
                      cursor: "pointer",
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details of ${productName}`}
                    onClick={() => handleProductClick(product)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        handleProductClick(product);
                      }
                    }}
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="product-image-wrap">
                      {product.image ? (
                        <img
                          className="product-image"
                          src={getProductImage(product)}
                          alt={productName}
                          loading="lazy"
                        />
                      ) : (
                        <div className="product-image-placeholder">
                          <ProductIcon size={55} />
                        </div>
                      )}

                      <div className="product-image-overlay" />

                      <div className="product-image-top">
                        <span className="product-image-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {product.is_featured && (
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
                        <span>GAMMASOFT SOLUTIONS</span>
                        <MoveUpRight size={17} />
                      </div>
                    </div>

                    {/* PRODUCT CONTENT */}

                    <div className="product-card-content">
                      <span className="product-tag">
                        {product.category || "General"}
                      </span>

                      <h3>{productName}</h3>

                      <p>
                        {product.short_description ||
                          product.description ||
                          "Explore our innovative solution."}
                      </p>
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
                        onClick={(event) => {
                          event.stopPropagation();
                          handleProductClick(product);
                        }}
                        aria-label={`Explore ${productName}`}
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

              <h3>No products found</h3>

              <p>
                No products are currently available in this category.
              </p>

              <button
                type="button"
                className="empty-quote-btn"
                onClick={() => setActiveCategory(allCategory)}
              >
                View All{" "}
                {activeType === "software" ? "Software" : "Devices"}

                <ArrowUpRight size={17} />
              </button>
            </div>
          )}

        </div>

        {/* BOTTOM CTA */}

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

      {/* PRODUCT DETAILS MODAL */}

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
              {selectedProduct.image ? (
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.title}
                />
              ) : (
                <div className="product-image-placeholder">
                  <Monitor size={60} />
                </div>
              )}

              <div className="modal-image-overlay" />

              <div className="modal-image-label">
                <Sparkles size={13} />
                GAMMASOFT SOLUTIONS
              </div>
            </div>

            {/* MODAL CONTENT */}

            <div className="product-modal-content">
              <span className="modal-category">
                {getProductType(selectedProduct) === "software"
                  ? "SOFTWARE SOLUTION"
                  : "DEVICE SOLUTION"}

                {" / "}

                {selectedProduct.category}
              </span>

              <h2 id="product-modal-title">
                {selectedProduct.title}
              </h2>

              <p className="modal-description">
                {selectedProduct.description ||
                  selectedProduct.short_description}
              </p>

              <div className="modal-divider" />

              {/* FEATURES */}

              <h3 className="modal-features-heading">
                <Layers3 size={18} />
                Key Features & Capabilities
              </h3>

              <div className="modal-features-grid">
                {getProductFeatures(selectedProduct).map(
                  (feature, index) => (
                    <div
                      className="modal-feature"
                      key={index}
                    >
                      <CheckCircle2 size={17} />

                      <span>
                        {typeof feature === "string"
                          ? feature
                          : feature.name || feature.title}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* MODAL CTA */}

              <div className="modal-bottom">
                <div className="modal-bottom-info">
                  <span>INTERESTED IN THIS SOLUTION?</span>

                  <strong>
                    Let's discuss your requirements.
                  </strong>
                </div>

                <button
                  type="button"
                  className="modal-quote-btn"
                  onClick={() => handleQuote(selectedProduct)}
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
