const showPopup = true;

// আপনার Facebook Page URL দিন
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

      Facebook পেজ

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

  </style>

  `;

  document.body.appendChild(popup);

}
