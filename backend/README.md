# API Documentation

# Users
## User Registration 

## Endpoint

`/users/register`

### Description
This endpoint is used to register a new user.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required)
  - `lastname`: A string with a minimum length of 3 characters (optional)
- `email`: A string representing a valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)

## Example: Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```


## Responses
Success
Status Code: 201 Created
Body: A JSON object containing the generated token and user information.

### Response Body
The request body should be a JSON object with the following fields:
-`user` - (object) : 
  - `fullname`: An object containing:
    - `firstname`: A string with a minimum length of 3 characters (required)
    - `lastname`: A string with a minimum length of 3 characters (optional)
  - `email`: A string representing a valid email address (required)
  - `password`: A string with a minimum length of 6 characters (required)
-`token` : A string with jwt token

## Example: Response

```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}
```


## Error
-Status Code: 400 Bad Request
-Body: A JSON object containing an error message.

-Validation Error
-Status Code: 400 Bad Request
-Body: A JSON object containing the validation errors.

## Example: Error Response Body

The error response body should be a JSON object with the following fields:

- `errors`: An array of error objects containing:
  - `msg`: A string describing the error message
  - `param`: A string indicating the parameter that caused the error
  - `location`: A string indicating the location of the parameter (e.g., "body")


## Error Example:

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "password must be 6 character long",
      "param": "password",
      "location": "body"
    }
  ]
}

```


## User Login

## Endpoint
`/users/login`

## Description
`This endpoint is used to log in an existing user.`

## Method
POST

## Request Body
The request body should be a JSON object with the following fields:

 - `email` : A string representing a valid email address (required)
 - `password` : A string with a minimum length of 6 characters (required)
 - `Example` : Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
## Response Body 
The request body should be a JSON object with the following fields: 
-`user` - (object) :
  - `fullname`: An object containing:
    - `firstname`: A string with a minimum length of 3 characters (required)
    - `lastname`: A string with a minimum length of 3 characters (optional)
  - `email`: A string representing a valid email address (required)
  - `password`: A string with a minimum length of 6 characters (required) 
  -`token` : A string with jwt token

## Example: Response
```json 
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}
```

## Validation Error
`Status Code`: 400 Bad Request
`Body`: A JSON object containing the validation errors.
`Example`:
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "password must be 6 character long",
      "param": "password",
      "location": "body"
    }
  ]
}

```
## Authentication Error
`Status Code`: 401 Unauthorized
`Body`: A JSON object containing an error message.
`Example`:
```json
{
  "message": "Invalid email or password"
}
```


## User Profile

## Endpoint
`/users/profile`

## Description
`This endpoint is used to get the profile of the authenticated user.`

## Method
GET

## Request Header
Authorization: Bearer token (required)

## Responses
`Success`
`Status Code: 200 OK`
`Body: A JSON object containing the user profile information.`
### Example:
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}

```

## Authentication Error
`Status Code`: 400 Unathorized
`Body`: A JSON object containing an error message.
`Example`:
```json
{
  "message": "Authentication required"
}

```


## User Logout 

## Endpoint 
`/users/logout`

## Description 
`This endpoint is used to log out the authenticated user.`

## Method
GET

## Request Header
Authorization: Bearer token (required)

## Responses
`Success`
`Status Code: 200 OK`
`Body: A JSON object containing the user profile information.`
### Example:
```json
{
  "message": "Logout successfully"
}

```

## Authentication Error
`Status Code`: 401 Unathorized
`Body`: A JSON object containing an error message.
`Example`:
```json
{
  "message": "Unauthorized Access"
}
```

<br>
<br>

# Captains
## Captain Registration 

### Endpoint

`/captains/register`

### Description
This endpoint is used to register a new captain.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required)
  - `lastname`: A string with a minimum length of 3 characters (optional)
- `email`: A string representing a valid email address (required)
- `password`: A string with a minimum length of 8 characters (required)
- `vehicle`: An object containing:
  - `color`: A string with a minimum length of 3 characters (required)
  - `plate`: A string with a minimum length of 3 characters (required)
  - `model`: A string with a minimum length of 3 characters (required)
  - `type`: A string representing the type of vehicle (required, one of ["car", "motorcycle", "auto", "van"])
  - `capacity`: An integer representing the capacity of the vehicle (required, minimum 1)
- `location`: An object containing:
  - `lat`: A number representing the latitude (optional)
  - `long`: A number representing the longitude (optional)

### Example: Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "model": "Toyota",
    "type": "car",
    "capacity": 4
  },
  "location": {
    "lat": 12.9716,
    "long": 77.5946
  }
}
```
### Responses

