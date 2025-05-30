export default class PredictionPage {

  async render() {
    document.body.classList.add("prediction-page");

    return `
        <section class="prediction-container">
            <div class="prediction-form-section">
            <div class="prediction-form-container">
                <h1 class="prediction__title">Cryptocurrency Price Prediction Hybrid LSTM-GRU & BilSTM-GRU</h1>
                <label for="crypto-select" class="form-label">Select Cryptocurrency</label>
                <select class="form-select" aria-label="BTC-USD" id="crypto-select">
                     <option selected>Open this select menu</option>
                     <option value="1">BTC-USD</option>
                </select>
                <label for="crypto-select" class="form-label">Select Method</label>
                <select class="form-select" aria-label="LSTM-GRU" id="method-select">
                     <option selected>Open this select menu</option>
                     <option value="1">LSTM-GRU</option>
                </select>
                <label for="customRange2" class="form-label">Hour of prediction</label>
                <input type="range" class="form-range" min="1" max="5" id="customRange2">

                <div class="form-buttons">
                    <div id="submit-button-container">
                        <button class="btn" type="submit" id="predict-button">Generate Model</button>
                    </div>
                </div>
            </div>
                   
        </section>
        `;
  }

  
}
