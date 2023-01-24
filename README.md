# Global Realtime Timezone Converter (GRTZC)

This project aims to simplify converting between different timezones. The idea of this project comes from difficulties of using common timezone converter websites. I tried to use them for example converting time of CET to IRST and vice versa, but they seemed to be very complicated. So I decided to create a very simple but yet powerfull application to convert a timezone to many other timezones in realtime without querying server and unnecessary extra information.

## How it is working?

For converting timezone, simply enter desired time (or current time by default) and then choose target timezone or timezones to see converted time in those timezones instantly.
You can also selected origin time's timezone if you want to convert timezone of in other timzone of your current timezone.

## Version and Future

Application is currently in the most early version (0.1) with very limited capabilities and poor design.

But there are a lot of ideas to add new features and make it beatiful and user friendly.

Current roadmap is:

- Make page more beautiful and redisign it.
- Use better component for time picker, so all style and usability errors will be vanished.
- Use better drop down component for choosing timezones, so anyone can search for each timezone instead of searching it
- Use better naming for each timezone, so they will be searchable using country, city, key and more
- Add support for picking date to be converted specially for checking daylight savings (current data is for 2 weeks ago)
- Group timezones by Offset and Key to limit number of options

## Technologies

### REACT

I used React, the most famous client side library to create this app.

### WEBPACK

While, I used create-react-app to create initial version of this app, there is plan to execute `eject` command and switch to webpack.

### TYPESCRIPT

Typescript is the most growing language in the client and server side application. Thanks to Microsoft, Typescript brings type safty and other bunch of C# language to the most popular scripting language of the world, JavaScript.

### AWS LAMBDA

There is plans to use AWS Lambda for querying and caching timezones data for supporting dates.

## Contributers

- [Hassan Behzadian](https://github.com/behzadian) as Product Owner and Developer
- [Ali Behzadian](https://github.com/alibehzadian) as Reviewer
- [Reza Behzadian](https://github.com/rezabehzadian) as Developer
