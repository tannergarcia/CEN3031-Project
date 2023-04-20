### New User Stories

- add here


### Work Completed

 #### Front-end:

- add here


 #### Back-end:


- Updated API Documentation

- Implemented username/password validation at signup

- Added tests for username/password validation

- Improved image api testing



## API Documentation
------------------------------------------------------------------------------------------

#### User authentication

<details>
 <summary><code>POST</code> <code><b>/signup</b></code></summary>

#### Parameters
**Credentials**

  ```json
{
    "username": "[username]",
    "password": "[password]"
}
```


#### Responses
**Code** : `200 OK`

  -User signed up
  
**Code** : `400 BAD REQUEST`
  
  -Missing username or password

**Code** : `409 CONFLICT`
  
  -Username taken
  
</details>

<details>
 <summary><code>POST</code> <code><b>/signin</b></code></summary>

#### Parameters
**Credentials**

  ```json
{
    "username": "[username]",
    "password": "[password]"
}
```


#### Responses
**Code** : `200 OK`

**Cookie**

```json
{
    "Name":  "session_token",
    "Value": "[unique session token]"
    "Expires": "[Expiration time]"
}
```
**Code** : `400 BAD REQUEST`
  
  -Missing username or password
  
**Code** : `401 UNAUTHORIZED`
  
  -Username or password incorrect 

</details>

<details>
 <summary><code>POST</code> <code><b>/logout</b></code></summary>

#### Parameters
**Cookie**

```json
{
    "Name":  "session_token",
    "Value": "[unique session token]"
    "Expires": "[Expiration time]"
}
```
#### Responses
**Code** : `200 OK`

  -User signed out
 
**Code** : `401 UNAUTHORIZED`
  
  -Cookie not set or bad token

</details>
------------------------------------------------------------------------------------------

#### Image API
<details>
 <summary><code>POST</code> <code><b>/upload/encode</b></code> Upload image with text encoding</summary>

#### Parameters
**Cookie authentication required**

```json
{
    "Name":  "session_token",
    "Value": "[unique session token]"
    "Expires": "[Expiration time]"
}
```

**Multipart form**
 
form enctype="multipart/form-data"
| input type  | Name        |  Value      |
| ----------- | ----------- | ----------- |
| file        | uploadfile  | -           |
| Text        | imagetext   | -           |
| submit      | -           | upload      |
#### Responses
**Code** : `200 OK`

  -Upload and encode success
 
**Code** : `400 BAD REQUEST`
  
  -Wrong file type. Only .jpeg .png .jpg allowed

**Code** : `401 UNAUTHORIZED`
  
  -Cookie not set or bad token

</details>

<details>
 <summary><code>POST</code> <code><b>/upload/decode</b></code> Upload image and get decoded text</summary>

#### Parameters
 
\*No authentication required
 
**Multipart form**
 
form enctype="multipart/form-data"
| input type  | Name        |  Value      |
| ----------- | ----------- | ----------- |
| file        | uploadfile  | -           |
| Text        | imagetext   | -           |
| submit      | -           | upload      |
#### Responses
**Code** : `200 OK`
```json
{
    "imageCode":  "[decoded image text]",
}
```
  -Upload and encode success
 
**Code** : `400 BAD REQUEST`
  
  -Wrong file type. Only .jpeg .png .jpg allowed

</details>

<details>
 <summary><code>GET</code> <code><b>/decode</b></code> Decode existing image</summary>

#### Parameters
**Cookie authentication required**

```json
{
    "Name":  "session_token",
    "Value": "[unique session token]"
    "Expires": "[Expiration time]"
}
```
**Image timestamp**

```json
{
    "timestamp":  "[image timestamp]",
}
```
 
#### Responses
**Code** : `200 OK`
```json
{
    "imageCode":  "[decoded image text]",
}
```
  -Upload and encode success
 
**Code** : `400 BAD REQUEST`
  
  -Cannot find image in database
 
**Code** : `401 UNAUTHORIZED`
  
  -Cookie not set or bad token
 
**Code** : `500 INTERNAL SERVER ERROR`
  
  -Cannot find image in file system

</details>

<details>
 <summary><code>GET</code> <code><b>/download/?timestamp={timestamp}</b></code> Download image</summary>

#### Parameters
**Cookie authentication required**

```json
{
    "Name":  "session_token",
    "Value": "[unique session token]"
    "Expires": "[Expiration time]"
}
```
 
#### Responses
**Code** : `200 OK`

 Content-Type="application/octet-stream"
 
  -Send image
 
**Code** : `400 BAD REQUEST`
  
  -Cannot find image in database
 
**Code** : `401 UNAUTHORIZED`
  
  -Cookie not set or bad token
 
**Code** : `500 INTERNAL SERVER ERROR`
  
  -Cannot find image in file system

