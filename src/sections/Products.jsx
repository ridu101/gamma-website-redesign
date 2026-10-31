
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers3,
} from "lucide-react";

import {
  products,
  productCategories,
} from "../data/products";

import "./Products.css";

const Products = () => {
  const [activeCategory, setActiveCategory] =
    useState("All Solutions");

  const filteredProducts =
    activeCategory === "All Solutions"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <section className="gs-products" id="products">

      {/* Background Effects */}
      <div className="products-glow products-glow-one" />
      <div className="products-glow products-glow-two" />
      <div className="products-grid-bg" />

      <div className="products-container">

        {/* Section Heading */}
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

            <div className="products-heading-badge">
              <Layers3 size={22} />
              <div>
                <strong>09</strong>
                <span>Digital Solutions</span>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter */}
        <div className="products-filter">

          <div className="filter-label">
            EXPLORE BY CATEGORY
          </div>

          <div className="filter-buttons">
            {productCategories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid */}
        <div className="products-grid">

          {filteredProducts.map((product, index) => {

            const ProductIcon = product.icon;

            return (
              <article
                className={`product-card ${
                  product.featured ? "featured" : ""
                }`}
                key={product.id}
                style={{
                  animationDelay: `${index * 0.07}s`,
                }}
              >

                <div className="product-card-top">

                  <div className="product-icon">
                    <ProductIcon size={25} strokeWidth={1.7} />
                  </div>

                  <span className="product-number">
                    {product.number}
                  </span>

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

                  <a
                    href="#contact"
                    aria-label={`Learn more about ${product.name}`}
                  >
                    <ArrowUpRight size={19} />
                  </a>

                </div>

                <div className="product-card-glow" />

              </article>
            );
          })}

        </div>

        {/* Bottom CTA */}
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

          <a href="#contact" className="products-cta">
            Discuss Your Project
            <ArrowRight size={18} />
          </a>

        </div>

      </div>
    </section>
  );
};

export default Products;
