import PredictionChart from "./prediction-chart";

export default class PredictionPage {
  constructor() {
    this.PredictionChart = new PredictionChart();
  }

  async render() {
    document.body.classList.add("prediction-page");

    const defaulthours = 12;

    return `
        <section class="prediction-container">
            <div class="prediction-form-section">
            <div class="prediction-form-container">
                <h1 class="prediction__title">Prediksi Harga Mata Uang Kripto Hybrid LSTM-GRU</h1>

                <label for="crypto-select" class="form-label">Pilih Mata Uang Kripto</label>
                <select class="form-select" aria-label="BTC-USD" id="crypto-select">
                     <option selected>Buka menu pilihan ini</option>
                     <option value="1">BTC-USD</option>
                </select>

                <label for="crypto-select" class="form-label">Pilih Metode</label>
                <select class="form-select" aria-label="LSTM-GRU" id="method-select">
                     <option selected>Buka menu pilihan ini</option>
                     <option value="1">LSTM-GRU</option>
                </select>

                 <label for="hours-range" class="form-label">Prediksi Ke Jam- <span id="hours-value">${defaulthours}</span></label>
                 <input type="range" class="form-range" min="1" max="24" value="${defaulthours}" id="hours-range">

                <div class="form-buttons">
                    <div id="submit-button-container">
                        <button class="btn" type="submit" id="predict-button">Prediksi</button>
                    </div>
                </div>
            </div>

            ${await this.PredictionChart.render()}
                   
        </section>
        `;
  }

  async afterRender() {
    await this.PredictionChart.afterRender();

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const predictButton = document.getElementById("predict-button");
    const hoursRange = document.getElementById("hours-range");
    const hoursValue = document.getElementById("hours-value");

    if (hoursRange && hoursValue) {
      hoursRange.addEventListener("input", (e) => {
        hoursValue.textContent = e.target.value;
      });
    }

    if (predictButton) {
      predictButton.addEventListener("click", () => {
        this.handlePrediction();
      });
    }
  }

  handlePrediction() {
  const cryptoSelect = document.getElementById("crypto-select");
  const methodSelect = document.getElementById("method-select");
  const hoursRange = document.getElementById("hours-range");

  if (!cryptoSelect || !methodSelect || !hoursRange) {
    console.error("Form elements not found");
    return;
  }

  const cryptoValue = cryptoSelect.value;
  const methodValue = methodSelect.value;
  const hoursValue = hoursRange.value;

  if (
    cryptoValue === "Buka menu pilihan ini" || 
    cryptoSelect.selectedIndex === 0 ||
    methodValue === "Buka menu pilihan ini" || 
    methodSelect.selectedIndex === 0
  ) {
    alert("Silahkan pilih mata uang kripto dan metode terlebih dahulu");
    return;
  }

  console.log("Making prediction with:", {
    crypto: cryptoValue,
    method: methodValue,
    hours: hoursValue,
  });

  // Generate sample data berdasarkan input pengguna
  const samplePredictionData = this.generateSampleData(parseInt(hoursValue));

  // Update chart dengan data baru
  this.PredictionChart.updateChart(samplePredictionData);
  }

  generateSampleData(hours) {
    // Generate data sample berdasarkan jumlah jam yang dipilih
    const actualData = [];
    const predictionData = [];
    
    const basePrice = 45000;
    
    for (let i = 0; i < hours; i++) {
      // Generate data aktual dengan variasi random
      const actualPrice = basePrice + (Math.random() - 0.5) * 5000 + (i * 200);
      actualData.push(Math.round(actualPrice));
      
      // Generate data prediksi dengan sedikit offset
      const predictionPrice = actualPrice + (Math.random() - 0.5) * 2000 + 500;
      predictionData.push(Math.round(predictionPrice));
    }

    return [
      {
        name: "Data Aktual",
        data: actualData,
      },
      {
        name: "Data Prediksi", 
        data: predictionData,
      },
    ];
  }

  // Cleanup method
  destroy() {
    if (this.PredictionChart) {
      this.PredictionChart.destroy();
    }
  }
}