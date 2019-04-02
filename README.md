# Therapy Journalling App

## File Structure

- client: all the front end files
    - node_modules: contain all the packages used in the client side (you would normally won't touch this file)
    - public: contain favicon and index.html file
    - src: contain all the front end parts we will be working on
        - components: contain front end components like button, container, etc...
        - pages: contain the front end page with .js and .css file pairs
        - Router.js: contain front end routes
        - images: contain all the image files
    - package.json: contain package details for npm install
- server side files
    - config: contain configuration files
        - keys.js: contains keys to the database
        - passport.js: file for authentification

    - controllers: contain files with backend functions
        - userControllers: file with function describing user activities
    - models: contain files with schema for database
        - models.js: all schema files will be exported through this file
        - User.js: user schema
    - node_modules: contain all the packages used in the server side (you would normally won't touch this file)
    - routes: contain files related to connecting frontend route to backend controllers
        - router.js: contain routes
    - package.json: contain package details for npm install


## Running the app

 1. (one time) Install node.js on your laptop by downloading here https://nodejs.org/en/
 2. (one time) Clone the Github repository
 3. Go to the project root folder through command line
 4. Enter "npm install"
 5. Do "npm install" also in the client folder. So in total do "npm install" two times.
 6. Once the installation is over, enter "npm run dev" in the root folder.
 7. A browser will automatically opens up and the backend server will start too.
