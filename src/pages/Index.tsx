import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import WeddingDetails from "@/components/WeddingDetails";
import hero537 from "@/assets/hero-537.webp";
import hero539 from "@/assets/hero-539.webp";
import hero541 from "@/assets/hero-541.webp";
import hero542 from "@/assets/hero-542.webp";
import hero543 from "@/assets/hero-543.webp";
import hero545 from "@/assets/hero-545.webp";
import floralBottom from "@/assets/floral-bottom-left-watercolor.webp";
import floralTop from "@/assets/floral-top-right-watercolor.webp";
import weddingLogo from "@/assets/wedding-logo.png";

import useCountdown from "@/hooks/useCountdown";
import weddingRings from "@/assets/wedding-rings.webp";
import tunisiaFlag from "@/assets/tunisia-flag.webp";

const WEDDING_DATE = new Date("2026-09-03T15:00:00");
const HERO_PHOTOS = [hero537, hero539, hero541, hero542, hero543, hero545];

const translations = {
  de: {
    gettingMarried: "Unser Hochzeitswochenende",
    home: "About",
    story: "Unsere Geschichte",
    detailsNav: "Details",
    travel: "Anreise",
    activities: "Freizeit",
    date: "3. bis 5. September 2026",
    days: "Tage",
    hrs: "Std",
    min: "Min",
    sec: "Sek",
    rsvp: "ZUSAGEN",
    moreInfo: "WOCHENENDE",
    close: "schlie\u00DFen",
    deadlinePre: "Ort",
    deadlineDate: "Monastir, Tunesien",
    deadlinePost: "",
    openCard: "EINLADUNG \u00D6FFNEN",
    coverSubtitle: "Ihr seid herzlich zu unserem Wochenende eingeladen",
  },
  en: {
    gettingMarried: "Our Wedding Weekend",
    home: "About",
    story: "Our Story",
    detailsNav: "Details",
    travel: "Getting There",
    activities: "Things to Do",
    date: "September 3rd to 5th, 2026",
    days: "Days",
    hrs: "Hrs",
    min: "Min",
    sec: "Sec",
    rsvp: "RSVP",
    moreInfo: "WEEKEND GUIDE",
    close: "close",
    deadlinePre: "Location",
    deadlineDate: "Monastir, Tunisia",
    deadlinePost: "",
    openCard: "OPEN INVITATION",
    coverSubtitle: "You are warmly invited for the full weekend",
  },
  ar: {
    gettingMarried: "عطلة نهاية أسبوع زفافنا",
    home: "نبذة",
    story: "قصتنا",
    detailsNav: "التفاصيل",
    travel: "الوصول",
    activities: "أنشطة",
    date: "\u0645\u0646 3 \u0625\u0644\u0649 5 \u0633\u0628\u062A\u0645\u0628\u0631 2026",
    days: "\u064A\u0648\u0645",
    hrs: "\u0633\u0627\u0639\u0629",
    min: "\u062F\u0642\u064A\u0642\u0629",
    sec: "\u062B\u0627\u0646\u064A\u0629",
    rsvp: "قبول الدعوة",
    moreInfo: "\u062F\u0644\u064A\u0644 \u0627\u0644\u0639\u0637\u0644\u0629",
    close: "\u0625\u063A\u0644\u0627\u0642",
    deadlinePre: "\u0627\u0644\u0645\u0643\u0627\u0646",
    deadlineDate: "\u0627\u0644\u0645\u0646\u0633\u062A\u064A\u0631\u060C \u062A\u0648\u0646\u0633",
    deadlinePost: "",
    openCard: "\u0627\u0641\u062A\u062D \u0627\u0644\u062F\u0639\u0648\u0629",
    coverSubtitle: "يشرفنا حضوركم طوال عطلة نهاية الأسبوع",
  },
} as const;

type Lang = keyof typeof translations;
type ActiveSection = "home" | "story" | "details" | "travel" | "activities";

const langLabel: Record<Lang, string> = { de: "DEUTSCH", en: "ENGLISH", ar: "ARABE" };
const langShort: Record<Lang, string> = { de: "DE", en: "EN", ar: "AR" };
const langFull: Record<Lang, string> = { de: "Deutsch", en: "English", ar: "Arabe" };

const coverHeading: Record<Lang, string[]> = {
  de: ["Wir", "sagen", "Ja!"],
  en: ["We", "say", "Yes!"],
  ar: ["معاً نبدأ فصلاً", "جديداً من", "حكايتنا"],
};

