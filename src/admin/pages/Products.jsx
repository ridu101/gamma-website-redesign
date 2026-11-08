
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  RefreshCw,
  ExternalLink,
  Monitor,
  Cpu,
} from "lucide-react";

import api from "../../services/api";

import "./Products.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(
  /\/api\/?$/,
  ""
);

const getImageUrl = (path) => {
  if (!path) return null;

  if (path.startsWith("http")) {
    return path;
  }

  return `${API_BASE}/storage/${path.replace(/^\/+/, "")}`;
};

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeType, setActiveType] = useState("all");

  // =============================================
  // NORMALIZE PRODUCT TYPE
  // =============================================

const getProductType = (product) => {
  const value = String(product.product_type || "software")
    .trim()
    .toLowerCase();

  return value === "device" ? "device" : "software";
};

  // =============================================
  // FETCH PRODUCTS
  // =============================================

  const fetchProducts = async (currentPage = page) => {
    try {
      setLoading(true);

      const response = await api.get("/admin/products", {
        params: {
          page: currentPage,
        },
      });

      const result = response.data.data;

      setProducts(result.data || []);
      setPage(result.current_page || 1);
      setLastPage(result.last_page || 1);
      setTotal(result.total || 0);
    } catch (error) {
      console.error("Products loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  // =============================================
  // DELETE PRODUCT
  // =============================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/products/${id}`);

      alert("Product deleted successfully.");

      const nextPage =
        products.length === 1 && page > 1
          ? page - 1
          : page;

      fetchProducts(nextPage);
    } catch (error) {
      console.error("Product delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // =============================================
  // PRODUCT TYPE COUNTS
  // =============================================

  const softwareCount = products.filter(
    (product) => getProductType(product) === "software"
  ).length;

  const deviceCount = products.filter(
    (product) => getProductType(product) === "device"
  ).length;

  // =============================================
  // SEARCH + TYPE FILTER
  // =============================================

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      product.title?.toLowerCase().includes(keyword) ||
      product.category?.toLowerCase().includes(keyword) ||
      product.slug?.toLowerCase().includes(keyword);

    const matchesType =
      activeType === "all" ||
      getProductType(product) === activeType;

    return matchesSearch && matchesType;
  });

  // =============================================
  // RENDER
  // =============================================

  return (
    <div className="admin-products">

      {/* HEADER */}

      <div className="admin-products-header">
        <div>
          <span className="admin-products-label">
            CONTENT MANAGEMENT
          </span>

          <h1>Products</h1>

          <p>
            Manage your company products and software solutions.
          </p>
        </div>

        <button
          type="button"
          className="admin-products-add"
          onClick={() => navigate("/admin/products/create")}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* STATISTICS */}

      <div className="admin-products-stats">

        <div className="admin-products-stat-card">
          <div className="admin-products-stat-icon">
            <Package size={21} />
          </div>

          <div>
            <span>Total Products</span>
            <h3>{total}</h3>
          </div>
        </div>

        <div className="admin-products-stat-card">
          <div className="admin-products-stat-icon">
            <Monitor size={21} />
          </div>

          <div>
            <span>Software Solutions</span>
            <h3>{softwareCount}</h3>
          </div>
        </div>

        <div className="admin-products-stat-card">
          <div className="admin-products-stat-icon">
            <Cpu size={21} />
          </div>

          <div>
            <span>Device Solutions</span>
            <h3>{deviceCount}</h3>
          </div>
        </div>

      </div>

      {/* TABLE CARD */}

      <div className="admin-products-card">

        <div className="admin-products-toolbar">

          <div>
            <h2>All Products</h2>
            <p>Manage your product information.</p>
          </div>

          <div className="admin-products-actions">

            <div className="admin-products-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="admin-products-refresh"
              onClick={() => fetchProducts(page)}
              title="Refresh"
            >
              <RefreshCw size={17} />
            </button>

          </div>
        </div>

        {/* PRODUCT TYPE FILTER */}

        <div className="admin-products-type-filter">

          <button
            type="button"
            className={activeType === "all" ? "active" : ""}
            onClick={() => setActiveType("all")}
          >
            All Products
          </button>

          <button
            type="button"
            className={activeType === "software" ? "active" : ""}
            onClick={() => setActiveType("software")}
          >
            <Monitor size={15} />
            Software Solutions
          </button>

          <button
            type="button"
            className={activeType === "device" ? "active" : ""}
            onClick={() => setActiveType("device")}
          >
            <Cpu size={15} />
            Device Solutions
          </button>

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="admin-products-loading">
            <RefreshCw
              className="admin-products-spinner"
              size={25}
            />
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (

          /* EMPTY STATE */

          <div className="admin-products-empty">
            <Package size={35} />

            <h3>No Products Found</h3>

            <p>
              {search || activeType !== "all"
                ? "Try another search or product type."
                : "Start by adding your first product."}
            </p>
          </div>

        ) : (

          <>
            {/* PRODUCT TABLE */}

            <div className="admin-products-table-wrapper">

              <table className="admin-products-table">

                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>TYPE</th>
                    <th>CATEGORY</th>
                    <th>STATUS</th>
                    <th>FEATURED</th>
                    <th>ORDER</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredProducts.map((product) => {
                    const productType = getProductType(product);

                    return (
                      <tr key={product.id}>

                        {/* PRODUCT */}

                        <td>
                          <div className="admin-product-info">

                            {product.image ? (
                              <img
                                src={getImageUrl(product.image)}
                                alt={product.title}
                              />
                            ) : (
                              <div className="admin-product-placeholder">
                                <Package size={21} />
                              </div>
                            )}

                            <div>
                              <strong>{product.title}</strong>
                              <span>{product.slug}</span>
                            </div>

                          </div>
                        </td>

                        {/* TYPE */}

                        <td>
                          <span
                            className={`admin-product-type ${productType}`}
                          >
                            {productType === "software" ? (
                              <Monitor size={14} />
                            ) : (
                              <Cpu size={14} />
                            )}

                            {productType === "software"
                              ? "Software"
                              : "Device"}
                          </span>
                        </td>

                        {/* CATEGORY */}

                        <td>
                          <span className="admin-product-category">
                            {product.category || "Uncategorized"}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td>
                          <span
                            className={`admin-product-status ${product.status}`}
                          >
                            {product.status}
                          </span>
                        </td>

                        {/* FEATURED */}

                        <td>
                          {product.is_featured ? (
                            <span className="admin-product-featured">
                              Yes
                            </span>
                          ) : (
                            <span className="admin-product-not-featured">
                              No
                            </span>
                          )}
                        </td>

                        {/* ORDER */}

                        <td>{product.sort_order ?? 0}</td>

                        {/* ACTIONS */}

                        <td>
                          <div className="admin-product-row-actions">

                            {product.product_url && (
                              <button
                                type="button"
                                title="Visit Product"
                                onClick={() =>
                                  window.open(
                                    product.product_url,
                                    "_blank",
                                    "noopener,noreferrer"
                                  )
                                }
                              >
                                <ExternalLink size={16} />
                              </button>
                            )}

                            <button
                              type="button"
                              title="Edit Product"
                              onClick={() =>
                                navigate(
                                  `/admin/products/${product.id}/edit`
                                )
                              }
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              className="delete"
                              title="Delete Product"
                              onClick={() =>
                                handleDelete(product.id)
                              }
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })}

                </tbody>
              </table>

            </div>

            {/* PAGINATION */}

            <div className="admin-products-pagination">

              <span>
                Page {page} of {lastPage}
              </span>

              <div>
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => fetchProducts(page - 1)}
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={page >= lastPage}
                  onClick={() => fetchProducts(page + 1)}
                >
                  Next
                </button>
              </div>

            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default Products;
