const menuButton =
  document.getElementById("menuButton");

const closeMenu =
  document.getElementById("closeMenu");

const sideMenu =
  document.getElementById("sideMenu");

const shareButton =
  document.getElementById("shareButton");

const qrButton =
  document.getElementById("qrButton");

const qrModal =
  document.getElementById("qrModal");

const closeQr =
  document.getElementById("closeQr");

const addContactButton =
  document.getElementById("addContactButton");


/* MENU */

menuButton.addEventListener(
  "click",
  () => {
    sideMenu.classList.add("open");
  }
);

closeMenu.addEventListener(
  "click",
  () => {
    sideMenu.classList.remove("open");
  }
);

document
  .querySelectorAll(".side-menu a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {
        sideMenu.classList.remove("open");
      }
    );

  });


/* SHARE */

shareButton.addEventListener(
  "click",
  async () => {

    if (navigator.share) {

      try {

        await navigator.share({
          title: "Your Business Name",
          text: "View our digital contact page.",
          url: window.location.href
        });

      } catch (error) {

        console.log(
          "Share cancelled"
        );

      }

    } else {

      await navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "Page link copied."
      );

    }

  }
);


/* QR MODAL */

qrButton.addEventListener(
  "click",
  () => {

    qrModal.classList.add(
      "open"
    );

  }
);

closeQr.addEventListener(
  "click",
  () => {

    qrModal.classList.remove(
      "open"
    );

  }
);

qrModal.addEventListener(
  "click",
  event => {

    if (
      event.target === qrModal
    ) {

      qrModal.classList.remove(
        "open"
      );

    }

  }
);


/* ADD CONTACT */

addContactButton.addEventListener(
  "click",
  () => {

    const vCard =
`BEGIN:VCARD
VERSION:3.0
FN:Your Business Name
ORG:Your Business Name
TEL;TYPE=CELL:+255000000000
EMAIL:your@email.com
ADR:;;Your Area;Dar es Salaam;;;Tanzania
URL:${window.location.href}
END:VCARD`;

    const blob =
      new Blob(
        [vCard],
        {
          type:
            "text/vcard;charset=utf-8"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href =
      url;

    link.download =
      "contact.vcf";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
      url
    );

  }
);
