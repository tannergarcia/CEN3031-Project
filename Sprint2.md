New User Stories

-As a user, I want to log into my account so that I can view my personalized dashboard

-As a writer, I want to view decoded images so that I can read my past stories

-As a friend, I want to view decoded images so that I can read my friend's encoded messages

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
 
 #### Cypress Tests
 <details>
 <summary>1. Makes sure that user can upload images and interact with all elements of interface.</summary> 
  
   -Goes to localhost
   -Uploads file from repository
   -Clicks on encode and exits
   -Clicks on decode and exits
 </details>
 
