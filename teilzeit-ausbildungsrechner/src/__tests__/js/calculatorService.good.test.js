// calculatorService.good.test.js
import {
  calculateShortening,
  calculatePartTimeDuration,
  calculateFinalResults,
} from "../../js/modules/calculatorService.js";

describe("Calculator Service - Good Cases (Happy Path)", () => {
  test("1. Sollte korrekte Verkürzung für Schulabschluss berechnen (Mittlere Reife)", () => {
    const selections = { "school-finish": 6 }; // 6 Monate
    const originalDuration = 36;

    const result = calculateShortening(selections, originalDuration);

    expect(result.totalShortening).toBe(6);
    expect(result.capWasHit).toBe(false);
    expect(result.details[0].reason).toContain("Mittlere Reife");
  });

  test("2. Sollte Verkürzung für mehrere Gründe addieren (unter dem 12-Monats-Deckel)", () => {
    // KORRIGIERT: Wir wählen Werte, die zusammen unter 12 bleiben.
    // 6 Monate Schule + 5 Monate Erfahrung = 11 Monate.
    // Da 11 < 12 (Deckel), erwarten wir capWasHit = false.
    const input = {
      "school-finish": 6,
      "experience-select": 5,
    };

    const result = calculateShortening(input, 36);

    expect(result.totalShortening).toBe(11); // 6 + 5
    expect(result.capWasHit).toBe(false);
  });

  test("3. Sollte Teilzeitdauer korrekt hochrechnen (30h bei 40h VZ)", () => {
    // Formel: Dauer * (VZ / TZ)
    // 30 Monate * (40 / 30) = 40 Monate
    const duration = calculatePartTimeDuration(30, 40, 30);
    expect(duration).toBe(40);
  });

  test("4. Sollte 'Grace Period' (Toleranz) anwenden bei geringer Verlängerung", () => {
    // Szenario:
    // 36 Monate Ausbildung.
    // Wir haben schon 30 Monate Vollzeit gemacht.
    // Rest 6 Monate.
    // Wechsel auf 35 Stunden (sehr wenig Reduktion).
    // Verlängerung wäre minimal (< 1 Monat).

    const inputs = {
      originalDuration: 36,
      fullTimeHours: 40,
      partTimeHours: 35, // Leichte Reduktion
      initialFullTimeMonths: 30, // Später Einstieg in Teilzeit
      selections: {}, // Keine Verkürzung
    };

    const result = calculateFinalResults(inputs);

    // Erwartung: Verlängerung wird auf 0 gesetzt, da unter 6 Monaten (Grace Period).
    expect(result.remainingFullTimeEquivalent).toBe(6);
    expect(result.finalExtensionMonths).toBe(0);
    expect(result.finalTotalDuration).toBe(36); // Bleibt bei Originaldauer
  });

  test("5. Sollte korrekte Flags für 'Variable' Gründe zurückgeben", () => {
    // experience-select ist in der Config als isVariable: true markiert
    const input = { "experience-select": 5 };
    const result = calculateShortening(input, 36);

    expect(result.details[0].isVariable).toBe(true);
    expect(result.details[0].reason).toBe("Erste Berufserfahrung / EQ");
  });
});
