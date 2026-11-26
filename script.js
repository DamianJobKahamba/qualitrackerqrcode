const shareButton = document.getElementById("shareButton");
const qrButton = document.getElementById("qrButton");
const qrModal = document.getElementById("qrModal");
const closeQr = document.getElementById("closeQr");
const addContactButton = document.getElementById("addContactButton");
const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}


/* SHARE */

shareButton.addEventListener("click", async () => {
  const data = {
    title: "QualiTracker Limited",
    text: "QualiTracker Limited - Smart Labs, Better Care. View our digital business card.",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (error) {
      /* share cancelled */
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Page link copied");
  } catch (error) {
    showToast("Copy the link from your browser bar");
  }
});


/* QR MODAL */

qrButton.addEventListener("click", () => {
  qrModal.classList.add("open");
});

closeQr.addEventListener("click", () => {
  qrModal.classList.remove("open");
});

qrModal.addEventListener("click", event => {
  if (event.target === qrModal) {
    qrModal.classList.remove("open");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    qrModal.classList.remove("open");
  }
});


/* ADD CONTACT */

addContactButton.addEventListener("click", () => {
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:QualiTracker Limited",
    "ORG:QualiTracker Limited",
    "TITLE:Quality Management System Consultant",
    "NOTE:Smart Labs\\, Better Care. Fostering quality culture in the medical laboratory industry in sub-Saharan Africa.",
    "TEL;TYPE=CELL:+255757486543",
    "EMAIL;TYPE=WORK:info@qualitracker.com",
    "ADR;TYPE=WORK:;;Mwenge;Dar es Salaam;;;Tanzania",
    "URL:https://www.qualitracker.com",
    "URL;TYPE=LinkedIn:https://www.linkedin.com/company/qualitracker/",
    "URL;TYPE=Instagram:https://www.instagram.com/qualitracker",
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "QualiTracker-Limited.vcf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
  showToast("Contact file downloaded");
});
