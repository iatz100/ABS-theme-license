document.addEventListener("DOMContentLoaded", function(){

    const blockedEmails = [
        "spam1@gmail.com",
        "spam2@gmail.com"
    ];

    document.addEventListener("input", function(e){

        if(e.target.type === "email"){

            const email = e.target.value.trim().toLowerCase();

            if(blockedEmails.includes(email)){

                alert("এই Gmail ব্লক করা আছে!");

                e.target.value = "";
            }

        }

    });

});
