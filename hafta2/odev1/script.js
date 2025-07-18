const user = {
  name: prompt("Adınızı girin:"),
  age: parseInt(prompt("Yaşınızı girin:")),
  job: prompt("Mesleğinizi girin:"),
};

console.log("Kullanıcı Bilgileri:", user);

const cart = [];

let adding = true;

while (adding) {
  const productName = prompt("Ürün adı girin (iptal için boş bırakın):");
  if (!productName) break;

  const productPrice = parseFloat(prompt("Ürünün fiyatı nedir?"));

  cart.push({
    name: productName,
    price: productPrice,
  });

  adding = confirm("Başka ürün eklemek ister misiniz?");
}

console.log("Sepetteki Ürünler:");
cart.forEach((item, index) => {
  console.log(`${index + 1}. ${item.name} - ${item.price} TL`);
});

const total = cart.reduce((acc, item) => acc + item.price, 0);
console.log("Sepet Toplamı:", total.toFixed(2), "TL");

function removeFromCart(productName) {
  const index = cart.findIndex(
    (item) => item.name.toLowerCase() === productName.toLowerCase()
  );
  if (index !== -1) {
    cart.splice(index, 1);
    console.log(`${productName} sepetten çıkarıldı.`);
  } else {
    console.log(`${productName} adlı ürün sepette bulunamadı.`);
  }
}

const wantToRemove = confirm("Bir ürünü sepetten çıkarmak ister misiniz?");
if (wantToRemove) {
  const nameToRemove = prompt("Hangi ürün çıkarılsın? (isim girin)");
  removeFromCart(nameToRemove);

  console.log("Güncel Sepet:");
  cart.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - ${item.price} TL`);
  });

  const newTotal = cart.reduce((acc, item) => acc + item.price, 0);
  console.log("Yeni Sepet Toplamı:", newTotal.toFixed(2), "TL");
}
