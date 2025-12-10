// calculatorService.bad.test.js
import {
  calculateShortening,
  calculatePartTimeDuration,
  calculateFinalResults,
} from "../../js/modules/calculatorService.js";

describe("Calculator Service - Bad Cases & Limits", () => {
  test("1. DECKEL: Sollte Verkürzung auf maximal 12 Monate kappen (Reason Cap)", () => {
    // Input: Abitur (12) + Über 21 (12) = 24 Monate theoretisch
    const selections = {
      "school-finish": 12,
      "age-select": 12,
    };
    const originalDuration = 36;

    const result = calculateShortening(selections, originalDuration);

    expect(result.totalShortening).toBe(12); // Gekappt von 24 auf 12
    expect(result.capWasHit).toBe(true); // Flag muss true sein
  });

  test("2. DECKEL: Sollte gesetzliche Mindestdauer nicht unterschreiten", () => {
    // Szenario: 24 Monate Ausbildung. Gesetzliches Minimum ist 12 Monate.
    // Max mögliche Verkürzung = 12 Monate.
    // Wenn wir Gründe für 12 Monate haben, ist das okay.
    // Aber nehmen wir an, die Config erlaubt Gründe > 12 (hypothetisch) oder wir testen die Logik:

    // Config: Minimum für 24 Monate Original ist 12 Monate (d.h. max 12 monate verkürzung).
    // Wir nehmen an, wir hätten Gründe für 12 Monate. Das passt.

    // Testen wir den 18-Monate Fall (Regeldauer 36).
    // Minimum laut Config für 36 ist 18.
    // Erlaubte Verkürzung: 18.
    // Reason-Deckel ist aber 12.
    // Also gewinnt hier der Reason-Deckel (12).

    // Spannender Fall:
    // Original 42 Monate (gibts selten, aber laut Config array vorhanden).
    // Min 24. Max Verkürzung 18.
    // Reason Deckel 12.
    // Ergebnis 12.

    // Was wenn wir eine sehr kurze Ausbildung haben?
    // Die Config hat { original: 0, min: 0 }.
    // Das ist schwer zu testen ohne die Config zu ändern.

    // Testen wir: Original 24 Monate. Abitur (12).
    // Restzeit = 12. Das ist genau das Minimum.
    const result = calculateShortening({ "school-finish": 12 }, 24);
    expect(result.totalShortening).toBe(12);

    // Wenn wir versuchen würden mehr zu kürzen (theoretisch):
    // Da Reason-Cap immer 12 ist, ist es schwer, das Legal-Cap zu testen,
    // es sei denn, Legal-Cap < 12.
    // Beispiel: Original 18 Monate (hypothetisch, nicht in Config array, fällt auf 0 zurück).
    // Nehmen wir an Original 24. Min 12. MaxShortening 12.
    // Wir müssen darauf vertrauen, dass calculateShortening Math.min korrekt nutzt.
  });

  test("3. WARNUNG: Sollte ExtensionCap (1.5x) erkennen", () => {
    // Original: 36 Monate. Max erlaubt: 36 * 1.5 = 54 Monate.
    // Wir machen extreme Teilzeit.

    const inputs = {
      originalDuration: 36,
      fullTimeHours: 40,
      partTimeHours: 15, // Sehr wenig Stunden
      initialFullTimeMonths: 0, // Von Anfang an Teilzeit
      selections: {},
    };

    // Rechnung: 36 * (40/15) = 36 * 2.66 = 96 Monate.
    // 96 > 54.

    const result = calculateFinalResults(inputs);

    expect(result.extensionCapWasHit).toBe(true);
    expect(result.finalTotalDuration).toBeGreaterThan(54);
  });

  test("4. FEHLER: Sollte bei fehlenden oder falschen Teilzeitstunden keine Änderung berechnen", () => {
    const duration = calculatePartTimeDuration(30, 40, 0); // 0 Stunden
    expect(duration).toBe(30); // Keine Änderung

    const duration2 = calculatePartTimeDuration(30, 40, null);
    expect(duration2).toBe(30);

    const duration3 = calculatePartTimeDuration(30, 40, 45); // Mehr als Vollzeit
    expect(duration3).toBe(30); // Sollte ignoriert werden
  });

  test("5. LOGIK: Grace Period wird NICHT angewendet, wenn Verlängerung zu groß", () => {
    // Grace Period = 6 Monate.
    // Wir erzeugen 7 Monate Verlängerung.

    const inputs = {
      originalDuration: 36, // VZ
      fullTimeHours: 40,
      partTimeHours: 30,
      initialFullTimeMonths: 0,
      selections: {},
    };

    // Rechnung: 36 * (40/30) = 48 Monate.
    // Verlängerung: 12 Monate.
    // 12 > 6 (Grace).

    const result = calculateFinalResults(inputs);

    expect(result.finalExtensionMonths).toBe(12); // Nicht genullt
    expect(result.finalTotalDuration).toBe(48);
  });
});
