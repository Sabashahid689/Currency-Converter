const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// List of common world currencies
const currencies = [
  "USD","EUR","GBP","INR","PKR","AED","SAR","JPY","CNY",
  "AUD","CAD","CHF","NZD","ZAR","TRY","BDT","MYR","SGD",
  "THB","IDR","KRW","RUB","EGP","NGN","LKR","NPR"
];

// Load currencies
currencies.forEach(currency => {
  fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "PKR";

// Convert function
async function convert() {
  const amount = document.getElementById("amount").value;

  if (amount === "" || amount <= 0) {
    result.innerText = "Enter a valid amount";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching data";
  }
}
