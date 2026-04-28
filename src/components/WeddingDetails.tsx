import type { FC } from "react";
import { Flower2, Heart, House, Plane, UtensilsCrossed } from "lucide-react";
import mehndiIcon from "@/assets/mehndi.webp";

type Lang = "de" | "en" | "ar";
type SectionId = "story" | "details" | "travel" | "activities";

interface WeddingDetailsProps {
  lang: Lang;
  activeSection?: SectionId;
  showAll?: boolean;
}

interface ItineraryEntry {
  date: string;
  time: string;
  title: string;
  location: string;
  description: string;
  dressCode: string;
  icon: "dinner" | "henna" | "wedding";
}

interface TravelBlock {
  title: string;
  icon: "travel" | "stay";
  lines: string[];
}

interface ActivityBlock {
  title: string;
  emoji: string;
  lines: string[];
}

const content = {
  de: {
    sections: [
      {
        id: "story",
        title: "Unsere Geschichte",
        body: [
          "Wir haben uns vor etwa vier Jahren bei der Arbeit kennengelernt, im selben Projekt. Was mit langen Meetings, gemeinsamen Deadlines und vielen lustigen Gespraechen und Seitenkommentaren begann, wurde langsam zu etwas mehr.",
          "Als das Projekt endete, gingen wir zunaechst wieder getrennte Wege. Bis das Leben uns wieder zusammenfuehrte.",
          "Diesmal fuehlte es sich anders an. Aus einem einfachen Wiedersehen wurde schnell etwas, das wir nicht mehr loslassen wollten. Seitdem sind wir unzertrennlich und bauen uns ein Leben voller Liebe, Lachen und gemeinsamer Momente auf.",
          "Letzten Dezember begleitete uns ein Adventskalender voller Erinnerungen an unseren gemeinsamen Weg durch die Vorweihnachtszeit. Hinter jedem Tuerchen steckte eine Erinnerung. Manche suess, manche lustig, manche ein kleines bisschen peinlich. Tag fuer Tag erzaehlte er leise unsere Geschichte, auf eine Art, die nur fuer uns Sinn ergab.",
          "Und an Heiligabend, unter dem Weihnachtsbaum, kam der Antrag.",
          "Wir haben Ja gesagt.",
          "Was einmal als \"nur ein Projekt\" begann, wurde zu etwas viel Groesserem. Jetzt ist unsere Hochzeit das Projekt, das wir gemeinsam aufbauen, und erst der Anfang von allem, was noch vor uns liegt.",
        ],
      },
      {
        id: "details",
        title: "Hochzeitsablauf",
        intro:
          "Wir freuen uns sehr, diese besondere Zeit mit euch zu feiern. Es bedeutet uns viel, euch im September bei uns zu haben, wenn wir dieses neue Kapitel beginnen. So sieht unser Wochenende aus:",
        itinerary: [
          {
            date: "3. September",
            time: "20:00",
            title: "Welcome Dinner",
            location: "Bei Maisas Eltern",
            description:
              "Ein entspannter Abend zu Hause mit gutem Essen, Gesprächen und Zeit, gemeinsam anzukommen.",
            dressCode: "Smart casual",
            icon: "dinner",
          },
          {
            date: "4. September",
            time: "21:00",
            title: "Henna Nacht",
            location: "Ennour Palace, Jemmal",
            description:
              "Ein freudiger Abend voller Tradition, Musik und Tanz, an dem wir diesen besonderen Moment feiern.",
            dressCode: "Traditionell tunesisch (bevorzugt) oder festliche Kleidung",
            icon: "henna",
          },
          {
            date: "5. September",
            time: "21:00",
            title: "Hochzeitsfeier",
            location: "Salle des Fetes Om Ezzine, Jemmal",
            description:
              "Unsere grosse Feier, voller Liebe, Musik und ganz viel Tanz.",
            dressCode: "Formal / Elegant",
            icon: "wedding",
          },
        ] as ItineraryEntry[],
        note:
          "PS: Eure Anwesenheit bedeutet uns alles. Ob ihr bei einem Programmpunkt\noder das ganze Wochenende dabei seid, wir freuen uns von Herzen, euch dort zu haben.",
      },
      {
        id: "travel",
        title: "Anreise",
        travelBlocks: [
          {
            title: "So kommt ihr hin",
            icon: "travel",
            lines: [
              "Monastir ist gut ueber den Flughafen Monastir erreichbar. Ihr koennt auch nach Tunis fliegen und von dort nach Monastir weiterreisen, gern auch abgestimmt mit anderen Gaesten.",
              "Sobald eure Reiseplaene feststehen, helfen wir euch gern bei Transfers oder Mitfahrgelegenheiten.",
            ],
          },
          {
            title: "Wo ihr uebernachten koennt",
            icon: "stay",
            lines: [
              "Wir empfehlen eine Unterkunft in einer der folgenden Regionen: Monastir (ca. 30 Minuten von den Locations entfernt), Sousse (ca. 1 Stunde entfernt) oder Mahdia (ca. 1 Stunde entfernt).",
              "Monastir ist die praktischste Option, waehrend Sousse und Mahdia ideal sind, wenn ihr euren Aufenthalt etwas verlaengern moechtet.",
              "Wenn ihr Hilfe bei der Auswahl oder bei der Abstimmung mit anderen Gaesten braucht, meldet euch jederzeit gern 💛",
            ],
          },
        ] as TravelBlock[],
      },
      {
        id: "activities",
        title: "Freizeit",
        activityBlocks: [
          {
            title: "Monastir",
            emoji: "⚓",
            lines: [
              "Besucht den Ribat von Monastir, das Mausoleum von Habib Bourguiba und macht einen Spaziergang entlang der Marina.",
            ],
          },
          {
            title: "Mahdia",
            emoji: "🌊",
            lines: [
              "Spaziert durch die Altstadt, besucht Skifa el Kahla und lauft entlang des Friedhofs am Meer.",
            ],
          },
          {
            title: "Sousse",
            emoji: "🏛️",
            lines: [
              "Entdeckt die Medina von Sousse, besucht das Archaeologische Museum und schlendert durch Port El Kantaoui.",
            ],
          },
          {
            title: "Kairouan",
            emoji: "🕌",
            lines: [
              "Besucht die Grosse Moschee von Kairouan und die Aghlabiden-Becken.",
            ],
          },
          {
            title: "Sidi Bou Said",
            emoji: "💙",
            lines: [
              "Spaziert durch die blau-weissen Gassen, haltet im Cafe des Delices und geniesst den Blick aufs Meer.",
            ],
          },
          {
            title: "El Djem",
            emoji: "🏟️",
            lines: [
              "Besucht das Amphitheater von El Djem.",
            ],
          },
          {
            title: "Tunis",
            emoji: "✨",
            lines: [
              "Erkundet die Medina, besucht das Bardo Nationalmuseum und entdeckt die Ruinen von Karthago sowie das Karthago-Nationalmuseum.",
            ],
          },
          {
            title: "Tozeur",
            emoji: "🌴",
            lines: [
              "Entdeckt die Oase, spaziert durch die Palmenhaine und macht einen Ausflug Richtung Sahara.",
            ],
          },
        ] as ActivityBlock[],
      },
    ],
  },
  en: {
    sections: [
      {
        id: "story",
        title: "Our Story",
        body: [
          "We met about four years ago at work, assigned to the same project. What started with long meetings, shared deadlines, and a lot of fun chats and side comments slowly turned into something more.",
          "When the project ended, we went our separate ways. Until life brought us back together.",
          "This time, things felt different. What began as catching up quickly became something we didn’t want to stop. Since then, we’ve been inseparable, building a life filled with love, laughter, and shared moments.",
          "Last December, an advent calendar filled with memories of our journey marked the days leading up to Christmas. Behind each door was a memory. Some sweet, some funny, some slightly embarrassing. Day by day, it quietly told our story in a way that only made sense to us.",
          "And on Christmas Eve, under the tree, came the proposal.",
          "We said yes.",
          "What once started as “just a project” turned into something much bigger. Now, our wedding is the project we’re building together, and just the beginning of everything that’s still to come.",
        ],
      },
      {
        id: "details",
        title: "Wedding Itinerary",
        itinerary: [
          {
            date: "September 3rd",
            time: "20:00",
            title: "Welcome Dinner",
            location: "Maisa’s Parents’ Home",
            description:
              "A relaxed evening at home with good food, conversation, and time to settle in together.",
            dressCode: "Smart casual",
            icon: "dinner",
          },
          {
            date: "September 4th",
            time: "21:00",
            title: "Henna Night",
            location: "Ennour Palace, Jemmal",
            description:
              "A joyful night of tradition, music, and dancing.",
            dressCode: "Traditional Tunisian (preferred) or festive attire",
            icon: "henna",
          },
          {
            date: "September 5th",
            time: "21:00",
            title: "Wedding Celebration",
            location: "Salle des Fetes Om Ezzine, Jemmal",
            description:
              "Our main celebration, filled with love, music, and lots of dancing.",
            dressCode: "Formal / Elegant",
            icon: "wedding",
          },
        ] as ItineraryEntry[],
        note:
          "PS: Your presence means everything to us. Whether you’re joining for one event \nor the whole weekend, we’re simply so happy to have you there.",
      },
      {
        id: "travel",
        title: "Getting There",
        travelBlocks: [
          {
            title: "How to Get There",
            icon: "travel",
            lines: [
              "Monastir is easy to reach via Monastir Airport. You can also fly into Tunis and continue on to Monastir, coordinating travel with other guests if you wish.",
              "Once your plans are set, we’re happy to help with transfer options or shared rides.",
            ],
          },
          {
            title: "Where to Stay",
            icon: "stay",
            lines: [
              "We recommend staying in one of the following areas: Monastir (about 30 minutes from the venues), Sousse (about 1 hour away), or Mahdia (about 1 hour away).",
              "Monastir is the most convenient option, while Sousse and Mahdia are great if you’d like to extend your stay.",
              "If you need any help choosing or coordinating with other guests, feel free to reach out 💛",
            ],
          },
        ] as TravelBlock[],
      },
      {
        id: "activities",
        title: "Things to Do",
        activityBlocks: [
          {
            title: "Monastir",
            emoji: "⚓",
            lines: [
              "Visit the Ribat of Monastir, see the Mausoleum of Habib Bourguiba, and walk along the marina.",
            ],
          },
          {
            title: "Mahdia",
            emoji: "🌊",
            lines: [
              "Walk through the old town, visit the Skifa el Kahla, and stroll along the seaside cemetery.",
            ],
          },
          {
            title: "Sousse",
            emoji: "🏛️",
            lines: [
              "Explore the Medina of Sousse, visit the Sousse Archaeological Museum, and stroll through Port El Kantaoui.",
            ],
          },
          {
            title: "Kairouan",
            emoji: "🕌",
            lines: [
              "Visit the Great Mosque of Kairouan and the Aghlabid Basins.",
            ],
          },
          {
            title: "Sidi Bou Said",
            emoji: "💙",
            lines: [
              "Wander the blue-and-white streets, stop by Cafe des Delices, and enjoy the sea views.",
            ],
          },
          {
            title: "El Djem",
            emoji: "🏟️",
            lines: [
              "Visit the El Djem Amphitheatre.",
            ],
          },
          {
            title: "Tunis",
            emoji: "✨",
            lines: [
              "Explore the medina, visit the Bardo National Museum, and discover the ruins of Carthage and the Carthage National Museum.",
            ],
          },
          {
            title: "Tozeur",
            emoji: "🌴",
            lines: [
              "Explore the oasis, walk through the palm groves, and take a trip toward the Sahara Desert.",
            ],
          },
        ] as ActivityBlock[],
      },
    ],
  },
  ar: {
    sections: [
      {
        id: "story",
        title: "قصتنا",
        body: [
          "التقينا قبل حوالي أربع سنوات في العمل، وكنا مكلّفين بالمشروع نفسه. ما بدأ باجتماعات طويلة ومواعيد نهائية مشتركة وكثير من الأحاديث الجانبية اللطيفة تحوّل ببطء إلى شيء أكبر.",
          "وعندما انتهى المشروع، ذهب كل منا في طريقه. إلى أن أعادتنا الحياة إلى بعضنا من جديد.",
          "هذه المرة كان الأمر مختلفاً. ما بدأ على شكل لقاء للاطمئنان على الأحوال أصبح سريعاً شيئاً لم نرغب في أن يتوقف. ومنذ ذلك الحين، أصبحنا لا نفترق، نبني حياة مليئة بالحب والضحك واللحظات المشتركة.",
          "في ديسمبر الماضي، رافقنا تقويم Advent مليء بذكريات رحلتنا معاً خلال الأيام التي سبقت عيد الميلاد. خلف كل نافذة كانت هناك ذكرى. بعضها لطيف، بعضها مضحك، وبعضها محرج قليلاً. يوماً بعد يوم، كان يروي قصتنا بهدوء بطريقة لا يفهمها إلا نحن.",
          "وفي ليلة عيد الميلاد، تحت الشجرة، جاء طلب الزواج.",
          "وقد قلنا نعم.",
          "ما بدأ يوماً على أنه \"مجرد مشروع\" أصبح شيئاً أكبر بكثير. والآن، زفافنا هو المشروع الذي نبنيه معاً، وهو مجرد بداية لكل ما هو قادم.",
        ],
      },
      {
        id: "details",
        title: "برنامج الزفاف",
        intro:
          "نحن سعداء جداً أن نشارككم هذه المناسبة المميزة. وجودكم معنا في سبتمبر يعني لنا الكثير ونحن نبدأ هذا الفصل الجديد. هذا ما خططنا له:",
        itinerary: [
          {
            date: "3 سبتمبر",
            time: "20:00",
            title: "عشاء ترحيبي",
            location: "منزل والدي ميساء",
            description:
              "أمسية هادئة في البيت مع طعام طيب وأحاديث جميلة ووقت لنبدأ الأجواء معاً.",
            dressCode: "أنيق مريح",
            icon: "dinner",
          },
          {
            date: "4 سبتمبر",
            time: "21:00",
            title: "ليلة الحناء",
            location: "قصر النور، جمال",
            description:
              "ليلة مليئة بالفرح والتقاليد والموسيقى والرقص احتفالاً بهذه اللحظة الخاصة.",
            dressCode: "لباس تونسي تقليدي (مفضل) أو لباس احتفالي",
            icon: "henna",
          },
          {
            date: "5 سبتمبر",
            time: "21:00",
            title: "حفل الزفاف",
            location: "قاعة أفراح أم الزين، جمال",
            description:
              "احتفالنا الرئيسي المليء بالحب والموسيقى والكثير من الرقص.",
            dressCode: "رسمي / أنيق",
            icon: "wedding",
          },
        ] as ItineraryEntry[],
        note:
          "ملاحظة: وجودكم يعني لنا الكثير. سواء انضممتم إلى مناسبة واحدة\nأو إلى عطلة نهاية الأسبوع كاملة، فنحن سعداء جداً بوجودكم معنا.",
      },
      {
        id: "travel",
        title: "الوصول",
        travelBlocks: [
          {
            title: "كيفية الوصول",
            icon: "travel",
            lines: [
              "يمكن الوصول إلى المنستير بسهولة عبر مطار المنستير. ويمكنكم أيضاً السفر إلى تونس ثم متابعة الطريق إلى المنستير، مع إمكانية التنسيق مع ضيوف آخرين إذا أحببتم.",
              "وبمجرد أن تتأكد خطط سفركم، يسعدنا مساعدتكم في خيارات النقل أو التنسيق لرحلات مشتركة.",
            ],
          },
          {
            title: "أماكن الإقامة",
            icon: "stay",
            lines: [
              "ننصح بالإقامة في إحدى المناطق التالية: المنستير (حوالي 30 دقيقة من أماكن الفعاليات)، سوسة (حوالي ساعة)، أو المهدية (حوالي ساعة).",
              "المنستير هي الخيار الأكثر سهولة، بينما تعد سوسة والمهدية خيارين جميلين إذا كنتم ترغبون في تمديد إقامتكم.",
              "إذا احتجتم أي مساعدة في الاختيار أو التنسيق مع ضيوف آخرين، لا تترددوا في التواصل معنا 💛",
            ],
          },
        ] as TravelBlock[],
      },
      {
        id: "activities",
        title: "أنشطة يمكن القيام بها",
        activityBlocks: [
          {
            title: "المنستير",
            emoji: "⚓",
            lines: [
              "زوروا رباط المنستير، وضريح الحبيب بورقيبة، وتجولوا على طول المرسى.",
            ],
          },
          {
            title: "المهدية",
            emoji: "🌊",
            lines: [
              "تجولوا في المدينة القديمة، وزوروا سكيـفة الكحلة، وتمشوا بمحاذاة المقبرة المطلة على البحر.",
            ],
          },
          {
            title: "سوسة",
            emoji: "🏛️",
            lines: [
              "استكشفوا مدينة سوسة العتيقة، وزوروا متحف سوسة الأثري، وتجولوا في بورت القنطاوي.",
            ],
          },
          {
            title: "القيروان",
            emoji: "🕌",
            lines: [
              "زوروا جامع القيروان الكبير وفسقيات الأغالبة.",
            ],
          },
          {
            title: "سيدي بوسعيد",
            emoji: "💙",
            lines: [
              "تجولوا في الشوارع الزرقاء والبيضاء، وتوقفوا عند مقهى سيدي شبعان، واستمتعوا بإطلالات البحر.",
            ],
          },
          {
            title: "الجم",
            emoji: "🏟️",
            lines: [
              "زوروا مدرج الجم الروماني.",
            ],
          },
          {
            title: "تونس",
            emoji: "✨",
            lines: [
              "استكشفوا المدينة العتيقة، وزوروا متحف باردو الوطني، واكتشفوا آثار قرطاج ومتحف قرطاج الوطني.",
            ],
          },
          {
            title: "توزر",
            emoji: "🌴",
            lines: [
              "استكشفوا الواحة، وتجولوا بين بساتين النخيل، وانطلقوا في رحلة باتجاه الصحراء الكبرى.",
            ],
          },
        ] as ActivityBlock[],
      },
    ],
  },
} as const;

