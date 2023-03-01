User Stories

-As a user, I want to log into my account because I want to view my personalized dashboard
-

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

  -User logged out

**Code** : `401 UNAUTHORIZED`
  
  -Cookie not set or bad token

</details>
------------------------------------------------------------------------------------------
