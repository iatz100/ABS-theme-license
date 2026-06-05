(function(){

    // Blocked Gmail List
    const blockedEmails = [
        "spam1@gmail.com",
        "spam2@gmail.com"
    ];

    // Only Run On Your Website
    if(location.hostname.includes("alibookshop.com")){

        document.addEventListener("submit", function(e){

            const emailInput = document.querySelector('input[type="email"]');

            if(!emailInput) return;

            const userEmail = emailInput.value
                .trim()
                .toLowerCase();

            if(blockedEmails.includes(userEmail)){

                e.preventDefault();
                e.stopImmediatePropagation();

                alert("এই Gmail দিয়ে Order করা যাবে না!");

                emailInput.focus();

                return false;
            }

        }, true);

    }

})();