</details>

<details>
 <summary><code>GET</code> <code><b>/download/list/</b></code> List all images for a user</summary>

#### Parameters
**Cookie authentication required**

```json
{
    "Name":  "session_token",
    "Value": "[unique session token]"
    "Expires": "[Expiration time]"
}
```
 
#### Responses
**Code** : `200 OK`

  -Lists all images 
```json
[{
    "id":  "[image id]",
    "token": "[user token]",
    "timestamp": "[image timestamp]",
    "extention": "[image extention]"
}]
```

 
**Code** : `400 BAD REQUEST`
  
  -Cannot find image in database
 
**Code** : `401 UNAUTHORIZED`
  
  -Cookie not set or bad token

</details>

<details>
 <summary><code>DELETE</code> <code><b>/delete</b></code> Delete an image</summary>

#### Parameters
**Cookie authentication required**

```json
{
    "Name":  "session_token",
    "Value": "[unique session token]"
    "Expires": "[Expiration time]"
}
```
 
**Image timestamp**

```json
{
    "timestamp":  "[image timestamp]",
}
```
 
#### Responses
**Code** : `200 OK`
 
  -Image deleted
 
**Code** : `404 NOT FOUND`
  
  -Cannot find image in database
 
**Code** : `401 UNAUTHORIZED`
  
  -Cookie not set or bad token
 
**Code** : `500 INTERNAL SERVER ERROR`
  
  -Cannot find image in file system

</details>
------------------------------------------------------------------------------------------

#### Unit Tests

Front-end:
<details>
 <summary>1. Makes sure that there is no already uploaded image when the user first logs in.</summary> 
  
   -Mounts Upload Component
 
   -Checks whether the text
 
    is not the default.
 </details>
 <details>
 <summary>2. Makes sure you can not interact with elements that are not a part of the dialog that the component opens
  
  Makes sure that the dialog does not close if there are attempts to do so.</summary> 
  
   -Mounts Upload Component
 
   -Clicks on Decode twice
 
   -Catches error that Decode can not be interacted with
 </details>
 <details>
   <summary>3. Makes sure you can not login without any inputs for username and password.</summary> 
  
   -Mounts Login Component
 
   -Click on Login button
 
   -Catches error and display error message, Username or password in invalid
 </details>
 <details>
  <summary>4. Makes sure you can not register with an account name already taken.</summary> 
  
   -Mounts Register Component
 
   -Inputs registerUsername and registerPassword
 
   -Click on Register button
 
   -Catches error and display error message, Username is already taken
 </details>
 <details>
  <summary>5. Makes sure you can choose to see or not see password when logging in.</summary> 
  
   -Mounts Login Component
 
   -Inputs loginUsername and loginPassword
 
   -Clicks on fa eye icon
 
   -Checks current type of password input, password or text
 </details>


<details>
 <summary>Login Registration Unit Tests</summary>
 
 <summary>AppComponent</summary>
 
    - Should create the app and load content
 
    - Should create the base for the website and contains the content from routing.
 <summary>LoginComponent</summary>
 
    - Should allow user to login
 
    - The user should be able to input the username and password text boxes.
 
    - Should allow user to show/hide password
 
    - By clicking the eye icon towards the right of the password box should show or hide the password.
 
    - Should start with the empty inputs
 
    - Both text boxes should begin as empty when the user loads onto the login page.
 
<summary>RegisterComponent</summary>
 
    - Should allow user to register
 
    - The user should be able to select the registration button once inputting valid answers.
 
    - Should allow user to cancel registration
 
    - By clicking on the cancel button the website will route the user back to the login page with empty input boxes.
 
    - Should allow user to input in all boxes
 
    - The user should be able to input the username and password text boxes.
 
    - User should not be allowed the same username as one in the database.
<summary>ProfileComponent</summary>
 
    - Should bring the user to their profile page.
 
    - Should allow user to start a new task.
 
    - Should allow user to logout.
<summary>AuthWebComponent</summary>
 
    - Should authorize users when inputting correct credentials.
 
    - Should deny users with incorrect credentials.
<summary>WarningsComponent</summary>
 
    - Should clear warnings
 
    - When the user clicks on the remove button, fade the error messages.
 
    - Should be the correct warnings
 
    - Push the correct type of warning for the correct errors.
 
    - Should push warnings
 
    - Push one of the four types of warnings available to the screen.
 
    -Inputs loginUsername and loginPassword
 
 </details>
  
  
 #### Cypress Tests
 <details>
 <summary>1. Makes sure that user can upload images and interact with all elements of interface.</summary> 
  
   -Goes to localhost
 
   -Uploads file from repository
 
   -Clicks on encode and exits
 
   -Clicks on decode and exits
 </details>

 <details>
  <summary>2. Makes sure the user can register and login to an account and prevent any errors.</summary>
