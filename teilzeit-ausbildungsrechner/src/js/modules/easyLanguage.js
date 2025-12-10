let easyModeActive = false;

const easyTexts = [
  {
    getElement: () =>
      document.querySelector("#calculator-section header h1"),
    property: "textContent",
    easy: "Rechner für Ausbildung in Teilzeit",
  },
  {
    getElement: () =>
      document.querySelector("#calculator-section header p"),
    property: "innerHTML",
    easy:
      "Hier finden Sie schnell heraus, wie lange Ihre Ausbildung in Teilzeit dauert. Geben Sie Ihre Stunden ein und sehen Sie sofort das Ergebnis.",
  },
  {
    getElement: () =>
      document.querySelector('.progress-container .step[data-step="1"] p'),
    property: "textContent",
    easy: "Start",
  },
  {
    getElement: () =>
      document.querySelector('.progress-container .step[data-step="2"] p'),
    property: "textContent",
    easy: "Zeit einstellen",
  },
  {
    getElement: () =>
      document.querySelector('.progress-container .step[data-step="3"] p'),
    property: "textContent",
    easy: "Ergebnis",
  },
  {
    getElement: () => document.querySelector("#step-1 h2"),
    property: "textContent",
    easy: "1. Deine Basis",
  },
  {
    getElement: () =>
      document
        .getElementById("vollzeitstunden")
        ?.closest(".input-group")
        ?.querySelector(".input-prefix"),
    property: "textContent",
    easy: "Wie viele Stunden pro Woche sind Vollzeit?",
  },
  {
    getElement: () => document.getElementById("vollzeitstunden"),
    property: "placeholder",
    easy: "zum Beispiel 40",
  },
  {
    getElement: () =>
      document
        .getElementById("vollzeitstunden")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Tragen Sie die Vollzeitstunden aus Ihrem Vertrag ein (oft 38–40). Daraus berechnet der Rechner Ihren Teilzeit-Anteil.",
  },
  {
    getElement: () =>
      document
        .getElementById("wochenstunden")
        ?.closest(".input-group")
        ?.querySelector(".input-prefix"),
    property: "textContent",
    easy: "Wie viele Stunden willst du pro Woche arbeiten?",
  },
  {
    getElement: () => document.getElementById("wochenstunden"),
    property: "placeholder",
    easy: "zum Beispiel 20",
  },
  {
    getElement: () =>
      document
        .getElementById("wochenstunden")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Schreiben Sie die Stunden auf, die Sie in Teilzeit arbeiten möchten. So sehen Sie, wie sich die Dauer ändert.",
  },
  {
    getElement: () =>
      document
        .getElementById("ausbildungsdauer")
        ?.closest(".input-group")
        ?.querySelector(".input-prefix"),
    property: "textContent",
    easy: "Wie lange dauert die Ausbildung in Vollzeit?",
  },
  {
    getElement: () =>
      document
        .getElementById("ausbildungsdauer")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy: "Wählen Sie die übliche Dauer, zum Beispiel 24, 36 oder 42 Monate.",
  },
  {
    getElement: () =>
      document
        .querySelector('[name="part-time-start-radio"]')
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Wie startest du die Ausbildung?",
  },
  {
    getElement: () =>
      document
        .querySelector('input[name="part-time-start-radio"][value="0"]')
        ?.closest("label")
        ?.querySelector(".radio-label"),
    property: "innerHTML",
    easy: "Ich starte gleich in Teilzeit.",
  },
  {
    getElement: () =>
      document
        .querySelector('input[name="part-time-start-radio"][value="1"]')
        ?.closest("label")
        ?.querySelector(".radio-label"),
    property: "innerHTML",
    easy: "Ich beginne in Vollzeit und wechsle später.",
  },
  {
    getElement: () => document.getElementById("vollzeit-monate"),
    property: "placeholder",
    easy: "z. B. 6",
  },
  {
    getElement: () =>
      document
        .getElementById("vollzeit-monate")
        ?.closest(".radio-card-container")
        ?.querySelector(".info-box"),
    property: "innerHTML",
    easy:
      "Geben Sie an, wie viele Monate Sie zuerst in Vollzeit machen (oder schon gemacht haben). Lassen Sie 0, wenn Sie sofort in Teilzeit starten.",
  },
  {
    getElement: () => document.querySelector("#step-2 h2"),
    property: "textContent",
    easy: "2. Prüfe, ob du verkürzen kannst",
  },
  {
    getElement: () =>
      document
        .getElementById("age-select")
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Bist du 21 Jahre oder älter?",
  },
  {
    getElement: () =>
      document
        .getElementById("age-select")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Wenn du über 21 bist, darf die Ausbildung oft bis zu 12 Monate kürzer sein.",
  },
  {
    getElement: () =>
      document
        .getElementById("school-finish")
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Welchen Schulabschluss hast du?",
  },
  {
    getElement: () =>
      document
        .getElementById("school-finish")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Ein höherer Abschluss kann die Ausbildung verkürzen. Wähle deinen höchsten Abschluss.",
  },
  {
    getElement: () =>
      document
        .getElementById("experience-select")
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Hast du schon passende Berufserfahrung?",
  },
  {
    getElement: () =>
      document
        .getElementById("experience-select")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Passende Praktika oder Jobs können angerechnet werden, wenn sie zu deinem Beruf passen.",
  },
  {
    getElement: () =>
      document
        .getElementById("apprenticeship-select")
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Hast du schon eine passende Ausbildung beendet?",
  },
  {
    getElement: () =>
      document
        .getElementById("apprenticeship-select")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Eine abgeschlossene passende Ausbildung kann die neue Ausbildung deutlich verkürzen.",
  },
  {
    getElement: () =>
      document
        .getElementById("study-select")
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Hast du im Studium passende Kurse gemacht?",
  },
  {
    getElement: () =>
      document
        .getElementById("study-select")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Relevante Studieninhalte, zum Beispiel Programmierung oder BWL, können anerkannt werden.",
  },
  {
    getElement: () =>
      document
        .getElementById("child-care-select")
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Kümmerst du dich um Kinder?",
  },
  {
    getElement: () =>
      document
        .getElementById("child-care-select")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Wenn du Kinder betreust, stimmt die Kammer einer Teilzeit-Ausbildung oft eher zu.",
  },
  {
    getElement: () =>
      document
        .getElementById("family-care-select")
        ?.closest(".radio-card-container")
        ?.querySelector(".radio-card-header h4"),
    property: "textContent",
    easy: "Pflegst du Angehörige?",
  },
  {
    getElement: () =>
      document
        .getElementById("family-care-select")
        ?.closest(".input-group")
        ?.querySelector(".info-box"),
    property: "textContent",
    easy:
      "Regelmäßige Pflege von Familie kann für eine Teilzeit-Ausbildung berücksichtigt werden.",
  },
  {
    getElement: () => document.querySelector("#step-3 h2"),
    property: "textContent",
    easy: "3. Ergebnis",
  },
  {
    getElement: () =>
      document
        .querySelector(".final-result-box")
        ?.querySelector(".result-label"),
    property: "textContent",
    easy: "Gesamtdauer ab Start",
  },
  {
    getElement: () =>
      document.querySelector(".served-time-card .result-card-title"),
    property: "innerHTML",
    easy: "geplante<br />Vollzeit am Start",
  },
  {
    getElement: () =>
      document.querySelector(".served-time-card .result-card-header-info"),
    property: "textContent",
    easy: "Vollzeit am Anfang deiner Ausbildung",
  },
  {
    getElement: () => document.querySelector("#detailed-served-time-card p"),
    property: "textContent",
    easy:
      "Diese Monate planst du am Anfang in Vollzeit, bevor du in Teilzeit wechselst.",
  },
  {
    getElement: () =>
      document.querySelector(
        ".result-card:not(.served-time-card):not(.new-full-time-card):not(.part-time-card) .result-card-title"
      ),
    property: "innerHTML",
    easy: "Verkürzung<br />insgesamt",
  },
  {
    getElement: () =>
      document.querySelector(".new-full-time-card .result-card-title"),
    property: "innerHTML",
    easy: "Rest<br />in Vollzeit",
  },
  {
    getElement: () =>
      document.querySelector(".new-full-time-card .result-card-header-info"),
    property: "textContent",
    easy: "So lange müsstest du noch in Vollzeit weitermachen.",
  },
  {
    getElement: () =>
      document.querySelector("#detailed-new-full-time-card p"),
    property: "textContent",
    easy: "Das ist die verbleibende Zeit, wenn du in Vollzeit bleibst.",
  },
  {
    getElement: () =>
      document.querySelector(".part-time-card .result-card-title"),
    property: "innerHTML",
    easy: "Verlängerung<br />durch Teilzeit",
  },
  {
    getElement: () =>
      document.querySelector(".part-time-card .result-card-header-info"),
    property: "textContent",
    easy: "So passt sich die restliche Zeit durch Teilzeit an.",
  },
  {
    getElement: () => document.querySelector("p.disclaimer"),
    property: "innerHTML",
    easy:
      "<strong>Wichtig:</strong> Das Ergebnis ist nur eine Orientierung und kein Rechtsanspruch. Mehr Details zur Berechnung findest du unter „So funktioniert's“. ",
  },
  {
    getElement: () => document.querySelector(".pdf-btn"),
    property: "textContent",
    easy: "Als PDF speichern",
  },
];

