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
    home: "Über uns",
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
const langTiny: Record<Lang, string> = { de: "DEU", en: "ENG", ar: "ARB" };
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
        "linear-gradient(135deg, #ef9aaa 0%, #e9879e 22%, #f0c46f 50%, #9fc9bc 74%, #5fa7b0 100%)",
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
      <div className={`${mobilePinned ? "flex min-w-max gap-5 overflow-x-auto whitespace-nowrap text-[0.72rem]" : `flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[0.7rem] md:text-sm lg:gap-x-6 lg:text-[0.86rem] xl:text-[0.94rem] md:justify-start ${lang === "ar" ? "md:pl-56" : ""}`} tracking-[0.22em] text-foreground/55 md:tracking-[0.2em]`}>
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
  const mobileTextColor = isOverLightSection ? "text-black" : "text-white/90";
  const mobileHoverColor = isOverLightSection ? "hover:text-black" : "hover:text-white";
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
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            isOverLightSection
              ? "bg-background text-black shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              : `${mobileTextColor} ${mobileHoverColor} bg-black/20 backdrop-blur-md`
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        {menuOpen && (
          <div
            className={`absolute right-0 top-16 min-w-[16rem] rounded-[1.75rem] border px-5 py-5 shadow-lg backdrop-blur-md ${
              isOverLightSection
                ? "border-black/10 bg-background"
                : "border-white/20 bg-black/72"
            }`}
          >
            <div className={`flex flex-col gap-4 text-[1.02rem] tracking-[0.14em] ${mobileTextColor} ${lang === "ar" ? "text-right" : ""}`}>
              {orderedNavItems.map((item) => (
                <a
                  key={item.key}
                  href={item.key === "home" ? "#mobile-home" : `#${item.key}`}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-2 py-2 transition-colors ${mobileHoverColor}`}
                >
                  {t[item.labelKey]}
                </a>
              ))}
            </div>

            <div className={`mt-4 border-t pt-4 ${isOverLightSection ? "border-black/10" : "border-white/15"}`} data-lang-menu="true">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-3 rounded-xl px-2 py-2 text-[1rem] tracking-[0.14em] transition-colors ${mobileTextColor}`}
              >
                <span className="h-4 w-6 overflow-hidden rounded-sm">{flagForLang(lang)}</span>
                {langShort[lang]}
                <ChevronDown size={16} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="mt-3 space-y-2">
                  {allLangs.filter((option) => option !== lang).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setLang(option);
                        setLangOpen(false);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[1rem] tracking-[0.14em] transition-colors ${
                        isOverLightSection
                          ? "text-black/80 hover:bg-black/5"
                          : "text-white/90 hover:bg-white/10"
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
  lang: Lang; setLang: (l: Lang) => void; open: boolean; setOpen: (o: boolean) => void; variant: "cover" | "compact" | "coverCompact";
}) => {
  const availableLangs = allLangs.filter((option) => option !== lang);

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
            {availableLangs.map((l) => (
              <button
                key={l}
                onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false); }}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left font-serif text-sm tracking-wide text-foreground transition-colors hover:bg-black hover:text-white"
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

  if (variant === "coverCompact") {
    return (
      <div className="relative" data-lang-menu="true">
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          className="flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 font-serif text-sm tracking-[0.18em] text-foreground shadow-sm backdrop-blur-sm"
        >
          <div className="pointer-events-none h-5 w-7 overflow-hidden rounded-sm">{flagForLang(lang)}</div>
          {langTiny[lang]}
          <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute right-0 top-12 flex min-w-[9rem] flex-col gap-1 rounded-xl bg-white p-1.5 shadow-lg">
            {availableLangs.map((l) => (
              <button
                key={l}
                onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false); }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-serif text-sm tracking-[0.14em] text-foreground transition-colors hover:bg-black hover:text-white"
              >
                <div className="pointer-events-none h-5 w-7 overflow-hidden rounded-sm">{flagForLang(l)}</div>
                {langTiny[l]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // compact variant
  return (
    <div className="relative inline-flex" data-lang-menu="true">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 font-serif text-sm tracking-widest text-foreground shadow-md backdrop-blur-sm"
      >
        <div className="pointer-events-none h-5 w-7 overflow-hidden rounded-sm">{flagForLang(lang)}</div>
        {langShort[lang]}
        <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-14 z-10 flex min-w-full flex-col gap-1 rounded-xl bg-background/95 p-2 shadow-lg backdrop-blur-sm">
          {availableLangs.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className="flex w-full items-center gap-3 rounded-lg px-5 py-3 text-left font-serif text-base tracking-wide text-foreground transition-colors hover:bg-black hover:text-white"
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
    setDesktopCoverLangOpen(false);
  }, [isCardOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest("[data-lang-menu='true']")) {
        setDesktopCoverLangOpen(false);
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
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-y-auto bg-background px-8 2xl:px-12">
          <img src={floralTop} alt="" className="pointer-events-none absolute -top-6 right-0 lg:w-[20rem] opacity-80" />

          <div className={`relative z-10 mx-auto flex max-w-3xl flex-col px-6 pt-14 xl:max-w-[44rem] 2xl:max-w-[48rem] 2xl:px-8 2xl:pt-16 ${activeSection === "home" ? "pb-20 2xl:pb-24" : "pb-44 2xl:pb-48"}`}>
            <InvitationNav lang={lang} activeSection={activeSection} setActiveSection={setActiveSection} />

            {activeSection === "home" && (
            <div className="flex min-h-[calc(100vh-10.5rem)] flex-col items-center justify-center pt-2 text-center 2xl:min-h-[calc(100vh-11rem)]">
            <p className="max-w-3xl font-serif text-[0.95rem] tracking-[0.16em] text-muted-foreground lg:text-[1rem] xl:max-w-[34rem] xl:text-[1.08rem] 2xl:text-[1.14rem]" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              {invitedText[lang]}
            </p>

            <div className="w-40 md:w-48 xl:w-[13.5rem] 2xl:w-[15rem]">
              <LogoMark className="aspect-square w-full" />
            </div>

            <p className="mt-1 font-serif text-[1.15rem] tracking-[0.1em] text-foreground lg:text-[1.28rem] xl:text-[1.38rem] 2xl:mt-2 2xl:text-[1.5rem]">
              {t.date}
            </p>

            <p className="mt-1 max-w-3xl font-serif text-[1.15rem] tracking-[0.1em] text-foreground lg:text-[1.28rem] xl:max-w-[34rem] xl:text-[1.38rem] 2xl:text-[1.5rem]">
              {t.deadlineDate}
            </p>

            <div className="mt-3 flex gap-3 font-serif text-[0.95rem] tracking-[0.08em] text-muted-foreground lg:text-[1rem] xl:text-[1.06rem] 2xl:mt-4 2xl:gap-4 2xl:text-[1.12rem]">
              <span>{timeLeft.days} {t.days}</span>
              <span>{timeLeft.hours} {t.hrs}</span>
              <span>{timeLeft.minutes} {t.min}</span>
              <span>{timeLeft.seconds} {t.sec}</span>
            </div>

            <div className="mt-5 flex gap-4 2xl:mt-6">
              <a
                href="https://luma.com/9x6q8qjr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black px-9 py-2.5 font-serif text-[0.82rem] font-semibold tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-background 2xl:px-10 2xl:py-3"
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

            <div className="pointer-events-none absolute -left-10 right-0 bottom-0 flex justify-start 2xl:-left-12">
              <img
                src={floralBottom}
                alt=""
                className={`${activeSection === "home" ? "w-64 2xl:w-72" : "w-72 2xl:w-80"} opacity-90`}
              />
            </div>
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
          <div className="max-w-md px-8 text-center xl:max-w-md 2xl:max-w-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
            {lang === 'ar' && (
              <p className="mb-5 font-serif text-[1.3rem] italic leading-relaxed text-white/80 xl:text-[1.4rem] 2xl:text-[1.55rem]">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            )}
            <p className="whitespace-pre-line font-serif text-[1.5rem] italic leading-relaxed text-white/80 xl:text-[1.72rem] 2xl:text-[1.9rem]">
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
            {!isCardOpen && (
              <div className="absolute right-8 top-8 z-10">
                <LangDropdown
                  lang={lang}
                  setLang={setLang}
                  open={desktopCoverLangOpen}
                  setOpen={setDesktopCoverLangOpen}
                  variant="cover"
                />
              </div>
            )}
            <div className="flex flex-col items-center gap-4 scale-95 2xl:gap-5">
              <img src={weddingRings} alt="Wedding rings" className="h-auto w-12 2xl:w-14" />
               <div className="mb-1"></div>
               <h2 className={`${lang === 'ar' ? 'font-script-ar' : 'font-script'} flex gap-3 text-[2.85rem] text-foreground xl:text-[3.05rem] 2xl:text-[3.3rem]`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
                {coverHeading[lang].map((w, i) => <span key={i}>{w}</span>)}
              </h2>
               <p className="max-w-sm pt-1 text-center font-serif text-[0.94rem] leading-[1.45] text-muted-foreground xl:max-w-md xl:text-[1rem] 2xl:max-w-md 2xl:text-[1.08rem]" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
                {coverText1[lang]}
               </p>
               <p className="max-w-sm pb-1 text-center font-serif text-[0.94rem] leading-[1.45] text-muted-foreground xl:max-w-md xl:text-[1rem] 2xl:max-w-md 2xl:text-[1.08rem]" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
                {coverText2[lang]}
               </p>
              <button
                onClick={() => setIsCardOpen(true)}
                className="border-2 border-black px-9 py-3.5 font-serif text-[0.88rem] font-semibold tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-background 2xl:px-10"
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
               variant="coverCompact"
             />
           </div>
           <div className="flex flex-col items-center gap-4 md:gap-8 px-6 max-w-[320px] min-[700px]:max-w-none min-[700px]:scale-95">
             <img src={weddingRings} alt="Wedding rings" className="w-14 min-[700px]:w-20 h-auto" />
             <div className="mb-4 min-[700px]:mb-8"></div>
             <h2
               className={`${lang === 'ar' ? 'font-script-ar leading-[1.3]' : 'font-script flex gap-3 min-[700px]:gap-4'} text-4xl text-foreground min-[700px]:text-5xl`}
               dir={lang === 'ar' ? 'rtl' : 'ltr'}
               lang={lang === 'ar' ? 'ar' : undefined}
             >
               {lang === "ar"
                 ? coverHeading[lang].join(" ")
                 : coverHeading[lang].map((w, i) => <span key={i}>{w}</span>)}
             </h2>
             <p className="max-w-xs min-[700px]:max-w-sm font-serif text-base min-[700px]:text-xl text-muted-foreground text-center leading-[1.45] pt-6 min-[700px]:pt-3" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
               {coverText1[lang]}
             </p>
             <p className="max-w-xs min-[700px]:max-w-sm font-serif text-base min-[700px]:text-xl text-muted-foreground text-center leading-[1.45] pb-6 min-[700px]:pb-3" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
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
        <div className="relative flex w-full flex-col items-center justify-start overflow-visible bg-background px-5 py-10 sm:px-6 md:overflow-hidden md:px-8 md:py-16">
          <img
            src={floralTop}
            alt=""
            className="pointer-events-none absolute right-0 top-0 z-20 w-[7.5rem] opacity-60 min-[700px]:w-[12rem] min-[700px]:opacity-65"
          />

          <div className="relative z-10 flex w-full max-w-3xl flex-col pb-4 md:pb-44">
            <div className="-mx-5 bg-[#fbf7f1] px-5 py-10 sm:-mx-6 sm:px-6 md:mx-0 md:bg-transparent md:px-0 md:py-0">
              <div className="flex flex-col items-center pt-2 text-center md:pt-12">
              <p className="px-4 font-serif text-base tracking-[0.16em] text-muted-foreground md:px-0 md:text-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
                {invitedText[lang]}
              </p>

              <div className="w-44 sm:w-52 md:w-60">
                <LogoMark className="aspect-square w-full" />
              </div>

              <p className="mt-4 font-serif text-xl tracking-widest text-foreground md:text-2xl">
                {t.date}
              </p>

              <p className="mt-3 font-serif text-xl tracking-widest text-foreground md:text-2xl">
                {t.deadlineDate}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-4 font-serif text-lg tracking-wider text-muted-foreground md:text-xl">
                <span>{timeLeft.days} {t.days}</span>
                <span>{timeLeft.hours} {t.hrs}</span>
                <span>{timeLeft.minutes} {t.min}</span>
                <span>{timeLeft.seconds} {t.sec}</span>
              </div>

              <div className="mt-10 flex flex-col gap-4 md:flex-row">
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
            </div>

            <div className={`mt-8 w-full border-t border-border/60 pt-0 ${lang === "ar" ? "text-right" : "text-left"} md:mt-8 md:pt-8`}>
              <WeddingDetails lang={lang} showAll />
            </div>

            <div className="pointer-events-none mt-0 -mb-12 -ml-8 flex justify-start md:hidden">
              <img src={floralBottom} alt="" className="block w-40 opacity-90" />
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden justify-start md:flex">
              <img src={floralBottom} alt="" className="opacity-90 min-[700px]:max-[1023px]:w-[14.85rem]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
