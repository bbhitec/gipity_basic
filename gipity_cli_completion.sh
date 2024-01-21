#! /bin/bash

#
#    @author [bbht]
#    @brief  basic script to use OpenAI API endpoints
#
#    usage: paste your API KEY in place of the $OPENAI_API_KEY or use external variable
#    then run in bash: ./gipity_<variation>.sh "<prompt string>"
#
#    @version 2023.12
#



# check if arguments are passed or inquire a prompt
if [ $# -eq 0 ]
    then
        echo "No arguments supplied, input your prompt: "
        read prompt
    else
        prompt=$1
fi


# completions method
data='{
"model": "gpt-3.5-turbo-instruct",
"prompt": "'$prompt'",
"max_tokens": 17,
"temperature": 0
}'

curl https://api.openai.com/v1/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d "$data" \
| grep -Po '"text"\s*:\s*".*",'

# remove the greps to get the raw response json