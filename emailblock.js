(function () {

  const blockedEmails = [
    "robelour@gmail.com",
    "rubelour@gmail.com",
    "bdveo3@gmail.com"
  ];

  let popupShown = false;

  function showPopup() {

    if (popupShown) return;

    popupShown = true;

    alert("এই Gmail দিয়ে Order করা যাবে না!");

    setTimeout(() => {
      popupShown = false;
    }, 2000);

  }

  setInterval(() => {

    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach(input => {

      const value = String(input.value || "")
        .toLowerCase()
        .trim();

      if (blockedEmails.includes(value)) {

        // Remove Email
        input.value = "";

        // Trigger React/Vue Update
        input.dispatchEvent(
          new Event("input", { bubbles: true })
        );

        // Popup
        showPopup();

      }

    });

  }, 300);

})();
