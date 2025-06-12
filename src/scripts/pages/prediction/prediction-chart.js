import Chart from "chart.js/auto";

export default class PredictionChart {
  constructor() {
    this.chartInstance = null;
  }

  async render() {
    return `
        <section class="chart-container">
          <canvas id="line-chart"></canvas>
        </section>
        `;
  }

  afterRender() {
    setTimeout(() => {
      this.initializeChart();
    }, 100);
  }

  initializeChart() {
    const canvas = document.getElementById("line-chart");

    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    // Destroy existing chart if any
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["01/01/23", "01/03/23", "01/06/23", "01/09/23", "01/12/23", "01/03/24", "01/06/24", "01/09/24", "01/12/24"],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783],
            label: "Data Aktual",
            borderColor: "#ac7432",
            backgroundColor: "#ac7432",
            fill: false,
          },
          {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700],
            label: "Data Prediksi",
            borderColor: "#392a22",
            backgroundColor: "#392a22",
            fill: false,
          },
         
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Prediksi Harga Kripto",
            font: {
              size: 16,
            },
          },
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            title: {
              display: true,
              text: "Harga",
            },
          },
        },
      },
    });
  }

  updateChart(newData) {
    if (!this.chartInstance) {
      console.error("Chart instance not found");
      return;
    }

    // Update datasets dengan data baru
    newData.forEach((dataset, index) => {
      if (this.chartInstance.data.datasets[index]) {
        this.chartInstance.data.datasets[index].data = dataset.data;
        this.chartInstance.data.datasets[index].label = dataset.name;
      }
    });

    // Update chart
    this.chartInstance.update();
  }


  // Method untuk cleanup saat pindah halaman
  destroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
