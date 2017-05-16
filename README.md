# A Book Trading App

**[Link to app](https://book-trader-.herokuapp.com/)**

Built using [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) and [mongodb](https://www.mongodb.com/) through [mongoose](http://mongoosejs.com/) for data storage.

The full list of tools used, and great documentation, can be found on the [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) page.

## Installation

### .env file

Create a ```.env``` file in the top level directory and add the following to it

```
GOOGLE_BOOKS_API_KEY=
MONGO_URI=
JWT_SECRET=
```

* Get a google API key and add it to the ```.env```
* Install mongodb locally and add the local URI or use something like [mLab](https://mlab.com/)
* Add a secret string to ```JWT_SECRET```

### Other required alterations

Change the ```localStorageString``` in ```app/containers/App/auth.js``` to a custom value. Otherwise any other versions of this project will overwrite your local storage saves.

### Running

You must have Nodejs installed on your machine.

* ```npm install```
* ```npm start```

## License

[MIT](https://opensource.org/licenses/MIT)