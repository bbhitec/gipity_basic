//
//    @author [bbht]
//    @brief  basic script to use OpenAI API endpoints
//
//    usage:
//      paste your API KEY in place of the $OPENAI_API_KEY
//      edit the input prompt
//      then run in node: node ./gipity_<variation>.js
//
//    @version 2023.12
//



// define personal API key. should be moved to enclosed location
const OPENAI_API_KEY = ""


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


// a simple API communication for completion type generation
// [demo] temperature and top_p dictate how deterministic the results will be, not the creativity score
// [demo] since we have to wait for the fetch directive, this enclosing function is to be asynchronous
// // the token (api key) and the model must be defined in the request
// all models are listed here: https://platform.openai.com/docs/models/overview
//
async function fetchDataCompletion() {
    const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            // prompt: "hello, how are you today?",
            prompt: "what is the circumference of earth?",
            max_tokens: 17
        })
    })

    // [demo] async method needs to be awaited
    // [wip][here] work with json and files
    const data = await res.json()
    console.log(data)
    // const pretty_res = JSON.parse(data)
    // console.log(pretty_res.data[0])

    // an option to save json to file
    download(JSON.stringify(data), 'json.txt', 'text/plain');
    console.log("JSON written to file")
    // var fs = require('fs');
    // fs.writeFile("res.json", data, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log("JSON written to file")
    //     }
    // });
}


// [demo] the chat completion model can recieve multiple messages with a defined role: user/assistant
async function fetchDataChat() {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            // [demo] chat models use a message object and role+content members
            messages: [
                {
                    role: "user",
                    content: "hello, what are 100 km in miles?",
                }
                // another message be added come here
            ]
        })
    })

    const data = await res.json()
    console.log(data)
}



// manual calls for testing
// fetchDataCompletion()
// fetchDataChat()
