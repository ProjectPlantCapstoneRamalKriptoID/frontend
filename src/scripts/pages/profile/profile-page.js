export default class ProfilePage {
  async render() {
    return `
    <div class="container-fluid px-4">
       <div class="row">
        <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
                <div class="card-header">Foto profil</div>
                <div class="card-body text-center">
                    <img class="img-account-profile rounded-circle mb-2" src="./images/boy.png" alt="Foto profil" />
                    <div class="small font-italic text-muted mb-4">JPG atau PNG tidak lebih besar dari 5 MB</div>
                    <button class="btn btn-primary" type="button">Unggah Gambar Baru</button>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card mb-4">
                <div class="card-header">Detail Akun</div>
                <div class="card-body">
                    <form class="form-profile">
                        <div class="row gx-3 mb-3">
                            <div class="col-md">
                                <label class="small mb-1" for="inputFullName">Nama Panjang</label>
                                <input class="form-control" id="inputFullName" type="text" placeholder="Masukkan nama lengkap Anda">
                            </div>
                            
                        </div>
                       
                        <div class="row gx-3 mb-3">
                         <div class="col-md">
                            <label class="small mb-1" for="inputEmailAddress">Alamat Email</label>
                            <input class="form-control" id="inputEmailAddress" type="email" placeholder="Masukkan alamat email Anda">
                        </div>
                        </div>

                       
                        <button class="btn btn-primary" type="button">Simpan Perubahan</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
        `;
  }

  async afterRender() {
    
    
    const saveButton = document.querySelector('.btn.btn-primary');
    saveButton.addEventListener('click', () => {
      alert('Profile changes saved!');
    });
  }

    
}
