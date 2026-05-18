const parametriUrl = new URLSearchParams(window.location.search);
const idProiect = parametriUrl.get("id");
const proiect = window.getProjectById ? window.getProjectById(idProiect) : null;

if (!proiect) {
  throw new Error("Datele proiectului nu sunt incarcate. Include js/projects.js inainte de js/project-page.js.");
}

const nodTitlu = document.querySelector("#project-title");
const nodSubtitlu = document.querySelector("#project-subtitle");
const nodActualizare = document.querySelector("#last-updated");
const nodDescriere = document.querySelector("#project-description");
const nodIpoteze = document.querySelector("#project-ipoteze");
const nodObiective = document.querySelector("#project-obiective");
const nodEtichete = document.querySelector("#project-tags");
const nodEcuatii = document.querySelector("#equation-list");
const nodNotite = document.querySelector("#lab-note-list");
const nodMedia = document.querySelector("#lab-media");
const nodSimulare = document.querySelector("#simulation-mount");
const etichetaSimTehnic = document.querySelector("#sim-tech-label");

if (nodTitlu) nodTitlu.textContent = proiect.title;
if (nodSubtitlu) nodSubtitlu.textContent = proiect.subtitle;

if (nodActualizare) {
  if (!proiect.lastUpdated) {
    nodActualizare.textContent = "—";
  } else {
    const dataActualizare = new Date(proiect.lastUpdated);
    nodActualizare.textContent = Number.isNaN(dataActualizare.valueOf())
      ? "—"
      : `${dataActualizare.toLocaleDateString("ro-RO")} ${dataActualizare.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}`;
  }
}

if (nodDescriere) {
  nodDescriere.innerHTML = proiect.descriereProiect || "<p>TODO: scrie descriere.</p>";
}

function umpleLista(nod, elemente) {
  if (!nod) return;
  if (!elemente || !elemente.length) {
    nod.innerHTML = '<li class="text-[var(--text-sobit)]">—</li>';
    return;
  }
  nod.innerHTML = elemente.map((linie) => `<li>${linie}</li>`).join("");
}

umpleLista(nodIpoteze, proiect.ipoteze);
umpleLista(nodObiective, proiect.obiective);

if (nodEtichete) {
  nodEtichete.innerHTML = `
    <span class="tag-tehnic">Motor: ${proiect.engine}</span>
    <span class="tag-tehnic">Tema: ${proiect.topic}</span>
  `;
}

if (etichetaSimTehnic) {
  etichetaSimTehnic.textContent = proiect.caleSimulare ? "iframe · simulare integrata" : "fara iframe configurat";
}

if (nodEcuatii) {
  if (!proiect.equations || !proiect.equations.length) {
    nodEcuatii.innerHTML = '<p class="text-sm text-[var(--text-sobit)]">TODO: pune 1-2 formule simple.</p>';
  } else {
    nodEcuatii.innerHTML = proiect.equations
      .map((eq) => `<div class="card-eq">\\(${eq}\\)</div>`)
      .join("");
  }
}

if (nodNotite) {
  if (!proiect.notes || !proiect.notes.length) {
    nodNotite.innerHTML = "<li>—</li>";
  } else {
    nodNotite.innerHTML = proiect.notes.map((nota) => `<li>${nota}</li>`).join("");
  }
}

if (nodMedia) {
  if (!proiect.media || !proiect.media.length) {
    nodMedia.innerHTML =
      '<p class="text-sm text-[var(--text-sobit)]">TODO: adauga poze/capturi in <code class="text-[var(--accent)]">projects.js</code> (campul <code class="text-[var(--accent)]">media</code>).</p>';
  } else {
    nodMedia.innerHTML = proiect.media
      .map(
        (elementMedia) =>
          `<div class="card-eq">
             <p class="mono-heading text-[0.65rem] text-[var(--text-sobit)] mb-2">${elementMedia.label}</p>
             <div class="flex min-h-[10rem] items-center justify-center rounded-lg border border-[var(--contur)] bg-[rgba(0,0,0,0.25)] text-xs text-[var(--text-sobit)]">
               ${elementMedia.src ? "OK" : "TODO: pune fisier"}
             </div>
           </div>`,
      )
      .join("");
  }
}

if (nodSimulare) {
  const cale = proiect.caleSimulare;
  if (cale) {
    nodSimulare.innerHTML = `
      <iframe
        class="sim-iframe"
        title="Simulare integrata"
        id="simNode"
        src="${cale}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;
  } else {
    nodSimulare.innerHTML = `
      <div class="flex h-full min-h-[320px] flex-col items-center justify-center gap-2 p-6 text-center text-sm text-[var(--text-sobit)]">
        <p>TODO: seteaza <code class="text-[var(--accent)]">caleSimulare</code> in <code class="text-[var(--accent)]">projects.js</code>.</p>
      </div>
    `;
  }
}

if (window.MathJax?.typesetPromise) {
  window.MathJax.typesetPromise();
}
