const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const gemini_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

const geminiResponse=async(command,userName,assistantName)=>{
  console.log(command)
 try {
  const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.

You are not Google. You will now behave like a voice-enabled assistant.


Your task is to understand the user's natural language input and respond with a JSON object like this:
{
"type": "general" | "google_search" | "youtube_search" | "youtube_play" |

"get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather-show",

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
-"google_search": if user wants to search something on Google
-"youtube search": if user wants to search something on YouTube. -"youtube_play": if user wants to directly play a video or song.
-"calculator_open": if user wants to open a calculator
-"instagram_open": if user wants to open instagram.
-"facebook_open"; if user wants to open facebook.
-"weather-show": if user wants to know weather
-"get_time": if user wants to know the time
-"get_date": if user wants to know the date
-"get_day": if user wants to know the day
-"get_month": if user wants to know the month


important:
-use"{author name}" agar koi puche tume kisne banaya hai 
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
  const data = result.candidates[0].content.parts[0].text;
  return data;
 } catch (error) {
  console.error("Gemini API Error:", error);
  return { error: "Failed to generate AI response." };
 } 
}

export default geminiResponse