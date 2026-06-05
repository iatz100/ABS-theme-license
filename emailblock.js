//==========================================================
// Email Blocker - Ali Book Shop (GitHub Version)
//==========================================================
(function() {
    'use strict';

    const JSON_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';
    let blockedEmails = [];
    let isReady = false;

    // ব্লকড ইমেইল লিস্ট লোড
    async function loadBlockedList() {
        try {
            const res = await fetch(JSON_URL + '?t=' + Date.now());
            const data = await res.json();
            if (data && Array.isArray(data.emails)) {
                blockedEmails = data.emails.map(e => e.toLowerCase());
                isReady = true;
                console.log('[EmailBlocker] Ready -', blockedEmails.length, 'emails');
                return true;
            }
        } catch(e) {
            console.error('[EmailBlocker] Error:', e);
        }
        return false;
    }

    function isBlocked(email) {
        if (!email || !isReady) return false;
        return blockedEmails.includes(email.toLowerCase().trim());
    }

    function showPopup(email) {
        let pop = document.getElementById('ghEmailBlocker');
        if(pop) pop.remove();
        
        pop = document.createElement('div');
        pop.id = 'ghEmailBlocker';
        pop.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:#fff;padding:25px;border-radius:16px;text-align:center;max-width:350px;margin:20px;box-shadow:0 10px 40px rgba(0,0,0,0.3);">
                    <div style="font-size:50px;">🚫</div>
                    <h3 style="margin:10px 0;">Email Blocked!</h3>
                    <p style="color:#e74c3c;word-break:break-all;"><strong>${escapeHtml(email)}</strong></p>
                    <p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p>
                    <button onclick="document.getElementById('ghEmailBlocker').remove()" style="background:#e74c3c;border:none;padding:10px 25px;border-radius:25px;color:#fff;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(pop);
    }

    function escapeHtml(s) {
        if(!s) return '';
        return s.replace(/[&<>]/g, m => m=='&'?'&amp;':(m=='<'?'&lt;':'&gt;'));
    }

    // ডাইনামিকভাবে ইভেন্ট লিসেনার যোগ করা
    function setupListeners() {
        // সব ইমেইল ফিল্ড চেক করা
        const checkEmailFields = () => {
            if(!isReady) return;
            const allInputs = document.querySelectorAll('input, textarea');
            for(let input of allInputs) {
                if(input.type === 'email' || (input.name && input.name.toLowerCase().includes('email'))) {
                    if(!input.hasAttribute('data-email-blocker')) {
                        input.setAttribute('data-email-blocker', 'true');
                        
                        // ইভেন্ট লিসেনার যোগ
                        input.addEventListener('input', function() {
                            if(this.value && this.value.includes('@') && isBlocked(this.value)) {
                                this.value = '';
                                showPopup(this.value);
                            }
                        });
                        
                        input.addEventListener('blur', function() {
                            if(this.value && this.value.includes('@') && isBlocked(this.value)) {
                                this.value = '';
                                showPopup(this.value);
                            }
                        });
                    }
                }
            }
        };
        
        // প্রতি 1 সেকেন্ডে নতুন ফিল্ড চেক করা
        setInterval(checkEmailFields, 1000);
        
        // ফর্ম সাবমিট ব্লক
        document.addEventListener('submit', function(e) {
            if(!isReady) return;
            let form = e.target;
            let emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i]');
            for(let f of emailFields) {
                if(f.value && isBlocked(f.value)) {
                    e.preventDefault();
                    e.stopPropagation();
                    showPopup(f.value);
                    f.value = '';
                    f.focus();
                    return false;
                }
            }
        }, true);
    }

    // শুরু করা
    (async function() {
        await loadBlockedList();
        setupListeners();
        // প্রতি 5 মিনিট পর লিস্ট আপডেট
        setInterval(loadBlockedList, 5 * 60 * 1000);
    })();
})();
