// define personal API key. should be moved to enclosed location
const OPENAI_API_KEY = ""


// [demo] get a handle to in/output texts and the submit button
const submitButton = document.querySelector('#submit');
const promptText = document.querySelector('#input');
const outputText = document.querySelector('#output');

async function getMessage() {
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{role: "user", content: promptText.value}],
            max_tokens: 100
        })
    }

    try {
        res = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await res.json()
        console.log(data)
        outputText.textContent = data.choices[0].message.content
    }
    catch (err){
        console.error(err)
    }
}

// [demo] link a submit button to the sending function
submitButton.addEventListener('click', getMessage)