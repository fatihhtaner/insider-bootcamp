const form = document.getElementById("gorevForm");
const liste = document.getElementById("gorevListesi");
const hata = document.getElementById("hata");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  hata.textContent = "";

  const baslik = document.getElementById("baslik").value.trim();
  const aciklama = document.getElementById("aciklama").value.trim();
  const oncelikSecili = document.querySelector('input[name="oncelik"]:checked');

  if (!baslik) {
    hata.textContent = "Başlık alanı boş bırakılamaz.";
    return;
  }

  if (!oncelikSecili) {
    hata.textContent = "Lütfen bir öncelik seçin.";
    return;
  }

  const oncelik = oncelikSecili.value;

  try {
    const li = document.createElement("li");
    li.className = "gorev";

    li.innerHTML = `
      <strong>${baslik}</strong> <br>
      ${aciklama ? `<em>${aciklama}</em><br>` : ""}
      <span>Öncelik: ${oncelik}</span>
      <div class="butonlar">
        <button class="tamamla">Tamamla</button>
        <button class="sil">Sil</button>
      </div>
    `;

    liste.appendChild(li);
    form.reset();
  } catch (err) {
    console.error("Görev eklenemedi:", err.message);
    hata.textContent = "Bir hata oluştu. Lütfen tekrar deneyin.";
  }
});

liste.addEventListener("click", function (e) {
  const hedef = e.target;

  if (hedef.classList.contains("tamamla")) {
    const li = hedef.closest("li");
    li.classList.toggle("tamamlandi");
    hedef.textContent = li.classList.contains("tamamlandi")
      ? "Geri Al"
      : "Tamamla";
    e.stopPropagation();
  }

  if (hedef.classList.contains("sil")) {
    const li = hedef.closest("li");
    li.remove();
    e.stopPropagation();
  }
});
