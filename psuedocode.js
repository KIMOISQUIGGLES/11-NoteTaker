// MAIN 4 ROUTE METHODS
// GET - REQUESTING DATA FROM SERVER
// POST - CLIENT/BROWSER SUBMITTING SOMETHING TO THE SERVER
// PUT - SENDS AND UPDATES EXISTING DATA ON THE SERVER
// DELETE - DELETE REQUEST TO DELETE SOME THING FROM SERVER


//WE WILL NEED ROUTES:
// - 2 HTML ROUTES
//    -GET ROUTE FOR /notes
//    -GET ROUTE FOR *
//      WILDCARD (IF NONE MATCHES, GO HERE)
// - 2 API ROUTES
//    - GET /api/notes 
//      - READS `DB.JSON FILE AND RETURNS ALL SAVED NOTES AS JSON
//    - POST /api/notes
//      - CLIENT WILL SEND NOTE AND REQ AND RES
//      - POST ROUTE WILL SEND req.body
//      - WELL ALLOW US TO ADD OUR NEW NOTES TO db.json.  TAKE OUR NOTES FROM THE 
//        GET TO GIVE US AN UPDATED COPY TO ADD TO OUR FILE
//      - ADD NOTE TO JSON VARIABLE, AND WILL USE fs.writeFile TO RE-WRITE THE 
//        FILE
//    
// ** WE WILL NOT BE USING REQUIRE FOR OUR DATABASE
//    INSTEAD WE WILL BE USING FS.READFILE TO GET A SNAPSHOT AT THE EXACT MOMENT
// DELETE ROUTE
//  -USE PACKAGE THAT WILL GENERATE UNIQUE ID TO EACH NOTE
//   -  ex) uuid - a package that generates unique ID and attaches to the note in
//          POST

// FOR THIS ASSIGNMENT - WE WILL NEED TO CREATE A SERVER.JS
//                        WRITE AT THE SAME LEVEL IN DEVELOP FOLDER AS PACKAGE.
//                        JSON