# basic script to use OpenAI API
#   usage: paste your API KEY in place of the $OPENAI_API_KEY or use external variable
#   then run in powershell/command line: ./gipity_<variation>.sh "<prompt string>"

Write-Host '[mst] OpenAI API interfacer'

# invoking function
function Invoke-OpenAISummarize {
    param(
        [string]$apiKey,
        # [string]$textToSummarize,
        [int]$maxTokens = 20,
        [string]$engine = 'gpt-3.5-turbo-instruct'
    )
    # You can add or remove parameters as per your requirements
    
    
    # preparing parameters
    # $apiKey = ""
    # $uri = "https://api.openai.com/v1/engines/$engine/completions"
    $uri = "https://api.openai.com/v1/completions"
    $headers = @{
        'Authorization' = "Bearer $apiKey"
        'Content-Type' = 'application/json'
    }
    # the body of the request must be in JSON
    $body = @{
        model = $engine
        # prompt = "Summarize the following text: `"$textToSummarize`""
        prompt = "Whats the distance to the moon?"
        max_tokens = $maxTokens
        temperature = 0
        # n = 1
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
    
# manually call the calling function
$summary = Invoke-OpenAISummarize -apiKey ''
Write-Output "Summary: $summary"
