# Vera UI

A simple alternative UI for Micasa Vera.

The UI needs to know where the Vera is located in the local network. The location of the Vera is defined in the 
`js/app/vera.js` file. If e.g. your vera is located at http://192.168.1.100, replace the config as follows:

```
var config = {
  "host": "192.168.1.100",
  "protocol": "http"
};
```

Currently there is no bundling of assets configured for the project. Thus in order to get the UI to work, you need to
have npm installed. Dependencies needed by the UI can be downloaded with the following commands:

```
$ sudo npm install -g bower
$ bower install
```

When the dependencies have been downloaded, you can open the UI by opening the index.html in a browser. Because of
browser security in some browsers, the UI will not be able to make requests to the Vera. To make the requests work
you need to disable the Same-origin policy feature in the browser. In Chrome this is done by launching it with the
--disable-web-security flag. Please notice though that you should only use this flag for debugging purposes, not
when you are browsing the Web.
