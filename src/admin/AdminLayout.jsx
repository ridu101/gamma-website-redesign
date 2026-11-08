
import { useState } from "react";
import {
    NavLink,
    Outlet,
    useNavigate,
} from "react-router-dom";

import {
    LayoutDashboard,
    FolderKanban,
    Package,
    Newspaper,
    BriefcaseBusiness,
    Users,
    MessageSquare,
    LogOut,
    Menu,
    X,
    ShieldCheck,
} from "lucide-react";

import api from "../services/api";
import "./AdminLayout.css";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const admin = (() => {
        try {
            return JSON.parse(
                localStorage.getItem("gs_admin_data") || "{}"
            );
        } catch {
            return {};
        }
    })();

    const menuItems = [
        {
            title: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Projects",
            path: "/admin/projects",
            icon: FolderKanban,
        },
        {
            title: "Products",
            path: "/admin/products",
            icon: Package,
        },
        {
            title: "News",
            path: "/admin/news",
            icon: Newspaper,
        },
        {
            title: "Jobs",
            path: "/admin/jobs",
            icon: BriefcaseBusiness,
        },
        {
            title: "Applications",
            path: "/admin/applications",
            icon: Users,
        },
        {
            title: "Inquiries",
            path: "/admin/inquiries",
            icon: MessageSquare,
        },
        {
            title: "Testimonials",
            path: "/admin/testimonials",
            icon: MessageSquare,
        },
    ];

    const handleLogout = async () => {
        try {
            await api.post("/admin/logout");
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            localStorage.removeItem("gs_admin_token");
            localStorage.removeItem("gs_admin_data");
            navigate("/admin/login", { replace: true });
        }
    };

    return (
        <div className="admin-layout">
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`admin-sidebar ${
                    sidebarOpen ? "sidebar-open" : ""
                }`}
            >
                <div className="admin-sidebar-brand">
                    <div className="admin-brand-icon">
                        <ShieldCheck size={23} />
                    </div>

                    <div>
                        <h2>
                            GammaSoft<span>.</span>
                        </h2>
                        <p>ADMIN PANEL</p>
                    </div>

                    <button
                        className="admin-mobile-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="admin-menu-label">
                    MAIN MENU
                </div>

                <nav className="admin-navigation">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin/dashboard"}
                                className={({ isActive }) =>
                                    `admin-nav-link ${
                                        isActive ? "active" : ""
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon size={19} />
                                <span>{item.title}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="admin-sidebar-bottom">
                    <div className="admin-user-info">
                        <div className="admin-user-avatar">
                            {(admin.name || "A")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="admin-user-details">
                            <strong>
                                {admin.name || "Administrator"}
                            </strong>

                            <span>
                                {admin.email || "Admin Account"}
                            </span>
                        </div>
                    </div>

                    <button
                        className="admin-logout-button"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <button
                        className="admin-mobile-menu"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="admin-topbar-title">
                        <span>GammaSoft</span>
                        <span className="admin-topbar-divider">/</span>
                        <strong>Administration</strong>
                    </div>

                    <div className="admin-topbar-status">
                        <span className="admin-status-dot" />
                        System Online
                    </div>
                </header>

                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
