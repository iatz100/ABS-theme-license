//==========================================================
// Email Blocker - Ali Book Shop
// GitHub Controlled System
//==========================================================

(function() {
    'use strict';

    // GitHub JSON URL (এখানে আপনার JSON ফাইলের লিংক দিন)
    const GITHUB_EMAILS_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';
    
    const CACHE_MINUTES = 3;
    let blockedEmails = [];
    let lastFetched = 0;

    // ফেচ ব্লকড ইমেইল
    async function fetchBlockedEmails() {
        const now = Date.now();

        if (blockedEmails.length > 0 && (now - lastFetched) < CACHE_MINUTES * 60 * 1000) {
            return blockedEmails;
        }

        try {
            const response = await fetch(GITHUB_EMAILS_URL + '?t=' + now, {
                cache: 'no-store'
            });

            if (!response.ok) throw new Error('HTTP ' + response.status);

            const data = await response.json();

            if (data && Array.isArray(data.emails)) {
                blockedEmails = data.emails.map(e => e.trim().toLowerCase());
                lastFetched = now;
                console.log('[EmailBlocker] Loaded:', blockedEmails.length);
            }
        } catch (error) {
            console.error('[EmailBlocker] Error:', error);
        }
        return blockedEmails;
    }

    // ইমেইল চেক
    async function isBlocked(email) {
        if (!email) return false;
        const blocked = await fetchBlockedEmails();
        return blocked.includes(email.trim().toLowerCase());
    }

    // পপআপ দেখানো
    function showPopup(email) {
        if (document.getElementById('email-block-popup')) return;
        
        const popup = document.createElement('div');
        popup.id = 'email-block-popup';
        popup.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:white;padding:30px;border-radius:16px;text-align:center;max-width:350px;animation:popupFade 0.3s ease;">
                    <div style="font-size:50px;margin-bottom:10px;">🚫</div>
                    <h3 style="margin:0 0 10px;color:#333;">Email Blocked!</h3>
                    <p><strong style="color:#ff4444;">${escapeHtml(email)}</strong></p>
                    <p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p>
                    <button id="closePopup" style="background:#ef4444;border:none;padding:10px 25px;border-radius:25px;color:white;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button>
                </div>
            </div>
            <style>@keyframes popupFade{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}</style>
        `;
        document.body.appendChild(popup);
        document.getElementById('closePopup').onclick = () => popup.remove();
        popup.querySelector('div').onclick = (e) => { if(e.target === popup.querySelector('div')) popup.remove(); };
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;'));
    }

    // লিসেনার সেটআপ
    function setup() {
        // ইনপুট চেক
        document.addEventListener('input', function(e) {
            const target = e.target;
            const isEmail = target.type === 'email' || 
                           (target.name && target.name.toLowerCase().includes('email')) ||
                           (target.id && target.id.toLowerCase().includes('email')) ||
                           target.classList?.contains('contact-form-email');
            
            if (isEmail && target.value && target.value.includes('@')) {
                clearTimeout(target._timer);
                target._timer = setTimeout(async () => {
                    if (await isBlocked(target.value)) {
                        target.value = '';
                        showPopup(target.value);
                    }
                }, 300);
            }
        });

        // সাবমিট ব্লক
        document.addEventListener('click', async function(e) {
            const btn = e.target.closest('.contact-form-button-submit, #submit-order-btn, button[type="submit"], input[type="submit"]');
            if (btn) {
                const form = btn.closest('form');
                if (form) {
                    const emailField = form.querySelector('input[type="email"], input[name*="email" i], .contact-form-email');
                    if (emailField && emailField.value && await isBlocked(emailField.value)) {
                        e.preventDefault();
                        showPopup(emailField.value);
                        emailField.value = '';
                        emailField.focus();
                    }
                }
            }
        }, true);
    }

    // শুরু করুন
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { fetchBlockedEmails(); setup(); });
    } else {
        fetchBlockedEmails();
        setup();
    }

})();