Using Cypress with the End to End testing.
 
   -Starts user on login page
 
   -Allow users to register new accounts
 
   -Prevent account registration with same username
 
   -Logging in and logging out
 
   -Bringing users to their profile page
  
  <code>
  describe('PhotoBomb Run Through', () => {
  it('Visits the login page', () => {
    //check initial login page
    cy.visit('http://localhost:4200');
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //try signing in with new username and password
    cy.get('[id="loginUsername"]').type('CoolUsername');
    cy.get('[id="loginPassword"]').type('SuperSecretPassword');

    //show off hidden password function
    cy.get('[id="hider"]').click();
    
    //check to see if user exists
    cy.get('[id="login"]').click();
    cy.contains("Username or password is invalid.");

    //register for the account
    cy.get('[id="switch"]').click();

    //check register page
    cy.contains("REGISTER");
    cy.url().should('includes', 'signup');

    //create the user that was attempted
    cy.get('[id="registerUsername"]').type('CoolUsername');
    cy.get('[id="registerPassword"]').type('SuperSecretPassword');

    //register
    cy.get('[id="register"]').click();

    //should send user back to login screen
    cy.url().should('includes', 'signin');

    //log in using credentials
    cy.get('[id="loginUsername"]').type('CoolUsername');
    cy.get('[id="loginPassword"]').type('SuperSecretPassword');

    //show off hidden password function
    cy.get('[id="hider"]').click();

    //login
    cy.get('[id="login"]').click();

    //contains profile features
    cy.contains("New");
    cy.contains("Logout");

    //now logout
    cy.get('[id="logout"]').click();

    //should be on login page
    cy.url().should('includes', 'signin');

    //trying login with incorrect username
    cy.get('[id="loginUsername"]').type('CoolUsernameWrong');
    cy.get('[id="loginPassword"]').type('SuperSecretPassword');
    cy.get('[id="hider"]').click();
    cy.get('[id="login"]').click();
    cy.contains("Username or password is invalid.");

    //clear fields
    cy.get('[id="loginUsername"]').type('{selectall}{backspace}')
    cy.get('[id="loginPassword"]').type('{selectall}{backspace}')

    //trying to login with incorrect password
    cy.get('[id="loginUsername"]').type('CoolUsername');
    cy.get('[id="loginPassword"]').type('SuperWrongPassword');
    cy.get('[id="login"]').click();
    cy.contains("Username or password is invalid.");

    //clear fields
    cy.get('[id="loginUsername"]').type('{selectall}{backspace}')
    cy.get('[id="loginPassword"]').type('{selectall}{backspace}')

    //login in correctly
    cy.get('[id="loginUsername"]').type('CoolUsername');
    cy.get('[id="loginPassword"]').type('SuperSecretPassword');
    cy.get('[id="login"]').click();

    //logout
    cy.get('[id="logout"]').click();

    //register new account but try using first username
    //register for the account
    cy.get('[id="switch"]').click();

    //check register page
    cy.contains("REGISTER");
    cy.url().should('includes', 'signup');

    //create the user that was attempted
    cy.get('[id="registerUsername"]').type('CoolUsername');
    cy.get('[id="registerPassword"]').type('NewPassword');
    cy.get('[id="register"]').click();

    //creation error
    cy.contains("Username is taken");

    //clear fields
    cy.get('[id="registerUsername"]').type('{selectall}{backspace}')
    cy.get('[id="registerPassword"]').type('{selectall}{backspace}')

    //enter new username
    cy.get('[id="registerUsername"]').type('NewUsername');
    cy.get('[id="registerPassword"]').type('NewPassword');
    cy.get('[id="register"]').click();

    //should send user back to login screen
    cy.url().should('includes', 'signin');

    //log in using new credentials
    cy.get('[id="loginUsername"]').type('NewUsername');
    cy.get('[id="loginPassword"]').type('NewPassword');
    cy.get('[id="hider"]').click();
    cy.get('[id="login"]').click();
  })


})
  </code>
</details>


### Backend:

<details> <summary>User API</summary>

Tests are run on every function to ensure signup, signin, and logout works

Tested scenarios include:
- Empty requests
- Requests with wrong format
- Non existant user for signin
- Wrong password for signin
- Malformed/missing cookies
- Already taken username for signup
- Missing username/password
- Correct requests
- Invalid username/password for signup (too short/long/invalid characters)

</details>

<details> <summary>Image API</summary>

Tests are run on every function of imageControllers.go

Tested scenarios include:
- Bad authentitation
- Wrong filetype
- Bad/missing data
- Attempts to get nonexistant images
- Attempting to encode an image with too long of a message
- Encoding/Decoding both png and jpg images
