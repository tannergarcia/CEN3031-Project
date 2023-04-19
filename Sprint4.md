### All + New User Stories
<details>
  
 As a user, I want to be able to download photos I have encoded/decoded so that I can send them to others
 
 As an organized person, I want to be able to delete photos so that there is less clutter
 
 As an secretive/private person, I want to keep encoded messages hidden, so that others can not see them
 
  As a user, I want to see all the photos I have uploaded so that I can save them on the website using my account.

  As a user, I want to log into my account so that I can view my personalized dashboard

 As a writer, I want to view decoded images so that I can read my past stories

 As a friend, I want to view decoded images so that I can read my friend's encoded messages

 As an artist, I want to hide watermarks in my digital art, so that my art can be identified.

 As a traveler, I want to be able to store metadata of where and when they were taken in photos, so that it will not disappear when I transfer photos from one place to another.

 As someone who keeps a diary, I want to be able to keep my entries private, so that only I will be able to read them.

 As a baker/cook, I want to keep recipes in one place, so that I do not lose track of them or forget them.

 As someone with their own photos on their computer, I want to be able to upload my own photos, so that I can hide messages in personal photos.

 As a social person, I want to be able to share photos with others, so that friends and family can see, decode, and read hidden messages hidden in them.

 As a puzzle maker, I want to hide messages in photos, so puzzle solvers can decode them.

 As a friend, I want to send messages in a unique way, to entertain other friends.

 As a person in a relationship, I want to send messages within photos to my significant other, to make them smile.

 As a user, I want to be able to log in, so that I can access my photos securely.

 As a user, I want to see a homepage, so that I know what the website does.
 </details>
 

### Work Completed

 #### Front-end:
 
- TODO Update
- Implemented proxy for frontend requests

- Album now updates when it is switched to be in view

- Encode and decode both save images to the album

- Photos in album can be interacted with (downloaded, decoded, deleted)

- Tested login and registration interfaces for errors

- Transfered user data over to profile

- Cypress and Unit Tests


 #### Back-end:

- TODO Update
- Updated API Documentation

- Implemented core image message encoding/decoding functionality

- Added Additional Unit tests



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
 <summary><code>GET</code> <code><b>/decode/?timestamp={timestamp}</b></code> Decode existing image</summary>

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
 <summary><code>DELETE</code> <code><b>/delete/?timestamp={timestamp}</b></code> Delete an image</summary>

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
 
 <summary>Code: </summary>
<details>
 <code>
  describe('Login Elements', () => {
  it('Both text boxes should be empty', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //check for empty boxes
    cy.get('[id="userText"]').should('have.value', '');
    cy.get('[id="userPass"]').should('have.value', '');
  })

  it('Should provide error with empty text boxes, one or the other, or both', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //check for empty boxes
    cy.get('[id="userText"]').should('have.value', '');
    cy.get('[id="userPass"]').should('have.value', '');

    //login with both empty
    cy.get('[id="loginButton"]').click();

    //check for error 
    cy.contains("Username or password is invalid.");

    //reload
    cy.reload()

    //check for empty boxes
    cy.get('[id="userText"]').should('have.value', '');
    cy.get('[id="userPass"]').should('have.value', '');

    //input only username
    cy.get('[id="userText"]').type('testUser1');

    //login with both empty
    cy.get('[id="loginButton"]').click();

    //check for error 
    cy.contains("Username or password is invalid.");

    //reload
    cy.reload()

    //check for empty boxes
    cy.get('[id="userText"]').should('have.value', '');
    cy.get('[id="userPass"]').should('have.value', '');

    //input only password
    cy.get('[id="userPass"]').type('user1password');

    //login with both empty
    cy.get('[id="loginButton"]').click();

    //check for error 
    cy.contains("Username or password is invalid.");

    //reload
    cy.reload()
  })

  it('Should be able to see password and type after clicking eye icon', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //check for empty boxes
    cy.get('[id="userText"]').should('have.value', '');
    cy.get('[id="userPass"]').should('have.value', '');

    //input only password
    cy.get('[id="userPass"]').type('user1password');

    //check that we cant see password
    cy.contains("user1password").should('not.exist');

    //activate eye
    cy.get('[formControlName="button"]').click();

    //check that we can see password
    cy.get('[id="userPass"]').should('have.value', 'user1password');
  })

  it('Login with proper credientials should work', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //precreated user
    //username: username
    //password: password

    //login with proper credentials
    cy.get('[id="userText"]').type('username');
    cy.get('[id="userPass"]').type('password');
    cy.get('[formControlName="button"]').click();

    //login
    cy.get('[id="loginButton"]').click();

    //check profile
    cy.url().should('includes', 'profile');
    cy.contains("New");
    cy.contains("Logout");

    //signout
    cy.get('[id="logoutButton"]').click();
  })

  it('Register An Account button should bring user to register page', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //register
    cy.get('[id="regAccount"]').click();

    //check register
    cy.url().should('includes', 'signup');
    cy.contains("REGISTER");
  })
})
 </code>
  </details>
 
