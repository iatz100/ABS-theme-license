document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("orderForm");

    form.addEventListener("submit", function(e){

        const blockedEmails = [
            "spam1@gmail.com",
            "spam2@gmail.com"
        ];

        const userEmail = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        if(blockedEmails.includes(userEmail)){

            e.preventDefault();

            alert("এই Email ব্লক করা আছে!");
            return false;
        }

    });

});
