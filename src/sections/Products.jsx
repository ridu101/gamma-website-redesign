
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers3, Sparkles } from "lucide-react";

import { products } from "../data/products";
import "./HomeProducts.css";

const Products = () => {
  const previewProducts = products.slice(0, 3);

  return (
    <section className="gs-home-products" id="products">
      <div className="products-glow products-glow-one" />
      <div className="products-grid-bg" />

      <div className="home-products-container">
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
                Discover innovative software solutions built
                to simplify operations, accelerate growth and
                transform your business.
              </p>
            </div>

            
          </div>
        </div>

        <div className="home-products-grid">
          {previewProducts.map((product) => {
            const ProductIcon = product.icon;

            return (
              <article
                className={`home-product-card ${
                  product.featured ? "featured" : ""
                }`}
                key={product.id}
              >
                <div className="home-product-image">
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    loading="lazy"
                  />

                  <div className="home-product-image-overlay" />

                  <span className="home-product-number">
                    {product.number}
                  </span>

                  {product.featured && (
                    <span className="home-product-featured">
                      <Sparkles size={10} />
                      FEATURED
                    </span>
                  )}

                  <div className="home-product-icon">
                    <ProductIcon size={20} />
                  </div>
                </div>

                <div className="home-product-content">
                  <span>{product.tag}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>

                <div className="home-product-footer">
                  <span>Explore Solution</span>
                  <Link
                    to="/products"
                    aria-label={`Explore ${product.name}`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

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

export default Products;