<summary>RegisterComponent</summary>
 
    - Should allow user to register
 
    - The user should be able to select the registration button once inputting valid answers.
 
    - Should allow user to cancel registration
 
    - By clicking on the cancel button the website will route the user back to the login page with empty input boxes.
 
    - Should allow user to input in all boxes
 
    - The user should be able to input the username and password text boxes.
 
    - User should not be allowed the same username as one in the database.
 
 <summary>Code: </summary>
<details>
 <code>
  describe('Register Elements', () => {
  it('Both text boxes should be empty', () => {
    cy.visit('http://localhost:4200/signup');
    //should be signup page
    cy.contains("PhotoBomb");
    cy.contains("REGISTER");
    cy.url().should('includes', 'signup');

    //check for empty boxes
    cy.get('[id="regText"]').should('have.value', '');
    cy.get('[id="regPass"]').should('have.value', '');
  })

  it('Should provide error with empty text boxes, one or the other, or both', () => {
    cy.visit('http://localhost:4200/signup');
    //should be signup page
    cy.contains("PhotoBomb");
    cy.contains("REGISTER");
    cy.url().should('includes', 'signup');

    //check for empty boxes
    cy.get('[id="regText"]').should('have.value', '');
    cy.get('[id="regPass"]').should('have.value', '');

    //login with both empty
    cy.get('[id="registerButton"]').click();

    //check for error 
    cy.contains("Username is taken.");

    //reload
    cy.reload()

    //check for empty boxes
    cy.get('[id="regText"]').should('have.value', '');
    cy.get('[id="regPass"]').should('have.value', '');

    //input only username
    cy.get('[id="regText"]').type('testUser1');

    //login with both empty
    cy.get('[id="registerButton"]').click();

    //check for error 
    cy.contains("Username is taken.");

    //reload
    cy.reload()

    //check for empty boxes
    cy.get('[id="regText"]').should('have.value', '');
    cy.get('[id="regPass"]').should('have.value', '');

    //input only password
    cy.get('[id="regPass"]').type('user1password');

    //login with both empty
    cy.get('[id="registerButton"]').click();

    //check for error 
    cy.contains("Username is taken.");

    //reload
    cy.reload()
  })

  it('Registering with usernames already in database should return error', () => {
    cy.visit('http://localhost:4200/signup');
    //should be signup page
    cy.contains("PhotoBomb");
    cy.contains("REGISTER");
    cy.url().should('includes', 'signup');

    //precreated user
    //username: username
    //password: password

    //login with already made credentials
    cy.get('[id="regText"]').type('username');
    cy.get('[id="regPass"]').type('password');

    //register
    cy.get('[id="registerButton"]').click();

    //check for error 
    cy.contains("Username is taken.");
  })

  it('Return to login button should bring user to login page', () => {
    cy.visit('http://localhost:4200/signup');
    //should be signup page
    cy.contains("PhotoBomb");
    cy.contains("REGISTER");
    cy.url().should('includes', 'signup');

    //return to login button
    cy.get('[id="signinButton"]').click();

    //check for page login
    cy.url().should('includes', 'signin');
    cy.contains("LOGIN");
  })
})
 </code>
  </details>
<summary>ProfileComponent</summary>
 
    - Should bring the user to their profile page.
 
    - Should allow user to start a new task.
 
    - Should allow user to logout.
 
 <summary>Code: </summary>