const coverText1: Record<Lang, string> = {
  de: "Ein besonderer Anlass braucht besondere G\u00E4ste! Deshalb m\u00F6chten wir den sch\u00F6nsten Tag unseres Lebens gerne mit euch verbringen.",
  en: "A special occasion needs special guests! That\u2019s why we\u2019d love to share the most beautiful day of our lives with you.",
  ar: "يسعدنا أن نشارككم أجمل يوم في حياتنا.",
};

const coverText2: Record<Lang, string> = {
  de: "Wir freuen uns riesig auf euch und k\u00F6nnen es kaum erwarten, diesen besonderen Moment gemeinsam zu feiern. \u2764\uFE0F",
  en: "We are so excited to see you and can\u2019t wait to celebrate this special moment together. \u2764\uFE0F",
  ar: "ونتطلع بكل شوق لرؤيتكم والاحتفال بهذه المناسبة المميزة معكم. ❤️",
};

const invitedText: Record<Lang, string> = {
  de: "Ihr seid voller Freude zu unserer Hochzeit eingeladen",
  en: "You are joyfully invited to the wedding of",
  ar: "يسعدنا دعوتكم لحضور زفاف",
};

const locationText: Record<Lang, { venue: string; city: string }> = {
  de: { venue: "Monastir", city: "Tunesien" },
  en: { venue: "Monastir", city: "Tunisia" },
  ar: { venue: "المنستير", city: "تونس" },
};

const quoteText: Record<Lang, string> = {
  de: "Liebe beginnt mit einem Gefühl.\nDoch sie am Leben zu halten ist eine Entscheidung.\nUnd mit jedem neuen Tag\nentscheide ich mich wieder für dich.",
  en: "Love starts as a feeling,\nBut to continue is a choice;\nAnd I find myself choosing you\nMore and more every day.",
  ar: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
};

const GermanFlag = () => (
  <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
    <rect y="0" width="60" height="13.33" fill="#000" />
    <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
    <rect y="26.66" width="60" height="13.34" fill="#FFCC00" />
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
    <rect width="60" height="40" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="2" />
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const TunisianFlag = () => (
  <svg viewBox="-60 -40 120 80" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="#e70013">
    <path d="M-60-40H60v80H-60z" />
    <circle fill="#fff" r="20" />
    <circle r="15" />
    <circle fill="#fff" cx="4" r="12" />
    <path d="M-5 0l16.281-5.29L1.22 8.56V-8.56L11.28 5.29z" />
  </svg>
);

const flagForLang = (l: Lang) => {
  if (l === "de") return <GermanFlag />;
  if (l === "en") return <UKFlag />;
  return <TunisianFlag />;
};

const LogoMark = ({ className }: { className: string }) => (
  <div
    className={className}
    style={{
      WebkitMaskImage: `url(${weddingLogo})`,
      maskImage: `url(${weddingLogo})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      background:
        "linear-gradient(135deg, #ef9aaa 0%, #e9879e 22%, #f0c46f 50%, #c7e5dd 74%, #8ecfd3 100%)",
    }}
  />
);

const HeroSlideshow = ({
  activeIndex,
  imageClassName,
}: {
  activeIndex: number;
  imageClassName: string;
}) => (
  <>
    {HERO_PHOTOS.map((photo, index) => (
      <img
        key={photo}
        src={photo}
        alt="Maisa and Amin"
        className={`${imageClassName} ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        style={{
          transition: "opacity 2800ms ease-in-out",
          willChange: "opacity",
        }}
      />
    ))}
  </>
);

const allLangs: Lang[] = ["de", "en", "ar"];

const navItems: Array<{ key: ActiveSection; labelKey: "home" | "story" | "detailsNav" | "travel" | "activities" }> = [
  { key: "home", labelKey: "home" },
  { key: "story", labelKey: "story" },
  { key: "details", labelKey: "detailsNav" },
  { key: "travel", labelKey: "travel" },
  { key: "activities", labelKey: "activities" },
];

