
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers3,
  MoveUpRight,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";

import {
  products,
  productCategories,
} from "../data/products";

import "../sections/Products.css";

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] =
    useState("All Solutions");

  const filteredProducts =
    activeCategory === "All Solutions"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <section className="gs-products gs-products-page" id="products">
      <div className="products-glow products-glow-one" />
      <div className="products-glow products-glow-two" />
      <div className="products-grid-bg" />

      <div className="products-container">
        <div className="products-heading">
          <div className="products-eyebrow">
            <Sparkles size={15} />
            <span>OUR DIGITAL ECOSYSTEM</span>
          </div>

          <div className="products-heading-content">
            <div>
              <h2>
                Smart Solutions.
                <br />
                <span>Powerful Possibilities.</span>
              </h2>

              <p>
                Discover our innovative software solutions
                designed to simplify operations, accelerate
                growth and transform the way businesses work.
              </p>
            </div>

            
          </div>
        </div>

        <div className="products-explorer">
          <div className="products-explorer-top">
            <div>
              <span className="explorer-eyebrow">
                EXPLORE OUR COLLECTION
              </span>
              <h3>Products & Platforms</h3>
            </div>

            <div className="explorer-count">
              <span className="count-dot" />
              Showing <strong>{filteredProducts.length}</strong> of{" "}
              <strong>{products.length}</strong> solutions
            </div>
          </div>

          <div className="products-filter">
            <div className="filter-label">
              FILTER BY CATEGORY
            </div>

            <div className="filter-buttons">
              {productCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                  {activeCategory === category && (
                    <span className="filter-active-dot" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid" key={activeCategory}>
            {filteredProducts.map((product, index) => {
              const ProductIcon = product.icon;

              return (
                <article
                  className={`product-card ${
                    product.featured ? "featured" : ""
                  }`}
                  key={product.id}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <div className="product-image-wrap">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.imageAlt || product.name}
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
                      <ProductIcon size={21} strokeWidth={1.8} />
                    </div>

                    <div className="product-image-caption">
                      <span>GAMMASOFT SOLUTIONS</span>
                      <MoveUpRight size={17} />
                    </div>
                  </div>

                  <div className="product-card-content">
                    <span className="product-tag">
                      {product.tag}
                    </span>

                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>

                  <div className="product-card-bottom">
                    <span>Explore Solution</span>

                    <HashLink
                      to="/#contact"
                      smooth
                      aria-label={`Learn more about ${product.name}`}
                    >
                      <ArrowUpRight size={19} />
                    </HashLink>
                  </div>

                  <div className="product-card-glow" />
                </article>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="products-empty">
              <Layers3 size={30} />
              <h3>No products found</h3>
              <p>Try selecting another category.</p>
            </div>
          )}
        </div>

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

          <HashLink
            to="/#contact"
            smooth
            className="products-cta"
          >
            Discuss Your Project
            <ArrowRight size={18} />
          </HashLink>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
