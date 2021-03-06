# ReactJS Web App
This is a web application developed in React JS, where we can list all the users from api's and perform some functionalitios like sorting, filteration, pagination etc.

### Requirements
For development, you will only need Node.js installed on your environement. 
Node.js is an environment for developing the server-side applications.
React development happens on top of node.js.<br /><br />

#### How to install Node.js :<br />
###### Windows: 
1. Download the windows installer from the following link:
https://nodejs.org/en/download/ <br />
The .msi file will be downloaded in your download directory. 
2. Run the installer and follow the command prompt. Accept the default installation setting.
3. Restart your computer because you won't able to run without this step.
4. Test: To make sure you have node and npm type the simple command<br />
node -v: it will show your installed node version.<br />
npm -v: it will show your installed npm version.

### Instruction to start the project:
1. Clone the project through git (url: https://github.com/shuvikash/DataPeaceAssignment.git) and go to that directory<br />
2. Run Command: npm install <br />
It will only install normal dependency of the package.json file.<br />
3. Run Command: npm install --only=dev<br />
It will install all the dev-dependency of the package.json file.<br />
4. Now all things are set up <br />
Command to run the server: npm run start <br />
       or <br />
Command: npm start <br /> 
It will start the server on the configured port(In my case, it is 8080).<br />
5. Go to browser and type: http://localhost:8080/ <br/>
It will show the feteched users from API (http://demo9197058.mockable.io/users).<br />
6. Click on any table header it will sort the data in ascending and descending order.<br />
7. You can filter the users by typing on searching bar based on the first name. <br />
8. Click any table row, it will take you to the detail view page where a user is shown based on the id parameter of url.<br /><br />
**Thank you :+1: for reading this document. I hope this document will help you to understand more about the project.**
