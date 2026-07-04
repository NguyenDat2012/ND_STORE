document.addEventListener("DOMContentLoaded", function () {
    
    
    const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const SYSTEM_INSTRUCTION = "Bạn là trợ lý AI chuyên nghiệp trực thuộc trang thông tin ND STORE. Hãy trả lời ngắn gọn, cô đọng về thiết bị khay dọn vệ sinh sức khỏe cho mèo thông minh bằng phong thái lịch thiệp.";

    const chatbotToggle = document.getElementById("chatbotToggle");
    const chatbotWindow = document.getElementById("chatbotWindow");
    const chatbotClose = document.getElementById("chatbotClose");
    const chatBody = document.getElementById("chatBody");
    const chatInput = document.getElementById("chatInput");
    const chatSendBtn = document.getElementById("chatSendBtn");


    if (chatbotToggle) chatbotToggle.addEventListener("click", () => chatbotWindow.classList.toggle("hidden"));
    if (chatbotClose) chatbotClose.addEventListener("click", () => chatbotWindow.classList.add("hidden"));

    function sendChatMessage() {
        const text = chatInput.value.trim();
        if(!text) return;
        
        appendMsg(text, 'user');
        chatInput.value = '';
        
        const loadingId = appendSkeletonLoading();

    
        fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                contents: [{ 
                    role: "user", 
                    parts: [{ text: `${SYSTEM_INSTRUCTION}\nKhách hàng hỏi: ${text}` }] 
                }] 
            })
        })
        .then(res => res.json())
        .then(data => {
            const skeletonEl = document.getElementById(loadingId);
            if(skeletonEl) skeletonEl.remove();
            
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const reply = data.candidates[0].content.parts[0].text;
                appendMsg(reply, 'bot');
            } else {
                appendMsg("Phản hồi rỗng từ máy chủ AI Studio. Xin thử lại câu hỏi khác.", 'bot');
            }
        })
        .catch(() => {
            const skeletonEl = document.getElementById(loadingId);
            if(skeletonEl) skeletonEl.remove();
            appendMsg("Không thể thiết lập kết nối đến mô hình Gemini. Hãy kiểm tra lại API Key.", 'bot');
        });
    }

    if(chatSendBtn) chatSendBtn.addEventListener("click", sendChatMessage);
    if(chatInput) chatInput.addEventListener("keypress", (e) => { if(e.key === 'Enter') sendChatMessage(); });

    function appendMsg(text, sender) {
        const d = document.createElement("div");
        d.className = `chat-bubble ${sender} p-3 rounded-4 mb-2 shadow-sm ${sender === 'user' ? 'bg-primary text-white ms-auto' : 'bg-white text-dark'}`;
        d.style.maxWidth = "85%";
        d.style.width = "fit-content";
        d.innerText = text;
        chatBody.appendChild(d);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendSkeletonLoading() {
        const id = "skeleton-" + Date.now();
        const d = document.createElement("div");
        d.id = id;
        d.className = "chat-bubble bot bg-white p-3 rounded-4 mb-2 border shadow-sm";
        d.style.width = "60%";
        d.innerHTML = `
            <div class="skeleton-loader">
                <div class="skeleton-line" style="width: 80%;"></div>
                <div class="skeleton-line" style="width: 50%;"></div>
            </div>
        `;
        chatBody.appendChild(d);
        chatBody.scrollTop = chatBody.scrollHeight;
        return id;
    }
});