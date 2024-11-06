// Fungsi untuk mengurutkan tabel berdasarkan kolom yang diklik
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("heroTable");
    switching = true;
    dir = "asc"; // Set default direction ke ascending
    var th = table.getElementsByTagName("th"); // Ambil semua elemen <th>

    // Hapus kelas 'sorted-asc' dan 'sorted-desc' dari semua header kolom
    for (i = 0; i < th.length; i++) {
        th[i].classList.remove("sorted-asc", "sorted-desc");
    }

    // Looping untuk terus melakukan pengurutan hingga tidak ada yang perlu diswitch
    while (switching) {
        switching = false;
        rows = table.rows;

        // Looping untuk mengecek setiap baris, kecuali baris header
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Cek apakah tipe data pada kolom yang dipilih adalah angka
            var xText = x.innerHTML.toLowerCase();
            var yText = y.innerHTML.toLowerCase();

            // Mengurutkan berdasarkan teks atau angka
            if (isNaN(xText) && isNaN(yText)) {
                // Jika teks (seperti nama hero), urutkan berdasarkan abjad
                if (dir == "asc") {
                    if (xText > yText) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (xText < yText) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                // Jika angka, urutkan berdasarkan nilai numerik
                if (dir == "asc") {
                    if (parseInt(xText) > parseInt(yText)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (parseInt(xText) < parseInt(yText)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }

        // Jika baris perlu diswitch, lakukan
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            // Jika tidak ada baris yang diswitch dan arah adalah ascending, ubah ke descending
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    // Menambahkan kelas untuk arah pengurutan
    if (dir == "asc") {
        th[n].classList.add("sorted-asc");
    } else {
        th[n].classList.add("sorted-desc");
    }
}
