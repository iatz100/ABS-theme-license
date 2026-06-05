//==========================================================
// Email Blocker - Ali Book Shop
// Live Detect + GitHub Control
//==========================================================
(function() {
    'use strict';
    
    let blockedEmails = [];
    let jsonLoaded = false;
    
    // GitHub থেকে লিস্ট লোড
    fetch('https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json?v=' + Date.now())
        .then(res => res.json())
        .then(data => {
            if(data && data.emails) {
                blockedEmails = data.emails.map(e => e.toLowerCase());
                jsonLoaded = true;
                console.log('[OK] Blocked emails:', blockedEmails.length);
            }
        })
        .catch(err => console.error('[Error]', err));
    
    function isBlocked(email) {
        if(!email || !jsonLoaded) return false;
        return blockedEmails.includes(email.toLowerCase().trim());
    }
    
    function showPopup(email) {
        let old = document.getElementById('absEmailPopup');
        if(old) old.remove();
        
        let div = document.createElement('div');
        div.id = 'absEmailPopup';
        div.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999999;display:flex;justify-content:center;align-items:center;"><div style="background:#fff;padding:25px;border-radius:16px;text-align:center;max-width:350px;margin:20px;"><div style="font-size:50px;">🚫</div><h3 style="margin:10px 0;">Email Blocked!</h3><p style="color:#e74c3c;word-break:break-all;"><strong>' + escapeHtml(email) + '</strong></p><p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p><button onclick="document.getElementById(\'absEmailPopup\').remove()" style="background:#e74c3c;border:none;padding:10px 25px;border-radius:25px;color:#fff;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button></div></div>';
        document.body.appendChild(div);
    }
    
    function escapeHtml(s) {
        if(!s) return '';
        return s.replace(/[&<>]/g, m => m=='&'?'&amp;':(m=='<'?'&lt;':'&gt;'));
    }
    
    // লাইভ ডিটেক্ট - সব ইমেইল ফিল্ডে
    function liveDetect() {
        let allInputs = document.querySelectorAll('input, textarea');
        for(let i = 0; i < allInputs.length; i++) {
            let input = allInputs[i];
            let isEmail = (input.type === 'email') || 
                          (input.name && input.name.toLowerCase().indexOf('email') !== -1) ||
                          (input.id && input.id.toLowerCase().indexOf('email') !== -1);
            
            if(isEmail && !input.hasAttribute('data-abs-block')) {
                input.setAttribute('data-abs-block', 'true');
                
                // মূল ইভেন্ট
                input.addEventListener('input', function(e) {
                    let val = this.value;
                    if(val && val.indexOf('@') !== -1 && isBlocked(val)) {
                        this.value = '';
                        showPopup(val);
                    }
                });
                
                input.addEventListener('change', function(e) {
                    let val = this.value;
                    if(val && val.indexOf('@') !== -1 && isBlocked(val)) {
                        this.value = '';
                        showPopup(val);
                    }
                });
            }
        }
    }
    
    // চেকআউট বাটনে ক্লিক চেক
    document.addEventListener('click', function(e) {
        let btn = e.target.closest('.contact-form-button-submit, #submit-order-btn, .simpleCart_checkout, button[type="submit"]');
        if(btn) {
            setTimeout(function() {
                let form = btn.closest('form');
                if(form) {
                    let emailField = form.querySelector('input[type="email"], input[name*="email" i]');
                    if(emailField && emailField.value && isBlocked(emailField.value)) {
                        e.preventDefault();
                        showPopup(emailField.value);
                        emailField.value = '';
                    }
                }
            }, 50);
        }
    }, true);
    
    // প্রতি 500ms লাইভ ডিটেক্ট
    setInterval(liveDetect, 500);
    
    // ফর্ম সাবমিট ব্লক
    document.addEventListener('submit', function(e) {
        let form = e.target;
        let emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i]');
        for(let f of emailFields) {
            if(f.value && isBlocked(f.value)) {
                e.preventDefault();
                e.stopPropagation();
                showPopup(f.value);
                f.value = '';
                return false;
            }
        }
    }, true);
    
    console.log('[EmailBlocker] Live Detect Active');
})();