### Success
- **Status Code**: `201 Created`
- **Body**: A JSON object containing the generated token and captain information.

Example:
```json
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "model": "Toyota",
      "type": "car",
      "capacity": 4
    },
    "location": {
      "lat": 12.9716,
      "long": 77.5946
    },
    "status": "inactive",
    "socketId": null
  }
}
```

### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.
- **Example**:
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Please provide a valid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 8 character long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 character long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 character long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Model must be at least 3 character long",
      "param": "vehicle.model",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.type",
      "location": "body"
    }
  ]
}

```
### Authentication Error
- **Status Code**: `401 Unauthorized`
- **Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "User already exists"
}
```

## Captain Login

## Endpoint
`/captains/login`

## Description
This endpoint is used to log in an existing captain.

## Method
POST

## Request Body
The request body should be a JSON object with the following fields:
- `email`: A string representing a valid email address (required)
- `password`: A string with a minimum length of 8 characters (required)

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the token and captain information

Example:
```json
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "model": "Toyota",
      "type": "car",
      "capacity": 4
    },
    "location": {
      "lat": 12.9716,
      "long": 77.5946
    },
    "status": "inactive",
    "socketId": null
  }
}
```

### Authentication Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing an error message

Example:
```json
{
  "message": "Invalid email or password"
}
```

## Captain Profile

## Endpoint
`/captains/profile`

## Description
This endpoint is used to get the profile information of the authenticated captain.

## Method
GET

## Request Headers
Authorization: Bearer token (required)

## Responses

### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the captain's profile information

