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
            content: "Search the current second-hand price for an iPhone 12 in Azerbaijan by checking sites like kontakt.az, irshad.az, bakuelectronics.az, umico.az and similar. Return only the estimated average price in Azerbaijani Manat (₼) as a number without any text or symbols."
          }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("AI Cevap:", data.choices[0].message.content);
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