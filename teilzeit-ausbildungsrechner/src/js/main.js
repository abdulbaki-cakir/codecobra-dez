// ⚡ ALLE IMPORTS GANZ OBEN
import { initializeCalculator } from "./modules/calculatorController.js";
import { setupPdfExport } from "./modules/pdfExport.js";
import {
  initializeNavigation,
  initializeFooterNavigation,
} from "./modules/navigation.js";
import { initializeLanguageSwitcher } from "./modules/language.js";

// ⚡ Keine Aufrufe über den Imports!

// Hauptfunktion, die die App startet
async function main() {
  setTimeout(() => {
    initializeCalculator();
    setupPdfExport();

    initializeNavigation();
    initializeFooterNavigation();
    initializeLanguageSwitcher();
  }, 0);
}

main();
