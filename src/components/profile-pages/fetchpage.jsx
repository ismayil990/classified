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
            content: "Samsung A15 əsas texniki xüsusiyyətlərin yaz field:key formatinda.field hissesin azerbaycan dilinde yaz"
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