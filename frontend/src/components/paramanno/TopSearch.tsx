import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Store, Sprout, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { SlideNav } from '@/components/ui/slide-nav';
import styles from '@/styles/TopSearch.module.css';

interface TopSearchProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onSelectCategory?: (category: string) => void;
}

const SEARCH_SUGGESTIONS = [
  { name: 'Vedic A2 Gir Cow Ghee', tag: 'Ghee', category: 'Ghee', href: '#provisions' },
  { name: 'Wild Forest Raw Honey', tag: 'Honey', category: 'Honey', href: '#provisions' },
  { name: 'Organic Superfood Seeds Trio', tag: 'Seeds', category: 'Seeds', href: '#provisions' },
  { name: 'Kashmiri Mongra Saffron', tag: 'Spices', category: 'Spices', href: '#provisions' },
  { name: 'Wood-Churned Mustard Oil', tag: 'Oils', category: 'Oils', href: '#provisions' },
  { name: 'Lakadong Heirloom Turmeric', tag: 'Spices', category: 'Spices', href: '#provisions' },
  { name: 'Darjeeling First Flush Tea', tag: 'Renzen', category: '', href: '/tea' },
  { name: 'Ethiopian Single-Origin Coffee', tag: 'Renzen', category: '', href: '/coffees' },
];

export default function TopSearch({
  searchQuery = '',
  onSearchChange,
  onSelectCategory,
}: TopSearchProps) {
  const { totalCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalQuery, setInternalQuery] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeQuery = onSearchChange ? searchQuery : internalQuery;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const updateQuery = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalQuery(value);
    }
  };

  const filteredSuggestions = activeQuery.trim()
    ? SEARCH_SUGGESTIONS.filter(
        (item) =>
          item.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
          item.tag.toLowerCase().includes(activeQuery.toLowerCase())
      )
    : SEARCH_SUGGESTIONS.slice(0, 6);

  return (
    <header ref={headerRef} className={styles.headerWrapper}>
      <div className={`${styles.floatingBar} ${scrolled ? styles.floatingBarScrolled : ''}`}>
        <div className={styles.headerRow}>
          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={14} strokeWidth={1.6} /> : <Menu size={14} strokeWidth={1.6} />}
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>

          {/* Left: Sliding Navigation with Icons */}
          <nav className={styles.navWrap} aria-label="Primary Navigation">
            <SlideNav />
          </nav>

          {/* Center: Editorial Wordmark */}
          <div className={styles.wordmarkWrap}>
            <Link href="/" className={styles.wordmark}>
              Paramanna
            </Link>
          </div>

          {/* Right: Typographic + Icon Utilities */}
          <div className={styles.actionsRow}>
            <button
              type="button"
              className={`${styles.utilityBtn} ${searchOpen ? styles.utilityBtnActive : ''}`}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              {searchOpen ? <X size={13} strokeWidth={1.6} /> : <Search size={13} strokeWidth={1.6} />}
              <span>{searchOpen ? 'Close' : 'Search'}</span>
            </button>
            <button
              type="button"
              className={styles.bagBtn}
              onClick={openCart}
            >
              <ShoppingBag size={13} strokeWidth={1.6} />
              <span>Bag ({totalCount})</span>
            </button>
          </div>
        </div>

        {/* Minimal Bottom-Bordered Search Panel */}
        {searchOpen && (
          <div className={styles.searchDrawer}>
            <form
              className={styles.searchForm}
              onSubmit={(e) => {
                e.preventDefault();
                setSearchOpen(false);
                document.getElementById('provisions')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search size={15} strokeWidth={1.6} className={styles.searchIcon} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search A2 ghee, wild honey, Kashmiri saffron..."
                value={activeQuery}
                onChange={(e) => updateQuery(e.target.value)}
                className={styles.searchInput}
              />
              {activeQuery && (
                <button
                  type="button"
                  onClick={() => updateQuery('')}
                  className={styles.clearBtn}
                >
                  Clear
                </button>
              )}
            </form>

            {filteredSuggestions.length > 0 ? (
              <div className={styles.searchDropdown}>
                {filteredSuggestions.map((item) =>
                  item.href.startsWith('#') ? (
                    <button
                      key={item.name}
                      type="button"
                      className={styles.searchItem}
                      onClick={() => {
                        if (item.category) onSelectCategory?.(item.category);
                        updateQuery('');
                        setSearchOpen(false);
                        document.getElementById('provisions')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span>{item.name}</span>
                      <span className={styles.searchItemTag}>{item.tag}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={styles.searchItem}
                      onClick={() => setSearchOpen(false)}
                    >
                      <span>{item.name}</span>
                      <span className={styles.searchItemTag}>{item.tag}</span>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <p className={styles.searchEmpty}>
                No provisions matched &ldquo;{activeQuery}&rdquo;.
              </p>
            )}
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className={styles.mobileNavPanel} aria-label="Mobile Navigation">
            <a
              href="#provisions"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Store size={14} strokeWidth={1.6} />
              <span>Pantry</span>
            </a>
            <a
              href="#heritage"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sprout size={14} strokeWidth={1.6} />
              <span>Heritage</span>
            </a>
            <Link
              href="/renzen"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Leaf size={14} strokeWidth={1.6} />
              <span>Renzen ↗</span>
            </Link>
            <button
              type="button"
              className={styles.mobileNavLink}
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              <Search size={14} strokeWidth={1.6} />
              <span>Search</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
