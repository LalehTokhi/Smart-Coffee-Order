// متغیرهای کلی
let userRole = "";
let securityLevel = "";
let total = 0;
let selectedCoffee = "";
let coffeePrice = 0;
let customerName = "";

// مرحله 1: ورود کاربر
function login() {
  const usernameInput = document.getElementById("username").value.trim().toLowerCase();
  const passwordInput = document.getElementById("password").value.trim();

  if ((usernameInput === "admin" || usernameInput === "user") && passwordInput === "1234") {
    userRole = usernameInput;
    securityLevel = (usernameInput === "admin") ? "high" : "low";

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("orderSection").style.display = "block";

    document.getElementById("loginStatus").innerText =
      '✅ Logged in as: ${userRole} (${securityLevel} security)';
  } else {
    alert("❌ Invalid login credentials!");
  }
}

// مرحله 2: سفارش قهوه
function calculateOrder() {
  customerName = document.getElementById("name").value.trim();
  const ageValue = document.getElementById("age").value.trim();
  const quantityValue = document.getElementById("quantity").value.trim();
  selectedCoffee = document.getElementById("coffeeType").value;

  if (!customerName || !ageValue || !quantityValue || !selectedCoffee) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  const age = parseInt(ageValue);
  const quantity = parseInt(quantityValue);

  if (isNaN(age) || isNaN(quantity) || age <= 0 || quantity <= 0) {
    alert("❌ Please enter valid numbers for age and quantity.");
    return;
  }

  switch (selectedCoffee) {
    case "espresso":
      coffeePrice = 2.5;
      break;
    case "latte":
      coffeePrice = 3.5;
      break;
    case "cappuccino":
      coffeePrice = 4.0;
      break;
    default:
      alert("❌ Invalid coffee type.");
      return;
  }

  const originalTotal = coffeePrice * quantity;
  const discount = (age < 18 || age > 60) ? originalTotal * 0.1 : 0;
  total = originalTotal - discount;

  document.getElementById("orderSection").style.display = "none";
  document.getElementById("billSection").style.display = "block";

  document.getElementById("orderSummary").innerHTML =
    `<strong>Hello ${customerName}!</strong><br>
     You ordered ${quantity} ${selectedCoffee}(s).<br>
     Original total: $${originalTotal.toFixed(2)}<br>
     Discount: $${discount.toFixed(2)}<br>
     Subtotal: $${total.toFixed(2)}`;
}

// مرحله 3: محاسبه صورتحساب با انعام و خلاصه نهایی
function calculateBill() {
  const people = parseInt(document.getElementById("peopleCount").value);
  const tipPercentage = parseInt(document.getElementById("tipPercentage").value);

  if (isNaN(people) || isNaN(tipPercentage)) {
    alert("⚠️ Please select valid number of people and tip percentage.");
    return;
  }

  const tipAmount = total * (tipPercentage / 100);
  const totalWithTip = total + tipAmount;
  const perPerson = totalWithTip / people;

  document.getElementById("finalBill").innerHTML =
    `<br>Tip: $${tipAmount.toFixed(2)}<br>
     Total with Tip: $${totalWithTip.toFixed(2)}<br>
     Split between ${people} people: $${perPerson.toFixed(2)} each`;

  document.getElementById("finalSummary").innerHTML =
    `<hr>
     <h4>✅ Your order is complete</h4>
     <p><strong>Name:</strong> ${customerName}</p>
     <p><strong>Coffee:</strong> ${selectedCoffee}</p>
     <p><strong>Total with Tip:</strong> $${totalWithTip.toFixed(2)}</p>
     <p><strong>People:</strong> ${people}</p>
     <p><strong>Each pays:</strong> $${perPerson.toFixed(2)}</p>
     <button onclick="resetOrder()">🆕 New Order</button>`;
}

// مرحله 4: ریست کامل برنامه و بازگشت به صفحه اول
function resetOrder() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("coffeeType").value = "";
  document.getElementById("peopleCount").value = "1";
  document.getElementById("tipPercentage").value = "0";

  document.getElementById("loginStatus").
  innerText = "";
  document.getElementById("orderSummary").innerHTML = "";
  document.getElementById("finalBill").innerHTML = "";
  document.getElementById("finalSummary").innerHTML = "";

  document.getElementById("billSection").style.display = "none";
  document.getElementById("orderSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
}