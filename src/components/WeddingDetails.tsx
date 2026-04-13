import type { FC } from "react";

type Lang = "de" | "en" | "ar";

interface WeddingDetailsProps {
  lang: Lang;
}

const content = {
  de: {
    title: "Wir heiraten! 💍",
    intro: "Monastir, Tunesien\nDonnerstag, 3. September 2026 – Samstag, 5. September 2026",
    excitement: "Wir laden euch herzlich ein, mit uns drei unvergessliche Tage voller Liebe, Freude und Feier zu verbringen.",
    venueLabel: "Ort",
    venue: "Monastir, Tunesien",
    programLabel: "Hochzeitsprogramm",
    programNote: "(siehe unten)",
    schedule: [
      {
        emoji: "💒",
        title: "Trauung",
        time: "15:00–15:40",
        extra: "",
        desc: "Standesamtliche Trauung mit persönlichem Programm, der schönste Teil des Tages.",
      },
      {
        emoji: "🥂",
        title: "Sektempfang & Gruppenbilder",
        time: "15:40–16:35",
        extra: "",
        desc: "Wir stoßen gemeinsam im sonnigen Innenhof an und halten den Moment in Gruppenbildern fest.",
      },
      {
        emoji: "🌸",
        title: "Pause & Restaurantanfahrt",
        time: "16:35–18:00",
        desc: "Die ideale Gelegenheit für einen entspannten Spaziergang durch den wunderschönen Schlossgarten der Nymphenburg.",
      },
      {
        emoji: "🎂",
        title: "Kaffee & Abendessen",
        time: "18:00–22:00",
        desc: "Wir lassen den Tag im Kymata Modern ausklingen, einem modernen, griechischen Restaurant in München. Von der Nymphenburg aus sind es 10 Minuten mit dem Auto oder 25 Minuten zu Fuß. Es erwartet euch Kaffee & Kuchen, gefolgt von einem üppigen 3-Gänge-Menü.",
        linkText: "Route →",
        linkUrl: "https://www.google.com/maps/dir//Kymata+Modern+-+Griechisches+Restaurant+M%C3%BCnchen,+Margarethe-Danzi-Stra%C3%9Fe+25,+80639+M%C3%BCnchen/@48.1349789,11.5081216,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x479e764b9668640b:0xd88d66683bf5f7b4!2m2!1d11.4971855!2d48.146959?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D",
      },
    ],
    overnightTitle: "Übernachtung",
    overnightDesc: "Bitte informiert euch eigenständig über Übernachtungsmöglichkeiten auf Booking.com, Check24.de oder ähnlichen Plattformen und sprecht euch ggf. untereinander ab, falls ihr gemeinsam eine Ferienwohnung buchen möchtet. Bei Fragen stehen wir gern zur Verfügung.",
  },
  en: {
    title: "We're getting married! 💍",
    intro: "Monastir, Tunisia\nThursday, September 3, 2026 – Saturday, September 5, 2026",
    excitement: "We warmly invite you to celebrate with us over three unforgettable days filled with love, joy, and festivities.",
    venueLabel: "Venue",
    venue: "Monastir, Tunisia",
    programLabel: "Wedding Itinerary",
    programNote: "(see below)",
    schedule: [
      {
        emoji: "💒",
        title: "Ceremony",
        time: "15:00–15:40",
        extra: "",
        desc: "Civil ceremony with a personal programme — the most beautiful part of the day.",
      },
      {
        emoji: "🥂",
        title: "Champagne Reception & Group Photos",
        time: "15:40–16:35",
        extra: "",
        desc: "We'll toast together in the sunny courtyard and capture the moment in group photos.",
      },
      {
        emoji: "🌸",
        title: "Break & Travel to Restaurant",
        time: "16:35–18:00",
        desc: "The perfect opportunity for a relaxed stroll through the beautiful Nymphenburg Palace Gardens.",
      },
      {
        emoji: "🎂",
        title: "Coffee & Dinner",
        time: "18:00–22:00",
        desc: "We'll end the day at Kymata Modern, a modern Greek restaurant in Munich. It's 10 minutes by car or 25 minutes on foot from Nymphenburg. Expect coffee & cake followed by a lavish 3-course dinner.",
        linkText: "Route →",
        linkUrl: "https://www.google.com/maps/dir//Kymata+Modern+-+Griechisches+Restaurant+M%C3%BCnchen,+Margarethe-Danzi-Stra%C3%9Fe+25,+80639+M%C3%BCnchen/@48.1349789,11.5081216,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x479e764b9668640b:0xd88d66683bf5f7b4!2m2!1d11.4971855!2d48.146959?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D",
      },
    ],
    overnightTitle: "Accommodation",
    overnightDesc: "Please arrange your own accommodation via Booking.com, Check24.de or similar platforms. Feel free to coordinate with other guests if you'd like to book a holiday apartment together. We're happy to help with any questions.",
  },
  ar: {
    title: "سنتزوج! 💍",
    intro: "المنستير، تونس\nالخميس 3 سبتمبر 2026 – السبت 5 سبتمبر 2026",
    excitement: "يسعدنا دعوتكم للاحتفال معنا لمدة ثلاثة أيام مليئة بالحب والفرح والاحتفالات.",
    venueLabel: "المكان",
    venue: "المنستير، تونس",
    programLabel: "برنامج الزفاف",
    programNote: "(انظر أدناه)",
    schedule: [
      {
        emoji: "💒",
        title: "مراسم عقد القران",
        time: "15:00–15:40",
        extra: "",
        desc: "نبدأ احتفالنا بمراسم الزواج المدني، في لحظة مميزة نشاركها معكم لنعلن بداية فصل جديد من حياتنا.",
      },
      {
        emoji: "🥂",
        title: "الاستقبال والصور التذكارية",
        time: "15:40–16:35",
        extra: "",
        desc: "بعد المراسم ندعوكم للانضمام إلينا في الفناء للاحتفال معًا والتقاط الصور التذكارية بهذه المناسبة السعيدة.",
      },
      {
        emoji: "🌸",
        title: "استراحة قبل التوجه إلى المطعم",
        time: "16:35–18:00",
        desc: "خلال هذه الفترة يمكنكم الاستمتاع بنزهة هادئة في حدائق قصر نيمفنبورغ الساحرة.",
      },
      {
        emoji: "🎂",
        title: "القهوة والعشاء",
        time: "18:00–22:00",
        desc: "نختتم احتفالنا معكم في مطعم Kymata Modern، وهو مطعم يوناني عصري في ميونيخ، يبعد نحو 10 دقائق بالسيارة أو 25 دقيقة سيرًا على الأقدام. سنبدأ بقهوة ومرطبات، يليها عشاء مكوّن من ثلاثة أطباق، لنقضي معًا أمسية جميلة لا تُنسى.",
        linkText: "الطريق →",
        linkUrl: "https://www.google.com/maps/dir//Kymata+Modern+-+Griechisches+Restaurant+M%C3%BCnchen,+Margarethe-Danzi-Stra%C3%9Fe+25,+80639+M%C3%BCnchen/@48.1349789,11.5081216,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x479e764b9668640b:0xd88d66683bf5f7b4!2m2!1d11.4971855!2d48.146959?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D",
      },
    ],
    overnightTitle: "الإقامة",
    overnightDesc: "يرجى ترتيب إقامتكم عبر Booking.com أو Check24.de أو منصات مشابهة. يمكنكم التنسيق مع ضيوف آخرين لحجز شقة مشتركة. نحن سعداء بالمساعدة في أي أسئلة.",
  },
} as const;

