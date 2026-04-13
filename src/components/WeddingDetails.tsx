import type { FC } from "react";

type Lang = "de" | "en" | "ar";

interface WeddingDetailsProps {
  lang: Lang;
}

const content = {
  de: {
    title: "Wir sagen Ja!",
    intro: "Ein besonderer Tag braucht besondere G\u00E4ste! Aus diesem Grund m\u00F6chten wir den sch\u00F6nsten Tag unseres Lebens gerne mit Euch verbringen.",
    excitement: "Wir freuen uns wahnsinnig auf alle und k\u00F6nnen es kaum erwarten, diesen besonderen Tag mit euch zu feiern. \u2764\uFE0F",
    venueLabel: "Ort",
    venue: "Schloss Nymphenburg \u2013 Johannissaal",
    programLabel: "Programm",
    programNote: "(siehe unten)",
    schedule: [
      {
        emoji: "\uD83D\uDC92",
        title: "Trauung",
        time: "15:00\u201315:40",
        extra: "",
        desc: "Standesamtliche Trauung mit pers\u00F6nlichem Programm, der sch\u00F6nste Teil des Tages.",
      },
      {
        emoji: "\uD83E\uDD42",
        title: "Sektempfang & Gruppenbilder",
        time: "15:40\u201316:35",
        extra: "",
        desc: "Wir sto\u00DFen gemeinsam im sonnigen Innenhof an und halten den Moment in Gruppenbildern fest.",
      },
      {
        emoji: "\uD83C\uDF38",
        title: "Pause & Restaurantanfahrt",
        time: "16:35\u201318:00",
        desc: "Die ideale Gelegenheit f\u00FCr einen entspannten Spaziergang durch den wundersch\u00F6nen Schlossgarten der Nymphenburg.",
      },
      {
        emoji: "\uD83C\uDF82",
        title: "Kaffee & Abendessen",
        time: "18:00\u201322:00",
        desc: "Wir lassen den Tag im Kymata Modern ausklingen, einem modernen, griechischen Restaurant in M\u00FCnchen. Von der Nymphenburg aus sind es 10 Minuten mit dem Auto oder 25 Minuten zu Fu\u00DF. Es erwartet euch Kaffee & Kuchen, gefolgt von einem \u00FCppigen 3-G\u00E4nge-Men\u00FC.",
        linkText: "Route \u2192",
        linkUrl: "https://www.google.com/maps/dir//Kymata+Modern+-+Griechisches+Restaurant+M%C3%BCnchen,+Margarethe-Danzi-Stra%C3%9Fe+25,+80639+M%C3%BCnchen/@48.1349789,11.5081216,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x479e764b9668640b:0xd88d66683bf5f7b4!2m2!1d11.4971855!2d48.146959?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D",
      },
    ],
    overnightTitle: "\u00DCbernachtung",
    overnightDesc: "Bitte informiert euch eigenst\u00E4ndig \u00FCber \u00DCbernachtungsm\u00F6glichkeiten auf Booking.com, Check24.de oder \u00E4hnlichen Plattformen und sprecht euch ggf. untereinander ab, falls ihr gemeinsam eine Ferienwohnung buchen m\u00F6chtet. Bei Fragen stehen wir gern zur Verf\u00FCgung.",
  },
  en: {
    title: "We're saying Yes!",
    intro: "A special day calls for special guests! That\u2019s why we\u2019d love to share the most beautiful day of our lives with you.",
    excitement: "We are incredibly excited to see everyone and can\u2019t wait to celebrate this special day with you. \u2764\uFE0F",
    venueLabel: "Venue",
    venue: "Schloss Nymphenburg \u2013 Johannissaal",
    programLabel: "Programme",
    programNote: "(see below)",
    schedule: [
      {
        emoji: "\uD83D\uDC92",
        title: "Ceremony",
        time: "15:00\u201315:40",
        extra: "",
        desc: "Civil ceremony with a personal programme \u2014 the most beautiful part of the day.",
      },
      {
        emoji: "\uD83E\uDD42",
        title: "Champagne Reception & Group Photos",
        time: "15:40\u201316:35",
        extra: "",
        desc: "We\u2019ll toast together in the sunny courtyard and capture the moment in group photos.",
      },
      {
        emoji: "\uD83C\uDF38",
        title: "Break & Travel to Restaurant",
        time: "16:35\u201318:00",
        desc: "The perfect opportunity for a relaxed stroll through the beautiful Nymphenburg Palace Gardens.",
      },
      {
        emoji: "\uD83C\uDF82",
        title: "Coffee & Dinner",
        time: "18:00\u201322:00",
        desc: "We\u2019ll end the day at Kymata Modern, a modern Greek restaurant in Munich. It\u2019s 10 minutes by car or 25 minutes on foot from Nymphenburg. Expect coffee & cake followed by a lavish 3-course dinner.",
        linkText: "Route \u2192",
        linkUrl: "https://www.google.com/maps/dir//Kymata+Modern+-+Griechisches+Restaurant+M%C3%BCnchen,+Margarethe-Danzi-Stra%C3%9Fe+25,+80639+M%C3%BCnchen/@48.1349789,11.5081216,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x479e764b9668640b:0xd88d66683bf5f7b4!2m2!1d11.4971855!2d48.146959?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D",
      },
    ],
    overnightTitle: "Accommodation",
    overnightDesc: "Please arrange your own accommodation via Booking.com, Check24.de or similar platforms. Feel free to coordinate with other guests if you\u2019d like to book a holiday apartment together. We\u2019re happy to help with any questions.",
  },
  ar: {
    title: "نقول نعم!",
    intro: "يوم مميز يحتاج ضيوفًا مميزين! لذلك نودّ أن نشارككم أجمل يوم في حياتنا.",
    excitement: "نحن متحمسون جدًا لرؤيتكم ولا نستطيع الانتظار للاحتفال بهذا اليوم المميز معكم. ❤️",
    venueLabel: "المكان",
    venue: "Schloss Nymphenburg \u2013 Johannissaal",
    programLabel: "البرنامج",
    programNote: "(انظر أدناه)",
    schedule: [
      {
        emoji: "\uD83D\uDC92",
        title: "مراسم عقد القران",
        time: "15:00\u201315:40",
        extra: "",
        desc: "نبدأ احتفالنا بمراسم الزواج المدني، في لحظة مميزة نشاركها معكم لنعلن بداية فصل جديد من حياتنا.",
      },
      {
        emoji: "\uD83E\uDD42",
        title: "الاستقبال والصور التذكارية",
        time: "15:40\u201316:35",
        extra: "",
        desc: "بعد المراسم ندعوكم للانضمام إلينا في الفناء للاحتفال معًا والتقاط الصور التذكارية بهذه المناسبة السعيدة.",
      },
      {
        emoji: "\uD83C\uDF38",
        title: "استراحة قبل التوجه إلى المطعم",
        time: "16:35\u201318:00",
        desc: "خلال هذه الفترة يمكنكم الاستمتاع بنزهة هادئة في حدائق قصر نيمفنبورغ الساحرة.",
      },
      {
        emoji: "\uD83C\uDF82",
        title: "القهوة والعشاء",
        time: "18:00\u201322:00",
        desc: "نختتم احتفالنا معكم في مطعم Kymata Modern، وهو مطعم يوناني عصري في ميونيخ، يبعد نحو 10 دقائق بالسيارة أو 25 دقيقة سيرًا على الأقدام. سنبدأ بقهوة ومرطبات، يليها عشاء مكوّن من ثلاثة أطباق، لنقضي معًا أمسية جميلة لا تُنسى.",
        linkText: "الطريق \u2192",
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
