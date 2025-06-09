const form = document.getElementById("contact-form");
const loader = document.getElementById("loader");
const btnText = document.getElementById("btn-text");
const successMsg = document.getElementById("success-msg");
const submitBtn = document.getElementById("submit-btn");

function showError(input, message) {
  const field = input.parentElement;
  const errorMsg = field.querySelector(".error-msg");
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
  field.classList.add("shake");
  setTimeout(() => field.classList.remove("shake"), 300);
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach((msg) => {
    msg.style.display = "none";
  });
}

function validateInputs() {
  clearErrors();
  let valid = true;

  const name = form.name;
  if (!/^[\p{L}\s]+$/u.test(name.value.trim())) {
    showError(name, "Nama tidak boleh berisi angka.");
    valid = false;
  }

  const email = form.email;
  if (!email.validity.valid) {
    showError(email, "Masukkan email yang valid.");
    valid = false;
  }

  const phone = form.phone;
  if (phone.value && !/^[0-9]{10,15}$/.test(phone.value)) {
    showError(phone, "Nomor HP tidak valid.");
    valid = false;
  }

  const message = form.message;
  if (!message.value.trim()) {
    showError(message, "Pesan tidak boleh kosong.");
    valid = false;
  }

  return valid;
}

// Event listeners real-time validation
["input", "blur"].forEach((event) => {
  form.name.addEventListener(event, validateInputs);
  form.email.addEventListener(event, validateInputs);
  form.phone.addEventListener(event, validateInputs);
  form.message.addEventListener(event, validateInputs);
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (!validateInputs()) return;

  // Honeypot protection
  if (form._gotcha.value !== "") return;

  btnText.style.display = "none";
  loader.style.display = "inline-block";
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/myzjewpw", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    loader.style.display = "none";
    btnText.style.display = "inline";
    submitBtn.disabled = false;

    if (response.ok) {
      successMsg.style.display = "block";
      form.reset();
      clearErrors();
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 4000);
    } else {
      alert("❌ Gagal mengirim. Silakan coba lagi.");
    }
  } catch (error) {
    loader.style.display = "none";
    btnText.style.display = "inline";
    submitBtn.disabled = false;
    alert("⚠️ Koneksi internet bermasalah.");
  }
});
