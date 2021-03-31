*Endpoints for registering a new client/instructor and for logging in*

  -[POST]
  - /api/auth/register
  - this needs a username, password, role, and email
  - the username and and the email must both be unique. middleware set up to check that.
  - passwords are hashed upon successful registration

  - [POST]
  - /api/auth/login
  - this needs a username and a password. there is middleware set up to check the credentials to make sure they match.

*Endpoints for instructor functionality - these are protected, need to be logged in*

  -[POST]
  - /api/class
  - this endpoint allows instructor to add a new class. requires this information: {
    "class_name": "Awesome Yoga",
    "class_type": "Yoga",
    "class_start": "12:30pm EST",
    "class_duration": 1, (integer, as in 1 hour)
    "class_intensity": 5,
    "class_location": "123 Main St. Los Angeles CA, 90018",
    "class_client_number": 0, (how many people currently in the class)
    "class_max_size": 15,
    "class_instructor": 1 (the id of the instructor)
  }
  - returns all the details of the new class to be used by the front end

  - [PUT]
  - /api/class/:id
  - this is to update/change the information of a class. the :id is of the class.
  - returns all of the new details of the class to be used by the front end
  
  - [DELETE]
  - /api/class/:id
  - this is to delete a class. the :id is of the class.

*Endpoints for client functionality - these are protected, need to be logged in*

  - [POST]
  - /api/client/:id
  - this is for a client signing up for a class. the :id is of the class the user is joining.
  - there is middleware here to make sure the class exists, to check to make sure the client is not already enrolled in the class, and to make sure the class is not already full before proceeding to let the client join.
  - this returns the clients username and the name of the class that they just joined so the front end can use that information to display a message. 'Thanks CLIENT for joining CLASS.' for example.

  - [DELETE]
  - /api/client/:id
  - this is for a client removing themselves from a class. the :id is of the class they are leaving.
  - there is middleware here to make sure the class exists, and to check if the client is actually enrolled in the class before proceeding to remove the client.
  - the class name is returned here so the front end can use it. 'Sorry to see you leave CLASS, but looking forward to seeing you soon!' for example.