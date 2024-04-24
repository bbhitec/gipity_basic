# Gipity - OpenAI Clients

##### _Basic version_

Tools to access OpenAI API using various languages. From JS level API calls to standalone scripts

## Gains/Feats/WIP

- Basic API treatment in JS (script and app)
    - [ ] deploy (with an API key field)?
- JSON manipulations
- Bash scripting: inputs, curl, grep
- Bash curl script
- Powershell (windows) script
    - Parametrize
- Powershell: Invoke and response manipulation, parametrization
- [ ] python script
- [ ] file manipulations in webApi and node.js?

![](https://shields.io/badge/-javascript-4377cb?logo=javascript)
![](https://shields.io/badge/-node.js-4377cb?logo=node.js)
![](https://shields.io/badge/-bash-4377cb?logo=gnubash)
![](https://shields.io/badge/-powershell-4377cb?logo=powershell)
![](https://shields.io/badge/-json-4377cb?logo=json)
![](https://shields.io/badge/-css-4377cb?logo=css3)



## Usage/How to run

*Intermediate: Create a personal API key and charge it with tokens at (https://platform.openai.com/api-keys) and define it in relates scripts*
- JS app: run html in any browser (access raw data via the source/console)
- Node.js: ```node .\gipity_cli_completion_plus.js```
- PowerShell: ```./gipity_<variation>.ps1 -apiKey "sk-..." -Prompt "..."```
- Bash: ```./gipity_<variation>.sh "<prompt string>"```