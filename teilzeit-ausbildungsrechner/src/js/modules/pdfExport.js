export function setupPdfExport() {
    const btn = document.querySelector(".pdf-btn");
    if (!btn) return;
  
    btn.addEventListener("click", async () => {
      const results = document.querySelector(".results-container");
      const chartCanvas = document.getElementById("results-chart");
  
      if (!results) return alert("Ergebnisbereich nicht gefunden.");
  
      // UMD jsPDF aus window Namespace holen
      // eslint-disable-next-line new-cap
      const pdf = new window.jspdf.jsPDF("p", "mm", "a4");
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      let y = 15;
  
      /* ---------------------------------------------------------
         HEADER
      --------------------------------------------------------- */
      pdf.setFontSize(20);
      pdf.text("Teilzeit-Ausbildungsrechner – Ergebnisbericht", pageWidth / 2, y, {
        align: "center",
      });
      y += 12;
  
      pdf.setLineWidth(0.5);
      pdf.line(10, y, pageWidth - 10, y);
      y += 10;
  
      /* ---------------------------------------------------------
         WICHTIGE WERTE HOLEN
      --------------------------------------------------------- */
      const finalDuration = document.getElementById("final-duration-result")?.textContent ?? "--";
      const shortening = document.getElementById("shortening-card-value")?.textContent ?? "--";
      const remaining = document.getElementById("new-full-time-card-value")?.textContent ?? "--";
      const extension = document.getElementById("extension-card-value")?.textContent ?? "--";
  
      /* ---------------------------------------------------------
         BLOCK: ZUSAMMENFASSUNG
      --------------------------------------------------------- */
      pdf.setFontSize(14);
      pdf.text("Zusammenfassung", 10, y);
      y += 8;
  
      pdf.setFontSize(11);
      pdf.text(`Gesamtdauer: ${finalDuration}`, 10, y); y += 6;
      pdf.text(`Gesamte Verkürzung: ${shortening} Monate`, 10, y); y += 6;
      pdf.text(`Restdauer nach Verkürzung: ${remaining} Monate`, 10, y); y += 6;
      pdf.text(`Verlängerung durch Teilzeit: ${extension} Monate`, 10, y); y += 10;
  
      /* ---------------------------------------------------------
         BLOCK: DETAIL-ERKLÄRUNG
      --------------------------------------------------------- */
      const detailsWrapper = document.getElementById("details-wrapper");
  
      if (detailsWrapper) {
        const items = detailsWrapper.querySelectorAll(".result-card");
  
        pdf.setFontSize(14);
        pdf.text("Detaillierte Erklärung", 10, y);
        y += 8;
        pdf.setFontSize(11);
  
        items.forEach((card) => {
          const title =
            card.querySelector(".result-card-title")?.textContent ?? "—";
          const number =
            card.querySelector(".result-card-number")?.textContent ?? "—";
  
          const paragraphs = card.querySelectorAll("p");
  
          if (y > 260) {
            pdf.addPage();
            y = 20;
          }
  
          pdf.setFont(undefined, "bold");
          pdf.text(`${title}: ${number}`, 10, y);
          pdf.setFont(undefined, "normal");
          y += 6;
  
          paragraphs.forEach((p) => {
            const text = pdf.splitTextToSize(p.textContent, pageWidth - 20);
            pdf.text(text, 10, y);
            y += text.length * 6 + 2;
          });
  
          y += 4;
        });
      }
  
      /* ---------------------------------------------------------
         BLOCK: DIAGRAMM
      --------------------------------------------------------- */
      if (chartCanvas) {
        const chartImage = chartCanvas.toDataURL("image/png", 1.0);
  
        if (y > 190) {
          pdf.addPage();
          y = 20;
        }
  
        pdf.setFontSize(14);
        pdf.text("Grafische Übersicht", 10, y);
        y += 8;
  
        const imgWidth = 170;
        const imgHeight = (chartCanvas.height / chartCanvas.width) * imgWidth;
  
        pdf.addImage(chartImage, "PNG", 20, y, imgWidth, imgHeight);
        y += imgHeight + 12;
      }
  
      /* ---------------------------------------------------------
         FOOTER
      --------------------------------------------------------- */
      pdf.setFontSize(10);
      pdf.text(
        "Hinweis: Diese Berechnung dient der Orientierung und stellt keine Rechtsberatung dar.",
        pageWidth / 2,
        290,
        { align: "center" }
      );
  
      pdf.save("Ausbildungsrechner.pdf");
    });
  }
  