const WeddingDetails: FC<WeddingDetailsProps> = ({ lang, activeSection, showAll = false }) => {
  const c = content[lang];
  const isArabic = lang === "ar";
  const dressCodeLabel = isArabic ? "الزي" : lang === "de" ? "Dresscode" : "Dress Code";

  return (
    <div
      className={`mx-auto flex min-h-full max-w-3xl flex-col font-serif text-foreground 2xl:max-w-4xl ${isArabic ? "text-right" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : undefined}
    >
      {showAll ? (
        <div className="space-y-10 pb-6 pt-2">
          {c.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 pb-2">
              <h3 className={isArabic ? "text-4xl font-medium leading-relaxed text-foreground md:text-5xl 2xl:text-6xl" : "text-4xl font-medium tracking-[0.04em] text-foreground md:text-5xl 2xl:text-6xl"}>
                {section.title}
              </h3>
              {renderSectionContent(section, isArabic, dressCodeLabel)}
            </section>
          ))}
        </div>
      ) : (
        (() => {
          const active = activeSection ? c.sections.find((section) => section.id === activeSection) : null;
          if (!active) return null;
          return (
            <section className="pb-6 pt-2">
              <h3 className={isArabic ? "text-4xl font-medium leading-relaxed text-foreground md:text-5xl 2xl:text-6xl" : "text-4xl font-medium tracking-[0.04em] text-foreground md:text-5xl 2xl:text-6xl"}>
                {active.title}
              </h3>
              {renderSectionContent(active, isArabic, dressCodeLabel)}
            </section>
          );
        })()
      )}
    </div>
  );
};

const renderSectionContent = (
  section: {
    body?: readonly string[];
    intro?: string;
    itinerary?: readonly ItineraryEntry[];
    note?: string;
    travelBlocks?: readonly TravelBlock[];
    activityBlocks?: readonly ActivityBlock[];
  },
  isArabic: boolean,
  dressCodeLabel: string,
) => {
  if (section.itinerary) {
    return (
      <div className="mt-5">
        {section.intro ? (
          <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg 2xl:max-w-3xl 2xl:text-xl 2xl:leading-9">{section.intro}</p>
        ) : null}

        <div className="mt-8 space-y-10">
          {section.itinerary.map((item, index) => (
            <div
              key={`${item.date}-${item.title}`}
              className="grid gap-5 md:grid-cols-[9rem_2.5rem_minmax(0,1fr)]"
            >
              <div className={`md:pt-1 ${isArabic ? "md:text-right" : ""}`}>
                <p className="text-2xl italic text-[#c78e7e] md:text-3xl 2xl:text-4xl">{item.date}</p>
                <p className="mt-1 text-sm tracking-[0.2em] text-muted-foreground">{item.time}</p>
              </div>

              <div className="hidden items-stretch justify-center md:flex">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff7ec] text-[#d89c78] shadow-[0_8px_24px_rgba(216,156,120,0.14)]">
                    <ItineraryIcon kind={item.icon} />
                  </div>
                  {index < section.itinerary.length - 1 ? <div className="mt-3 w-px flex-1 bg-[#e6c8af]" /> : null}
                </div>
              </div>

              <div className="md:pb-2">
                <div className={`flex items-center gap-4 md:hidden ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff7ec] text-[#d89c78] shadow-[0_8px_24px_rgba(216,156,120,0.14)]">
                    <ItineraryIcon kind={item.icon} />
                  </div>
                  <div>
                    <p className={isArabic ? "text-lg font-semibold text-foreground/85 2xl:text-xl" : "text-base font-semibold uppercase tracking-[0.26em] text-foreground/85 md:text-lg 2xl:text-xl"}>
                      {item.title}
                    </p>
                    <p className={isArabic ? "mt-1 text-sm text-muted-foreground" : "mt-1 text-sm tracking-[0.12em] text-muted-foreground"}>{item.location}</p>
                  </div>
                </div>

                <div className={`hidden md:block ${isArabic ? "text-right" : ""}`}>
                  <p className={isArabic ? "text-lg font-semibold text-foreground/85 md:text-xl 2xl:text-2xl" : "text-base font-semibold uppercase tracking-[0.26em] text-foreground/85 md:text-lg 2xl:text-xl"}>
                    {item.title}
                  </p>
                  <p className={isArabic ? "mt-2 text-base font-medium text-foreground 2xl:text-lg" : "mt-2 text-base font-medium tracking-[0.08em] text-foreground 2xl:text-lg"}>{item.location}</p>
                </div>

                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg 2xl:max-w-3xl 2xl:text-xl 2xl:leading-9">{item.description}</p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/85 md:text-lg 2xl:max-w-3xl 2xl:text-xl 2xl:leading-9">
                  <span className="font-medium">{dressCodeLabel}:</span> {item.dressCode}
                </p>
              </div>
            </div>
          ))}
        </div>

        {section.note ? <p className={`mt-10 max-w-xl whitespace-pre-line pb-24 text-base leading-8 text-muted-foreground md:max-w-2xl md:pb-32 md:text-lg 2xl:max-w-3xl 2xl:text-xl 2xl:leading-9 ${isArabic ? "mr-auto text-right" : "mr-6 ml-auto text-right md:mr-8"}`}>{section.note}</p> : null}
      </div>
    );
  }

  if (section.travelBlocks) {
    return (
      <div className="mt-8 space-y-8">
        {section.travelBlocks.map((block) => (
          <div
            key={block.title}
            className="grid gap-5 md:grid-cols-[4rem_minmax(0,1fr)]"
          >
            <div className="flex items-start md:justify-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff7ec] text-[#d89c78] shadow-[0_8px_24px_rgba(216,156,120,0.14)]">
                <TravelIcon kind={block.icon} />
              </div>
            </div>
            <div className={isArabic ? "text-right" : ""}>
              <p className={isArabic ? "text-lg font-semibold text-foreground/85 md:text-xl 2xl:text-2xl" : "text-base font-semibold uppercase tracking-[0.26em] text-foreground/85 md:text-lg 2xl:text-xl"}>
                {block.title}
              </p>
              <div className="mt-4 space-y-4">
                {block.lines.map((line) => (
                  <p key={line} className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg 2xl:max-w-3xl 2xl:text-xl 2xl:leading-9">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (section.activityBlocks) {
    return (
      <div className="mt-8 space-y-8 md:columns-2 md:gap-16 md:space-y-10">
        {section.activityBlocks.map((block, index) => (
          <div
            key={block.title}
            className={`break-inside-avoid px-1 py-3 transition-transform md:mb-8 md:px-3 ${
              index % 4 === 0
                ? "md:ml-2 md:max-w-[28rem]"
                : index % 4 === 1
                  ? "md:ml-10 md:max-w-[24rem]"
                  : index % 4 === 2
                    ? "md:ml-4 md:max-w-[30rem]"
                    : "md:ml-12 md:max-w-[23rem]"
            }`}
          >
            <div className={`flex items-start gap-4 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff7ec]/90 text-2xl shadow-[0_8px_24px_rgba(216,156,120,0.10)]">
                <span aria-hidden="true">{block.emoji}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[1.45rem] italic leading-none text-[#c78e7e] md:text-[1.65rem]">{block.title}</p>
                <div className="mt-3 space-y-3 pl-1">
                  {block.lines.map((line) => (
                    <p key={line} className="text-[0.98rem] leading-7 text-muted-foreground md:text-base 2xl:text-lg 2xl:leading-8">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-5">
      {section.body?.map((paragraph) => (
        <p key={paragraph} className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg 2xl:max-w-3xl 2xl:text-xl 2xl:leading-9">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

const ItineraryIcon = ({ kind }: { kind: ItineraryEntry["icon"] }) => {
  if (kind === "dinner") {
    return <UtensilsCrossed className="h-7 w-7" strokeWidth={1.75} />;
  }

  if (kind === "henna") {
    return (
      <div
        className="h-10 w-10"
        style={{
          WebkitMaskImage: `url(${mehndiIcon})`,
          maskImage: `url(${mehndiIcon})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          backgroundColor: "#d89c78",
          filter:
            "drop-shadow(0 0 0 #d89c78) drop-shadow(0.6px 0 0 #d89c78) drop-shadow(-0.6px 0 0 #d89c78) drop-shadow(0 0.6px 0 #d89c78) drop-shadow(0 -0.6px 0 #d89c78)",
        }}
      />
    );
  }

  return <Heart className="h-7 w-7" strokeWidth={1.75} />;
};

const TravelIcon = ({ kind }: { kind: TravelBlock["icon"] }) => {
  if (kind === "stay") {
    return <House className="h-7 w-7" strokeWidth={1.75} />;
  }

  return <Plane className="h-7 w-7" strokeWidth={1.75} />;
};

export default WeddingDetails;
