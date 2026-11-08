
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  Sparkles,
  Layers3,
  RefreshCw,
} from "lucide-react";

import api from "../services/api";
import "./HomeProducts.css";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =============================================
  // FETCH PRODUCTS FROM BACKEND
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
      console.error("Home Products API Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
  // PRODUCT TYPE
  // =============================================

  const getProductType = (product) => {
    const value = String(
      product.product_type || product.type || "software"
    ).toLowerCase();

    return value === "device" || value === "hardware"
      ? "Device"
      : "Software";
  };

  // =============================================
  // PREVIEW PRODUCTS
  // =============================================

  const previewProducts = products.slice(0, 3);

  // =============================================
  // RENDER
  // =============================================

  return (
    <section className="gs-home-products" id="products">
      <div className="products-glow products-glow-one" />
      <div className="products-grid-bg" />

      <div className="home-products-container">

        {/* SECTION HEADING */}

        <div className="home-products-heading">
          <div className="products-eyebrow">
            <Sparkles size={15} />
            <span>OUR DIGITAL ECOSYSTEM</span>
          </div>

          <div className="home-products-heading-row">
            <div>
              <h2>
                Smart Solutions.
                <br />
                <span>Powerful Possibilities.</span>
              </h2>

              <p>
                Discover innovative software and device solutions
                built to simplify operations, accelerate growth
                and transform your business.
              </p>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}

        {loading ? (
          <div className="home-products-grid">
            <div className="home-products-status">
              <RefreshCw
                size={30}
                className="home-products-loading-icon"
              />
              <h3>Loading Products...</h3>
              <p>
                Please wait while we fetch our latest solutions.
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="home-products-grid">
            <div className="home-products-status">
              <Layers3 size={30} />
              <h3>Unable to Load Products</h3>
              <p>{error}</p>

              <button
                type="button"
                className="home-products-retry"
                onClick={fetchProducts}
              >
                Try Again
                <RefreshCw size={15} />
              </button>
            </div>
          </div>
        ) : previewProducts.length > 0 ? (

          /* BACKEND PRODUCTS */

          <div className="home-products-grid">
            {previewProducts.map((product, index) => {
              const productName =
                product.title || "Untitled Product";

              const image = getProductImage(product);

              return (
                <article
                  className={`home-product-card ${
                    product.is_featured ? "featured" : ""
                  }`}
                  key={product.id}
                >
                  <div className="home-product-image">
                    {image ? (
                      <img
                        src={image}
                        alt={productName}
                        loading="lazy"
                      />
                    ) : (
                      <div className="home-product-image-placeholder">
                        <Layers3 size={48} />
                      </div>
                    )}

                    <div className="home-product-image-overlay" />

                    <span className="home-product-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {product.is_featured && (
                      <span className="home-product-featured">
                        <Sparkles size={10} />
                        FEATURED
                      </span>
                    )}

                    <div className="home-product-icon">
                      <Layers3 size={20} />
                    </div>
                  </div>

                  <div className="home-product-content">
                    <span>
                      {product.category || getProductType(product)}
                    </span>

                    <h3>{productName}</h3>

                    <p>
                      {product.short_description ||
                        product.description ||
                        "Explore our innovative solution."}
                    </p>
                  </div>

                  <div className="home-product-footer">
                    <span>
                      Explore {getProductType(product)}
                    </span>

                    <Link
                      to="/products"
                      aria-label={`Explore ${productName}`}
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (

          /* EMPTY STATE */

          <div className="home-products-status">
            <Layers3 size={35} />
            <h3>Products Coming Soon</h3>
            <p>
              Our product collection is being updated.
              Please check back soon.
            </p>
          </div>
        )}

        {/* BOTTOM CTA */}

        <div className="home-products-bottom">
          <p>
            Explore our complete collection of business
            software and digital platforms.
          </p>

          <Link to="/products" className="home-products-cta">
            Explore All Products
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HomeProducts;
