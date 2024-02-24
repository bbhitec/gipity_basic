// define personal API key. should be moved to enclosed location
const OPENAI_API_KEY = "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"

// [demo] get a handle to in/output texts and the submit button
const submitButton = document.querySelector('#submit');
const promptText = document.querySelector('#input');
const outputText = document.querySelector('#output');
const historySection = document.querySelector('.history')
const newChatButton = document.querySelector('.newchat-button')
var hasHistory = false

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
        const resMessage = data.choices[0].message.content

        // show the response to the user
        outputText.textContent = resMessage 

        // add answer to the history, if valid
        if (resMessage && promptText.value) {
            if (hasHistory === false) {
                const pElementTitle = document.createElement('p')
                pElementTitle.classList.add('history-title')
                pElementTitle.textContent = 'HISTORY'
                historySection.append(pElementTitle)
                hasHistory = true
            }
            const pElement = document.createElement('p')
            pElement.textContent = promptText.value
            // an option to recall the history on click
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historySection.append(pElement)
        }
    }
    catch (err){
        console.error(err)
    }
}


function changeInput (newValue) {
    promptText.value = newValue
}

// [demo] link a submit button to the sending function
submitButton.addEventListener('click', getMessage)

// add chat clearing functionality
newChatButton.addEventListener('click', () => changeInput(''))