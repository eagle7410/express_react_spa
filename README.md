# system-monitor

Monitoring free memory and cpu angli time.

## How To Install
```bash
git clone https://github.com/eagle7410/system-monitor.git
cd system-monitor
npm install
node server.js
```
Need mongodb.
Have config file. Path to config file PROJECT_DIR/conf/index.json
Inner text him.
```json
{
	"server": {
		"port" : 3001
	},
	"db" : {
		"type" :"mongo",
		"port" : "localhost",
		"name" : "systemMonitor",
		"storeDays" : 12
	},
	"users" : [
		{
			"login" : "igor",
			"pass"  : "qwerty"
		}
	]
}
```
Example see statistics.  
![In work screenshot](https://raw.githubusercontent.com/eagle7410/system-monitor/master/example.jpg)
## People

Developer is [Igor Stcherbina](https://github.com/eagle7410)
   
## License
   
MIT License

