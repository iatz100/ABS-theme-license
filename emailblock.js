//==========================================================
// Email Blocker - Ali Book Shop
//==========================================================
(function() {
    'use strict';

    // GitHub JSON থেকে ব্লকড ইমেইল লিস্ট লোড করা
    const JSON_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';
    let blockedEmails = [];

    // ব্লকড ইমেইল লিস্ট ফেচ করা
    async function fetchBlockedEmails() {
        try {
            const res = await fetch(JSON_URL + '?t=' + Date.now(), { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            if (data && Array.isArray(data.emails)) {
                blockedEmails = data.emails.map(e => e.toLowerCase());
                console.log('[EmailBlocker] Loaded:', blockedEmails.length);
            }
        } catch(e) {
            console.error('[EmailBlocker] Fetch error:', e);
        }
    }

    // ইমেইল চেক করা
    function isBlocked(email) {
        if (!email) return false;
        return blockedEmails.includes(email.toLowerCase());
    }

    // HTML Escape
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            return m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;');
        });
    }

    // পপআপ দেখানো
    function showPopup(email) {
        let existing = document.getElementById('absEmailBlocker');
        if (existing) existing.remove();

        let div = document.createElement('div');
        div.id = 'absEmailBlocker';
        div.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:#fff;padding:25px;border-radius:16px;text-align:center;max-width:350px;margin:20px;">
                    <div style="font-size:48px;">🚫</div>
                    <h3 style="margin:10px 0;">Email Blocked!</h3>
                    <p style="color:#e74c3c;word-break:break-all;"><strong>${escapeHtml(email)}</strong></p>
                    <p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p>
                    <button onclick="document.getElementById('absEmailBlocker').remove()" style="background:#e74c3c;border:none;padding:10px 25px;border-radius:25px;color:#fff;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(div);
    }

    // ইমেইল ফিল্ডে লিসেনার
    function setupBlocker() {
        // ইনপুট ইভেন্ট
        document.addEventListener('input', function(e) {
            let t = e.target;
            if (t && (t.type === 'email' || (t.name && t.name.toLowerCase().includes('email')) || (t.id && t.id.toLowerCase().includes('email')))) {
                let val = t.value;
                if (val && val.includes('@') && isBlocked(val)) {
                    t.value = '';
                    showPopup(val);
                }
            }
        });

        // ব্লার ইভেন্ট
        document.addEventListener('blur', function(e) {
            let t = e.target;
            if (t && (t.type === 'email' || (t.name && t.name.toLowerCase().includes('email')) || (t.id && t.id.toLowerCase().includes('email')))) {
                let val = t.value;
                if (val && val.includes('@') && isBlocked(val)) {
                    t.value = '';
                    showPopup(val);
                }
            }
        }, true);

        // সাবমিট ব্লক
        document.addEventListener('submit', function(e) {
            let form = e.target;
            let emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i], input[id*="email" i]');
            for (let f of emailFields) {
                if (f.value && isBlocked(f.value)) {
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
    fetchBlockedEmails();
    setupBlocker();
    setInterval(fetchBlockedEmails, 5 * 60 * 1000);
})();
