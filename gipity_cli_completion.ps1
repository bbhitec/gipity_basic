<#
.SYNOPSIS
	basic script to use OpenAI API endpoints
.DESCRIPTION
    basic script to use OpenAI API endpoints
.EXAMPLE
	PS> ./gipity_<variation>.ps1 -apiKey "sk-..." -Prompt "how wide is Earth?"

    [bbht] OpenAI API interfacer
    Assistant: The Earth has a diameter of approximately 12,742 kilometers
.LINK
	https://github.com/bbhitec/gipity_basic
.NOTES
	@author [bbht]
    @version 2023.12
#>


# script parameters
Param(
        [Parameter(Mandatory = $true,Position = 0,HelpMessage = 'OpenAI API Token')]
        [ValidateNotNullorEmpty()]
        [String]$apiKey,
        [Parameter(Mandatory = $true,Position = 1,HelpMessage = 'Prompt message')]
        [ValidateNotNullorEmpty()]
        [String]$Prompt
    )




# open ai api invoking function
function Invoke-OpenAISummarize {
    param(
        [string]$apiKey,
        [string]$prompt = "Whats the distance to the moon?",
        [int]$maxTokens = 20,
        [string]$engine = 'gpt-3.5-turbo-instruct'
    )
    # You can add or remove parameters as per your requirements


    # preparing parameters
    # $apiKey = "" # the API can be manually set
    $uri = "https://api.openai.com/v1/completions"
    $headers = @{
        'Authorization' = "Bearer $apiKey"
        'Content-Type' = 'application/json'
    }
    # the body of the request must be in JSON
    $body = @{
        model = $engine
        prompt = $prompt
        max_tokens = $maxTokens
        temperature = 0
    } | ConvertTo-Json

    $parameters = @{
        Method      = 'POST'
        URI         = $uri
        Headers     = $headers
        Body        = $body
        ErrorAction = 'Stop'
    }

    # call the final function
    try {
        $response = Invoke-RestMethod @parameters
        return $response.choices[0].text.Trim()
    } catch {
        Write-Error "Failed to invoke OpenAI API: $_"
        return $null
    }
}


############ SCRIPT RUNTIME ############

# greeter message
Write-Host '[bbht] OpenAI API interfacer'
# pass parameters to the calling function
$response = Invoke-OpenAISummarize -apiKey $apiKey -prompt $Prompt
Write-Output "Assistant: $response"





