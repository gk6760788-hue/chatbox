const API_KEY = "YOUR_API_KEY"; // 🔴 Put your API key here

async function sendMessage() {
    let input = document.getElementById("messageInput");
    let message = input.value.trim();

    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    // Show typing...
    let typingMsg = addMessage("Typing...", "bot");

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        let reply = data.choices[0].message.content;

        typingMsg.remove();
        addMessage(reply, "bot");

    } catch (error) {
        typingMsg.remove();
        addMessage("Error: Unable to connect API", "bot");
        console.error(error);
    }
}

function addMessage(text, type) {
    let chatBox = document.getElementById("chatBox");

    let msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;

    return msg;
} 