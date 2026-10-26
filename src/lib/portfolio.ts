// Application facts are shared by the timeline and contact actions.
export const application = {
  age: 16,
  grade: 10,
  graduation: { year: 2027, season: "summer", expected: true },
  apprenticeship: { year: 2027, seasons: ["summer", "autumn"], preferredField: "system-integration", otherITFields: true },
  internship: { byArrangement: true, primaryGoal: false },
  email: "adrian.neub@icloud.com",
  github: "https://github.com/Cgtlpa",
} as const;

export const timeline = [
  { year: "Heute", title: "Schüler der 10. Klasse", text: "Ich bin 16 Jahre alt und beschäftige mich in meiner Freizeit mit Linux, Betriebssystemen und eigenen Programmierprojekten." },
  { year: "Nach Vereinbarung", title: "Offen für ein Praktikum", text: "Neben der Suche nach einem Ausbildungsplatz würde ich gerne auch ein Praktikum bei Ihnen absolvieren." },
  { year: `Sommer ${application.graduation.year}`, title: "Voraussichtlicher Realschulabschluss", text: "Ich gehe in die 10. Klasse und strebe einen guten Realschulabschluss im Sommer 2027 an." },
  { year: `Sommer / Herbst ${application.apprenticeship.year}`, title: "Gewünschter Ausbildungsbeginn", text: "Nach meinem Realschulabschluss suche ich einen Ausbildungsplatz ab Sommer / Herbst 2027 in der IT." },
];

export const contactMailto = `mailto:${application.email}?subject=${encodeURIComponent("IT-Ausbildung ab 2027 / Praktikum nach Vereinbarung")}`;
