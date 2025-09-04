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
            content: `You are a web research assistant. I will give you a variable device model name: ${"Samsung s25"}.

Your task:
1. Search online for the official or trusted information about this device model.
2. Return a JSON object containing all officially available manufacturing options for this model.

The JSON format must be:

{
  "model": "{{device_name}}",
  "colors": ["color1", "color2", ...],
  "rams": ["ram1", "ram2", ...],
  "storages": ["storage1", "storage2", ...]
}

Rules:
- Only include officially available options.
- Do not include guesses or unofficial information.
- Ensure the JSON is valid and parsable.
`
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