const detailsToggleLabels = {
  normalClosed: "Detaillierte Erklärung anzeigen ▼",
  normalOpen: "Detaillierte Erklärung einklappen ▲",
  easyClosed: "Erklärung anzeigen ▼",
  easyOpen: "Erklärung einklappen ▲",
};

function applyTextChange(target, enableEasyMode) {
  const element = target.getElement();

  if (!element) return;

  const property = target.property || "textContent";
  const originalKey =
    property === "placeholder" ? "originalPlaceholder" : "originalContent";

  if (!element.dataset[originalKey]) {
    const currentValue =
      property === "placeholder" ? element.placeholder : element[property];
    element.dataset[originalKey] = currentValue || "";
  }

  if (enableEasyMode) {
    if (property === "placeholder") {
      element.placeholder = target.easy;
    } else {
      element[property] = target.easy;
    }
  } else if (property === "placeholder") {
    element.placeholder = element.dataset[originalKey] || "";
  } else {
    element[property] = element.dataset[originalKey] || "";
  }
}

function updateDetailsToggleText(isOpen) {
  const btn = document.getElementById("toggle-details-btn");
  if (!btn) return;

  if (easyModeActive) {
    btn.textContent = isOpen
      ? detailsToggleLabels.easyOpen
      : detailsToggleLabels.easyClosed;
  } else {
    btn.textContent = isOpen
      ? detailsToggleLabels.normalOpen
      : detailsToggleLabels.normalClosed;
  }
}

