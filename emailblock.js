//==========================================================
// Email Blocker - Ali Book Shop
//==========================================================
(async function() {
    'use strict';

    // আপনার GitHub JSON ফাইলের Raw URL
    const JSON_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';

    let blockedList = [];

    // JSON ফেচ করুন
    async function loadBlockedList() {
        try {
            const res = await fetch(JSON_URL + '?v=' + Date.now(), { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP error');
            const data = await res.json();
            if (data && Array.isArray(data.emails)) {
                blockedList = data.emails.map(e => e.toLowerCase());
                console.log('[Email Blocker] Loaded:', blockedList);
            } else {
                throw new Error('Invalid JSON');
            }
        } catch(e) {
            console.error('[Email Blocker] Error:', e);
            blockedList = [];
        }
    }

    // চেক ফাংশন
    function isBlocked(email) {
        if (!email) return false;
        return blockedList.includes(email.toLowerCase());
    }

    // পপআপ দেখানোর ফাংশন (একদম সিম্পল)
    function showPopup(email) {
        let pop = document.getElementById('abs-email-blocker');
        if(pop) pop.remove();

        pop = document.createElement('div');
        pop.id = 'abs-email-blocker';
        pop.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:#fff;padding:30px;border-radius:20px;text-align:center;max-width:350px;margin:20px;">
                    <div style="font-size:60px;">⛔</div>
                    <h3>Email Blocked!</h3>
                    <p><strong style="color:red;">${escapeHtml(email)}</strong></p>
                    <p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p>
                    <button onclick="this.closest('#abs-email-blocker').remove()" style="background:red;border:none;padding:10px 25px;border-radius:25px;color:#fff;cursor:pointer;">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(pop);
    }

    // সঠিকভাবে HTML escape করার ফাংশন
    function escapeHtml(s) {
        if(!s) return '';
        return s.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // ইভেন্ট লিসেনার
    function setup() {
        // 1. ইনপুট টাইপ করার সময় চেক
        document.addEventListener('input', function(e) {
            let t = e.target;
            if (t && (t.type === 'email' || (t.name && t.name.toLowerCase().includes('email')) || (t.id && t.id.toLowerCase().includes('email')))) {
                if (t.value && t.value.includes('@') && isBlocked(t.value)) {
                    t.value = '';
                    showPopup(t.value);
                }
            }
        });

        // 2. ফর্ম সাবমিটের সময় চেক (সবচেয়ে জরুরি)
        document.addEventListener('submit', function(e) {
            let form = e.target;
            let emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i], input[id*="email" i]');
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
        
        // 3. চেকআউট বাটনে ক্লিক চেক (সুবিধার্থে)
        document.addEventListener('click', function(e) {
            let btn = e.target.closest('.contact-form-button-submit, #submit-order-btn, button[type="submit"], input[type="submit"]');
            if (btn) {
                setTimeout(() => {
                    let form = btn.closest('form');
                    if (form) {
                        let emailField = form.querySelector('input[type="email"], input[name*="email" i]');
                        if (emailField && emailField.value && isBlocked(emailField.value)) {
                            e.preventDefault();
                            showPopup(emailField.value);
                            emailField.value = '';
                            emailField.focus();
                        }
                    }
                }, 50);
            }
        }, true);
    }

    // সব কিছু শুরু করুন
    await loadBlockedList();
    setup();
    setInterval(loadBlockedList, 5 * 60 * 1000);
})();
