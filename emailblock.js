//==========================================================
// Email Blocker - Ali Book Shop (GitHub Controlled)
// Fixed: DOMContentLoaded issue
//==========================================================
(function() {
    'use strict';
    
    const JSON_URL = 'https://raw.githubusercontent.com/iatz100/ABS-theme-license/main/blocked-emails.json';
    let blockedList = [];
    let isReady = false;
    
    async function loadBlockedList() {
        try {
            const res = await fetch(JSON_URL + '?v=' + Date.now());
            const data = await res.json();
            if (data && Array.isArray(data.emails)) {
                blockedList = data.emails.map(e => e.toLowerCase());
                isReady = true;
                console.log('[EmailBlocker] Loaded:', blockedList.length);
            }
        } catch(e) {
            console.error('[EmailBlocker] Error:', e);
        }
    }
    
    function isBlocked(email) {
        if (!email || !isReady) return false;
        return blockedList.includes(email.toLowerCase().trim());
    }
    
    function showPopup(email) {
        let old = document.getElementById('ghEmailBlocker');
        if(old) old.remove();
        
        let div = document.createElement('div');
        div.id = 'ghEmailBlocker';
        div.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999999;display:flex;justify-content:center;align-items:center;"><div style="background:white;padding:25px;border-radius:16px;text-align:center;max-width:350px;margin:20px;"><div style="font-size:50px;">🚫</div><h3 style="margin:10px 0;">Email Blocked!</h3><p style="color:red;word-break:break-all;"><strong>' + escapeHtml(email) + '</strong></p><p>এই ইমেইল দিয়ে অর্ডার করা যাবে না।</p><button onclick="document.getElementById(\'ghEmailBlocker\').remove()" style="background:#e74c3c;border:none;padding:10px 25px;border-radius:25px;color:white;font-weight:bold;cursor:pointer;margin-top:10px;">ঠিক আছে</button></div></div>';
        document.body.appendChild(div);
    }
    
    function escapeHtml(s) {
        if(!s) return '';
        return s.replace(/[&<>]/g, function(m) {
            return m == '&' ? '&amp;' : (m == '<' ? '&lt;' : '&gt;');
        });
    }
    
    function setupBlocker() {
        // Check if document.body exists
        if (!document.body) {
            setTimeout(setupBlocker, 100);
            return;
        }
        
        // Listen for new email fields
        setInterval(function() {
            if(!isReady) return;
            var inputs = document.querySelectorAll('input, textarea');
            for(var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                var isEmailField = (input.type === 'email') || 
                                   (input.name && input.name.toLowerCase().indexOf('email') !== -1) ||
                                   (input.id && input.id.toLowerCase().indexOf('email') !== -1);
                
                if(isEmailField && !input.getAttribute('data-gh-block')) {
                    input.setAttribute('data-gh-block', 'true');
                    
                    input.addEventListener('input', function(e) {
                        var val = this.value;
                        if(val && val.indexOf('@') !== -1 && isBlocked(val)) {
                            this.value = '';
                            showPopup(val);
                        }
                    });
                    
                    input.addEventListener('blur', function(e) {
                        var val = this.value;
                        if(val && val.indexOf('@') !== -1 && isBlocked(val)) {
                            this.value = '';
                            showPopup(val);
                        }
                    });
                }
            }
        }, 1000);
        
        // Block form submit
        document.addEventListener('submit', function(e) {
            if(!isReady) return;
            var form = e.target;
            var emailFields = form.querySelectorAll('input[type="email"], input[name*="email" i]');
            for(var i = 0; i < emailFields.length; i++) {
                var f = emailFields[i];
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
    
    // DOM সম্পূর্ণ লোড হওয়ার পর শুরু করুন
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadBlockedList().then(function() {
                setupBlocker();
            });
            setInterval(loadBlockedList, 5 * 60 * 1000);
        });
    } else {
        loadBlockedList().then(function() {
            setupBlocker();
        });
        setInterval(loadBlockedList, 5 * 60 * 1000);
    }
})();
