const showPopup = false;

const facebookPage = "https://www.facebook.com/alibookshopbd";

if (showPopup && !document.getElementById("abs-maintenance-popup")) {

  document.body.style.overflow = "hidden";

  const popup = document.createElement("div");

  popup.id = "abs-maintenance-popup";

  popup.innerHTML = `

  <div class="abs-popup-overlay"></div>

  <div class="abs-popup-box">

    <div class="abs-popup-icon">🔧</div>

    <h2>ওয়েবসাইট সাময়িকভাবে বন্ধ আছে</h2>

    <p>
      আমাদের ওয়েবসাইটে বর্তমানে রক্ষণাবেক্ষণ ও উন্নয়নমূলক কাজ চলছে।<br><br>
      এই কারণে ওয়েবসাইটের সকল সেবা সাময়িকভাবে বন্ধ রয়েছে।<br><br>
      অনুগ্রহ করে কিছুক্ষণ পর আবার ভিজিট করুন।<br>
      <strong>আপনার ধৈর্যের জন্য আন্তরিক ধন্যবাদ।</strong>
    </p>

    <a href="${facebookPage}" target="_blank" class="abs-facebook-btn">

      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12A10 10 0 1 0 10.44 21.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0 0 22 12z"/>
      </svg>

      Facebook

    </a>

    <a href="https://wa.me/8801763967230" target="_blank" class="abs-whatsapp-btn">

  <svg viewBox="0 0 32 32" fill="currentColor">
    <path d="M19.11 17.24c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.07 2.86 1.22 3.06.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.69.25-1.28.17-1.42-.08-.13-.28-.2-.58-.35z"/>
    <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.54.74 5.01 2.14 7.13L3 29l5.99-2.09A13 13 0 1 0 16.01 3zm0 23.61c-2.17 0-4.3-.58-6.15-1.67l-.44-.26-3.56 1.24 1.19-3.47-.29-.45A10.58 10.58 0 1 1 16.01 26.61z"/>
  </svg>

  WhatsApp

</a>

  </div>

  <style>

    #abs-maintenance-popup{
      position:fixed;
      inset:0;
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:999999999;
      padding:20px;
      font-family:Arial,sans-serif;
      box-sizing:border-box;
    }

    .abs-popup-overlay{
      position:absolute;
      inset:0;
      background:rgba(0,0,0,.65);
      backdrop-filter:blur(8px);
      animation:fadeIn .35s ease;
    }

    .abs-popup-box{
      position:relative;
      width:100%;
      max-width:370px;
      background:rgba(15,23,42,.96);
      border-radius:26px;
      padding:30px 22px;
      text-align:center;
      overflow:hidden;
      z-index:2;

      box-shadow:
        0 20px 45px rgba(0,0,0,.45),
        inset 0 0 8px rgba(255,255,255,.03);

      animation:popupShow .35s ease;
    }

    .abs-popup-box::before{
      content:"";
      position:absolute;
      inset:0;
      padding:2px;
      border-radius:26px;

      background:linear-gradient(
        90deg,
        #2563eb,
        #7c3aed,
        #06b6d4,
        #2563eb
      );

      background-size:300% 300%;
      animation:borderRun 5s linear infinite;

      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

      -webkit-mask-composite:xor;
      mask-composite:exclude;

      pointer-events:none;
    }

    .abs-popup-icon{
      width:82px;
      height:82px;
      margin:0 auto 16px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:42px;

      background:linear-gradient(135deg,#f59e0b,#f97316);

      box-shadow:0 0 22px rgba(249,115,22,.4);

      animation:pulse 1.8s infinite;
    }

    .abs-popup-box h2{
      color:#fff;
      margin:0 0 12px;
      font-size:24px;
      font-weight:700;
      line-height:1.4;
    }

    .abs-popup-box p{
      color:#d1d5db;
      margin:0;
      font-size:14px;
      line-height:1.6;
    }

    .abs-popup-box strong{
      color:#fff;
    }

    .abs-facebook-btn{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:8px;

      margin:22px auto 0;
      padding:12px 22px;

      background:#1877F2;
      color:#fff;
      text-decoration:none;
      font-size:15px;
      font-weight:700;

      border-radius:12px;

      transition:.25s;

      box-shadow:0 8px 18px rgba(24,119,242,.35);
    }

    .abs-facebook-btn:hover{
      background:#166fe5;
      transform:translateY(-2px);
    }

    .abs-facebook-btn svg{
      width:18px;
      height:18px;
      flex-shrink:0;
    }

    @keyframes popupShow{
      from{
        opacity:0;
        transform:scale(.92);
      }
      to{
        opacity:1;
        transform:scale(1);
      }
    }

    @keyframes fadeIn{
      from{opacity:0;}
      to{opacity:1;}
    }

    @keyframes pulse{
      0%,100%{
        transform:scale(1);
      }
      50%{
        transform:scale(1.08);
      }
    }

    @keyframes borderRun{
      0%{
        background-position:0% 50%;
      }
      100%{
        background-position:200% 50%;
      }
    }

    @media(max-width:600px){

      .abs-popup-box{
        max-width:320px;
        padding:26px 18px;
      }

      .abs-popup-icon{
        width:74px;
        height:74px;
        font-size:38px;
      }

      .abs-popup-box h2{
        font-size:21px;
      }

      .abs-popup-box p{
        font-size:13px;
      }

    }
.abs-whatsapp-btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;

  margin:12px auto 0;
  padding:12px 22px;

  background:#25D366;
  color:#fff;
  text-decoration:none;
  font-size:15px;
  font-weight:700;

  border-radius:12px;

  transition:.25s;

  box-shadow:0 8px 18px rgba(37,211,102,.35);
}

.abs-whatsapp-btn:hover{
  background:#1ebe5d;
  transform:translateY(-2px);
}

.abs-whatsapp-btn svg{
  width:18px;
  height:18px;
  flex-shrink:0;
}
  </style>

  `;

  document.body.appendChild(popup);

}
