(function () {

  const blockedEmails = [
    "robelour@gmail.com",
    "rubelour@gmail.com",
    "bdveo3@gmail.com"
  ];

  function showBlockedPopup() {

    if (document.getElementById("email-block-popup")) return;

    const popup = document.createElement("div");

    popup.id = "email-block-popup";

    popup.innerHTML = `

    <div class="email-popup-overlay"></div>

    <div class="email-popup-box">

      <div class="email-popup-icon">⚠️</div>

      <h2>Email Blocked</h2>

      <p>
      এই Gmail দিয়ে Order করা যাবে না।
      </p>

      <button id="closeEmailPopup">
        OK
      </button>

    </div>

    <style>

      #email-block-popup{
        position:fixed;
        inset:0;
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:999999999;
        font-family:sans-serif;
        padding:20px;
      }

      .email-popup-overlay{
        position:absolute;
        inset:0;
        background:rgba(0,0,0,.55);
        backdrop-filter:blur(8px);
      }

      .email-popup-box{
        position:relative;
        width:100%;
        max-width:360px;
        background:rgba(15,23,42,.96);
        border-radius:30px;
        padding:34px 24px;
        text-align:center;
        overflow:hidden;
        z-index:2;
      }

      .email-popup-icon{
        font-size:58px;
        margin-bottom:16px;
      }

      .email-popup-box h2{
        color:#fff;
        font-size:26px;
        margin:0 0 14px;
      }

      .email-popup-box p{
        color:#d1d5db;
        font-size:14px;
        line-height:1.8;
        margin-bottom:26px;
      }

      #closeEmailPopup{
        padding:12px 28px;
        border:none;
        border-radius:14px;
        background:linear-gradient(135deg,#2563eb,#7c3aed);
        color:#fff;
        font-weight:700;
        cursor:pointer;
      }

    </style>

    `;

    document.body.appendChild(popup);

    document
    .getElementById("closeEmailPopup")
    .onclick = function () {

      popup.remove();

    };

  }

  document.addEventListener("input", function (e) {

    const target = e.target;

    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA"
    ) {

      let value = target.value
        .toLowerCase()
        .replace(/\s/g,"")
        .trim();

      // Includes Match
      const blocked = blockedEmails.some(email =>
        value.includes(email)
      );

      if (blocked) {

        target.value = "";

        showBlockedPopup();

      }

    }

  }, true);

})();
