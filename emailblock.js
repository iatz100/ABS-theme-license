(function () {

  // Blocked Gmail List
  const blockedEmails = [
    "robelour@gmail.com",
    "rubelour@gmail.com",
    "bdveo3@gmail.com"
  ];

  // Popup Function
  function showBlockedPopup() {

    // Already Open
    if (document.getElementById("email-block-popup")) return;

    // Disable Scroll
    document.body.style.overflow = "hidden";

    // Create Popup
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
        box-sizing:border-box;
      }

      .email-popup-overlay{
        position:absolute;
        inset:0;
        background:rgba(0,0,0,.55);
        backdrop-filter:blur(8px);
        animation:fadeIn .4s ease;
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

        box-shadow:
        0 15px 45px rgba(0,0,0,.45),
        inset 0 0 10px rgba(255,255,255,.03);

        backdrop-filter:blur(18px);

        animation:popupShow .35s ease;
      }

      .email-popup-box::before{
        content:"";
        position:absolute;
        inset:0;
        padding:2px;
        border-radius:30px;

        background:linear-gradient(
          90deg,
          #2563eb,
          #7c3aed,
          #06b6d4,
          #2563eb
        );

        background-size:300% 300%;
        animation:borderRun 4s linear infinite;

        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);

        -webkit-mask-composite:xor;
        mask-composite:exclude;

        pointer-events:none;
      }

      .email-popup-icon{
        font-size:58px;
        margin-bottom:16px;
        animation:pulse 1.5s infinite;
      }

      .email-popup-box h2{
        color:#fff;
        font-size:26px;
        margin:0 0 14px;
        font-weight:700;
      }

      .email-popup-box p{
        color:#d1d5db;
        font-size:14px;
        line-height:1.9;
        margin-bottom:26px;
      }

      #closeEmailPopup{
        display:inline-block;
        padding:12px 28px;
        border:none;
        border-radius:14px;
        background:linear-gradient(135deg,#2563eb,#7c3aed);
        color:#fff;
        font-size:14px;
        font-weight:700;
        cursor:pointer;
        transition:.3s;
      }

      #closeEmailPopup:hover{
        transform:scale(1.05);
      }

      @keyframes borderRun{
        0%{
          background-position:0% 50%;
        }
        100%{
          background-position:200% 50%;
        }
      }

      @keyframes popupShow{
        from{
          opacity:0;
          transform:scale(.9);
        }
        to{
          opacity:1;
          transform:scale(1);
        }
      }

      @keyframes fadeIn{
        from{
          opacity:0;
        }
        to{
          opacity:1;
        }
      }

      @keyframes pulse{
        0%{
          transform:scale(1);
        }
        50%{
          transform:scale(1.08);
        }
        100%{
          transform:scale(1);
        }
      }

      @media(max-width:600px){

        .email-popup-box{
          max-width:320px;
          padding:30px 20px;
        }

        .email-popup-box h2{
          font-size:23px;
        }

      }

    </style>

    `;

    document.body.appendChild(popup);

    // Close Button
    document
    .getElementById("closeEmailPopup")
    .onclick = function(){

      popup.remove();

      document.body.style.overflow = "";

    };

  }

  // Guaranteed Detection
  document.addEventListener("input", function(e){

    const target = e.target;

    // All Inputs Detect
    if(target.tagName === "INPUT"){

      const value = target.value
      .trim()
      .toLowerCase();

      // Match Blocked Email
      if(blockedEmails.includes(value)){

        // Clear Input
        target.value = "";

        // Show Popup
        showBlockedPopup();

      }

    }

  });

})();
