# Day4 - Custom Middleware + NPM libs
**The following commands will start the server:**
```sh
cd /server
node server.js
```
**1.Create on custom middleware to validate the session of user if valid session allow to access request otherwise send back.**

> Initially there is no session maintained when the app starts. The user is redirected to **Login** page automatically and asked for a github username.  
>Once the user is logged in with the username. His session is maintained on ther server for **10minutes**.  
>The session validator is a custom Middleware which is stored in **server.js > sessionValidator**

**2. Create Example for Buffer, Streams and pipe.**  

> In assignment4_ques2 folder. The **writeStream** file creates a dummy content of around 2mb text file.  
> The **readStream** file reads the content of the text file using **Buffers** and **pipes** the read content into another file.

**3. Create API using Async/Await, fetch github profile and followers. (https://api.github.com/users/_username_)**  

> The API call is made through the **server.js** file using **async/await**, rather than React file.  
> The API call is made using the **POST** request in routes/index.js file for the route **/login**

**4. Child Process execFile(); example .**  

> In **assignment4_ques4/childProcess.js**.  
>Since Node JS is single threaded and works for a single process. But there might be cases when single process is not enought to handle the increasing workload on the application.  
> So in that case, child processes can be created to handle this type of workload.