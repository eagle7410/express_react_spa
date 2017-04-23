# express_react_spa

Sends letters to the specified user, to the specified address and texts. It also logs emails.

## How To Install
```bash
git clone https://github.com/eagle7410/express_react_spa.git
cd express_react_spa
npm install
node server.js
```
Need mongodb.
Have config file. Path to config file PROJECT_DIR/conf/index.json
Inner text him.
```json
{
	"server": {
		"port": 3001
	},
	"db": {
		"type": "mongo",
		"port": "localhost",
		"name": "expressReactSpa"
	}
}
```
It also correct mailer config file.  Path to him PROJECT_DIR/conf/mailer.json
Inner text him.
```json
{
	"service": "SERVICE",
	"auth" : {
		"user" : "USER",
		"pass" : "PASSWORD"
	}
}
```
## People

Developer is [Igor Stcherbina](https://github.com/eagle7410)
   
## License
   
MIT License

