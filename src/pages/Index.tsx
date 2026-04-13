import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import WeddingDetails from "@/components/WeddingDetails";
import couplePhoto from "@/assets/couple-photo.webp";
import floralBottom from "@/assets/floral-bottom-left-watercolor.png";
import floralTop from "@/assets/floral-top-right-watercolor.png";

import useCountdown from "@/hooks/useCountdown";
import weddingRings from "@/assets/wedding-rings.png";
import tunisiaFlag from "@/assets/tunisia-flag.png";

const WEDDING_DATE = new Date("2026-07-24T14:00:00");

const translations = {
  de: {
    gettingMarried: "Wir heiraten!",
    date: "Freitag, 24. Juli 2026",
    days: "Tage",
    hrs: "Std",
    min: "Min",
    sec: "Sek",
    rsvp: "ZUSAGEN",
    moreInfo: "DETAILS",
    close: "schlie\u00DFen",
    deadlinePre: "Bitte bis",
    deadlineDate: "Mittwoch, 15. April 2026",
    deadlinePost: "Bescheid geben",
    openCard: "EINLADUNG \u00D6FFNEN",
    coverSubtitle: "Ihr seid herzlich eingeladen",
  },
  en: {
    gettingMarried: "We're getting married!",
    date: "Friday, July 24, 2026",
    days: "Days",
    hrs: "Hrs",
    min: "Min",
    sec: "Sec",
    rsvp: "RSVP",
    moreInfo: "DETAILS",
    close: "close",
    deadlinePre: "Please respond by",
    deadlineDate: "Sunday, March 22, 2026",
    deadlinePost: "",
    openCard: "OPEN INVITATION",
    coverSubtitle: "You are cordially invited",
  },
  ar: {
    gettingMarried: "ندعوكم للاحتفال بزفافنا",
    date: "\u0627\u0644\u062C\u0645\u0639\u0629\u060C 24 \u064A\u0648\u0644\u064A\u0648 2026",
    days: "\u064A\u0648\u0645",
    hrs: "\u0633\u0627\u0639\u0629",
    min: "\u062F\u0642\u064A\u0642\u0629",
    sec: "\u062B\u0627\u0646\u064A\u0629",
    rsvp: "قبول الدعوة",
    moreInfo: "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",
    close: "\u0625\u063A\u0644\u0627\u0642",
    deadlinePre: "\u064A\u0631\u062C\u0649 \u0627\u0644\u0631\u062F \u0642\u0628\u0644",
    deadlineDate: "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621\u060C 1 \u0623\u0628\u0631\u064A\u0644 2026",
    deadlinePost: "",
    openCard: "\u0627\u0641\u062A\u062D \u0627\u0644\u062F\u0639\u0648\u0629",
    coverSubtitle: "يسعدنا حضوركم",
  },
} as const;

type Lang = keyof typeof translations;

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
  de: "Ihr seid herzlich eingeladen!",
  en: "You are cordially invited!",
  ar: "يشرفنا حضوركم",
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