const WeddingDetails: FC<WeddingDetailsProps> = ({ lang }) => {
  const c = content[lang];

  return (
    <div className="font-serif text-foreground max-w-[19rem] min-[700px]:max-w-md lg:max-w-md mx-auto flex flex-col justify-center min-h-full" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>

      {/* Programme Title */}
      <h2 className="font-script text-3xl md:text-5xl text-foreground text-center mb-6 md:mb-10 min-[700px]:mb-10 lg:mb-14">{c.programLabel}</h2>

      {/* Schedule */}
      <div className="space-y-5 md:space-y-8 min-[700px]:space-y-8">
        {c.schedule.map((item, i) => (
          <div key={i} className="text-center">
            <div className="flex items-baseline justify-center gap-2 mb-1.5">
               <h3 className="text-base md:text-lg min-[700px]:text-xl lg:text-xl font-semibold tracking-wide">
                 {item.emoji && <span className="mr-1.5">{item.emoji}</span>}{item.title}
                <span className="ml-2 font-normal text-muted-foreground">({item.time})</span>
                {item.extra && <span className="ml-1.5">{item.extra}</span>}
              </h3>
            </div>
            <p className="text-sm md:text-base min-[700px]:text-lg lg:text-lg leading-relaxed text-muted-foreground">
              {item.desc}
              {item.linkUrl && (
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1.5 underline underline-offset-2 text-foreground hover:text-foreground/70 transition-colors"
                >
                  {item.linkText}
                </a>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingDetails;
