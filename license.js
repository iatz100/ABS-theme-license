const showPopup = true;

const allowedDomains = [
  "alibookshop.com",
  "www.alibookshop.com"
];

const currentDomain = window.location.hostname
  .replace("www.","")
  .toLowerCase();

const isAllowed = allowedDomains.some(domain =>
  currentDomain === domain.replace("www.","").toLowerCase()
);

if (showPopup && !isAllowed) {

  if (!document.getElementById("abs-license-popup")) {

    // Scroll Off
    document.body.style.overflow = "hidden";

    const popup = document.createElement("div");

    popup.id = "abs-license-popup";

    popup.innerHTML = `

    <div class="abs-popup-overlay"></div>

    <div class="abs-popup-box">

      <div class="abs-popup-icon">⚠️</div>

      <h2>অবৈধ থিম লাইসেন্স</h2>

      <p>
        আপনি একটি অবৈধ বা আনঅথরাইজড থিম ব্যবহার করছেন।
        <br>
        মূল ডেভেলপারের সাথে যোগাযোগ করুন।
      </p>

      <a href="https://www.alibookshop.com" target="_blank">
        যোগাযোগ করুন
      </a>

    </div>

    <style>

      #abs-license-popup{
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

      .abs-popup-overlay{
        position:absolute;
        inset:0;
        background:rgba(0,0,0,.55);
        backdrop-filter:blur(8px);
        animation:fadeIn .4s ease;
      }

      .abs-popup-box{
        position:relative;
        width:100%;
        max-width:360px;
        background:rgba(15,23,42,.94);
        border-radius:30px;
        padding:34px 24px;
        text-align:center;
        overflow:hidden;
        z-index:2;

        box-shadow:
        0 15px 45px rgba(0,0,0,.45),
        inset 0 0 10px rgba(255,255,255,.03);

        backdrop-filter:blur(18px);

        animation:popupShow .4s ease;
      }

      .abs-popup-box::before{
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

      .abs-popup-icon{
        font-size:58px;
        margin-bottom:16px;
        animation:pulse 1.6s infinite;
      }

      .abs-popup-box h2{
        color:#fff;
        font-size:26px;
        margin:0 0 14px;
        font-weight:700;
      }

      .abs-popup-box p{
        color:#d1d5db;
        font-size:14px;
        line-height:1.9;
        margin-bottom:26px;
      }

      .abs-popup-box a{
        display:inline-block;
        padding:12px 28px;
        border-radius:14px;
        background:linear-gradient(135deg,#2563eb,#7c3aed);
        color:#fff;
        text-decoration:none;
        font-size:14px;
        font-weight:700;
        transition:.3s;
      }

      .abs-popup-box a:hover{
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

        .abs-popup-box{
          max-width:320px;
          padding:30px 20px;
        }

        .abs-popup-box h2{
          font-size:23px;
        }

      }

    </style>

    `;

    document.body.appendChild(popup);

  }

}