Example:
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "model": "Toyota",
      "type": "car",
      "capacity": 4
    },
    "location": {
      "lat": 12.9716,
      "long": 77.5946
    },
    "status": "inactive",
    "socketId": null
  }
}
```

### Authentication Error
- **Status Code**: 401 Unauthorized
- **Body**: A JSON object containing an error message

Example:
```json
{
  "message": "Unauthorized access"
}
```

## Captain Logout

## Endpoint
`/captains/logout`

## Description
This endpoint is used to log out the authenticated captain.

## Method
GET

## Request Headers
Authorization: Bearer token (required)

## Responses

### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing a success message

Example:
```json
{
  "message": "Logout successfully"
}
```

### Authentication Error
- **Status Code**: 401 Unauthorized
- **Body**: A JSON object containing an error message

Example:
```json
{
  "message": "Unauthorized access"
}
```



# Maps

## Get Coordinates

### Endpoint

`/maps/get-coordinates`

### Description
This endpoint is used to get the coordinates of a given address.

### Method
`GET`

### Query Parameters
- `address`: A string representing the address (required, minimum length of 3 characters)

### Example: Request

`GET /maps/get-coordinates?address=123 Main St`

### Responses

#### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the coordinates.

Example:
```json
{
  "lat": 12.9716,
  "long": 77.5946
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid address",
      "param": "address",
      "location": "query"
    }
  ]
}
```

## Get Distance and Time

### Endpoint

`/maps/get-distance-time`

### Description
This endpoint is used to get the distance and time between two locations.

### Method
`GET`

### Query Parameters
- `origin`: A string representing the origin location (required, minimum length of 3 characters)
- `destination`: A string representing the destination location (required, minimum length of 3 characters)

### Example: Request

`GET /maps/get-distance-time?origin=123 Main St&destination=456 Elm St`

### Responses

#### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the distance and time.

Example:
```json
{
  "distance": 10,
  "time": 30
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid origin",
      "param": "origin",
      "location": "query"
    },
    {
      "msg": "Invalid destination",
      "param": "destination",
      "location": "query"
    }
  ]
}
```

## Get Suggestions

### Endpoint

`/maps/get-suggestions`

### Description
This endpoint is used to get address suggestions based on input.

### Method
`GET`

### Query Parameters
- `input`: A string representing the input for suggestions (required, minimum length of 3 characters)

### Example: Request

`GET /maps/get-suggestions?input=Main`

### Responses

#### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the suggestions.

Example:
```json
{
  "suggestions": [
    "123 Main St",
    "456 Main St",
    "789 Main St"
  ]
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid input",
      "param": "input",
      "location": "query"
    }
  ]
}
```



# Rides

## Create Ride

### Endpoint

`/rides/create`

### Description
This endpoint is used to create a new ride.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `pickup`: A string representing the pickup location (required, minimum length of 3 characters)
- `destination`: A string representing the destination location (required, minimum length of 3 characters)
- `vehicleType`: A string representing the type of vehicle (required, one of ["auto", "car", "motorcycle"])

### Example: Request Body

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

### Responses

#### Success
- **Status Code**: 201 Created
- **Body**: A JSON object containing the ride information.

Example:
```json
{
  "user": "user_id",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car",
  "status": "pending",
  "fare": 100,
  "duration": 30,
  "distance": 10,
  "rating": null,
  "paymentId": null,
  "orderId": null,
  "signature": null,
  "otp": "123456"
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Pickup Location",
      "param": "pickup",
      "location": "body"
    },
    {
      "msg": "Invalid Destination Location",
      "param": "destination",
      "location": "body"
    },
    {
      "msg": "Please Enter the valid Vehicle",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

## Get Fare

### Endpoint

`/rides/get-fare`

### Description
This endpoint is used to get the fare for a ride between two locations.

### Method
`GET`

### Query Parameters
- `pickup`: A string representing the pickup location (required, minimum length of 3 characters)
- `destination`: A string representing the destination location (required, minimum length of 3 characters)

### Example: Request

`GET /rides/get-fare?pickup=123 Main St&destination=456 Elm St`

### Responses

#### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the fare information.

Example:
```json
{
  "fare": 100,
  "duration": 30,
  "distance": 10
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Pickup Location",
      "param": "pickup",
      "location": "query"
    },
    {
      "msg": "Invalid Destination Location",
      "param": "destination",
      "location": "query"
    }
  ]
}
```

## Confirm Ride

### Endpoint

`/rides/confirm`

### Description
This endpoint is used by captains to confirm a ride request.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `rideId`: A string representing the ride ID (required)

### Example: Request Body

```json
{
  "rideId": "ride_id"
}
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the confirmed ride information.

Example:
```json
{
  "_id": "ride_id",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com"
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "accepted",
  "otp": "1234"
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid ride Id",
      "param": "rideId",
      "location": "body"
    }
  ]
}
```

---

## Start Ride

### Endpoint

`/rides/start-ride`

### Description
This endpoint is used by captains to start a ride after verifying the OTP.

### Method
`GET`

### Query Parameters
- `rideId`: A string representing the ride ID (required)
- `otp`: A string representing the OTP provided by the user (required)

### Example: Request

`GET /rides/start-ride?rideId=ride_id&otp=1234`

### Responses

#### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the ride information after it has started.

Example:
```json
{
  "_id": "ride_id",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com"
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "ongoing",
  "duration": 30,
  "distance": 10
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid ride Id",
      "param": "rideId",
      "location": "query"
    },
    {
      "msg": "Invalid OTP",
      "param": "otp",
      "location": "query"
    }
  ]
}
```

---

## End Ride

### Endpoint

`/rides/end-ride`

### Description
This endpoint is used by captains to end a ride.

### Method
`GET`

### Query Parameters
- `rideId`: A string representing the ride ID (required)

### Example: Request

`GET /rides/end-ride?rideId=ride_id`

### Responses

#### Success
- **Status Code**: 200 OK
- **Body**: A JSON object containing the ride information after it has been completed.

Example:
```json
{
  "_id": "ride_id",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com"
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "completed",
  "duration": 30,
  "distance": 10
}
```

#### Validation Error
- **Status Code**: 400 Bad Request
- **Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid ride Id",
      "param": "rideId",
      "location": "query"
    }
  ]
}
```
