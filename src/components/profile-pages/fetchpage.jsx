import { useEffect } from "react"

export default function Fetch(){

    useEffect(() => {
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "HTTP-Referer": "https://your-site.com",
        "X-Title": "Your Site Title",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "user",
            content: "Lenovo essential əsas xüsusiyyətlərin yaz"
          }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("AI Cevap:", data?.choices[0].message.content);
    })
    .catch(err => {
      console.error("Hata:", err);
    });
  }, []);
    return(
        <div>
            Hello
        </div>
    )
}