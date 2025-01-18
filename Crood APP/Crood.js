let semuaProduk = [];
let kodeBerikutnya = 1;
let indeksEdit = -1;

document.getElementById('Produk-Form').addEventListener('submit', simpanProduk);

function simpanProduk(event) {
    event.preventDefault();

    const kode = document.getElementById('Kode-Produk').value;
    const nama = document.getElementById('Nama-Produk').value.trim();
    const harga = document.getElementById('Harga-Produk').value.trim();
    const kategori = document.getElementById('Kategori').value;
    const jumlah = document.getElementById('Jumlah-Produk').value.trim();
    const url = document.getElementById('Url-Produk').value.trim();
    const stok = document.getElementById('Stok-Produk').value.trim();

    if (!nama || !harga || !kategori || !jumlah || !url || !stok) {
        alert("Semua input harus diisi!");
        return;
    }

    const dataProduk = { kode, nama, harga, kategori, jumlah, url, stok };

    if (indeksEdit === -1) {
        semuaProduk.push(dataProduk);
        kodeBerikutnya++;
        document.getElementById('Kode-Produk').value = `AH-${String(kodeBerikutnya).padStart(3, '0')}`;
    } else {
        semuaProduk[indeksEdit] = dataProduk;
        indeksEdit = -1;
    }

    resetForm();
    tampilkanTabel();
}

function resetForm() {
    document.getElementById('Nama-Produk').value = '';
    document.getElementById('Harga-Produk').value = '';
    document.getElementById('Jumlah-Produk').value = '';
    document.getElementById('Url-Produk').value = '';
    document.getElementById('Stok-Produk').value = '';
    document.getElementById('Kategori').value = 'Minuman';
}

function tampilkanTabel() {
    const tbody = document.querySelector('#Table-Produk tbody');
    tbody.innerHTML = '';

    semuaProduk.forEach((produk, index) => {
        const baris = document.createElement('tr');
        const warnaStok = produk.stok < 5 ? 'red' : '#1d2630';

        baris.innerHTML = `
            <td>${produk.kode}</td>
            <td>${produk.nama}</td>
            <td>${produk.harga}</td>
            <td>${produk.kategori}</td>
            <td>${produk.jumlah}</td>
            <td><a href="${produk.url}" target="_blank">Lihat</a></td>
            <td style="background-color: ${warnaStok}">${produk.stok}</td>
            <td>
                <button onclick="editProduk(${index})">Edit</button>
                <button onclick="hapusProduk(${index})">Hapus</button>
            </td>
        `;

        tbody.appendChild(baris);
    });
}

function editProduk(index) {
    const produk = semuaProduk[index];
    indeksEdit = index;

    document.getElementById('Kode-Produk').value = produk.kode;
    document.getElementById('Nama-Produk').value = produk.nama;
    document.getElementById('Harga-Produk').value = produk.harga;
    document.getElementById('Jumlah-Produk').value = produk.jumlah;
    document.getElementById('Url-Produk').value = produk.url;
    document.getElementById('Stok-Produk').value = produk.stok;
    document.getElementById('Kategori').value = produk.kategori;
}

function hapusProduk(index) {
    semuaProduk.splice(index, 1);
    tampilkanTabel();
}
