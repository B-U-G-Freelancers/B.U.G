const NOTIFY_EMAIL = "buildyourgenie@gmail.com";

function doGet(e) {
  return ContentService.createTextOutput(
    "B.U.G Contact Form API is running",
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Submissions") || ss.getActiveSheet();

    Logger.log(e.parameter);

    sheet.appendRow([
      new Date(), // Timestamp
      data.name || "", // Name
      data.email || "", // Email
      data.services || "", // Services
      data.budget || "", // Budget
      data.details || "", // Details
      "Website Lead", // Source
    ]);

    // Email Notification
    const subject = "New Contact: " + (data.name || "Website Inquiry");

    const body = `
New Contact Form Submission

================================

Name: ${data.name || "-"}
Email: ${data.email || "-"}

Services: ${data.services || "-"}
Budget: ${data.budget || "-"}

Details:
${data.details || "-"}

================================
Sent from B.U.G Website
`;

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService.createTextOutput("SUCCESS").setMimeType(
      ContentService.MimeType.TEXT,
    );
  } catch (err) {
    Logger.log("Error: " + err.message);
    return ContentService.createTextOutput("ERROR: " + err.message).setMimeType(
      ContentService.MimeType.TEXT,
    );
  }
}

// Run this first to set up headers
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.setName("Submissions");

  var headers = [
    "Timestamp",
    "Name",
    "Email",
    "Services",
    "Budget",
    "Details",
    "Source",
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#1a73e8");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");

  sheet.setFrozenRows(1);
  SpreadsheetApp.getUi().alert("Setup complete! Now deploy as web app.");
}
