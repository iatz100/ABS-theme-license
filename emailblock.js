(function(){

    const blockedEmails = [
        "spam1@gmail.com",
        "spam2@gmail.com"
    ];

    function blockEmail(input){

        const email = input.value.trim().toLowerCase();

        if(blockedEmails.includes(email)){

            alert("এই Gmail দিয়ে Order করা যাবে না!");

            input.value = "";
            input.blur();

            return true;
        }

        return false;
    }

    setInterval(function(){

        const emailInputs = document.querySelectorAll('input[type="email"]');

        emailInputs.forEach(function(input){

            input.onchange = function(){
                blockEmail(this);
            };

            input.onblur = function(){
                blockEmail(this);
            };

        });

    }, 1000);

})();