const InvitationNav = ({
  lang,
  activeSection,
  setActiveSection,
  mobilePinned = false,
}: {
  lang: Lang;
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  mobilePinned?: boolean;
}) => {
  const t = translations[lang];
  const orderedNavItems = lang === "ar" ? [...navItems].reverse() : navItems;

  return (
    <nav className={`w-full ${mobilePinned ? "sticky top-0 z-20 -mx-5 border-b border-border/60 bg-background/95 px-5 py-4 backdrop-blur sm:-mx-6 sm:px-6 md:hidden" : ""}`}>
      <div className={`${mobilePinned ? "flex min-w-max gap-5 overflow-x-auto whitespace-nowrap text-[0.72rem]" : `flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[0.7rem] md:text-sm md:justify-start ${lang === "ar" ? "md:pl-56" : ""}`} tracking-[0.22em] text-foreground/55 md:tracking-[0.2em]`}>
        {orderedNavItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`border-b pb-1 transition-colors ${
              activeSection === item.key
                ? "border-foreground text-foreground"
                : "border-transparent hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {t[item.labelKey]}
          </button>
        ))}
      </div>
    </nav>
  );
};

const MobileAnchorNav = ({
  lang,
  setLang,
  langOpen,
  setLangOpen,
  menuOpen,
  setMenuOpen,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) => {
  const t = translations[lang];
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const mobileTextColor = isOverLightSection ? "text-[#9b7a2b]" : "text-white/90";
  const mobileHoverColor = isOverLightSection ? "hover:text-[#9b7a2b]" : "hover:text-white";
  const orderedNavItems = lang === "ar" ? [...navItems].reverse() : navItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsOverLightSection(window.scrollY > 360);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed right-4 top-4 z-40 sm:right-6" data-mobile-menu="true">
      <div className="relative flex items-center justify-end">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setLangOpen(false);
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            isOverLightSection
              ? "bg-background text-[#9b7a2b] shadow-[0_10px_30px_rgba(155,122,43,0.12)]"
              : `${mobileTextColor} ${mobileHoverColor} bg-black/20 backdrop-blur-md`
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>

        {menuOpen && (
          <div
            className={`absolute right-0 top-14 min-w-[13rem] rounded-[1.6rem] border px-4 py-4 shadow-lg backdrop-blur-md ${
              isOverLightSection
                ? "border-[#9b7a2b]/18 bg-background"
                : "border-white/15 bg-black/45"
            }`}
          >
            <div className={`flex flex-col gap-3 text-[0.78rem] tracking-[0.22em] ${mobileTextColor} ${lang === "ar" ? "text-right" : ""}`}>
              {orderedNavItems.map((item) => (
                <a
                  key={item.key}
                  href={item.key === "home" ? "#mobile-home" : `#${item.key}`}
                  onClick={() => setMenuOpen(false)}
                  className={`transition-colors ${mobileHoverColor}`}
                >
                  {t[item.labelKey]}
                </a>
              ))}
            </div>

            <div className={`mt-4 border-t pt-4 ${isOverLightSection ? "border-[#9b7a2b]/20" : "border-white/15"}`} data-lang-menu="true">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-2 text-[0.72rem] tracking-[0.22em] transition-colors ${mobileTextColor}`}
              >
                <span className="h-4 w-6 overflow-hidden rounded-sm">{flagForLang(lang)}</span>
                {langShort[lang]}
                <ChevronDown size={14} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="mt-3 space-y-1">
                  {allLangs.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setLang(option);
                        setLangOpen(false);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-[0.72rem] tracking-[0.18em] transition-colors ${
                        option === lang
                          ? isOverLightSection
                            ? "text-[#9b7a2b]"
                            : "text-white"
                          : isOverLightSection
                            ? "text-foreground/75 hover:bg-black/5"
                            : "text-white/75 hover:bg-white/10"
                      }`}
                    >
                      <span className="h-4 w-6 overflow-hidden rounded-sm">{flagForLang(option)}</span>
                      {langShort[option]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const LangDropdown = ({
  lang, setLang, open, setOpen, variant,
}: {
  lang: Lang; setLang: (l: Lang) => void; open: boolean; setOpen: (o: boolean) => void; variant: "cover" | "compact";
}) => {
  if (variant === "cover") {
    return (
      <div className="relative" data-lang-menu="true">
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          className="flex w-full items-center gap-2 rounded-lg bg-white px-6 py-2 font-serif text-sm tracking-widest text-foreground shadow-sm"
        >
          <div className="pointer-events-none h-5 w-7 overflow-hidden rounded-sm">{flagForLang(lang)}</div>
          <span className="inline-block w-[12ch] text-left">{langLabel[lang]}</span>
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute left-1/2 -translate-x-1/2 top-12 flex flex-col gap-1 rounded-xl bg-white p-1.5 shadow-lg min-w-[170px]">
            {allLangs.map((l) => (
              <button
                key={l}
                onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left font-serif text-sm tracking-wide transition-colors ${lang === l ? "bg-black text-white" : "text-foreground hover:bg-black hover:text-white"}`}
              >
                <div className="pointer-events-none h-6 w-6 overflow-hidden rounded-full border border-white">{flagForLang(l)}</div>
                {langLabel[l]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // compact variant
  return (
    <div data-lang-menu="true">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-full bg-background/90 px-4 py-2 font-serif text-sm tracking-widest text-foreground shadow-md backdrop-blur-sm"
      >
        <div className="pointer-events-none h-5 w-7 overflow-hidden rounded-sm">{flagForLang(lang)}</div>
        {langShort[lang]}
      </button>
      {open && (
        <div className="absolute left-0 top-14 flex flex-col gap-1 rounded-xl bg-background/95 p-2 shadow-lg backdrop-blur-sm">
          {allLangs.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-5 py-3 text-left font-serif text-base tracking-wide transition-colors ${lang === l ? "bg-black text-white" : "text-foreground hover:bg-black hover:text-white"}`}
            >
              <div className="pointer-events-none h-8 w-8 overflow-hidden rounded-full border border-white">{flagForLang(l)}</div>
              {langFull[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const timeLeft = useCountdown(WEDDING_DATE);
  const [lang, setLang] = useState<Lang>("en");
  const [desktopCoverLangOpen, setDesktopCoverLangOpen] = useState(false);
  const [desktopCompactLangOpen, setDesktopCompactLangOpen] = useState(false);
  const [mobileCoverLangOpen, setMobileCoverLangOpen] = useState(false);
  const [mobileCompactLangOpen, setMobileCompactLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  const t = translations[lang];

  useEffect(() => {
    if (!isCardOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isCardOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest("[data-lang-menu='true']")) {
        setDesktopCoverLangOpen(false);
        setDesktopCompactLangOpen(false);
        setMobileCoverLangOpen(false);
        setMobileCompactLangOpen(false);
        setMobileLangOpen(false);
      }
      if (!target?.closest("[data-mobile-menu='true']")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideshowIndex((current) => (current + 1) % HERO_PHOTOS.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===== DESKTOP (lg+): 3D Card Layout ===== */}
      <div className="hidden lg:block relative w-full h-screen overflow-hidden" style={{ perspective: "2500px" }}>
        {/* Left Side - Photo (always visible underneath the cover) */}
        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
          <HeroSlideshow
            activeIndex={slideshowIndex}
            imageClassName="absolute inset-0 h-full w-full object-cover scale-[1.03] object-center origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        </div>

        {/* Right Side - Details content (always visible underneath grey backing) */}
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-y-auto bg-background px-8">
          <img src={floralTop} alt="" className="pointer-events-none absolute -top-6 right-0 lg:w-[20rem] opacity-80" />
          <img src={floralBottom} alt="" className="pointer-events-none absolute -bottom-4 -left-4 lg:w-72 opacity-90" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col px-6 pb-8 pt-20">
            <InvitationNav lang={lang} activeSection={activeSection} setActiveSection={setActiveSection} />

            {activeSection === "home" && (
            <div className="flex flex-col items-center pt-16 text-center">
            <img src={weddingRings} alt="Wedding rings" className="mb-6 w-16 h-auto" />
            <p className="font-serif text-base tracking-[0.2em] text-muted-foreground" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              {invitedText[lang]}
            </p>

            <div className="w-56 md:w-72">
              <LogoMark className="aspect-square w-full" />
            </div>

            <p className="mt-4 font-serif text-lg tracking-widest text-foreground">
              {t.date}
            </p>

            <p className="mt-3 font-serif text-lg tracking-widest text-foreground">
              {t.deadlineDate}
            </p>

            <div className="mt-6 flex gap-4 font-serif text-base tracking-wider text-muted-foreground">
              <span>{timeLeft.days} {t.days}</span>
              <span>{timeLeft.hours} {t.hrs}</span>
              <span>{timeLeft.minutes} {t.min}</span>
              <span>{timeLeft.seconds} {t.sec}</span>
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="https://luma.com/9x6q8qjr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black px-12 py-3 font-serif text-sm font-semibold tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-background"
              >
                {t.rsvp}
              </a>
            </div>
            </div>
            )}

            {activeSection !== "home" && (
              <div className={`mt-10 w-full pt-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
                <WeddingDetails lang={lang} activeSection={activeSection} />
              </div>
            )}
          </div>
        </div>

        {/* Grey backing over left side, hides when card is fully open */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full z-10 bg-black flex items-center justify-center"
          style={{
            opacity: isCardOpen ? 0 : 1,
            pointerEvents: isCardOpen ? "none" : "auto",
            transition: isCardOpen ? "opacity 0.01s ease 1.6s" : "opacity 0.01s ease 0s",
          }}
        >
          <div className="max-w-md px-8 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
            {lang === 'ar' && (
              <p className="font-serif text-2xl italic leading-relaxed text-white/80 mb-6">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            )}
            <p className="font-serif text-3xl italic leading-relaxed text-white/80 whitespace-pre-line">
              {quoteText[lang]}
            </p>
          </div>
        </div>

        {/* Right Side - Flipping Cover Panel (covers the details when closed, swings left to reveal) */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full z-20"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
            transition: "transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isCardOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face: Card Cover (visible when card is closed) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#F7F5F2", backfaceVisibility: "hidden" }}
          >
            <div className="absolute right-8 top-8 z-10">
              <LangDropdown
                lang={lang}
                setLang={setLang}
                open={desktopCoverLangOpen}
                setOpen={setDesktopCoverLangOpen}
                variant="cover"
              />
            </div>
            <div className="flex flex-col items-center gap-8 scale-95">
              <img src={weddingRings} alt="Wedding rings" className="w-20 h-auto" />
               <div className="mb-8"></div>
               <h2 className={`${lang === 'ar' ? 'font-script-ar' : 'font-script'} text-5xl text-foreground flex gap-4`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
                {coverHeading[lang].map((w, i) => <span key={i}>{w}</span>)}
              </h2>
               <p className="max-w-sm font-serif text-xl text-foreground/80 text-center leading-relaxed pt-4" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
                {coverText1[lang]}
               </p>
               <p className="max-w-sm font-serif text-xl text-foreground/80 text-center leading-relaxed pb-4" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
                {coverText2[lang]}
               </p>
              <button
                onClick={() => setIsCardOpen(true)}
                className="border-2 border-black px-10 py-5 font-serif text-sm font-semibold tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-background"
              >
                {t.openCard}
              </button>
            </div>
          </div>

          {/* Back face: couple photo (revealed as card flips open) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <HeroSlideshow
              activeIndex={slideshowIndex}
              imageClassName="absolute inset-0 h-full w-full object-cover scale-[1.03] object-center origin-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {isCardOpen && (
          <div className="absolute left-6 top-6 z-30">
            <LangDropdown
              lang={lang}
              setLang={setLang}
              open={desktopCompactLangOpen}
              setOpen={setDesktopCompactLangOpen}
              variant="compact"
            />
          </div>
        )}
      </div>

      {/* ===== MOBILE / TABLET: Cover + Normal Layout ===== */}
      {/* Mobile Cover - 3D card flip */}
      <div
        className="lg:hidden fixed inset-0 z-50"
        style={{
          perspective: "2000px",
          pointerEvents: isCardOpen ? "none" : "auto",
        }}
      >
         <div
           className="absolute inset-0 flex flex-col items-center justify-center pb-16"
           style={{
             backgroundColor: "#F7F5F2",
             transformStyle: "preserve-3d",
             transformOrigin: "left center",
             transition: "transform 2s cubic-bezier(0.4, 0, 0.2, 1)",
             transform: isCardOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
             backfaceVisibility: "hidden",
           }}
         >
           <div className="absolute right-5 top-5 z-10 min-[700px]:right-8 min-[700px]:top-8">
             <LangDropdown
               lang={lang}
               setLang={setLang}
               open={mobileCoverLangOpen}
               setOpen={setMobileCoverLangOpen}
               variant="cover"
             />
           </div>
           <div className="flex flex-col items-center gap-4 md:gap-8 px-6 max-w-[320px] min-[700px]:max-w-none min-[700px]:scale-95">
             <img src={weddingRings} alt="Wedding rings" className="w-14 min-[700px]:w-20 h-auto" />
             <div className="mb-4 min-[700px]:mb-8"></div>
             <h2 className={`${lang === 'ar' ? 'font-script-ar' : 'font-script'} text-4xl min-[700px]:text-5xl text-foreground flex gap-3 min-[700px]:gap-4`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
               {coverHeading[lang].map((w, i) => <span key={i}>{w}</span>)}
             </h2>
             <p className="max-w-xs min-[700px]:max-w-sm font-serif text-base min-[700px]:text-xl text-foreground/80 text-center leading-relaxed pt-6 min-[700px]:pt-3" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
               {coverText1[lang]}
             </p>
             <p className="max-w-xs min-[700px]:max-w-sm font-serif text-base min-[700px]:text-xl text-foreground/80 text-center leading-relaxed pb-6 min-[700px]:pb-3" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
               {coverText2[lang]}
             </p>
             <button
               onClick={() => setIsCardOpen(true)}
               className="border-2 border-black px-8 min-[700px]:px-10 py-4 min-[700px]:py-5 font-serif text-xs min-[700px]:text-sm font-semibold tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-background"
             >
               {t.openCard}
             </button>
           </div>
           {/* Back face of mobile/tablet cover - language selector */}
           <div
             className="absolute inset-0"
             style={{
               backfaceVisibility: "hidden",
               transform: "rotateY(180deg)",
             }}
           >
             {/* Language selector on back face */}
             <div className="absolute left-4 top-4 z-20">
               <LangDropdown
                 lang={lang}
                 setLang={setLang}
                 open={mobileCompactLangOpen}
                 setOpen={setMobileCompactLangOpen}
                 variant="compact"
               />
             </div>
           </div>
         </div>
       </div>

      {/* Mobile/Tablet Main Content (underneath cover) */}
      <div className="lg:hidden flex min-h-screen flex-col">
        {/* Photo */}
        <div id="mobile-home" className="relative w-full min-h-[60vh] overflow-hidden">
          <HeroSlideshow
            activeIndex={slideshowIndex}
            imageClassName="absolute inset-0 h-full w-full object-cover scale-[1.02] md:scale-[1.04] object-[center_12%] md:object-[center_16%] origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <MobileAnchorNav
            lang={lang}
            setLang={setLang}
            langOpen={mobileLangOpen}
            setLangOpen={setMobileLangOpen}
            menuOpen={mobileMenuOpen}
            setMenuOpen={setMobileMenuOpen}
          />

        </div>

        {/* Details */}
        <div className="relative flex w-full flex-col items-center justify-center min-[700px]:max-[1023px]:justify-start bg-background px-5 py-10 overflow-hidden sm:px-6 md:px-8 md:py-16">
          <img src={floralTop} alt="" className="pointer-events-none absolute right-0 top-0 w-[8rem] opacity-70 min-[700px]:max-[1023px]:w-[12rem]" />
          <img src={floralBottom} alt="" className="pointer-events-none absolute -bottom-4 min-[700px]:max-[1023px]:-bottom-1 -left-4 w-40 min-[700px]:max-[1023px]:w-[14.85rem] opacity-90" />

          <div className="relative z-10 flex w-full max-w-3xl flex-col">
            <div className="flex flex-col items-center pt-12 text-center">
            <p className="font-serif text-sm tracking-[0.2em] text-muted-foreground md:text-base" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              {invitedText[lang]}
            </p>

            <div className="w-44 sm:w-52 md:w-60">
              <LogoMark className="aspect-square w-full" />
            </div>

            <p className="mt-4 font-serif text-lg tracking-widest text-foreground">
              {t.date}
            </p>

            <p className="mt-3 font-serif text-lg tracking-widest text-foreground">
              {t.deadlineDate}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4 font-serif text-base tracking-wider text-muted-foreground">
              <span>{timeLeft.days} {t.days}</span>
              <span>{timeLeft.hours} {t.hrs}</span>
              <span>{timeLeft.minutes} {t.min}</span>
              <span>{timeLeft.seconds} {t.sec}</span>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <a
                href="https://luma.com/9x6q8qjr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block max-w-full border-2 border-black px-8 py-3 text-center font-serif text-sm font-semibold tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-background sm:px-12"
              >
                {t.rsvp}
              </a>
            </div>
            </div>

            <div className={`mt-8 w-full border-t border-border/60 pt-8 ${lang === "ar" ? "text-right" : "text-left"}`}>
              <WeddingDetails lang={lang} showAll />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
