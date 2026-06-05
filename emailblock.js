(function(){

    const blockedEmails = [
        "spam1@gmail.com",
        "spam2@gmail.com"
    ];

    // Inject CSS
    const style = document.createElement("style");

    style.innerHTML = `

    #email-block-popup{
        position:fixed !important;
        inset:0 !important;
        display:flex !important;
        justify-content:center !important;
        align-items:center !important;
        z-index:999999999 !important;
        font-family:sans-serif !important;
        padding:20px !important;
        box-sizing:border-box !important;
    }

    .email-popup-overlay{
        position:absolute !important;
        inset:0 !important;
        background:rgba(0,0,0,.65) !important;
        backdrop-filter:blur(10px) !important;
    }

    .email-popup-box{
        position:relative !important;
        width:100% !important;
        max-width:360px !important;
        background:#0f172a !important;
        border-radius:30px !important;
        padding:34px 24px !important;
        text-align:center !important;
        overflow:hidden !important;
        z-index:2 !important;

        box-shadow:
        0 15px 45px rgba(0,0,0,.45),
        inset 0 0 10px rgba(255,255,255,.03) !important;

        animation:popupShow .3s ease !important;
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
        font-size:58px !important;
        margin-bottom:16px !important;
    }

    .email-popup-box h2{
        color:#fff !important;
        font-size:26px !important;
        margin:0 0 14px !important;
        font-weight:700 !important;
    }

    .email-popup-box p{
        color:#d1d5db !important;
        font-size:14px !important;
        line-height:1.9 !important;
        margin-bottom:26px !important;
    }

    .email-popup-btn{
        display:inline-block !important;
        padding:12px 28px !important;
        border-radius:14px !important;
        background:linear-gradient(135deg,#2563eb,#7c3aed) !important;
        color:#fff !important;
        font-size:14px !important;
        font-weight:700 !important;
        border:none !important;
        cursor:pointer !important;
    }

    @keyframes borderRun{
        0%{background-position:0% 50%;}
        100%{background-position:200% 50%;}
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

    `;

    document.head.appendChild(style);

    function showPopup(){

        if(document.getElementById("email-block-popup")) return;

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

            <button class="email-popup-btn" id="closeEmailPopup">
                OK
            </button>

        </div>

        `;

        document.body.appendChild(popup);

        document
        .getElementById("closeEmailPopup")
        .onclick = function(){

            popup.remove();

        };

    }

    document.addEventListener("focusout", function(e){

        const target = e.target;

        if(target.tagName === "INPUT"){

            const value = target.value
            .trim()
            .toLowerCase();

            if(blockedEmails.includes(value)){

                target.value = "";

                setTimeout(()=>{
                    showPopup();
                },100);

            }

        }

    });

})();
