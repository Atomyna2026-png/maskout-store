import { useState, useEffect, useRef } from "react";

const FONTS_URL = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap";

// ─── Logo Assets ───
const LOGO_NAV = "https://i.imgur.com/0TTxPVq.jpeg";
const LOGO_HERO = LOGO_NAV;

// ─── Color Tokens ───
const C = {
  bg: "#F4F1EC",
  bgAlt: "#EBE7E0",
  black: "#111111",
  darkGray: "#333333",
  midGray: "#777777",
  lightGray: "#BFBBB4",
  accent: "#C8102E",
  white: "#FFFFFF",
};

// ─── Product Data ───
const PRODUCTS = [];

// ─── Collections Data ───
const COLLECTIONS = [
  { id: 1, key: "summer26", title: "SUMMER '26", subtitle: "Lightweight layers for warm days", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700&h=900&fit=crop", season: "SS26" },
  { id: 2, key: "streetcore", title: "STREETCORE", subtitle: "Raw urban essentials", img: "/streetcore.jpeg", season: "CORE" },
  { id: 3, key: "afterdark", title: "AFTER DARK", subtitle: "Evening-ready statement pieces", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&h=900&fit=crop", season: "AW26" },
  { id: 4, key: "essentials", title: "ESSENTIALS", subtitle: "Everyday wardrobe staples", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=900&fit=crop", season: "YEAR-ROUND" },
];

// ─── Styles ───
const styles = {
  app: { fontFamily: "'DM Sans', sans-serif", background: C.bg, color: C.black, minHeight: "100vh", position: "relative", overflowX: "hidden" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: C.bg, borderBottom: `1px solid ${C.lightGray}40`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "18px 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center" },
  logo: { display: "flex", alignItems: "center", gap: 2, cursor: "pointer", color: C.black, userSelect: "none", justifySelf: "center" },
  navLinks: { display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" },
  navLink: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", color: C.darkGray, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "color 0.2s", padding: "2px 0", lineHeight: 1.5 },
  cartBtn: { position: "relative", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", color: C.darkGray, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, padding: "2px 0", lineHeight: 1.5, textAlign: "left" },
  cartBadge: { position: "absolute", top: -6, right: -16, background: C.accent, color: C.white, fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  hero: { maxWidth: 1200, margin: "0 auto", padding: "180px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "90vh" },
  heroText: { display: "flex", flexDirection: "column", gap: 24 },
  heroTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px, 10vw, 120px)", lineHeight: 0.9, letterSpacing: "0.02em", color: C.black },
  heroSub: { fontSize: 16, lineHeight: 1.7, color: C.midGray, maxWidth: 400, fontWeight: 300 },
  heroCta: { marginTop: 16, padding: "16px 48px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, alignSelf: "flex-start", transition: "all 0.3s" },
  heroImgWrap: { position: "relative", aspectRatio: "4/5", overflow: "hidden" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%) contrast(1.05)" },
  heroImgOverlay: { position: "absolute", bottom: 24, left: 24, fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.2em", color: C.white, background: C.black, padding: "8px 16px" },
  marquee: { overflow: "hidden", borderTop: `1px solid ${C.lightGray}40`, borderBottom: `1px solid ${C.lightGray}40`, padding: "20px 0", whiteSpace: "nowrap" },
  marqueeInner: { display: "inline-flex", gap: 60, animation: "marquee 20s linear infinite" },
  marqueeText: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.3em", color: C.lightGray },
  section: { maxWidth: 1200, margin: "0 auto", padding: "80px 24px" },
  sectionTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "0.04em", marginBottom: 12, color: C.black },
  sectionSub: { fontSize: 14, color: C.midGray, marginBottom: 48, fontWeight: 300, letterSpacing: "0.02em" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 },
  productCard: { cursor: "pointer", position: "relative", overflow: "hidden", background: C.bgAlt },
  productImg: { width: "100%", aspectRatio: "3/4", objectFit: "cover", transition: "transform 0.6s ease", filter: "grayscale(20%)" },
  productInfo: { padding: "16px 4px" },
  productName: { fontSize: 13, letterSpacing: "0.1em", fontWeight: 500, marginBottom: 6, textTransform: "uppercase" },
  productPrice: { fontSize: 14, color: C.midGray, fontWeight: 300 },
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" },
  aboutImg: { width: "100%", aspectRatio: "4/5", objectFit: "cover", filter: "grayscale(40%)" },
  aboutText: { fontSize: 15, lineHeight: 1.9, color: C.darkGray, fontWeight: 300 },
  aboutValues: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 40 },
  valueCard: { padding: 24, border: `1px solid ${C.lightGray}40` },
  valueTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.08em", marginBottom: 8 },
  valueText: { fontSize: 13, lineHeight: 1.7, color: C.midGray, fontWeight: 300 },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 },
  formGroup: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 },
  label: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.midGray, fontWeight: 500 },
  input: { padding: "14px 0", fontSize: 15, border: "none", borderBottom: `1px solid ${C.lightGray}`, background: "transparent", color: C.black, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.2s" },
  textarea: { padding: "14px 0", fontSize: 15, border: "none", borderBottom: `1px solid ${C.lightGray}`, background: "transparent", color: C.black, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", minHeight: 120 },
  submitBtn: { padding: "16px 48px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginTop: 8, transition: "opacity 0.2s" },
  contactInfo: { display: "flex", flexDirection: "column", gap: 32, paddingTop: 12 },
  contactItem: { borderLeft: `2px solid ${C.black}`, paddingLeft: 20 },
  contactLabel: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.midGray, fontWeight: 500, marginBottom: 6 },
  contactVal: { fontSize: 15, color: C.black, fontWeight: 400 },
  cartOverlay: (open) => ({ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.3s" }),
  cartDrawer: (open) => ({ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 90vw)", background: C.bg, zIndex: 201, transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", display: "flex", flexDirection: "column" }),
  cartHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px", borderBottom: `1px solid ${C.lightGray}40` },
  cartTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.08em" },
  cartClose: { background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.black },
  cartItems: { flex: 1, overflowY: "auto", padding: "20px 28px" },
  cartItem: { display: "flex", gap: 16, paddingBottom: 20, marginBottom: 20, borderBottom: `1px solid ${C.lightGray}30` },
  cartItemImg: { width: 72, height: 90, objectFit: "cover", flexShrink: 0, filter: "grayscale(20%)" },
  cartItemInfo: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" },
  cartItemName: { fontSize: 12, letterSpacing: "0.08em", fontWeight: 500, textTransform: "uppercase" },
  cartItemSize: { fontSize: 11, color: C.midGray },
  cartItemBottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cartItemPrice: { fontSize: 14, fontWeight: 500 },
  cartItemRemove: { fontSize: 11, color: C.midGray, cursor: "pointer", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" },
  cartFooter: { padding: "24px 28px", borderTop: `1px solid ${C.lightGray}40` },
  cartTotal: { display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: 16, fontWeight: 500 },
  checkoutBtn: { width: "100%", padding: "16px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  emptyCart: { textAlign: "center", padding: "60px 0", color: C.midGray, fontSize: 14 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  modal: { background: C.bg, maxWidth: 800, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", maxHeight: "85vh", overflow: "hidden", position: "relative" },
  modalImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" },
  modalContent: { padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, overflowY: "auto" },
  modalName: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: "0.04em" },
  modalPrice: { fontSize: 20, color: C.midGray, fontWeight: 300 },
  modalSizes: { display: "flex", gap: 10, flexWrap: "wrap" },
  sizeBtn: (active) => ({ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, border: `1px solid ${active ? C.black : C.lightGray}`, background: active ? C.black : "transparent", color: active ? C.bg : C.darkGray, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }),
  addToCartBtn: { padding: "16px 48px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginTop: 8 },
  modalClose: { position: "absolute", top: 16, right: 16, background: C.bg, border: "none", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", color: C.black, zIndex: 2 },
  footer: { borderTop: `1px solid ${C.lightGray}40`, marginTop: 40 },
  footerInner: { maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 },
  footerLogo: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.06em", marginBottom: 12 },
  footerText: { fontSize: 13, lineHeight: 1.7, color: C.midGray, fontWeight: 300, maxWidth: 280 },
  footerColTitle: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 },
  footerLink: { display: "block", fontSize: 13, color: C.midGray, marginBottom: 10, cursor: "pointer", fontWeight: 300, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", padding: 0, textAlign: "left" },
  footerBottom: { maxWidth: 1200, margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.lightGray}30`, fontSize: 12, color: C.lightGray },
  newsletter: { background: C.black, color: C.bg, padding: "60px 24px", textAlign: "center" },
  nlTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "0.06em", marginBottom: 12 },
  nlSub: { fontSize: 14, color: C.lightGray, fontWeight: 300, marginBottom: 32 },
  nlForm: { display: "flex", gap: 0, maxWidth: 460, margin: "0 auto" },
  nlInput: { flex: 1, padding: "14px 20px", fontSize: 14, border: `1px solid ${C.midGray}`, borderRight: "none", background: "transparent", color: C.bg, fontFamily: "'DM Sans', sans-serif", outline: "none" },
  nlBtn: { padding: "14px 28px", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", background: C.bg, color: C.black, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
};

// ─── Hooks ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimateIn({ children, animation = "fadeInUp", delay = 0, duration = 0.7, style = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ ...style, opacity: visible ? 1 : 0, animation: visible ? `${animation} ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s both` : "none" }}>
      {children}
    </div>
  );
}

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ─── Photo Lightbox (Peel-In) ───
function PhotoLightbox({ src, title, onClose }) {
  if (!src) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "pointer" }} onClick={onClose}>
      <div style={{ position: "relative", maxWidth: 700, width: "100%", animation: "peelIn 0.5s cubic-bezier(0.16,1,0.3,1) both" }} onClick={e => e.stopPropagation()}>
        <img src={src} alt={title || "Photo"} style={{ width: "100%", maxHeight: "85vh", objectFit: "contain", display: "block", borderRadius: 2 }} />
        {title && <div style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.06em", color: C.white, background: "rgba(0,0,0,0.6)", padding: "8px 18px" }}>{title}</div>}
        <button style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

// ─── Collection Slot ───
function CollectionSlot({ collection, onImageClick, onNavigate }) {
  return (
    <div className="collection-card hover-lift" style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: C.bgAlt }} onClick={() => onImageClick && onImageClick(collection)}>
      <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
        <img src={collection.img} alt={collection.title} className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(40%) brightness(0.7)" }} />
      </div>
      <div className="collection-overlay" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.65) 100%)", pointerEvents: "none" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#FFFFFF90", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>{collection.season}</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.04em", color: C.white, marginBottom: 4 }}>{collection.title}</div>
        <div style={{ fontSize: 13, color: "#FFFFFF99", fontWeight: 300, marginBottom: 16 }}>{collection.subtitle}</div>
        <button className="launch-badge" style={{ padding: "10px 24px", border: "1px solid #FFFFFF60", color: C.white, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, alignSelf: "flex-start", transition: "all 0.3s", background: "transparent", cursor: "pointer", pointerEvents: "auto", fontFamily: "'DM Sans', sans-serif" }} onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate("collection-" + collection.key); }}>
          View Collection →
        </button>
      </div>
    </div>
  );
}

// ─── Product Card ───
function ProductCard({ product, onQuickView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={styles.productCard} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onQuickView && onQuickView(product)}>
      <div style={{ overflow: "hidden" }}>
        <img src={product.img} alt={product.name} style={{ ...styles.productImg, transform: hovered ? "scale(1.05)" : "scale(1)" }} />
      </div>
      <div style={styles.productInfo}>
        <div style={styles.productName}>{product.name}</div>
        <div style={styles.productPrice}>${product.price}</div>
      </div>
    </div>
  );
}

// ─── Pages ───

function HomePage({ onNavigate, onImageClick }) {
  const mobile = useIsMobile();
  return (
    <div>
      <div className="hero-grid" style={{ ...styles.hero, gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", padding: mobile ? "140px 16px 40px" : "180px 24px 80px", gap: mobile ? 32 : 60, minHeight: mobile ? "auto" : "90vh" }}>
        <div style={styles.heroText}>
          <AnimateIn animation="fadeInUp" delay={0.1} duration={0.8}><div style={{ fontSize: 12, letterSpacing: "0.2em", color: C.midGray, textTransform: "uppercase", fontWeight: 500 }}>EST. 2026</div></AnimateIn>
          <AnimateIn animation="heroText" delay={0.3} duration={0.9}><h1 className="hero-title" style={styles.heroTitle}>WEAR</h1></AnimateIn>
          <AnimateIn animation="heroText" delay={0.45} duration={0.9}><h1 className="hero-title" style={{ ...styles.heroTitle, marginTop: -8 }}>YOUR</h1></AnimateIn>
          <AnimateIn animation="heroText" delay={0.6} duration={0.9}><h1 className="hero-title" style={{ ...styles.heroTitle, marginTop: -8, WebkitTextStroke: `2px ${C.black}`, color: "transparent" }}>IDENTITY</h1></AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.8} duration={0.7}><p style={styles.heroSub}>Maskout is more than clothing — it's a statement. Urban essentials designed for those who move different.</p></AnimateIn>
          <AnimateIn animation="fadeInUp" delay={1.0} duration={0.7}><button className="btn-hover" style={styles.heroCta} onClick={() => onNavigate("shop")}>Explore Collection</button></AnimateIn>
        </div>
        <AnimateIn animation="slideInRight" delay={0.4} duration={1.0}>
          <div style={styles.heroImgWrap}>
            <img src="/hero.PNG" alt="Maskout hero" style={styles.heroImg} className="img-zoom" />
            <div style={styles.heroImgOverlay}>SS26 COLLECTION</div>
          </div>
        </AnimateIn>
      </div>
      <div style={styles.marquee}><div style={styles.marqueeInner}>{[...Array(3)].map((_, i) => (<span key={i} style={{ display: "flex", gap: 60 }}>{["STREETWEAR", "CULTURE", "COMMUNITY", "IDENTITY", "MOVEMENT", "EXPRESSION"].map(t => (<span key={t + i} style={styles.marqueeText}>{t} ✦</span>))}</span>))}</div></div>
      <div style={styles.section}>
        <AnimateIn animation="fadeInUp" delay={0}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}><div><h2 style={styles.sectionTitle}>UPCOMING COLLECTIONS</h2><p style={{ ...styles.sectionSub, marginBottom: 0 }}>Four distinct directions. Launching soon.</p></div><button className="btn-hover" style={{ ...styles.navLink, fontSize: 12 }} onClick={() => onNavigate("shop")}>View All →</button></div></AnimateIn>
        <div className="collections-grid-4" style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16 }}>
          {COLLECTIONS.map((c, i) => (
            <AnimateIn key={c.id} animation="peelIn" delay={i * 0.12} duration={0.7}>
              <CollectionSlot collection={c} onImageClick={onImageClick} onNavigate={onNavigate} />
            </AnimateIn>
          ))}
        </div>
      </div>
      <div style={{ background: C.bgAlt, padding: "80px 24px" }}><div className="brand-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 40, textAlign: "center" }}>{[{ num: "01", title: "PREMIUM MATERIALS", text: "Heavyweight fabrics built to last through every season." },{ num: "02", title: "DESIGNED IN-HOUSE", text: "Every piece is original. No templates, no shortcuts." },{ num: "03", title: "COMMUNITY FIRST", text: "Built by the culture, for the culture. Always." }].map((item, i) => (<AnimateIn key={item.num} animation="fadeInUp" delay={i * 0.15} duration={0.7}><div><div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.lightGray, marginBottom: 12 }}>{item.num}</div><div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.08em", marginBottom: 8 }}>{item.title}</div><div style={{ fontSize: 13, color: C.midGray, lineHeight: 1.7, fontWeight: 300 }}>{item.text}</div></div></AnimateIn>))}</div></div>
      <AnimateIn animation="fadeIn" delay={0} duration={0.8}><div style={styles.newsletter}><AnimateIn animation="fadeInUp" delay={0.1}><div style={styles.nlTitle}>JOIN THE MOVEMENT</div></AnimateIn><AnimateIn animation="fadeInUp" delay={0.2}><div style={styles.nlSub}>Early access to drops, exclusive offers, and community updates.</div></AnimateIn><AnimateIn animation="fadeInUp" delay={0.3}><div style={styles.nlForm}><input type="email" placeholder="Your email" style={styles.nlInput} /><button className="btn-hover" style={styles.nlBtn}>Subscribe</button></div></AnimateIn></div></AnimateIn>
    </div>
  );
}

function ShopPage({ onImageClick, onNavigate }) {
  const mobile = useIsMobile();
  return (
    <div style={{ ...styles.section, paddingTop: mobile ? 140 : 180 }}>
      <AnimateIn animation="fadeInUp"><h2 style={styles.sectionTitle}>COLLECTIONS</h2></AnimateIn>
      <AnimateIn animation="fadeInUp" delay={0.1}><p style={styles.sectionSub}>Explore our upcoming drops — four distinct directions, one identity.</p></AnimateIn>
      <div className="collections-grid-2" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
        {COLLECTIONS.map((c, i) => (
          <AnimateIn key={c.id} animation="peelIn" delay={i * 0.1} duration={0.6}>
            <CollectionSlot collection={c} onImageClick={onImageClick} onNavigate={onNavigate} />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

function CollectionPage({ collectionKey, onNavigate, onQuickView }) {
  const mobile = useIsMobile();
  const collection = COLLECTIONS.find(c => c.key === collectionKey);
  const products = PRODUCTS.filter(p => p.collection === collectionKey);
  if (!collection) return null;
  return (
    <div style={{ ...styles.section, paddingTop: 180 }}>
      <AnimateIn animation="peelIn" duration={0.6}>
        <div className="collection-banner" style={{ position: "relative", overflow: "hidden", marginBottom: 48, aspectRatio: "21/9", maxHeight: 360 }}>
          <img src={collection.img} alt={collection.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%) brightness(0.6)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: C.white }}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", marginBottom: 8, opacity: 0.7 }}>{collection.season}</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "0.04em" }}>{collection.title}</h2>
            <p style={{ fontSize: 15, opacity: 0.8, fontWeight: 300 }}>{collection.subtitle}</p>
          </div>
        </div>
      </AnimateIn>
      <button className="btn-hover" style={{ ...styles.navLink, fontSize: 12, marginBottom: 32, display: "inline-block" }} onClick={() => onNavigate("shop")}>← Back to Collections</button>
      {products.length > 0 ? (
        <div className="product-grid" style={styles.productGrid}>
          {products.map((p, i) => (
            <AnimateIn key={p.id} animation="peelIn" delay={i * 0.1} duration={0.6}>
              <ProductCard product={p} onQuickView={onQuickView} />
            </AnimateIn>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 12 }}>COMING SOON</div>
          <p style={{ color: C.midGray, fontSize: 14, fontWeight: 300 }}>Products for this collection are dropping soon. Stay tuned.</p>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  const mobile = useIsMobile();
  return (
    <div style={{ ...styles.section, paddingTop: mobile ? 140 : 180 }}>
      <AnimateIn animation="fadeInUp"><h2 style={styles.sectionTitle}>OUR STORY</h2></AnimateIn>
      <AnimateIn animation="fadeInUp" delay={0.1}><p style={styles.sectionSub}>The culture behind the clothes.</p></AnimateIn>
      <div className="about-grid" style={{ ...styles.aboutGrid, gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
        <AnimateIn animation="slideInLeft" duration={0.9}><img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&h=900&fit=crop" alt="Maskout studio" style={styles.aboutImg} className="img-zoom" /></AnimateIn>
        <div>
          <AnimateIn animation="fadeInUp" delay={0.2}><p style={styles.aboutText}>Maskout was born from the streets — a response to mass-produced fashion that says nothing. We believe what you wear should speak before you do.</p></AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.35}><p style={{ ...styles.aboutText, marginTop: 20 }}>Every piece is designed in-house with obsessive attention to fit, fabric, and detail. We source premium heavyweight cotton, custom-dyed fabrics, and construction methods that ensure each garment gets better with age.</p></AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.5}><p style={{ ...styles.aboutText, marginTop: 20 }}>This isn't fast fashion. This is wardrobe architecture — pieces that become part of your identity.</p></AnimateIn>
          <div style={styles.aboutValues}>{[{ title: "QUALITY", text: "Premium materials, meticulous construction." },{ title: "ORIGINALITY", text: "Every design is created from scratch." },{ title: "COMMUNITY", text: "Built with and for the culture." },{ title: "LONGEVITY", text: "Made to outlast every trend." }].map((v, i) => (<AnimateIn key={v.title} animation="fadeInUp" delay={0.6 + i * 0.1}><div className="hover-lift" style={styles.valueCard}><div style={styles.valueTitle}>{v.title}</div><div style={styles.valueText}>{v.text}</div></div></AnimateIn>))}</div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const mobile = useIsMobile();
  return (
    <div style={{ ...styles.section, paddingTop: mobile ? 140 : 180 }}>
      <AnimateIn animation="fadeInUp"><h2 style={styles.sectionTitle}>GET IN TOUCH</h2></AnimateIn>
      <AnimateIn animation="fadeInUp" delay={0.1}><p style={styles.sectionSub}>Questions, wholesale inquiries, or just want to connect — we're here.</p></AnimateIn>
      <div className="contact-grid" style={{ ...styles.contactGrid, gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
        <AnimateIn animation="slideInLeft" delay={0.2} duration={0.8}>
        <div>
          {submitted ? (<div style={{ padding: "60px 0", textAlign: "center", animation: "scaleIn 0.5s ease both" }}><div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, marginBottom: 12 }}>MESSAGE SENT ✓</div><p style={{ color: C.midGray, fontSize: 14 }}>We'll get back to you within 24 hours.</p></div>) : (<>
              <div style={styles.formGroup}><label style={styles.label}>Name</label><input type="text" style={styles.input} placeholder="Your full name" onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} /></div>
              <div style={styles.formGroup}><label style={styles.label}>Email</label><input type="email" style={styles.input} placeholder="you@email.com" onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} /></div>
              <div style={styles.formGroup}><label style={styles.label}>Subject</label><input type="text" style={styles.input} placeholder="What's this about?" onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} /></div>
              <div style={styles.formGroup}><label style={styles.label}>Message</label><textarea style={styles.textarea} placeholder="Tell us more..." onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} /></div>
              <button className="btn-hover" style={styles.submitBtn} onClick={() => setSubmitted(true)}>Send Message</button>
            </>)}
        </div>
        </AnimateIn>
        <AnimateIn animation="slideInRight" delay={0.3} duration={0.8}>
        <div style={styles.contactInfo}>{[{ label: "Email", value: "hello@maskout.com", link: "mailto:hello@maskout.com" },{ label: "Instagram", value: "Maskout.club", link: "https://instagram.com/maskout.club" },{ label: "Location", value: "Los Angeles, CA" },{ label: "Hours", value: "Mon – Fri, 10am – 6pm PST" }].map((c) => (<div key={c.label} style={styles.contactItem}><div style={styles.contactLabel}>{c.label}</div>{c.link ? <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactVal, textDecoration: "none", borderBottom: `1px solid ${C.lightGray}` }}>{c.value}</a> : <div style={styles.contactVal}>{c.value}</div>}</div>))}</div>
        </AnimateIn>
      </div>
    </div>
  );
}

// ─── Quick View Modal ───
function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const mobile = useIsMobile();
  if (!product) return null;
  const handleAdd = () => { if (!selectedSize) return; onAddToCart({ ...product, size: selectedSize }); setAdded(true); setTimeout(() => { setAdded(false); onClose(); }, 800); };
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div className="modal-grid" style={{ ...styles.modal, gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", animation: "peelIn 0.5s cubic-bezier(0.16,1,0.3,1) both" }} onClick={e => e.stopPropagation()}>
        <img src={product.img} alt={product.name} style={styles.modalImg} />
        <div style={styles.modalContent}>
          <div style={styles.modalName}>{product.name}</div>
          <div style={styles.modalPrice}>${product.price}</div>
          <div><div style={{ ...styles.label, marginBottom: 12 }}>Select Size</div><div style={styles.modalSizes}>{product.sizes.map(s => (<button key={s} style={styles.sizeBtn(selectedSize === s)} onClick={() => setSelectedSize(s)}>{s}</button>))}</div></div>
          <button style={{ ...styles.addToCartBtn, opacity: selectedSize ? 1 : 0.4, background: added ? "#2d6a4f" : C.black }} onClick={handleAdd} disabled={!selectedSize}>{added ? "Added ✓" : "Add to Cart"}</button>
          <p style={{ fontSize: 12, color: C.midGray, lineHeight: 1.6, fontWeight: 300 }}>Free shipping on orders over $150. Premium heavyweight construction. Relaxed fit.</p>
        </div>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

// ─── Cart Drawer ───
function CartDrawer({ open, onClose, items, onRemove }) {
  const total = items.reduce((s, i) => s + i.price, 0);
  return (<>
    <div style={styles.cartOverlay(open)} onClick={onClose} />
    <div style={styles.cartDrawer(open)}>
      <div style={styles.cartHeader}><div style={styles.cartTitle}>YOUR CART ({items.length})</div><button style={styles.cartClose} onClick={onClose}>✕</button></div>
      <div style={styles.cartItems}>{items.length === 0 ? (<div style={styles.emptyCart}><div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, marginBottom: 8, color: C.black }}>CART IS EMPTY</div><p>Add some pieces to get started.</p></div>) : items.map((item, i) => (<div key={i} style={styles.cartItem}><img src={item.img} alt={item.name} style={styles.cartItemImg} /><div style={styles.cartItemInfo}><div><div style={styles.cartItemName}>{item.name}</div><div style={styles.cartItemSize}>Size: {item.size}</div></div><div style={styles.cartItemBottom}><div style={styles.cartItemPrice}>${item.price}</div><button style={styles.cartItemRemove} onClick={() => onRemove(i)}>Remove</button></div></div></div>))}</div>
      {items.length > 0 && (<div style={styles.cartFooter}><div style={styles.cartTotal}><span>Total</span><span>${total}</span></div><button style={styles.checkoutBtn}>Checkout</button></div>)}
    </div>
  </>);
}

// ─── Footer ───
function Footer({ onNavigate }) {
  const mobile = useIsMobile();
  return (
    <footer style={styles.footer}>
      <div className="footer-grid" style={{ ...styles.footerInner, gridTemplateColumns: mobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr" }}>
        <div><div style={{ ...styles.footerLogo, display: "flex", alignItems: "center", gap: 2 }}><img src={LOGO_NAV} alt="" style={{ height: 44, width: "auto", mixBlendMode: "multiply" }} /><span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: "0.04em", lineHeight: 1, marginLeft: -10 }}>ASKOUT</span></div><p style={styles.footerText}>Urban essentials for those who move different. Premium streetwear designed in Los Angeles.</p></div>
        <div><div style={styles.footerColTitle}>Shop</div>{["All Products", "Tops", "Bottoms", "Accessories"].map(l => (<button key={l} style={styles.footerLink} onClick={() => onNavigate("shop")}>{l}</button>))}</div>
        <div><div style={styles.footerColTitle}>Company</div>{["About", "Contact", "Careers", "Press"].map(l => (<button key={l} style={styles.footerLink} onClick={() => onNavigate(l.toLowerCase())}>{l}</button>))}</div>
        <div><div style={styles.footerColTitle}>Follow</div>{[{label: "Maskout.club", url: "https://instagram.com/maskout.club"}, {label: "Twitter / X", url: "#"}, {label: "TikTok", url: "#"}, {label: "YouTube", url: "#"}].map(l => (<a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ ...styles.footerLink, textDecoration: "none" }}>{l.label}</a>))}</div>
      </div>
      <div style={styles.footerBottom}><span>© 2026 Maskout. All rights reserved.</span><span>Privacy · Terms</span></div>
    </footer>
  );
}

// ─── Main App ───
export default function MaskoutApp() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const scrolled = useScrolled(30);
  const mobile = useIsMobile();

  useEffect(() => {
    if (!document.getElementById("maskout-fonts")) { const link = document.createElement("link"); link.id = "maskout-fonts"; link.rel = "stylesheet"; link.href = FONTS_URL; document.head.appendChild(link); }
    if (!document.getElementById("maskout-keyframes")) {
      const s = document.createElement("style"); s.id = "maskout-keyframes";
      s.textContent = `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-60px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { 0% { opacity: 0; transform: translateX(60px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.92); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes heroText { 0% { opacity: 0; transform: translateY(50px) skewY(2deg); } 100% { opacity: 1; transform: translateY(0) skewY(0); } }
        @keyframes lineGrow { 0% { width: 0; } 100% { width: 100%; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes peelIn { 0% { opacity: 0; transform: perspective(600px) rotateX(60deg) translateY(-40px); } 100% { opacity: 1; transform: perspective(600px) rotateX(0) translateY(0); } }
        .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease !important; }
        .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .btn-hover { transition: all 0.3s cubic-bezier(0.16,1,0.3,1) !important; }
        .btn-hover:hover { transform: scale(1.03); opacity: 0.9; }
        .nav-link-hover { position: relative; }
        .nav-link-hover::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #111; transition: width 0.3s ease; }
        .nav-link-hover:hover::after { width: 100%; }
        .img-zoom { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease !important; }
        .img-zoom:hover { transform: scale(1.06); filter: grayscale(0%) !important; }
        .collection-overlay { transition: all 0.5s cubic-bezier(0.16,1,0.3,1) !important; }
        .collection-card:hover .collection-overlay { background: linear-gradient(transparent 20%, rgba(0,0,0,0.75) 100%) !important; }
        .collection-card:hover .launch-badge { background: rgba(255,255,255,0.2) !important; border-color: #FFF !important; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding-top: 140px !important; min-height: auto !important; }
          .collections-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .collections-grid-2 { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .brand-grid { grid-template-columns: 1fr !important; }
          .nav-inner { grid-template-columns: 1fr 1fr !important; padding: 12px 16px !important; }
          .modal-grid { grid-template-columns: 1fr !important; }
          .modal-grid img { max-height: 300px; }
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .hero-title { font-size: 56px !important; }
          .collection-banner { aspect-ratio: 16/9 !important; }
        }
      `;
      document.head.appendChild(s);
    }
  }, []);

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const addToCart = (item) => setCartItems(prev => [...prev, item]);
  const removeFromCart = (i) => setCartItems(prev => prev.filter((_, idx) => idx !== i));
  const openLightbox = (collection) => setLightbox({ src: collection.img, title: collection.title });

  // Extract collection key from page like "collection-streetcore"
  const collectionKey = page.startsWith("collection-") ? page.replace("collection-", "") : null;

  return (
    <div style={styles.app}>
      <nav style={{ ...styles.nav, boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.3s ease, padding 0.3s ease" }}>
        <div className="nav-inner" style={{ ...styles.navInner, gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr", padding: scrolled ? (mobile ? "8px 16px" : "10px 24px") : (mobile ? "12px 16px" : "18px 24px"), transition: "padding 0.3s ease" }}>
          <div style={styles.navLinks}>
            {[["home", "Home"], ["shop", "Shop"], ["about", "About"], ["contact", "Contact"]].map(([key, label]) => (
              <button key={key} className="nav-link-hover" style={{ ...styles.navLink, color: page === key ? C.black : C.darkGray, fontWeight: page === key ? 700 : 500 }} onClick={() => navigate(key)}>{label}</button>
            ))}
            <button className="nav-link-hover" style={styles.cartBtn} onClick={() => setCartOpen(true)}>Cart{cartItems.length > 0 && <span style={{ ...styles.cartBadge, animation: "pulse 1.5s ease infinite" }}>{cartItems.length}</span>}</button>
          </div>
          <div style={{ ...styles.logo, transition: "all 0.3s ease" }} onClick={() => navigate("home")}>
            <img src={LOGO_NAV} alt="" style={{ height: scrolled ? 52 : 72, width: "auto", display: "block", transition: "height 0.3s ease", mixBlendMode: "multiply" }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: scrolled ? 38 : 52, letterSpacing: "0.04em", lineHeight: 1, marginLeft: -14, transition: "font-size 0.3s ease" }}>ASKOUT</span>
          </div>
          <div />
        </div>
      </nav>

      {page === "home" && <HomePage onNavigate={navigate} onImageClick={openLightbox} />}
      {page === "shop" && <ShopPage onImageClick={openLightbox} onNavigate={navigate} />}
      {collectionKey && <CollectionPage collectionKey={collectionKey} onNavigate={navigate} onQuickView={setQuickView} />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ContactPage />}

      <Footer onNavigate={navigate} />
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} onAddToCart={addToCart} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={removeFromCart} />
      {lightbox && <PhotoLightbox src={lightbox.src} title={lightbox.title} onClose={() => setLightbox(null)} />}
    </div>
  );
}
