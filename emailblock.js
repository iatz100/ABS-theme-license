(function () {

  const blockedEmails = [
    "spam1@gmail.com",
    "rubelour@gmail.com",
    "bdveo3@gmail.com"
  ];

  document.addEventListener("input", function(e){

    const value = e.target.value
      ?.toLowerCase()
      .trim();

    if(blockedEmails.includes(value)){

      // Input Clear
      e.target.value = "";

      // Popup
      alert("এই Gmail দিয়ে Order করা যাবে না!");

    }

  });

})();
