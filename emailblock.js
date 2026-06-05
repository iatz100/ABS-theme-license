//==========================================================
// Email Blocker - Ali Book Shop
// LocalStorage + GitHub Control
//==========================================================
(function() {
    'use strict';
    
    let blockedEmails = [];
    
    // GitHub থেকে লিস্ট আনবে (প্রথমবার)
    function loadFromGitHub() {
        fetch('https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json?v=' + Date.now())
            .then(res => res.json())
            .then(data => {
                if(data && data.emails) {
                    blockedEmails = data.emails.map(e => e.toLowerCase());
                    // localStorage এ সেভ করে রাখি
                    localStorage.setItem('blocked_emails', JSON.stringify(blockedEmails));
                    console.log('[GitHub] Loaded:', blockedEmails.length);
                }
            })
            .catch(err => {
                console.log('[GitHub] Failed, trying localStorage');
                // GitHub না পেলে localStorage থেকে নিবে
                let saved = localStorage.getItem('blocked_emails');
                if(saved) {
                    blockedEmails = JSON.parse(saved);
                    console.log('[LocalStorage] Loaded:', blockedEmails.length);
                }
            });
    }
    
    function isBlocked(email) {
        if(!email) return false;
        return blockedEmails.includes(email.toLowerCase().trim());
    }
    
    function showPopup(email) {
        let old = document.getElementById('absPopup');
        if(old) old.remove();
        
        let div = document.createElement('div');
        div.id = 'absPopup';
        div.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999999;display:flex;justify-content:center;align-items:center;"><div style="background:#fff;padding:25px;border-radius:16px;text-align:center;max-width:350px;margin:20px;"><div style="font-size:50px;">🚫</div><h3>Email Blocked!</h3><p style="color:#e74c3c;"><strong>' + escapeHtml(email) + '</strong></p><p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p><button onclick="this.closest(\'#absPopup\').remove()" style="background:#e74c3c;border:none;padding:10px 25px;border-radius:25px;color:#fff;cursor:pointer;">ঠিক আছে</button></div></div>';
        document.body.appendChild(div);
    }
    
    function escapeHtml(s) {
        if(!s) return '';
        return s.replace(/[&<>]/g, m => m=='&'?'&amp;':(m=='<'?'&lt;':'&gt;'));
    }
    
    // লাইভ ডিটেক্ট
    function liveDetect() {
        let inputs = document.querySelectorAll('input, textarea');
        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let isEmail = (input.type === 'email') || 
                          (input.name && input.name.toLowerCase().includes('email')) ||
                          (input.id && input.id.toLowerCase().includes('email'));
            
            if(isEmail && !input.hasAttribute('data-block')) {
                input.setAttribute('data-block', 'true');
                
                input.addEventListener('input', function() {
                    let val = this.value;
                    if(val && val.includes('@') && isBlocked(val)) {
                        this.value = '';
                        showPopup(val);
                    }
                });
            }
        }
    }
    
    // শুরু করা
    loadFromGitHub();
    setInterval(loadFromGitHub, 5 * 60 * 1000); // প্রতি 5 মিনিট
    setInterval(liveDetect, 500);
    liveDetect();
    
    // সাবমিট ব্লক
    document.addEventListener('submit', function(e) {
        let form = e.target;
        let emails = form.querySelectorAll('input[type="email"], input[name*="email" i]');
        for(let f of emails) {
            if(f.value && isBlocked(f.value)) {
                e.preventDefault();
                showPopup(f.value);
                f.value = '';
                return false;
            }
        }
    }, true);
})();
