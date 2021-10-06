# node-auth

API Base URL: localhost:3000/v1/

LOGIN API URL: localhost:3000/v1/auth/login
REQUEST BODY:
{
    "email":"my@mail.com",
    "password":"123456"
}

REGISTER API URL:localhost:3000/v1/auth/register
REQUEST BODY:
{
    "email":"my@mail.com",
    "password":"123456"
}

RESET PASSWORD API URL: localhost:3000/v1/auth/resetpassword
REQUEST BODY:
{
    "email":"my@mail.com",
    "newPassword":"123456"
}
