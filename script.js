// ============================================================
// GOOGLE APPS SCRIPT - Salin kode ini ke Google Apps Script
// Cara: buka script.google.com → New Project → paste kode ini
// ============================================================

const SHEET_NAME = "Pesanan";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    sheet.appendRow([
      data.waktu   || new Date().toLocaleString("id-ID"),
      data.nama    || "",
      data.hp      || "",
      data.alamat  || "",
      data.produk  || "",
      data.jumlah  || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Buat header
    sheet.appendRow(["Waktu", "Nama", "No. WhatsApp", "Alamat", "Produk", "Jumlah"]);
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#c0392b").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

// Fungsi test - jalankan manual dari Apps Script editor untuk cek koneksi
function testInsert() {
  const sheet = getOrCreateSheet();
  sheet.appendRow([
    new Date().toLocaleString("id-ID"),
    "Test Nama",
    "08123456789",
    "Jl. Test No. 1",
    "Kripik Tempe Original",
    "2"
  ]);
  Logger.log("Test berhasil!");
}
1