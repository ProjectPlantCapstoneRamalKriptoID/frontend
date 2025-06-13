export default class PredictionHistoryPage {

  async render() {
    return `
        <section class="container">
            <h1 class="history-title">Riwayat Prediksi</h1>

            <div id="prediction-history-list">
            <table class="table table-striped table-bordered">
                <thead class="thead-light">
                     <tr>
                       <th scope="col">NO</th>
                       <th scope="col">Tanggal</th>
                       <th scope="col">Prediksi ke Jam -</th>
                       <th scope="col">Harga Prediksi</th>
                       <th scope="col">Keterangan</th>
                     </tr>
                </thead>
                <tbody>
                     <tr>
                       <th scope="row">1</th>
                           <td>01/03/24</td>
                           <td>12</td>
                           <td>105.452,90 USD</td>
                           <td></td>
                     </tr>
                     <tr>
                       <th scope="row">2</th>
                           <td>01/09/24</td>
                           <td>17</td>
                           <td>105.452,90 USD</td>
                           <td></td>
                     </tr>
                     <tr>
                      <th scope="row">3</th>
                           <td>01/12/24</td>
                           <td>12</td>
                           <td>105.452,90 USD</td>
                           <td></td>
                     </tr>
                </tbody>
            </table>
        </section>
        `;
  }

  

}
