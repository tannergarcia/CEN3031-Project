#### New User Stories

-As a user, I want to log into my account so that I can view my personalized dashboard


-As a writer, I want to view decoded images so that I can read my past stories


-As a friend, I want to view decoded images so that I can read my friend's encoded messages

#### Work Completed

 Front-end:

-Implemented cookies that contain user tokens stored in the browser

-Changed to sending requests with credentials for authentication

-Changed user interface layout to be more user friendly

-Cypress and Unit Tests

 Back-end:

-Added authentication to the image API

-Improved HTTP response status

-API Documentation

-Unit Tests



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
 <summary><code>GET</code> <code><b>/download/list/?timestamp={timestamp}</b></code> List all images for a user</summary>

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

DataServiceComponent
- Should get user
  - Obtain the user’s information, the first name, last name, username, password, and id.
- Should logout
  - When clicking on the logout button, the user will be returned the login url.
- Should login
  - When the user has inputted all the valid information and clicking login, should authorize       the user and route them to the homepage.
- Should register
  - When the user has inputted all the valid information and clicking register, should authorize     the user and route them to the login in order to login with the account.
WarningsComponent
- Should clear warnings
  - When the user clicks on the remove button, fade the error messages.
- Should be the correct warnings
  - Push the correct type of warning for the correct errors.
- Should push warnings
  - Push one of the four types of warnings available to the screen.
WarningsServiceComponent
- Should warn
  - As part of the WarningComponent
- Should clear warns
  - As part of the WarningComponent
- Should display correctly
  - As part of the WarningComponent
LoginComponent
- Should allow user to login
  - The user should be able to input the username and password text boxes.
- Should allow user to show/hide password
  - By clicking the eye icon towards the right of the password box should show or hide the           password.
- Should start with the empty inputs
  - Both text boxes should begin as empty when the user loads onto the login page.
AppComponent
- Should create the app and load content
  - Creates the base for the website and contains the taskbar.
AccountDisplayComponent
- Should take the user to the homepage
  - When either logging or clicking on the home tab will bring the user to the home page.
- Should display the user info
  - The home page should display both the first name and the last name of the current user           logged in.
TableComponent
- Should allow account deletion
  - The table will contain a red delete button which when pressed will remove the user connected     to that button from the database.
- Should contain correct user info
  - The structure for the user info that will be displayed, the username, first name, and the       last name.
TableDisplayComponent
- Should create and display the table
  - Creates the structure of the table for the users from the database to be displayed.
RegisterComponent
- Should allow user to register
  - The user should be able to select the registration button once inputting valid answers.
- Should allow user to cancel registration
  - By clicking on the cancel button the website will route the user back to the login page with     empty input boxes.
- Should allow user to input in all boxes
  - The user should be able to input the first name, last name, username and password text           boxes.
HomeComponent
- Should contain user data
   - Will contain the user value data which is the first name, last name, username, password, and id.
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
Using Cypress with the End to End testing.
1. Registered users
2. Displayed and removed warnings
3. Logging in and logging out
4. Displaying users in the userlist
5. Removing users from the userlist
  
  <code>
  describe('PhotoBomb Run Through', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:4200');
    cy.contains("PhotoBomb");
    cy.contains("Login");
    cy.url().should('includes', 'login');

    cy.get('[formControlName="username"]').type('CoolUsername');
    cy.get('[formControlName="password"]').type('SuperSecretPassword');
    cy.get('[formControlName="button"]').click();
    //check correct password
    cy.get('[id="login_button"]').click();

    //check error and close
    cy.get('[formControlName="close_warn"]').click();
    //check to see gone

    cy.get('[formControlName="register_button"]').click();
    cy.url().should('includes', 'register');

    cy.get('[formControlName="firstName"]').type('Cypress');
    cy.get('[formControlName="lastName"]').type('Testing');
    cy.get('[formControlName="username"]').type('CoolUsername');
    cy.get('[formControlName="password"]').type('SuperSecretPassword');

    cy.get('[id="register_button"]').click();

    cy.url().should('includes', 'login');
    cy.get('[formControlName="username"]').type('CoolUsername');
    cy.get('[formControlName="password"]').type('SuperSecretPassword');
    cy.get('[formControlName="button"]').click();
    cy.get('[id="login_button"]').click();

    cy.contains("Cypress");
    cy.contains("Testing");

    cy.get('[id="userlist_button"]').click();

    cy.contains("CoolUsername");
    cy.contains("Cypress");
    cy.contains("Testing");

    cy.get('[id="logout_button"]').click();
    cy.url().should('includes', 'login');

    cy.get('[formControlName="username"]').type('CoolUsername');
    cy.get('[formControlName="password"]').type('WRONGPassword');
    cy.get('[formControlName="button"]').click();

    cy.get('[id="login_button"]').click();
    cy.get('[formControlName="close_warn"]').click();

    cy.get('[formControlName="register_button"]').click();
    cy.url().should('includes', 'register');

    cy.get('[formControlName="firstName"]').type('End To');
    cy.get('[formControlName="lastName"]').type('End');
    cy.get('[formControlName="username"]').type('CoolUsername');
    cy.get('[formControlName="password"]').type('LamePassword');

    cy.get('[id="register_button"]').click();

    cy.get('[formControlName="close_warn"]').click();

    cy.get('[formControlName="username"]').clear();
    cy.get('[formControlName="username"]').type('BetterUser');

    cy.get('[id="register_button"]').click();

    cy.url().should('includes', 'login');
    cy.get('[formControlName="username"]').type('BetterUser');
    cy.get('[formControlName="password"]').type('LamePassword');
    cy.get('[id="login_button"]').click();

    cy.contains("End To");
    cy.contains("End");

    cy.get('[id="userlist_button"]').click();

    cy.contains("CoolUsername");
    cy.contains("Cypress");
    cy.contains("Testing");
    cy.contains("BetterUser");
    cy.contains("End To");
    cy.contains("End");

    cy.get('[id="home_button"]').click();

    cy.contains("End To");
    cy.contains("End");

    cy.get('[id="userlist_button"]').click();
    cy.get('[id="delete_button"]').eq(0).click();

    cy.get('[id="logout_button"]').click();
    cy.url().should('includes', 'login');

    cy.get('[formControlName="username"]').type('CoolUsername');
    cy.get('[formControlName="password"]').type('SuperSecretPassword');
    cy.get('[formControlName="button"]').click();
    cy.get('[id="login_button"]').click();
  })


})
  </code>

  </details>
