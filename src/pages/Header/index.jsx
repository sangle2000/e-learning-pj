import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, Settings, Layout, Bell } from "lucide-react";
import styles from "./header.module.scss";
import NameAvatar from "../../components/NameAvatar";

export default function Header({ isLoggedIn, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on mobile resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${isMobileMenuOpen ? styles.menuOpen : ""}`}>
      <div className={`${styles.container} container`}>
        {/* Logo Section */}
        <Link to="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <path d="M9 8l3 3-3 3" />
              <path d="M14 14h2" />
            </svg>
          </div>
          <span className={styles.logoText}>
            Edu<span className={styles.logoTextHighlight}>Forge</span>
          </span>
        </Link>

        {/* Desktop Navbar */}
        <nav className={styles.nav}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/project" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Project
          </NavLink>
          <NavLink 
            to="/courses" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Courses
          </NavLink>
        </nav>

        {/* Desktop User Actions */}
        <div className={styles.actions}>
          {isLoggedIn ? (
            <div className={styles.userProfileWrapper}>
              <button className={styles.notificationBtn} aria-label="Notifications">
                <Bell size={20} />
                <span className={styles.notificationBadge} />
              </button>
              
              <div className={styles.profileDropdownTrigger}>
                <button 
                  className={styles.profileBtn} 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  aria-expanded={isProfileDropdownOpen}
                >
                  <NameAvatar name="Lê Hà Thanh Sang" />
                  {/* <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                    alt="User avatar" 
                    className={styles.avatarImg}
                  />
                  <span className={styles.username}>Alex Dev</span>
                  <ChevronDown size={16} className={`${styles.chevron} ${isProfileDropdownOpen ? styles.rotate : ""}`} /> */}
                </button>

                {isProfileDropdownOpen && (
                  <>
                    <div className={styles.backdrop} onClick={() => setIsProfileDropdownOpen(false)} />
                    <div className={styles.dropdownMenu}>
                      <div className={styles.dropdownHeader}>
                        <p className={styles.dropdownName}>Alex Dev</p>
                        <p className={styles.dropdownEmail}>alex.dev@eduforge.com</p>
                      </div>
                      <hr className={styles.divider} />
                      <Link to="/dashboard" className={styles.dropdownItem} onClick={() => setIsProfileDropdownOpen(false)}>
                        <Layout size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/settings" className={styles.dropdownItem} onClick={() => setIsProfileDropdownOpen(false)}>
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                      <hr className={styles.divider} />
                      <button className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/signin" className={styles.signInBtn}>
                Sign In
              </Link>
              <Link to="/signup" className={styles.signUpBtn}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className={styles.mobileMenuToggle} 
          onClick={toggleMobileMenu} 
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            <NavLink 
              to="/" 
              className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/project" 
              className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Project
            </NavLink>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Courses
            </NavLink>
          </nav>
          
          <hr className={styles.mobileDivider} />
          
          <div className={styles.mobileActions}>
            {isLoggedIn ? (
              <div className={styles.mobileUserArea}>
                <div className={styles.mobileUserHeader}>
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                    alt="User avatar" 
                    className={styles.avatarImg}
                  />
                  <div>
                    <p className={styles.mobileUsername}>Alex Dev</p>
                    <p className={styles.mobileUserEmail}>alex.dev@eduforge.com</p>
                  </div>
                </div>
                
                <Link to="/dashboard" className={styles.mobileDrawerItem} onClick={() => setIsMobileMenuOpen(false)}>
                  <Layout size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/settings" className={styles.mobileDrawerItem} onClick={() => setIsMobileMenuOpen(false)}>
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                <button className={`${styles.mobileDrawerItem} ${styles.mobileLogoutBtn}`} onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className={styles.mobileAuthButtons}>
                <Link to="/signin" className={styles.mobileSignInBtn} onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className={styles.mobileSignUpBtn} onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}