function collatzLength(n, m = {}) {
  if (n in m) return m[n];
  if (n === 1) return 1;

  let length;
  if (n % 2 === 0) {
    length = 1 + collatzLength(n / 2, m);
  } else {
    length = 1 + collatzLength(3 * n + 1, m);
  }

  m[n] = length;
  return length;
}

function findLongestCollatz(limit) {
  let maxLength = 0;
  let startingNumber = 0;
  const m = {};

  for (let i = 2; i < limit; i++) {
    const length = collatzLength(i, m);
    if (length > maxLength) {
      maxLength = length;
      startingNumber = i;
    }
  }

  console.log(`En uzun zincire sahip sayı: ${startingNumber}`);
  console.log(`Zincir uzunluğu: ${maxLength}`);
}

let userLimit = parseInt(prompt("Lütfen bir sayı girin (örn: 1000000):"));

if (!isNaN(userLimit) && userLimit > 1) {
  findLongestCollatz(userLimit);
} else {
  alert("Geçerli bir sayı girilmedi!");
  console.log("Hatalı giriş. Lütfen sayfa yenileyip tekrar deneyin.");
}
