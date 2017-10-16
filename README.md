This is an application using Ionic Framework v3.13.0.

*Useless application but helpful to understand Cordova, its plugins and the framework Ionic.*<br>
*This project aims to learn how to use cordova plugins and to discover Ionic Framework, the errors are not handled.*<br>
*In order to use the app, make sure to create a file : apiKey.ts in src/app and export the google maps API key as well ass the darksky.net API Key : see the example below*<br>

 *export var mapApiKey = 'AIzaSyCdpwtAlWXIFZ3EBZr5razbVU2z8loW0bU';<br>
export var weatherApiKey = '85c4c283eaeb586607091e57f0b1c1d6';*


*The app has a side menu with 4 menus*<br>
<ul>
  <li>Home Page</li>
  <li>Collaborateurs</li>
  <li>Remote Collaborateurs</li>
  <li>Fingerprints</li>
</ul>

The app is fetching a list of "contacts (Collaborateurs)" from a RestFul WebService and displays them in a page "Remote Collaborateurs".<br>
From this list we can import the collaborateur into the app collaborateur list (using the storage plugin to save them) or into the contact phone.<br>
The detail page of a collaborateur allows us to find out the location (using google maps) as well as the weather (using the API [Darksky.net](https://darksky.net/) for this collaborateur's address.



## Components and Plugins used throughout this project






