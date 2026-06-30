/* ==================================================
   DATABASE MAKANAN

   Menyimpan seluruh data makanan yang akan
   ditampilkan pada halaman detail.
   Setiap menu memiliki nama, harga, gambar,
   dan deskripsi.
================================================== */

const daftarMenu = {

    ayam: {
        nama: "Ayam Goreng Pecak",
        harga: "Rp25.000",
        gambar: "images/Ayam-Goreng-Pecak.jpg",
        deskripsi: "Ayam Goreng Pecak merupakan hidangan ayam goreng yang disajikan dengan sambal pecak khas Indonesia. Rasanya gurih, pedas, dan cocok disantap bersama nasi hangat."
    },

    cilok: {
        nama: "Cilok Bakar",
        harga: "Rp15.000",
        gambar: "images/Cilok-Bakar.avif",
        deskripsi: "Cilok bakar memiliki tekstur kenyal dengan bumbu manis pedas yang meresap setelah dibakar hingga harum."
    },

    mangga: {
        nama: "Mangga Gulung",
        harga: "Rp18.000",
        gambar: "images/Mangga-Gulung.avif",
        deskripsi: "Mangga Gulung merupakan camilan segar dengan cita rasa manis dan asam yang cocok dinikmati saat cuaca panas."
    },

    rawon: {
        nama: "Rawon Daging Sapi",
        harga: "Rp30.000",
        gambar: "images/Rawon-Daging-Sapi.avif",
        deskripsi: "Rawon adalah makanan khas Jawa Timur dengan kuah hitam dari kluwek serta potongan daging sapi yang empuk."
    },

    padang: {
        nama: "Sate Padang",
        harga: "Rp28.000",
        gambar: "images/Sate-Padang.avif",
        deskripsi: "Sate Padang disajikan dengan kuah kental berbumbu rempah yang kaya rasa dan potongan daging yang lembut."
    },

    bandeng: {
        nama: "Sate Bandeng",
        harga: "Rp32.000",
        gambar: "images/Sate-Bandeng.avif",
        deskripsi: "Sate Bandeng merupakan makanan khas Banten yang dibuat dari ikan bandeng dengan bumbu rempah khas."
    }

};

/* ==================================================
   MEMBACA PARAMETER URL

   Mengambil parameter "menu" dari URL.
   Contoh:
   detail.html?menu=ayam
================================================== */

const parameter = new URLSearchParams(window.location.search);

const menuDipilih = parameter.get("menu");

/* ==================================================
   MENAMPILKAN DETAIL MAKANAN

   Jika parameter menu ditemukan pada database,
   maka gambar, nama, harga, dan deskripsi makanan
   akan ditampilkan secara otomatis.
================================================== */

if (daftarMenu[menuDipilih]) {

    // Menampilkan gambar makanan
    document.getElementById("detail-image").src =
        daftarMenu[menuDipilih].gambar;

    // Menampilkan nama makanan
    document.getElementById("detail-name").textContent =
        daftarMenu[menuDipilih].nama;

    // Menampilkan harga makanan
    document.getElementById("detail-price").textContent =
        daftarMenu[menuDipilih].harga;

    // Menampilkan deskripsi makanan
    document.getElementById("detail-description").textContent =
        daftarMenu[menuDipilih].deskripsi;

}

/* ==================================================
   MENGAMBIL ELEMEN YANG DIGUNAKAN

   Menghubungkan JavaScript dengan elemen HTML
   yang akan digunakan pada proses pemesanan.
================================================== */

const orderBtn = document.getElementById("order-btn");
const orderModal = document.getElementById("orderModal");
const resultModal = document.getElementById("resultModal");

/* ==================================================
   MEMBUKA FORM PEMESANAN

   Menampilkan popup form ketika tombol
   "Pesan Sekarang" ditekan.
================================================== */

if (orderBtn) {

    orderBtn.addEventListener("click", function () {

        orderModal.style.display = "flex";

    });

}

/* ==================================================
   TOMBOL BATAL

   Menutup popup form pemesanan tanpa
   memproses data yang telah diinput.
================================================== */

const cancelOrder = document.getElementById("cancelOrder");

if (cancelOrder) {

    cancelOrder.addEventListener("click", function () {

        orderModal.style.display = "none";

    });

}

/* ==================================================
   MEMPROSES PEMESANAN

   Mengambil data dari form pemesanan,
   menghitung total harga, kemudian
   menampilkan ringkasan pesanan.
================================================== */

const confirmOrder = document.getElementById("confirmOrder");

if (confirmOrder) {

    confirmOrder.addEventListener("click", function () {

        // Mengambil data yang diinput pengguna
        const nama = document.getElementById("customerName").value;
        const meja = document.getElementById("tableNumber").value;
        const jumlah = document.getElementById("quantity").value;

        // Memastikan semua data telah diisi
        if (nama === "" || meja === "" || jumlah === "") {

            alert("Semua data harus diisi!");

            return;

        }

        // Mengambil harga makanan dari halaman detail
        const hargaText =
            document.getElementById("detail-price").textContent;

        // Menghapus karakter selain angka
        // Contoh:
        // Rp25.000 -> 25000
        const harga =
            parseInt(hargaText.replace(/[^0-9]/g, ""));

        // Menghitung total harga
        const total = harga * jumlah;

        // Menampilkan data pada popup hasil
        document.getElementById("resultName").textContent = nama;

        document.getElementById("resultTable").textContent = meja;

        document.getElementById("resultMenu").textContent =
            document.getElementById("detail-name").textContent;

        document.getElementById("resultPrice").textContent = hargaText;

        document.getElementById("resultQuantity").textContent = jumlah;

        document.getElementById("resultTotal").textContent =
            "Rp" + total.toLocaleString("id-ID");

        // Menutup form pemesanan
        orderModal.style.display = "none";

        // Menampilkan popup hasil pemesanan
        resultModal.style.display = "flex";

    });

}

/* ==================================================
   MENUTUP POPUP HASIL PEMESANAN

   Menutup popup ringkasan pesanan setelah
   pengguna menekan tombol "Tutup".
================================================== */

const closeResult = document.getElementById("closeResult");

if (closeResult) {

    closeResult.addEventListener("click", function () {

        resultModal.style.display = "none";

        // Mengosongkan kembali form pemesanan
        document.getElementById("customerName").value = "";
        document.getElementById("tableNumber").value = "";
        document.getElementById("quantity").value = "";

    });

}