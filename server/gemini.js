const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const gemini_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

const geminiResponse=async(command,userName,assistantName)=>{
  console.log(command)
 try {
  const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.

You are not Google. You will now behave like a voice-enabled assistant.


Your task is to understand the user's natural language input and respond with a JSON object like this:
{
"type": "general" | "google-search" | "youtube-search" | "youtube-play" |

"get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",

"userinput": "<original user input>" (only remove your name from userinput if exists) and agar kisi ne google ya youtube pe kuch search karne ko bola hai te

userInput me only bo search baala text jaye,

"response": "<a short spoken response to read out loud to the user>"

}
Instructions:

-"type": determine the intent of the user.
-"userInput": original sentence the user spoke.
-"response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
-"general": if it's a factual or informational question.
-"google-search": if user wants to search something on Google
-"youtube-search": if user wants to search something on YouTube. -"youtube-play": if user wants to directly play a video or song.
-"calculator-open": if user wants to open a calculator
-"instagram-open": if user wants to open instagram.
-"facebook-open"; if user wants to open facebook.
-"weather-show": if user wants to know weather
-"get-time": if user wants to know the time
-"get-date": if user wants to know the date
-"get-day": if user wants to know the day
-"get-month": if user wants to know the month


important:
-use  ${userName} agar koi puche tume kisne banaya hai 
-only respond with json object, nothing else.

now your userInput-${command}
`;
  const response=await fetch(gemini_Url,{
    method:"POST",
    headers:{
      "x-goog-api-key": GEMINI_API_KEY,
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      contents:[
        {
          parts:[
            {
              text:prompt
            }
          ]
        }
      ]
    })
  })
  const result = await response.json();
  
  if (result.error) {
    if (result.error.status === "RESOURCE_EXHAUSTED" || result.error.code === 429) {
      console.error("Gemini API Rate Limit Exceeded:", result.error.message);
      return `{"type":"general", "userInput":"${command}", "response":"I'm currently receiving too many requests. Please try again in about 30 seconds."}`;
    }
    console.error("Gemini API Error Response:", JSON.stringify(result.error, null, 2));
    return `{"type":"general", "userInput":"${command}", "response":"I experienced an internal API error. Please try again later."}`;
  }

  if (!result.candidates || result.candidates.length === 0) {
    console.error("Gemini API returned an unexpected format:", JSON.stringify(result, null, 2));
    return `{"type":"general", "userInput":"${command}", "response":"I'm sorry, I couldn't process that due to an API error."}`;
  }
  
  if (!result.candidates[0].content) {
     console.error("Gemini API returned a candidate without content (possibly a safety block):", JSON.stringify(result.candidates[0], null, 2));
     return `{"type":"general", "userInput":"${command}", "response":"I'm sorry, I cannot process this request due to safety filters."}`;
  }

  const data = result.candidates[0].content.parts[0].text;
  return data;
 } catch (error) {
  console.error("Gemini API Error:", error);
  return `{"type":"general", "userInput":"${command}", "response":"Failed to connect to the AI service."}`;
 } 
}

export default geminiResponse