function synchronizeDetailsToggle() {
  const wrapper = document.getElementById("details-wrapper");
  if (!wrapper) return;
  const isOpen = !wrapper.classList.contains("hidden");
  updateDetailsToggleText(isOpen);
}

function setEasyLanguageMode(enable) {
  easyModeActive = enable;
  easyTexts.forEach((target) => applyTextChange(target, enable));

  const toggle = document.getElementById("easy-language-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", enable ? "true" : "false");
    const label = toggle.querySelector(
      '[data-translate-key="nav_easy_language"]'
    );
    if (label) {
      label.textContent = enable ? "Normale Sprache" : "Leichte Sprache";
    }
  }

  synchronizeDetailsToggle();
}

function handleDetailsToggleEvent(event) {
  if (!event?.detail) return;
  updateDetailsToggleText(event.detail.open);
}

function initializeEasyLanguage() {
  const toggle = document.getElementById("easy-language-toggle");

  if (!toggle) {
    console.warn("Easy language toggle not found");
    return;
  }

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    easyModeActive = !easyModeActive;
    setEasyLanguageMode(easyModeActive);
  });

  window.addEventListener("detailsToggleChanged", handleDetailsToggleEvent);
}

function isEasyLanguageActive() {
  return easyModeActive;
}

export {
  initializeEasyLanguage,
  isEasyLanguageActive,
  setEasyLanguageMode,
  synchronizeDetailsToggle,
};

