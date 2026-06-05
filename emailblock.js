//==========================================================
// Email Blocker - Ali Book Shop
//==========================================================
(function() {
    'use strict';

    const JSON_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';
    let blockedEmails = [];

    // ফেচ ব্লকড ইমেইল
    async function fetchBlockedEmails() {
        try {
            const res = await fetch(JSON_URL + '?t=' + Date.now());
            const data = await res.json();
            if (data && Array.isArray(data.emails)) {
                blockedEmails = data.emails.map(e => e.toLowerCase());
                console.log('[EmailBlocker] Loaded:', blockedEmails);
            }
        } catch(e) {
            console.error('[EmailBlocker] Error:', e);
        }
    }

    // ইমেইল চেক
    function isBlocked(email) {
        if (!email) return false;
        return blockedEmails.includes(email.toLowerCase());
    }

    // HTML Escape (সঠিকভাবে)
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // পপআপ দেখানো
    function showPopup(email) {
        let existing = document.getElementById('emailBlockerPopup');
        if (existing) existing.remove();

        let popup = document.createElement('div');
        popup.id = 'emailBlockerPopup';
        popup.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:white;padding:25px;border-radius:16px;text-align:center;max-width:350px;margin:20px;">
                    <div style="font-size:50px;">🚫</div>
                    <h3 style="margin:10px 0;">Email Blocked!</h3>
                    <p><strong style="color:#e74c3c;word-break:break-all;">${escapeHtml(email)}</strong></p>
                    <p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p>
                    <button onclick="document.getElementById('emailBlockerPopup').remove()" style="background:#e74c3c;border:none;padding:10px 25px;border-radius:25px;color:white;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
    }

    // সব ইমেইল ফিল্ডে লিসেনার যোগ করা
    function addEmailListeners() {
        // সব ইনপুট ফিল্ডে ইভেন্ট (dynamic ফিল্ডের জন্যও)
        document.body.addEventListener('blur', function(e) {
            let target = e.target;
            if (target.type === 'email' || 
                (target.name && target.name.toLowerCase().includes('email')) ||
                (target.id && target.id.toLowerCase().includes('email'))) {
                let email = target.value;
                if (email && email.includes('@') && isBlocked(email)) {
                    target.value = '';
                    showPopup(email);
                }
            }
        }, true);

        document.body.addEventListener('input', function(e) {
            let target = e.target;
            if (target.type === 'email' || 
                (target.name && target.name.toLowerCase().includes('email')) ||
                (target.id && target.id.toLowerCase().includes('email'))) {
                let email = target.value;
                if (email && email.includes('@') && isBlocked(email)) {
                    target.value = '';
                    showPopup(email);
                }
            }
        });

        // ফর্ম সাবমিট ব্লক
        document.body.addEventListener('submit', function(e) {
            let form = e.target;
            let emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i], input[id*="email" i]');
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
    }

    // শুরু করুন
    fetchBlockedEmails();
    addEmailListeners();
    setInterval(fetchBlockedEmails, 5 * 60 * 1000);
})();
