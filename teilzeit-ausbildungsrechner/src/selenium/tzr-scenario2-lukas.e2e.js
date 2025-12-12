// src/selenium/tzr-scenario2-lukas.e2e.js
import {
  createDriver,
  waitVisibleById,
  typeNumberById,
  clickRadioByNameAndValue,
  clickButtonById,
} from './selenium-helpers.e2e.js';

const BASE_URL = process.env.TZR_BASE_URL ?? 'http://localhost:5173';

export async function runScenarioLukas() {
  const driver = await createDriver();

  try {
    console.log('Starte Szenario 2 – Lukas (19), Einzelhandel, Teilzeit 30h, 42 Monate.');

    // Seite öffnen
    await driver.get(`${BASE_URL}/`);
    await driver.sleep(500);

    // --- STEP 1: Basisdaten ---
    console.log('Step 1: Basisdaten ausfüllen');

    // Vollzeit: 40 Stunden
    await typeNumberById(driver, 'vollzeitstunden', 40);

    // Teilzeit: 30 Stunden
    await typeNumberById(driver, 'wochenstunden', 30);

    // Ausbildungsdauer: 42 Monate
    const ausbildungsdauerSelect = await waitVisibleById(driver, 'ausbildungsdauer');
    await ausbildungsdauerSelect.sendKeys('42');

    // Direkt in Teilzeit starten
    await clickRadioByNameAndValue(driver, 'part-time-start-radio', '0');

    // Weiter zu Step 2
    await clickButtonById(driver, 'next-btn-1');

    // --- STEP 2: Verkürzungsgründe ---
    console.log('Step 2: Verkürzungsfaktoren setzen');
    await waitVisibleById(driver, 'step-2');

    // Lukas ist 19 → NICHT über 21
    await clickRadioByNameAndValue(driver, 'age-radio', '0');

    // Abitur
    await clickRadioByNameAndValue(driver, 'school-finish-radio', '12');

    // Praktikum im Verkauf → relevante Berufserfahrung
    await clickRadioByNameAndValue(driver, 'experience-radio', '12');

    // Keine abgeschlossene Ausbildung
    await clickRadioByNameAndValue(driver, 'apprenticeship-radio', '0');

    // Kein Studium (nicht erwähnt)
    await clickRadioByNameAndValue(driver, 'study-radio', '0');

    // Keine Kinder
    await clickRadioByNameAndValue(driver, 'child-care-radio', '0');

    // Keine Pflege Angehörige
    await clickRadioByNameAndValue(driver, 'family-care-radio', '0');

    // Weiter zu Step 3
    await clickButtonById(driver, 'next-btn-2');

    // --- STEP 3: Ergebnisse ---
    console.log('Step 3: Ergebnisse prüfen');
    await waitVisibleById(driver, 'step-3');

    const finalDurationEl = await waitVisibleById(driver, 'final-duration-result', 15_000);
    const finalDurationText = await finalDurationEl.getText();

    console.log('Gesamtausbildungsdauer ab Beginn (Lukas, Szenario 2):', finalDurationText);

    // Details öffnen
    await clickButtonById(driver, 'toggle-details-btn');

    const shorteningEl = await waitVisibleById(driver, 'shortening-card-value');
    const extensionEl = await waitVisibleById(driver, 'extension-card-value');

    console.log('Gesamte Verkürzung (Monate):', await shorteningEl.getText());
    console.log('Verlängerung durch Teilzeit (Monate):', await extensionEl.getText());

    console.log('Szenario 2 – Testlauf erfolgreich abgeschlossen.');
  } catch (err) {
    console.error('Szenario 2 – Test fehlgeschlagen:', err);
    process.exitCode = 1;
  } finally {
    await driver.quit();
  }
}

// Direkt ausführbar (für npm script / Pipeline)
runScenarioLukas().catch((err) => {
  console.error('Szenario 2 – Unbehandelter Fehler:', err);
  process.exitCode = 1;
});
