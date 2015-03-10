function showArray(data)
{
    for(var key in data)
        logger.debug("key = " + key + " data = " + data[key]+ " typeOf = "+ typeof(data[key]));
}

function runScript( mainScene, name, dataName, data )
{
    switch( mainScene )
    {
    case "welcomeScene":
        workWithWelcomeScene(name, dataName, data);
        break;
    case "passportScene":
        workWithPassportScene(name, dataName, data);
        break;
    case "cardScene":
        workWithCardScene(name, dataName, data);
        break;
    case "codeScene":
        workWithCodeScene(name, dataName, data);
        break;
    case "servicesScene":
        workWithServicesScene(name, dataName, data);
        break;
    case "ticketScene":
        workWithTicketScene(name, dataName, data);
        break;
    }
     //    logs
    print( "runScript : scene = " + mainScene + "  name = " + name + "  dataName = " + dataName )

    //    utils functions
    //    utils.makeSimpleText( text );   //return simple text (remove html tags)
    //    utils.makeSingleLine( text );   //remove "\n", "\r", "\t" from string and return this string
    //    utils.fileExists( fileName );   //return true if file exists
    //    utils.readFromFile( fileName, codecName = "Windows-1251" ); //return string from file
    //    utils.writeToFile( fileName, data );   //write data to file

    //    scene functions
    //    scene.getComponentProperty( mainScene, componentName, propertyName );                 //get component property
    //    scene.setComponentProperty( mainScene, componentName, propertyName, propertyValue );  //set component property
    //    scene.executeComponentMethod( mainScene, componentName, methodName, methodData );     //execute component method
    //    scene.getTemplateDirectory();                                                         //return current template directory
    //    scene.switchScene( sceneName, screenNumber = 1 );                                     //switch scene
    //    scene.showMessage( mainScene, iconType, caption, text, buttonsList, relativeWidth = 30, relativeHeight = 30, timeout = -1 ); //show message and return exit code

    //    fileUtils.readFromFile(fileName, codecName = "Windows-1251"); //return string from file
    //    fileUtils.writeToFile(fileName, data, append); //write data to fileName. append = true - add data to end of file, append = false - write new data to file
    //    fileUtils.exists(path); //Returns true if the file or directory specified by path exists; otherwise returns false.
    //    fileUtils.copy(pathSrc, pathDest) //copy pathSrc to pathDest
    //    fileUtils.rename(oldPath,newPath) //rename oldPath to newPath
    //    fileUtils.remove(path) //remove file or directory by path
    //    fileUtils.isFile(path); //return true if object from path is file; otherwise returns false.
    //    fileUtils.isDirectory(path); //return true if object from path is directory; otherwise returns false.
    //    fileUtils.createDirectory(path); //create directory by path
    //    fileUtils.isDirectoryEmpty(path); //return true if directory by path is empty; otherwise returns false.
    //    fileUtils.getName(path) //return name of file or directory from path


    //event when start editing with RC-5 controller
    if( name === mainScene && dataName === "onEditingStarted" )
    {
    }
    //event when exit from editing with RC-5 controller
    if( name === mainScene && dataName === "onEditingFinished" )
    {
    }
    //event when key pressed on RC-5 controller
    if( name === mainScene && dataName === "onKeyPressed" )
    {
    }
}

