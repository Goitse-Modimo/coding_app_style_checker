const fs = require("fs");
const path = require('path');
const readline = require('readline');

class Checker {
	constructor(_path, fileName) {
		this._path = _path;
		this.fileName = fileName;
	}

	check() {
		// body...
		return new Promise((resolve,reject) => {

			// Use readline to read the contents of the file
			const readInterface = readline.createInterface({
			    input: fs.createReadStream(path.join(__dirname, `..${this._path}`, this.fileName)),
			    console: false
			});

			// Declare message variable and line counter function.
			var messages = [];  // Stores an array of flags
			const line_counter = ((i = 0) => () => ++i)(); // Incrementing funcution 

			// Read each line of the file and loop through each charicter of the line
			// to find spaces between the assignment operator.
			readInterface.on('line', function(line, lineNumber = line_counter()) {
				
			    for (var i = line.length - 1; i >= 0; i--) {

		    		if (line[i] === '=' && line[i-1] != ' ' && line[i-1] != '>' && line[i-1] != '<') {

		    			messages.push(`INVELID STYLE! no space before '=' in Line ${lineNumber}: ${line} `);
		    			resolve(messages);

		    		}else if (line[i] === ';' && line[i-1] === ' ') {

		    			messages.push(`INVELID STYLE! space after '=' in Line ${lineNumber}: ${line} `);
		    			resolve(messages);

		    		}else if (line[i] === '=' && line[i+1] != ' '){

		    			messages.push(`INVELID STYLE! no space after '=' in Line ${lineNumber}: ${line} `);
		    			resolve(messages);
		    		}

			    }

			});
		});
	}

}
module.exports = Checker;