<details>
 <code>
  describe('Profile Elements', () => {
  it('Contain Profile Elements with user', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //precreated user
    //username: username
    //password: password

    //login with proper credentials
    cy.get('[id="userText"]').type('username');
    cy.get('[id="userPass"]').type('password');
    cy.get('[formControlName="button"]').click();

    //login
    cy.get('[id="loginButton"]').click();

    //check profile
    cy.url().should('includes', 'profile');
    cy.contains("New");
    cy.contains("Logout");

    cy.contains("username's album");
  })

  it('Allows user to create new images and return to album', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //precreated user
    //username: username
    //password: password

    //login with proper credentials
    cy.get('[id="userText"]').type('username');
    cy.get('[id="userPass"]').type('password');
    cy.get('[id="loginButton"]').click();
    
    //select create new photo button
    cy.get('[id="newPhoto"]').click();

    cy.contains("Choose Image");
    cy.contains("No image uploaded yet.");
  })

  it('Allows user to logout', () => {
    cy.visit('http://localhost:4200');
    //should be automatically redirected to homepage/signin
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //precreated user
    //username: username
    //password: password

    //login with proper credentials
    cy.get('[id="userText"]').type('username');
    cy.get('[id="userPass"]').type('password');
    cy.get('[id="loginButton"]').click();

    //logout
    cy.get('[id="logoutButton"]').click();
    
    //check to see if on signin page
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');
  })
})
</code>
  </details>
<summary>AuthWebComponent</summary>
 
    - Should authorize users when inputting correct credentials.
 
    - Should deny users with incorrect credentials.

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
describe('PhotoBomb End to End Testing', () => {
  it('Visits the login page', () => {
    //original login
    cy.visit('http://localhost:4200');
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //try to login with user info
    cy.get('[id="userText"]').type('testUser1');
    cy.get('[id="userPass"]').type('user1password');
    cy.get('[formControlName="button"]').click();

    //login
    cy.get('[id="loginButton"]').click();

    //go register
    cy.get('[id="regAccount"]').click();
    cy.url().should('includes', 'signup');

    //input the user we created
    cy.get('[id="regText"]').type('testUser1');
    cy.get('[id="regPass"]').type('user1password');

    //register
    cy.get('[id="registerButton"]').click();

    //input the user we created to login with
    cy.get('[id="userText"]').type('testUser1');
    cy.get('[id="userPass"]').type('user1password');
    cy.get('[formControlName="button"]').click();

    //login
    cy.get('[id="loginButton"]').click();

    //check profile
    cy.url().should('includes', 'profile');
    cy.contains("New");
    cy.contains("Logout");

    //log out of profile
    cy.get('[id="logoutButton"]').click();
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //try signing into first user with wrong password
    cy.get('[id="userText"]').type('testUser1');
    cy.get('[id="userPass"]').type('user1passwordWRONG');
    cy.get('[formControlName="button"]').click();

    //login
    cy.get('[id="loginButton"]').click();

    //login with correct credentials
    cy.get('[id="userText"]').clear();
    cy.get('[id="userPass"]').clear();
    cy.get('[id="userText"]').type('testUser1');
    cy.get('[id="userPass"]').type('user1password');
    cy.get('[formControlName="button"]').click();

    //login
    cy.get('[id="loginButton"]').click();

    //check profile
    cy.url().should('includes', 'profile');
    cy.contains("New");
    cy.contains("Logout");

    //log out of profile
    cy.get('[id="logoutButton"]').click();
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');

    //register a new user but use first username
    //go register
    cy.get('[id="regAccount"]').click();
    cy.url().should('includes', 'signup');

    //input the user we created with different password
    cy.get('[id="regText"]').type('testUser1');
    cy.get('[id="regPass"]').type('user2password');

    //register, will not go through
    cy.get('[id="registerButton"]').click();

    //change username
    cy.get('[id="regText"]').clear();
    cy.get('[id="regText"]').type('usernum2');

    //register, will go through
    cy.get('[id="registerButton"]').click();

    //input the user we created to login with
    cy.get('[id="userText"]').type('usernum2');
    cy.get('[id="userPass"]').type('user2password');
    cy.get('[formControlName="button"]').click();

    //login
    cy.get('[id="loginButton"]').click();

    //check profile
    cy.url().should('includes', 'profile');
    cy.contains("New");
    cy.contains("Logout");

    //log out of profile
    cy.get('[id="logoutButton"]').click();
    cy.contains("PhotoBomb");
    cy.contains("LOGIN");
    cy.url().should('includes', 'signin');
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
