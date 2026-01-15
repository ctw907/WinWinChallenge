// Win-Win Challenge (v3)
// Minimal intake + employee count validation + HTTPS submit

const form = document.getElementById("challengeForm");
const formMessage = document.getElementById("formMessage");

const companyName = document.getElementById("companyName");
const contactName = document.getElementById("contactName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const tradeType = document.getElementById("tradeType");
const employeeCount = document.getElementById("employeeCount");
const employeeCountError = document.getElementById("employeeCountError");

const qRepeatable = document.getElementById("qRepeatable");
const qGrowth = document.getElementById("qGrowth");
const qMargin = document.getElementById("qMargin");
const qAdmin = document.getElementById("qAdmin");
const qMicrosoft = document.getElementById("qMicrosoft");

const notes = document.getElementById("notes");

// Power Automate HTTP trigger endpoint
const SUBMIT_URL = "https://defaultff6ba2824f544b34b3ee2dfa83ff71.b2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/94d73424ff024139bb640d6f0f840cb0/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v263gOB84y5tGD4N0u-mS-qvsQ9Wtkuncg0sNoDsb88";

// ---- helpers ----
function setMessage(text, type = "info") {
  formMessage.textContent = text;
  formMessage.classList.remove("success", "error", "info");
  formMessage.classList.add(type);
}

function isBlank(v) {
  return !v || !String(v).trim();
}

function parseIntegerStrict(value) {
  const s = String(value ?? "").trim().replace(/,/g, "");
  if (!/^[0-9]+$/.test(s)) return null;
  const n = Number(s);
  if (!Number.isInteger(n)) return null;
  return n;
}

function validateEmployeeCount(showError = true) {
  const raw = employeeCount.value;
  if (isBlank(raw)) {
    if (showError) employeeCountError.textContent = "Employee count is required.";
    return { ok: false, value: null };
  }

  const n = parseIntegerStrict(raw);
  if (n === null) {
    if (showError) employeeCountError.textContent = "Enter a whole number (example: 35).";
    return { ok: false, value: null };
  }

  employeeCountError.textContent = "";
  return { ok: true, value: n };
}

function validateRequired() {
  const missing = [];
  if (isBlank(companyName.value)) missing.push("Company name");
  if (isBlank(contactName.value)) missing.push("Contact name");
  if (isBlank(email.value)) missing.push("Work email");
  if (isBlank(phone.value)) missing.push("Phone");
  if (isBlank(tradeType.value)) missing.push("Trade type");

  const emp = validateEmployeeCount(true);

  if (missing.length > 0) {
    setMessage(`Missing required field(s): ${missing.join(", ")}.`, "error");
    return { ok: false, employeeCount: emp.value };
  }

  if (!emp.ok) {
    setMessage("Fix the employee count field.", "error");
    return { ok: false, employeeCount: emp.value };
  }

  return { ok: true, employeeCount: emp.value };
}

// ---- live validation for employee count ----
employeeCount.addEventListener("input", () => {
  const raw = employeeCount.value;
  if (isBlank(raw)) {
    employeeCountError.textContent = "";
    return;
  }
  validateEmployeeCount(true);
});

// ---- submit ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMessage("", "info");

  const v = validateRequired();
  if (!v.ok) return;

  // Hard qualifier: > 30 employees
  if (v.employeeCount <= 30) {
    setMessage("This challenge is currently limited to building-trade companies with more than 30 employees.", "error");
    return;
  }

  const payload = {
    offer: "Win-Win Challenge",
    submittedAt: new Date().toISOString(),
    sourceUrl: window.location.href,
    companyName: companyName.value.trim(),
    contactName: contactName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    tradeType: tradeType.value.trim(),
    employeeCount: v.employeeCount,
    qualifiers: {
      repeatableProcesses: !!qRepeatable.checked,
      growthIntent: !!qGrowth.checked,
      marginOrRework: !!qMargin.checked,
      recurringAdminWork: !!qAdmin.checked,
      microsoftTools: !!qMicrosoft.checked
    },
    notes: notes.value.trim()
  };

  // Basic guard: only submit if endpoint is set to HTTP(S)
  if (!/^https?:\/\//i.test(SUBMIT_URL) || SUBMIT_URL.includes("example.com")) {
    console.warn("SUBMIT_URL is not configured. Payload:", payload);
    setMessage("Submitted locally (no endpoint configured). Update SUBMIT_URL in script.js to receive submissions.", "success");
    form.reset();
    employeeCountError.textContent = "";
    return;
  }

  try {
    setMessage("Submitting…", "info");

    const res = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
    }

    setMessage("Challenge accepted. CTW will reach out to schedule discovery.", "success");
    form.reset();
    employeeCountError.textContent = "";
  } catch (err) {
    console.error(err);
    setMessage("Submit failed. Try again or contact CTW directly.", "error");
  }
});
