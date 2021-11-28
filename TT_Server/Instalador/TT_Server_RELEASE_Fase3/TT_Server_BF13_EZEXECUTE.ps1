# Cogemos la direccion deonde nos encontramos
$location = Get-Location 
$location = "$location\MessageStorage"

# Comprobamos si existe
$exist = Test-Path $location
if ($exist -eq $False)
{
    New-Item $location -ItemType Directory
}

# Corremos el Servidor
$server = ".\TT_SERVER_RELEASE_FASE3.jar"
java -jar "$server"