# Electricity App
Using React and Expressjs, this application runs locally. Fetches current Spot price. A user account can be created.

# Requirements
*	React,
*	Express, 
*	mongodb,
* Mocha
* Chai
* Sinon
 
# Useful commands
- `npm run dev`
- `npm test tests`
- `git pull`
- `git add`
- `git commit`
- `git push`
- `git checkout`

Powershell: 
```
$url = "http://localhost:3001/register"
$body = @{
  "email" = "monke2@monke2.org";
  "salis" = "monke2";
  "vahvistus" = "monke2"
} | ConvertTo-Json
Invoke-WebRequest -Uri $url -Method Post -Body $body -ContentType "application/json"
```
# Contributors
* [Runemies](https://github.com/Runemies)
* [Tatugh](https://github.com/Tatugh)
*	[dtepu](https://github.com/dtepu)
*	[Jenna](https://github.com/JennaHamarus)
*	[Tonasj](https://github.com/Tonasj)