const allLangs: Lang[] = ["de", "en", "ar"];

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
          className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 font-serif text-sm tracking-widest text-foreground shadow-sm"
        >
          <div className="h-5 w-7 overflow-hidden rounded-sm">{flagForLang(lang)}</div>
          <span className="inline-block w-[12ch] text-left">{langLabel[lang]}</span>
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute left-1/2 -translate-x-1/2 top-12 flex flex-col gap-1 rounded-xl bg-white p-1.5 shadow-lg min-w-[170px]">
            {allLangs.map((l) => (
              <button
                key={l}
                onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false); }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-serif text-sm tracking-wide transition-colors ${lang === l ? "bg-black text-white" : "text-foreground hover:bg-black hover:text-white"}`}
              >
                <div className="h-6 w-6 overflow-hidden rounded-full border border-white">{flagForLang(l)}</div>
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
        className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 font-serif text-sm tracking-widest text-foreground shadow-md backdrop-blur-sm"
      >
        <div className="h-5 w-7 overflow-hidden rounded-sm">{flagForLang(lang)}</div>
        {langShort[lang]}
      </button>
      {open && (
        <div className="absolute left-0 top-14 flex flex-col gap-1 rounded-xl bg-background/95 p-2 shadow-lg backdrop-blur-sm">
          {allLangs.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`flex items-center gap-3 rounded-lg px-5 py-3 font-serif text-base tracking-wide transition-colors ${lang === l ? "bg-black text-white" : "text-foreground hover:bg-black hover:text-white"}`}
            >
              <div className="h-8 w-8 overflow-hidden rounded-full border border-white">{flagForLang(l)}</div>
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
  const [lang, setLang] = useState<Lang>("de");
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

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
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* ===== DESKTOP (lg+): 3D Card Layout ===== */}
      <div className="hidden lg:block relative w-full h-screen overflow-hidden" style={{ perspective: "2500px" }}>
        {/* Left Side - Photo (always visible underneath the cover) */}
        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
          <img
            src={couplePhoto}
            alt="Maisa und Amin"
            className="absolute inset-0 h-full w-full object-cover scale-[1.2] object-center origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />


          {/* Names overlay */}
          <div className={`absolute bottom-12 z-10 text-primary-foreground ${lang === 'ar' ? 'right-8 text-right' : 'left-8 text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
            <h1 className={`${lang === 'ar' ? 'font-script-ar text-6xl' : 'font-script text-7xl'} leading-tight drop-shadow-lg`}>
              {lang === 'ar' ? <>ميساء و أمين</> : <>Maisa &<br />Amin</>}
            </h1>
            <p className="mt-3 font-serif text-lg tracking-wide drop-shadow-md">
              {invitedText[lang]}
            </p>
          </div>

          {/* More Info Overlay - Desktop only */}
          {showInfo && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-[10%]" onClick={() => setShowInfo(false)}>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative w-full max-w-[700px] max-h-[900px] h-full rounded-[10px] bg-background shadow-2xl overflow-y-auto p-10" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setShowInfo(false)}
                  className="absolute top-5 right-5 flex items-center gap-4 font-serif text-2xl text-black/60 hover:text-black transition-colors"
                >
                  {t.close} <span className="leading-none">{"\u2715"}</span>
                </button>
                <WeddingDetails lang={lang} />
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Details content (always visible underneath grey backing) */}
        <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col items-center justify-center bg-background px-8 overflow-hidden">
          <img src={floralTop} alt="" className="pointer-events-none absolute -top-7 -right-8 lg:w-[24rem] opacity-90" />
          <img src={floralBottom} alt="" className="pointer-events-none absolute -bottom-4 -left-4 lg:w-72 opacity-90" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <img src={weddingRings} alt="Wedding rings" className="mb-6 w-16 h-auto" />
            <p className="mb-8 font-serif text-lg tracking-widest text-foreground" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              {t.gettingMarried}
            </p>
            <h2 className={`${lang === 'ar' ? 'font-script-ar' : 'font-script'} text-5xl text-foreground`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              {lang === 'ar' ? <>قصر نيمفنبورغ<br /><span className="mt-3 inline-block">ميونخ</span></> : <>Schloss Nymphenburg,<br /><span className="mt-3 inline-block">M{"\u00FC"}nchen</span></>}
            </h2>

            <p className="mt-4 font-serif text-lg tracking-widest text-foreground">
              {t.date}
            </p>

            <div className="mt-6 flex gap-4 font-serif text-base tracking-wider text-muted-foreground">
              <span>{timeLeft.days} {t.days}</span>
              <span>{timeLeft.hours} {t.hrs}</span>
              <span>{timeLeft.minutes} {t.min}</span>
              <span>{timeLeft.seconds} {t.sec}</span>
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="https://luma.com/q218e9h9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black px-12 py-3 font-serif text-sm font-semibold tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-background"
              >
                {t.rsvp}
              </a>
              <button
                onClick={() => setShowInfo(true)}
                className="inline-block border border-black/40 px-8 py-3 font-serif text-sm tracking-[0.3em] text-black/70 transition-colors hover:border-black hover:text-black"
              >
                {t.moreInfo}
              </button>
            </div>
            <p className="mt-4 font-serif text-lg tracking-wide text-muted-foreground">
              {t.deadlinePre}{" "}
              <span className="font-bold text-foreground">{t.deadlineDate}</span>{" "}
              {t.deadlinePost}
            </p>
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
            <div className="flex flex-col items-center gap-8 scale-95">
              <img src={weddingRings} alt="Wedding rings" className="w-20 h-auto" />
              <LangDropdown lang={lang} setLang={setLang} open={open} setOpen={setOpen} variant="cover" />
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
            <img
              src={couplePhoto}
              alt="Maisa und Amin"
              className="absolute inset-0 h-full w-full object-cover scale-[1.2] object-center origin-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Language selector on back face of card */}
            <div className="absolute left-6 top-6 z-20">
              <LangDropdown lang={lang} setLang={setLang} open={open} setOpen={setOpen} variant="compact" />
            </div>

            <div className={`absolute bottom-12 z-10 text-primary-foreground ${lang === 'ar' ? 'right-8 text-right' : 'left-8 text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              <h1 className={`${lang === 'ar' ? 'font-script-ar text-6xl' : 'font-script text-7xl'} leading-tight drop-shadow-lg`}>
                {lang === 'ar' ? <>ميساء و أمين</> : <>Maisa &<br />Amin</>}
              </h1>
              <p className="mt-3 font-serif text-lg tracking-wide drop-shadow-md">
                {invitedText[lang]}
              </p>
            </div>
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
           <div className="flex flex-col items-center gap-4 md:gap-8 px-6 max-w-[320px] min-[700px]:max-w-none min-[700px]:scale-95">
             <img src={weddingRings} alt="Wedding rings" className="w-14 min-[700px]:w-20 h-auto" />
             <LangDropdown lang={lang} setLang={setLang} open={open} setOpen={setOpen} variant="cover" />
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
               <LangDropdown lang={lang} setLang={setLang} open={open} setOpen={setOpen} variant="compact" />
             </div>
           </div>
         </div>
       </div>

      {/* Mobile/Tablet Main Content (underneath cover) */}
      <div className="lg:hidden flex min-h-screen flex-col">
        {/* Language selector - top left */}
        <div className="fixed left-4 top-4 z-40">
          <LangDropdown lang={lang} setLang={setLang} open={open} setOpen={setOpen} variant="compact" />
        </div>

        {/* Photo */}
        <div className="relative w-full min-h-[60vh] overflow-hidden">
          <img
            src={couplePhoto}
            alt="Maisa und Amin"
            className="absolute inset-0 h-full w-full object-cover scale-[1.18] md:scale-[1.2] object-[center_30%] md:object-[center_25%] origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />


          {/* Names overlay */}
          <div className={`absolute bottom-12 z-10 text-primary-foreground ${lang === 'ar' ? 'right-8 text-right' : 'left-8 text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
            <h1 className={`${lang === 'ar' ? 'font-script-ar text-4xl md:text-6xl' : 'font-script text-5xl md:text-7xl'} leading-tight drop-shadow-lg`}>
              {lang === 'ar' ? <>ميساء و أمين</> : <>Maisa &<br />Amin</>}
            </h1>
            <p className="mt-3 font-serif text-lg tracking-wide drop-shadow-md">
              {invitedText[lang]}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="relative flex w-full flex-col items-center justify-center min-[700px]:max-[1023px]:justify-start bg-background px-8 py-16 overflow-hidden">
          <img src={floralTop} alt="" className="pointer-events-none absolute -top-7 -right-8 w-[11.5rem] min-[700px]:max-[1023px]:w-[16.8rem] opacity-90" />
          <img src={floralBottom} alt="" className="pointer-events-none absolute -bottom-4 min-[700px]:max-[1023px]:-bottom-1 -left-4 w-40 min-[700px]:max-[1023px]:w-[14.85rem] opacity-90" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="mb-8 font-serif text-lg tracking-widest text-foreground" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              {t.gettingMarried}
            </p>
            <h2 className={`${lang === 'ar' ? 'font-script-ar' : 'font-script'} text-4xl md:text-5xl text-foreground`} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
              {lang === 'ar' ? <>قصر نيمفنبورغ<br /><span className="mt-3 inline-block">ميونخ</span></> : <>Schloss Nymphenburg,<br /><span className="mt-3 inline-block">M{"\u00FC"}nchen</span></>}
            </h2>

            <p className="mt-4 font-serif text-lg tracking-widest text-foreground">
              {t.date}
            </p>

            <div className="mt-6 flex gap-4 font-serif text-base tracking-wider text-muted-foreground">
              <span>{timeLeft.days} {t.days}</span>
              <span>{timeLeft.hours} {t.hrs}</span>
              <span>{timeLeft.minutes} {t.min}</span>
              <span>{timeLeft.seconds} {t.sec}</span>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <a
                href="https://luma.com/q218e9h9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black px-12 py-3 font-serif text-sm font-semibold tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-background"
              >
                {t.rsvp}
              </a>
              <button
                onClick={() => setShowInfo(true)}
                className="inline-block border border-black/40 px-8 py-3 font-serif text-sm tracking-[0.3em] text-black/70 transition-colors hover:border-black hover:text-black"
              >
                {t.moreInfo}
              </button>
            </div>
            <p className="mt-4 mb-[40px] md:mb-0 font-serif text-base md:text-lg tracking-wide text-muted-foreground min-[700px]:max-[1023px]:min-h-[5.5rem]">
              <span className="max-[1023px]:block">{t.deadlinePre}</span>{" "}
              <span className="font-bold text-foreground max-[1023px]:block">{t.deadlineDate}</span>{" "}
              <span className="max-[1023px]:block">{t.deadlinePost}</span>
            </p>
          </div>
        </div>
      </div>

      {/* More Info Modal - Mobile/Tablet */}
      {showInfo && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 min-[700px]:p-12" onClick={() => setShowInfo(false)}>
           <div className="relative w-full max-w-md min-[700px]:max-w-[600px] h-full max-h-[650px] min-[700px]:max-h-[740px] rounded-[10px] bg-background shadow-2xl overflow-y-auto p-4 min-[700px]:p-8" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 font-serif text-2xl text-black/60 hover:text-black transition-colors"
            >
              {"\u2715"}
            </button>
            <WeddingDetails lang={lang} />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
