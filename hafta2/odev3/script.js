let geriSayim;
let kalan = 0;

const baslat = document.getElementById("baslat");
const sifirla = document.getElementById("sifirla");
const sureInput = document.getElementById("sure");
const ekran = document.getElementById("ekran");

baslat.onclick = function () {
  clearInterval(geriSayim);
  kalan = parseInt(sureInput.value);
  if (isNaN(kalan) || kalan <= 0) return;
  ekran.textContent = kalan;
  geriSayim = setInterval(function () {
    kalan--;
    if (kalan > 0) {
      ekran.textContent = kalan;
    } else {
      clearInterval(geriSayim);
      ekran.textContent = "Süre doldu!";
    }
  }, 1000);
};

sifirla.onclick = function () {
  clearInterval(geriSayim);
  ekran.textContent = "Hazır";
  sureInput.value = "";
};
