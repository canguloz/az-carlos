/**
 * AZCONSULTING Enhancements
 * Handles Dark Mode, FAQ Accordion, Blog Filters, and Premium Chatbot Widget
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. DARK MODE
       ========================================== */
    const darkModeBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeBtn ? darkModeBtn.querySelector('i') : null;

    // Check LocalStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            if (isDark) {
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    /* ==========================================
       2. FAQ ACCORDION
       ========================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other items (optional, but good UX)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('open')) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Toggle current
                item.classList.toggle('open');
            });
        }
    });

    /* ==========================================
       3. BLOG FILTERS
       ========================================== */
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    const blogCols = document.querySelectorAll('.blog-col');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            blogCols.forEach(col => {
                const category = col.getAttribute('data-category');
                const card = col.querySelector('.blog-card');

                if (filterValue === 'all' || category === filterValue) {
                    col.classList.remove('d-none-filter');
                    card.classList.remove('hidden');
                    card.style.opacity = '';
                    card.style.transform = '';
                } else {
                    card.classList.add('hidden');
                    col.classList.add('d-none-filter');
                }
            });

            if (window.AOS) {
                setTimeout(() => AOS.refresh(), 100);
            }
        });
    });

    /* ==========================================
       4. PREMIUM CHATBOT WIDGET
       ========================================== */
    const chatFab = document.getElementById('azChatFab');
    const chatPanel = document.getElementById('azChatPanel');
    const chatClose = document.getElementById('azChatClose');
    const chatMessages = document.getElementById('azChatMessages');
    const chatInput = document.getElementById('azChatInput');
    const chatSend = document.getElementById('azChatSend');
    const suggestions = document.querySelectorAll('.az-chat-suggestion');
    
    const WORKER_URL = 'https://divine-mouse-ebab.juandavidriverahuancas0.workers.dev';
    let isTyping = false;

    // Toggle Panel
    if (chatFab && chatPanel && chatClose) {
        chatFab.addEventListener('click', () => {
            chatPanel.classList.add('open');
            chatFab.style.transform = 'scale(0)';
            setTimeout(() => { chatInput.focus(); }, 300);
        });

        chatClose.addEventListener('click', () => {
            chatPanel.classList.remove('open');
            chatFab.style.transform = 'scale(1)';
        });
    }

    // Suggestions click
    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent;
            chatInput.value = text;
            sendMessage();
        });
    });

    // Send Message Event
    if (chatSend && chatInput) {
        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `az-chat-msg ${sender}`;
        
        // Format bold text if it's from bot
        if (sender === 'bot') {
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Format fallback questions line (separated by ||)
            if (text.includes('||')) {
                const parts = text.split('\n');
                let mainText = [];
                let suggestionText = '';
                
                for(let part of parts) {
                    if(part.includes('||')) {
                        suggestionText = part;
                    } else {
                        mainText.push(part);
                    }
                }
                
                text = mainText.join('<br>');
                
                // Update suggestion buttons
                if(suggestionText) {
                    updateSuggestions(suggestionText);
                }
            } else {
                 text = text.replace(/\n/g, '<br>');
            }
        }
        
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }
    
    function updateSuggestions(rawString) {
        const questions = rawString.split('||').map(q => q.trim()).filter(q => q);
        const suggContainer = document.getElementById('azChatSuggestions');
        if(!suggContainer || questions.length === 0) return;
        
        suggContainer.innerHTML = '';
        questions.forEach(q => {
            const btn = document.createElement('button');
            btn.className = 'az-chat-suggestion';
            btn.textContent = q;
            btn.addEventListener('click', () => {
                chatInput.value = q;
                sendMessage();
            });
            suggContainer.appendChild(btn);
        });
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'az-chat-typing';
        typingDiv.id = 'chatTypingIndicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTyping() {
        const indicator = document.getElementById('chatTypingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text || isTyping) return;

        // User message
        appendMessage('user', text);
        chatInput.value = '';
        
        // Hide previous suggestions while typing
        const suggContainer = document.getElementById('azChatSuggestions');
        if(suggContainer) suggContainer.innerHTML = '';

        isTyping = true;
        showTyping();

        try {
            // Include basic instructions to ensure the bot responds properly
            const payload = {
                message: text,
                history: []
            };

            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Error en la API');

            const data = await response.json();
            hideTyping();
            
            // Extract bot response
            let botReply = "No pude procesar tu solicitud. ¿Puedes intentar de nuevo?";
            
            if (data.reply) {
                botReply = data.reply;
            } else if (data.response) {
                botReply = data.response;
            } else if (data.content) {
                botReply = data.content;
            }

            appendMessage('bot', botReply);

        } catch (error) {
            console.error('Chat error:', error);
            hideTyping();
            appendMessage('bot', 'Ups, tuvimos un problema de conexión. Por favor, intenta de nuevo o escríbenos a WhatsApp.');
        } finally {
            isTyping = false;
        }
    }

    /* ==========================================
        6. MENÚ MOBILE — BACKDROP
        ========================================== */
    const menuEl = document.getElementById('menu');
    let menuHideTimer = null;
    if (menuEl) {
        menuEl.addEventListener('show.bs.collapse', () => {
            if (menuHideTimer) {
                clearTimeout(menuHideTimer);
                menuHideTimer = null;
            }
            menuEl.classList.remove('menu-exit');
            document.body.classList.add('menu-open');
        });
        menuEl.addEventListener('hide.bs.collapse', () => {
            menuEl.classList.add('menu-exit');
            menuHideTimer = setTimeout(() => {
                document.body.classList.remove('menu-open');
            }, 500);
        });
        menuEl.addEventListener('hidden.bs.collapse', () => {
            if (menuHideTimer) {
                clearTimeout(menuHideTimer);
                menuHideTimer = null;
            }
            menuEl.classList.remove('menu-exit');
            document.body.classList.remove('menu-open');
        });
    }

    /* Clic fuera del menú lo cierra */
    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('menu-open')) return;
        const nav = document.querySelector('.custom-navbar');
        if (nav && !nav.contains(e.target)) {
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler) toggler.click();
        }
    });

    /* Cerrar menú al tocar un nav-link (mobile) */
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('menu');
            if (menu && menu.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                if (toggler) toggler.click();
            }
        });
    });

    /* ==========================================
        7. FAQ TEXT LIFT ON HOVER
        ========================================== */
    
});
