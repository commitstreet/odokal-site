/**
 * Odokal beta waitlist → Google Sheet.
 *
 * Paste into the sheet's Extensions → Apps Script, then Deploy → New deployment → Web app,
 * "Execute as: Me", "Who has access: Anyone". The /exec URL it gives you is the site's
 * WAITLIST_ENDPOINT. Full steps: apps/web/README.md.
 *
 * The site posts JSON as text/plain (so the browser sends it without a CORS preflight, which
 * Apps Script can't answer). A rider who signs up again with the same email updates their row
 * instead of adding a new one, so the "tell us more" step fills in the row the email created.
 */

// Only needed when the script was created on its own at script.google.com rather than from the
// sheet (Extensions → Apps Script): paste the long id from the sheet's URL, between /d/ and /edit.
const SHEET_ID = '';
const SHEET_NAME = 'Waitlist';
const HEADERS = ['Joined (IST)', 'Updated (IST)', 'Email', 'Name', 'City', 'Bike', 'Crew', 'Crew name', 'Source'];
const CREW = ['solo', 'have_crew', 'find_crew'];
const MAX = { name: 60, city: 40, bike: 60, crewName: 60, source: 30 };

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.website) return reply({ ok: true }); // honeypot: bots fill every field
    const email = String(body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) return reply({ ok: false, error: 'invalid_email' });

    const clean = (v, n) => String(v || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, n);
    // A leading = + - @ would make the sheet treat text as a formula.
    const safe = (v) => (/^[=+\-@]/.test(v) ? "'" + v : v);
    const fields = {
      name: safe(clean(body.name, MAX.name)),
      city: safe(clean(body.city, MAX.city)),
      bike: safe(clean(body.bike, MAX.bike)),
      crew: CREW.indexOf(body.crew) >= 0 ? body.crew : '',
      crewName: safe(clean(body.crewName, MAX.crewName)),
      source: safe(clean(body.source, MAX.source)),
    };

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = sheetFor();
      const now = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
      const emails = sheet.getLastRow() > 1 ? sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues().map((r) => r[0]) : [];
      const at = emails.indexOf(email);
      if (at < 0) {
        sheet.appendRow([now, now, email, fields.name, fields.city, fields.bike, fields.crew, fields.crewName, fields.source]);
      } else {
        // Only overwrite what this submission actually says.
        const row = at + 2;
        const current = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
        const merged = [current[0], now, email,
          fields.name || current[3], fields.city || current[4], fields.bike || current[5],
          fields.crew || current[6], fields.crewName || current[7], current[8] || fields.source];
        sheet.getRange(row, 1, 1, HEADERS.length).setValues([merged]);
      }
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    // Only you call this endpoint's errors back; the message helps when setting it up.
    return reply({ ok: false, error: 'server_error', detail: String((err && err.message) || err).slice(0, 200) });
  }
}

/** Opening the URL in a browser confirms the deployment works and names the sheet it writes to. */
function doGet() {
  let sheet = 'missing';
  try {
    sheet = sheetFor().getParent().getName();
  } catch (err) {
    sheet = 'error: ' + String((err && err.message) || err).slice(0, 200);
  }
  return reply({ ok: true, service: 'odokal-waitlist', sheet: sheet });
}

function sheetFor() {
  const book = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!book) throw new Error('No sheet: open Apps Script from the sheet (Extensions → Apps Script), or set SHEET_ID.');
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
