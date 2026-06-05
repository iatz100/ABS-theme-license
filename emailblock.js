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
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            if (data && Array.isArray(data.emails)) {
                blockedList = data.emails.map(e => e.toLowerCase());
                console.log('[Email Blocker] Loaded:', blockedList.length, 'emails');
            } else {
                throw new Error('Invalid JSON format');
            }
        } catch(e) {
            console.error('[Email Blocker] Fetch error:', e);
            blockedList = [];
        }
    }

    // চেক ফাংশন
    function isBlocked(email) {
        if (!email) return false;
        return blockedList.includes(email.toLowerCase());
    }

    // HTML Escape (সঠিকভাবে)
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // পপআপ দেখানোর ফাংশন
    function showPopup(email) {
        let pop = document.getElementById('abs-email-blocker');
        if (pop) pop.remove();

        pop = document.createElement('div');
        pop.id = 'abs-email-blocker';
        pop.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:#fff;padding:30px;border-radius:20px;text-align:center;max-width:350px;margin:20px;">
                    <div style="font-size:60px;">⛔</div>
                    <h3>Email Blocked!</h3>
                    <p><strong style="color:red;">${escapeHtml(email)}</strong></p>
                    <p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p>
                    <button onclick="this.closest('#abs-email-blocker').remove()" style="background:#ef4444;border:none;padding:10px 25px;border-radius:25px;color:#fff;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(pop);
    }

    // ইভেন্ট লিসেনার সেটআপ
    function setupListeners() {
        // ইনপুট টাইপ করার সময় চেক
        document.addEventListener('input', function(e) {
            const t = e.target;
            const isEmailField = (t.type === 'email') || 
                                (t.name && t.name.toLowerCase().includes('email')) ||
                                (t.id && t.id.toLowerCase().includes('email'));
            
            if (isEmailField && t.value && t.value.includes('@')) {
                if (isBlocked(t.value)) {
                    t.value = '';
                    showPopup(t.value);
                }
            }
        });

        // ফর্ম সাবমিটের সময় চেক (সবচেয়ে জরুরি)
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i]');
            
            for (let field of emailFields) {
                if (field.value && isBlocked(field.value)) {
                    e.preventDefault();
                    e.stopPropagation();
                    showPopup(field.value);
                    field.value = '';
                    field.focus();
                    return false;
                }
            }
        }, true);

        // চেকআউট বাটনে ক্লিক চেক (অতিরিক্ত নিরাপত্তা)
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.contact-form-button-submit, #submit-order-btn, button[type="submit"], input[type="submit"]');
            if (btn) {
                setTimeout(() => {
                    const form = btn.closest('form');
                    if (form) {
                        const emailField = form.querySelector('input[type="email"], input[name*="email" i]');
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

    // ইনিশিয়ালাইজ
    await loadBlockedList();
    setupListeners();
    
    // প্রতি 5 মিনিট পর লিস্ট আপডেট
    setInterval(loadBlockedList, 5 * 60 * 1000);
    
    console.log('[Email Blocker] Active and running');
})();
