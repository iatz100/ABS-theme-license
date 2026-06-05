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
            const res = await fetch(JSON_URL + '?v=' + Date.now());
            const data = await res.json();
            blockedList = data.emails.map(e => e.toLowerCase());
            console.log('[OK] Blocked:', blockedList);
        } catch(e) {
            console.error('[Error]', e);
            blockedList = [];
        }
    }

    // চেক ফাংশন
    function isBlocked(email) {
        if (!email) return false;
        return blockedList.includes(email.toLowerCase());
    }

    // পপআপ
    function showPopup(email) {
        let pop = document.getElementById('abs-email-blocker');
        if(pop) pop.remove();
        
        pop = document.createElement('div');
        pop.id = 'abs-email-blocker';
        pop.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:#fff;padding:30px;border-radius:20px;text-align:center;max-width:350px;">
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

    function escapeHtml(s) {
        if(!s) return '';
        return s.replace(/[&<>]/g, m => m=='&'?'&amp;':(m=='<'?'&lt;':'&gt;'));
    }

    // ইভেন্ট লিসেনার
    function setup() {
        // ইনপুট চেক
        document.addEventListener('input', function(e) {
            let t = e.target;
            if(t.type === 'email' || (t.name && t.name.toLowerCase().includes('email'))) {
                if(t.value && t.value.includes('@') && isBlocked(t.value)) {
                    t.value = '';
                    showPopup(t.value);
                }
            }
        });

        // সাবমিট চেক
        document.addEventListener('submit', function(e) {
            let form = e.target;
            let emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i]');
            for(let f of emailFields) {
                if(f.value && isBlocked(f.value)) {
                    e.preventDefault();
                    showPopup(f.value);
                    f.value = '';
                    return false;
                }
            }
        }, true);
    }

    // শুরু করুন
    await loadBlockedList();
    setup();
    
    // প্রতি 5 মিনিট পর আপডেট
    setInterval(loadBlockedList, 5 * 60 * 1000);
})();
