const caleRelativaSimulare = {
  arc: "../Arc/index.html",
  ulei: "../Simulare_Ulei/index.html",
  oblica: "../Simulare_Aruncare_Pe_Oblica/index.html",
  plan_inclinat: "../Ff_Plan_Inclinat/index.html",
  plan_orizontal: "../Ff_Plan_Orizontal/index.html",
};

const projects = [
  {
    id: "arc",
    title: "Arc (resort)",
    subtitle: "Legea lui Hooke",
    summary: "TODO: scrie 1-2 fraze despre ce se vede in simulare.",
    engine: "p5.js + matter.js",
    topic: "Mecanică",
    caleSimulare: caleRelativaSimulare.arc,
    descriereProiect: `
      <p class="mb-3">TODO: completeaza descrierea proiectului (ce controlez, ce observ).</p>
      <p class="mb-0">Reminder: daca redenumesc folderul/fisierul, schimb calea in <code>js/projects.js</code>.</p>
    `,
    ipoteze: ["Deformatii mici (aprox. liniara).", "Fara pierderi mari (aproximativ)."],
    obiective: ["Sa inteleg cum se leaga forta de alungire.", "Sa estimez constanta elastica k din date."],
    equations: [
      String.raw`F = kx`,
      String.raw`k = \frac{F}{x}`,
    ],
    notes: [
      "TODO: noteaza valori (x, F) si calculeaza k.",
      "Rulez din server local din folderul-radacina (cel care contine ProiectFizica + simularile).",
    ],
    media: [],
  },
  {
    id: "simulare-ulei",
    title: "Simulare Ulei",
    subtitle: "Frecare in fluid (simplu)",
    summary: "TODO: scrie concret ce reprezinta uleiul in simulare.",
    engine: "p5.js + matter.js",
    topic: "Fluide (simplu)",
    caleSimulare: caleRelativaSimulare.ulei,
    descriereProiect: `
      <p class="mb-3">Idee: in fluid apare o forta de franare care creste cu viteza.</p>
      <p class="mb-0">Reminder: daca schimb folderul, schimb calea in <code>js/projects.js</code>.</p>
    `,
    ipoteze: ["Fortă de frecare aproximata: proportionala cu viteza.", "Miscare lenta (model simplu)."],
    obiective: ["Sa vad cum scade acceleratia cand viteza creste.", "Sa observ daca apare o viteza limita."],
    equations: [
      String.raw`F_f \approx kv`,
      String.raw`F = ma`,
    ],
    notes: ["TODO: explica pe scurt ce pot modifica (slider, buton etc)."],
    media: [],
  },
  {
    id: "aruncare-oblica",
    title: "Aruncare pe oblică",
    subtitle: "Lansare sub unghi",
    summary: "Traiectorie parabolica (fara rezistenta aerului).",
    engine: "matter.js",
    topic: "Cinematica (clasa a 9-a)",
    caleSimulare: caleRelativaSimulare.oblica,
    descriereProiect: `
      <p class="mb-3">Scop: sa vad traiectoria (parabola) si sa verific marimi simple: timpul de zbor, bataia si inaltimea maxima.</p>
      <p class="mb-0">Reminder: traiectoria se obtine din compunerea MRU pe Ox si MRUV pe Oy.</p>
    `,
    ipoteze: ["Rezistenta aerului neglijata.", "g constant.", "Lansare si cadere la acelasi nivel (daca asa e simularea)."],
    obiective: ["Sa compar bataia masurata cu formula.", "Sa verific ca la 45° bataia e maxima (daca nivelul e acelasi)."],
    equations: [
      String.raw`v_{0x}=v_0\cos\\alpha,\quad v_{0y}=v_0\sin\\alpha`,
      String.raw`x(t)=v_0\cos\\alpha\\cdot t`,
      String.raw`y(t)=v_0\sin\\alpha\\cdot t-\\tfrac{1}{2}gt^2`,
      String.raw`t=\\frac{2v_0\\sin\\alpha}{g}`,
      String.raw`b=\\frac{v_0^2\\sin 2\\alpha}{g}`,
      String.raw`h_{max}=\\frac{v_0^2\\sin^2\\alpha}{2g}`,
    ],
    notes: ["TODO: noteaza un tabel (alpha, v0, b, hmax) si compara.", "Reminder: g≈9.8 m/s^2 (sau 10)."],
    media: [],
  },
  {
    id: "coef-frecare-plan-inclinat",
    title: "Frecarea pe plan inclinat",
    subtitle: "Determinarea coeficientului de frecare la alunecare",
    summary: "-",
    engine: "matter.js",
    topic: "Cinematica (clasa a 9-a)",
    caleSimulare: caleRelativaSimulare.plan_inclinat,
    descriereProiect: `
      <p class="mb-3">-</p>
      <p class="mb-0">-</p>
    `,
    ipoteze: [""],
    obiective: [""],
    equations: [

    ],
    notes: [""],
    media: [],
  },
  {
    id: "coef-frecare-plan-orizontal",
    title: "Frecarea pe plan orizontal",
    subtitle: "Determinarea coeficientului de frecare la alunecare",
    summary: "-",
    engine: "matter.js",
    topic: "Cinematica (clasa a 9-a)",
    caleSimulare: caleRelativaSimulare.plan_orizontal,
    descriereProiect: `
      <p class="mb-3">-</p>
      <p class="mb-0">-</p>
    `,
    ipoteze: [""],
    obiective: [""],
    equations: [

    ],
    notes: [""],
    media: [],
  },
  {
    id: "slot-gol",
    title: "Slot liber",
    subtitle: "Pune aici următoarea simulare",
    summary: "TODO: adauga urmatoarea simulare aici.",
    engine: "—",
    topic: "—",
    placeholder: true,
    caleSimulare: "",
    descriereProiect:
      "<p>TODO: duplica un proiect existent, schimba <code>id</code> si pune calea catre <code>../NumeleFolderului/index.html</code>.</p>",
    ipoteze: [],
    obiective: [],
    equations: [],
    notes: ["TODO: completeaza descriere + 1-2 formule."],
    media: [],
  },
];

function getProjectById(id) {
  return projects.find((project) => project.id === id) ?? projects[0];
}

window.PROJECTS = projects;
window.getProjectById = getProjectById;
