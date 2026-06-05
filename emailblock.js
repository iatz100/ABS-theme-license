(function(){

    const blockedEmails = [
        "rubelour@gmail.com",
        "spam2@gmail.com"
    ];

    function showPopup(){

        if(document.getElementById("abs-license-popup")) return;

        const popup = document.createElement("div");

        popup.id = "abs-license-popup";

        popup.innerHTML = `

        <div class="abs-popup-overlay"></div>

        <div class="abs-popup-box">

            <div class="abs-popup-icon">⚠️</div>

            <h2>Email Blocked</h2>

            <p>
                এই Gmail দিয়ে Order করা যাবে না।
            </p>

            <a href="javascript:void(0)" id="closePopupBtn">
                OK
            </a>

        </div>

        `;

        document.body.appendChild(popup);

        document.getElementById("closePopupBtn")
        .onclick = function(){

            popup.remove();

        };

    }

    document.addEventListener("focusout", function(e){

        const target = e.target;

        if(target.tagName === "INPUT"){

            const value = target.value.trim().toLowerCase();

            if(blockedEmails.includes(value)){

                target.value = "";

                target.focus();

                showPopup();

            }

        }

    });

})();
