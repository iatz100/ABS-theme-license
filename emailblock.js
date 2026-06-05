//==========================================================
// Email Blocker - Ali Book Shop
// GitHub Controlled System
// Final Fixed Version
//==========================================================

(function() {
    'use strict';

    //==========================================================
    // GitHub JSON URL (আপনার JSON ফাইলের লিংক দিন)
    //==========================================================
    const GITHUB_EMAILS_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';
    
    // ক্যাশে সময় (মিনিট)
    const CACHE_MINUTES = 3;
    
    let blockedEmails = [];
    let lastFetched = 0;

    //==========================================================
    // ফেচ ব্লকড ইমেইল
    //==========================================================
    async function fetchBlockedEmails() {
        const now = Date.now();

        // ক্যাশে চেক
        if (blockedEmails.length > 0 && (now - lastFetched) < CACHE_MINUTES * 60 * 1000) {
            return blockedEmails;
        }

        try {
            const response = await fetch(GITHUB_EMAILS_URL + '?t=' + now, {
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }

            const data = await response.json();

            if (data && Array.isArray(data.emails)) {
                blockedEmails = data.emails.map(e => e.trim().toLowerCase());
                lastFetched = now;
                console.log('[EmailBlocker] Loaded:', blockedEmails.length, 'emails');
            } else {
                throw new Error('Invalid JSON');
            }

        } catch (error) {
            console.error('[EmailBlocker] Error:', error);
            // ফ্যালব্যাক লিস্ট
            if (blockedEmails.length === 0) {
                blockedEmails = ['rubelour@gmail.com', 'spam1@gmail.com', 'bdveo47@gmail.com'];
            }
        }

        return blockedEmails;
    }

    //==========================================================
    // ইমেইল চেক (এক্সাক্ট ম্যাচ)
    //==========================================================
    async function isEmailBlocked(email) {
        if (!email) return false;
        const emailLower = email.trim().toLowerCase();
        const blocked = await fetchBlockedEmails();
        
        // এক্সাক্ট ম্যাচ - পুরো ইমেইল ম্যাচ করতে হবে
        return blocked.includes(emailLower);
    }

    //==========================================================
    // পপআপ দেখানো
    //==========================================================
    function showBlockedPopup(email) {
        if (document.getElementById('email-block-popup')) return;

        const popup = document.createElement('div');
        popup.id = 'email-block-popup';
        popup.innerHTML = `
            <div class="email-popup-overlay"></div>
            <div class="email-popup-box">
                <div class="email-popup-icon">🚫</div>
                <h2>Email Blocked</h2>
                <p><strong style="color:#ff6b6b;word-break:break-all;">${escapeHtml(email)}</strong><br><br>এই Gmail দিয়ে Order করা যাবে না।</p>
                <button id="closeEmailPopup">বুঝেছি</button>
            </div>
            <style>
                #email-block-popup{position:fixed;inset:0;display:flex;justify-content:center;align-items:center;z-index:999999999;padding:20px;font-family:sans-serif;}
                .email-popup-overlay{position:absolute;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(8px);}
                .email-popup-box{position:relative;width:100%;max-width:380px;background:rgba(15,23,42,.96);border-radius:30px;padding:34px 24px;text-align:center;z-index:2;box-shadow:0 15px 45px rgba(0,0,0,.45);animation:popupShow .35s ease;}
                .email-popup-box::before{content:"";position:absolute;inset:0;padding:2px;border-radius:30px;background:linear-gradient(90deg,#2563eb,#7c3aed,#06b6d4,#2563eb);background-size:300% 300%;animation:borderRun 4s linear infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
                .email-popup-icon{font-size:58px;margin-bottom:16px;}
                .email-popup-box h2{color:#fff;font-size:26px;margin:0 0 14px;font-weight:700;}
                .email-popup-box p{color:#d1d5db;font-size:14px;line-height:1.9;margin-bottom:26px;}
                #closeEmailPopup{padding:12px 28px;border:none;border-radius:14px;background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;font-size:14px;font-weight:700;cursor:pointer;}
                @keyframes borderRun{0%{background-position:0% 50%;}100%{background-position:200% 50%;}}
                @keyframes popupShow{from{opacity:0;transform:scale(.9);}to{opacity:1;transform:scale(1);}}
            </style>
        `;
        document.body.appendChild(popup);
        document.getElementById('closeEmailPopup').onclick = () => popup.remove();
        popup.querySelector('.email-popup-overlay').onclick = () => popup.remove();
    }

    // XSS প্রটেকশন
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;'));
    }

    //==========================================================
    // ইভেন্ট লিসেনার (ইনপুট ইভেন্ট - পারফরম্যান্স ভালো)
    //==========================================================
    function setupListeners() {
        // ইমেইল ফিল্ড গুলো সিলেক্ট করুন
        const emailSelectors = [
            'input[type="email"]',
            'input[name*="email" i]',
            'input[id*="email" i]',
            'input[class*="email" i]',
            '.contact-form-email',
            '#ContactForm1_contact-form-email',
            '.beracustomform-email',
            'textarea[class*="email"]'
        ].join(',');

        // ইনপুট ইভেন্ট (টাইপ করার সময়)
        document.addEventListener('input', function(e) {
            const target = e.target;
            if (target.matches && target.matches(emailSelectors)) {
                clearTimeout(target._emailTimeout);
                target._emailTimeout = setTimeout(async () => {
                    const value = target.value;
                    if (value && value.includes('@')) {
                        if (await isEmailBlocked(value)) {
                            target.value = '';
                            showBlockedPopup(value);
                        }
                    }
                }, 300);
            }
        });

        // ফর্ম সাবমিট ব্লক
        document.addEventListener('click', async function(e) {
            const submitBtn = e.target.closest('.contact-form-button-submit, #submit-order-btn, button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                const form = submitBtn.closest('form');
                if (form) {
                    const emailField = form.querySelector(emailSelectors);
                    if (emailField && emailField.value) {
                        if (await isEmailBlocked(emailField.value)) {
                            e.preventDefault();
                            e.stopPropagation();
                            emailField.value = '';
                            emailField.focus();
                            showBlockedPopup(emailField.value);
                            return false;
                        }
                    }
                }
            }
        }, true);
    }

    //==========================================================
    // ইনিশিয়ালাইজ
    //==========================================================
    async function init() {
        console.log('[EmailBlocker] Initializing...');
        await fetchBlockedEmails();
        setInterval(fetchBlockedEmails, CACHE_MINUTES * 60 * 1000);
        setupListeners();
        console.log('[EmailBlocker] Ready!');
    }

    // DOM রেডি হলে শুরু
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
