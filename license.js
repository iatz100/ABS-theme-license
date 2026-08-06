const showPopup = true;

const facebookPage = "https://www.facebook.com/alibookshopbd"; // এখানে আপনার Facebook Page URL দিন

if (showPopup && !document.getElementById("abs-maintenance-popup")) {

  // Disable scrolling
  document.body.style.overflow = "hidden";

  const popup = document.createElement("div");

  popup.id = "abs-maintenance-popup";

  popup.innerHTML = `

    <div class="abs-popup-overlay"></div>

    <div class="abs-popup-box">

      <div class="abs-popup-icon">🔧</div>

      <h2>ওয়েবসাইট সাময়িকভাবে বন্ধ আছে</h2>

      <p>
        আমাদের ওয়েবসাইটে বর্তমানে রক্ষণাবেক্ষণ ও উন্নয়নমূলক কাজ চলছে।
        <br><br>
        এই কারণে ওয়েবসাইটের সকল সেবা সাময়িকভাবে বন্ধ রয়েছে।
        <br><br>
        অনুগ্রহ করে কিছুক্ষণ পর আবার ভিজিট করুন।
        <br><br>
        <strong>আপনার ধৈর্যের জন্য আন্তরিক ধন্যবাদ।</strong>
      </p>

      <a href="${facebookPage}" target="_blank" class="abs-facebook-btn">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
        box-sizing:border-box;
        font-family:Arial,sans-serif;
      }

      .abs-popup-overlay{
        position:absolute;
        inset:0;
        background:rgba(0,0,0,.65);
        backdrop-filter:blur(8px);
        animation:fadeIn .4s ease;
      }

      .abs-popup-box{
        position:relative;
        width:100%;
        max-width:380px;
        background:rgba(15,23,42,.96);
        border-radius:28px;
        padding:35px 25px;
        text-align:center;
        z-index:2;
        overflow:hidden;

        box-shadow:
          0 20px 50px rgba(0,0,0,.45),
          inset 0 0 10px rgba(255,255,255,.03);

        animation:popupShow .35s ease;
      }

      .abs-popup-box::before{
        content:"";
        position:absolute;
        inset:0;
        padding:2px;
        border-radius:28px;

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
        width:90px;
        height:90px;
        margin:0 auto 18px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:linear-gradient(135deg,#f59e0b,#f97316);
        box-shadow:0 0 25px rgba(249,115,22,.45);
        animation:pulse 1.8s infinite;
      }

      .abs-popup-box h2{
        margin:0 0 15px;
        color:#fff;
        font-size:26px;
        font-weight:700;
      }

      .abs-popup-box p{
        margin:0;
        color:#d1d5db;
        font-size:15px;
        line-height:1.9;
      }

      .abs-facebook-btn{
        margin-top:28px;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        padding:14px 24px;
        background:#1877F2;
        color:#fff;
        text-decoration:none;
        font-size:15px;
        font-weight:700;
        border-radius:14px;
        transition:.3s;
        box-shadow:0 8px 20px rgba(24,119,242,.35);
      }

      .abs-facebook-btn:hover{
        background:#166fe5;
        transform:translateY(-2px);
      }

      .abs-facebook-btn svg{
        width:20px;
        height:20px;
        flex-shrink:0;
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
          padding:30px 20px;
        }

        .abs-popup-icon{
          width:80px;
          height:80px;
          font-size:42px;
        }

        .abs-popup-box h2{
          font-size:22px;
        }

        .abs-popup-box p{
          font-size:14px;
        }

        .abs-facebook-btn{
          width:100%;
        }

      }

    </style>

  `;

  document.body.appendChild(popup);

}
