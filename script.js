<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Win-Win Challenge</title>
  <link rel="stylesheet" href="style.css?v=2" />
</head>

<body>
  <div class="shell">
    <div class="app-card">
      <header class="app-header">
        <div class="logo-mark">CTW</div>
        <div>
          <h1>Win-Win Challenge</h1>
          <p class="subtitle">
            For building-trade companies with 30+ employees. Quick intake to schedule discovery.
          </p>
        </div>
      </header>

      <section class="meta-bar">
        <div class="progress-wrapper">
          <div class="step-label">Accept the challenge</div>
          <div class="progress-bar">
            <div id="progressFill" class="progress-fill" style="width: 100%;"></div>
          </div>
        </div>
        <div class="insight-chip">
          Form completion: <span id="personalizationScore">0%</span>
        </div>
      </section>

      <div class="layout">
        <!-- LEFT: FORM -->
        <main class="form-column">
          <form id="challengeForm" novalidate>
            <h2>Company basics</h2>

            <label for="companyName">Company name *</label>
            <input type="text" id="companyName" autocomplete="organization" placeholder="ABC Electric" />

            <label for="contactName">Contact name *</label>
            <input type="text" id="contactName" autocomplete="name" placeholder="First + last name" />

            <label for="email">Work email *</label>
            <input type="email" id="email" autocomplete="email" placeholder="name@company.com" />

            <label for="phone">Phone *</label>
            <input type="tel" id="phone" autocomplete="tel" placeholder="(###) ###-####" />

            <label>Trade type *</label>
            <div class="focus-tiles" id="tradeGroup" aria-label="Trade type">
              <button type="button" class="tile" data-value="Electrical">Electrical</button>
              <button type="button" class="tile" data-value="Mechanical">Mechanical</button>
              <button type="button" class="tile" data-value="Plumbing">Plumbing</button>
              <button type="button" class="tile" data-value="HVAC">HVAC</button>
              <button type="button" class="tile" data-value="General Contractor">General Contractor</button>
              <button type="button" class="tile" data-value="Civil / Heavy">Civil / Heavy</button>
              <button type="button" class="tile" data-value="Other">Other</button>
            </div>
            <input type="hidden" id="tradeType" />

            <label for="employeeCount">Employee count *</label>
            <select id="employeeCount">
              <option value="">Choose one</option>
              <option value="1–10">1–10</option>
              <option value="11–30">11–30</option>
              <option value="31–75">31–75</option>
              <option value="76–150">76–150</option>
              <option value="151+">151+</option>
            </select>

            <h2 style="margin-top:16px;">Why this challenge likely fits (optional)</h2>
            <label class="consent-label">
              <input type="checkbox" id="qRepeatable" />
              We run jobs or processes the same way each time
            </label>
            <label class="consent-label">
              <input type="checkbox" id="qScale" />
              We’re actively trying to grow or scale operations
            </label>
            <label class="consent-label">
              <input type="checkbox" id="qAdmin" />
              Recurring admin work eats time every week
            </label>
            <label class="consent-label">
              <input type="checkbox" id="qMicrosoft" />
              We already use Microsoft tools (Excel / Outlook / Teams / SharePoint)
            </label>

            <label for="notes">Notes (optional)</label>
            <textarea id="notes" rows="2" placeholder="Any context we should know (optional)"></textarea>

            <div class="nav-buttons">
              <button type="submit" class="btn primary" id="submitBtn">Accept the challenge</button>
            </div>

            <div style="margin-top:10px; font-size:0.8rem; color:#6b7280;">
              <strong>Win-Win Guarantee:</strong> If CTW cannot identify a meaningful automation opportunity after discovery,
              CTW will send <strong>$1,000</strong> to the company or the individual contact who accepted the challenge.
            </div>
          </form>

          <div id="formMessage" class="form-message" aria-live="polite"></div>
        </main>

        <!-- RIGHT: PREVIEW -->
        <aside class="preview-column">
          <div class="preview-card">
            <h3>Challenge summary</h3>
            <p class="preview-subtitle">
              Quick recap of what you entered. This is for your review.
            </p>

            <div class="preview-section">
              <h4>Basics</h4>
              <p><span class="label">Company</span> <span id="prevCompany" class="value-muted">Add company name</span></p>
              <p><span class="label">Contact</span> <span id="prevContact" class="value-muted">Add contact name</span></p>
              <p><span class="label">Email</span> <span id="prevEmail" class="value-muted">Add work email</span></p>
              <p><span class="label">Phone</span> <span id="prevPhone" class="value-muted">Add phone</span></p>
              <p><span class="label">Trade</span> <span id="prevTrade" class="value-muted">Choose trade type</span></p>
              <p><span class="label">Employees</span> <span id="prevEmployees" class="value-muted">Choose employee count</span></p>
            </div>

            <div class="preview-section">
              <h4>Signals</h4>
              <p><span class="label">Fit</span> <span id="prevQualifiers" class="value-muted">Optional</span></p>
              <p><span class="label">Notes</span> <span id="prevNotes" class="value-muted">Optional</span></p>
            </div>

            <div class="preview-footer">
              <div class="pill" id="analysisStatus">Add employee count to continue…</div>
              <small class="footnote">
                Offer eligibility is based on employee count (30+). Other selections are used for internal context only.
              </small>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <script src="script.js?v=2"></script>
</body>
</html>
