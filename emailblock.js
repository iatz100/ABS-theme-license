(function(){

    const blockedEmails = [
        "spam1@gmail.com",
        "rubelour@gmail.com",
        "spam2@gmail.com"
    ];

    document.addEventListener("focusout", function(e){

        const target = e.target;

        if(target.tagName === "INPUT"){

            const value = target.value.trim().toLowerCase();

            if(blockedEmails.includes(value)){

                alert("এই Gmail দিয়ে Order করা যাবে না!");

                target.value = "";

                target.focus();
            }

        }

    });

})();
