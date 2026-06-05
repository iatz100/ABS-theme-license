//==========================================================
// Email Blocker - Ali Book Shop (GitHub Controlled)
//==========================================================
(function() {
    'use strict';
    
    // GitHub JSON URL (আপনার রিপোজিটরির লিংক)
    const JSON_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';
    
    let blockedList = [];
    let isReady = false;
    
    // JSON লোড করা
    async function loadBlockedList() {
        try {
            const response = await fetch(JSON_URL + '?v=' + Date.now());
            const data = await response.json();
            if (data && Array.isArray(data.emails)) {
                blockedList = data.emails.map(e => e.toLowerCase());
                isReady = true;
                console.log('[OK] Blocked emails loaded:', blockedList.length);
                return true;
            }
        } catch(e) {
            console.error('[Error]', e);
            isReady = false;
        }
        return false;
    }
    
    function isBlocked(email) {
        if (!email || !isReady) return false;
        return blockedList.includes(email.toLowerCase().trim());
    }
    
    function showPopup(email) {
        let old = document.getElementById('githubEmailBlocker');
        if(old) old.remove();
        
        let div = document.createElement('div');
        div.id = 'githubEmailBlocker';
        div.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999999;display:flex;justify-content:center;align-items:center;">
                <div style="background:white;padding:25px;border-radius:16px;text-align:center;max-width:350px;margin:20px;">
                    <div style="font-size:50px;">🚫</div>
                    <h3 style="margin:10px 0;">Email Blocked!</h3>
                    <p style="color:red;word-break:break-all;"><strong>${escapeHtml(email)}</strong></p>
                    <p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p>
                    <button onclick="document.getElementById('githubEmailBlocker').remove()" style="background:#e74c3c;border:none;padding:10px 25px;border-radius:25px;color:white;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(div);
    }
    
    function escapeHtml(s) {
        if(!s) return '';
        return s.replace(/[&<>]/g, m => m=='&'?'&amp;':(m=='<'?'&lt;':'&gt;'));
    }
    
    // ইভেন্ট লিসেনার
    function setupBlocker() {
        // ডাইনামিক ফিল্ডের জন্য Interval
        setInterval(function() {
            if(!isReady) return;
            let inputs = document.querySelectorAll('input, textarea');
            for(let input of inputs) {
                let isEmailField = (input.type === 'email') || 
                                   (input.name && input.name.toLowerCase().includes('email')) ||
                                   (input.id && input.id.toLowerCase().includes('email'));
                
                if(isEmailField && !input.hasAttribute('data-gh-block')) {
                    input.setAttribute('data-gh-block', 'true');
                    
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
        }, 500);
        
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
        setupBlocker();
        setInterval(loadBlockedList, 5 * 60 * 1000);
    })();
})();
