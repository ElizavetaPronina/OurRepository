function workWithPassportScene(name, dataName, data)
{
    if( dataName === "onLoaded" )
    {
        scene.setComponentProperty("", "passportEdit", "text", correctNumberOfPassport(numberOfPassport));
        scene.setComponentProperty( "","VirtualKeyboard","enabled", true );
        var resetInterval = getParameter("resetInterval")*1000;
        scene.setComponentProperty( "", "Timer", "interval",resetInterval);
        scene.executeComponentMethod("", "Timer", "start", "" );
    }
    if( name === "VirtualKeyboard" && dataName === "onKeyPressed" )
    {
        scene.executeComponentMethod("", "Timer", "restart", "" );
        switch( data )
        {
        case "delete":
            numberOfPassport = numberOfPassport.substring(numberOfPassport.length-1,0);
            scene.setComponentProperty("", "passportEdit", "text", correctNumberOfPassport(numberOfPassport));

            break;

        case "ok":
            if ( numberOfPassport.length === NUMBER_PASSPORT_MAX )
            {
                scene.setComponentProperty("", "VirtualKeyboard", "visible", false);
                scene.setComponentProperty("", "startAuthClientByPassportMessage", "text", startAuthClientByMessage);
                enableAndVisibleButtonsforInfoMessage(true,"startAuthClientByPassportMessage","passportScene");
                scene.executeComponentMethod( "", "TransportLayer","authenticateClient", {AuthType:"passport",value:numberOfPassport});
                numberOfPassport = "";
            }
            break;

        default:
            if(data !== "." &&  numberOfPassport.length < NUMBER_PASSPORT_MAX)
            {
                numberOfPassport += data;
                scene.setComponentProperty("", "passportEdit", "text", correctNumberOfPassport(numberOfPassport));
            }
            break;
        }
    }
    if( name === "TransportLayer" && dataName === "onClientAuthentificated" )
    {
        if ( data.Result )
        {
            if ( !( "Error" in data ))
            {
                authorizedСlient = data.Data;
                getTreeNode(authorizedСlient);
                scene.switchScene("services.xml");
            }
            else
            {
                if( showWrongPassportMessage )
                {
                    var ShowErrorDelay = getParameter("ShowErrorDelay")*1000;
                    scene.setComponentProperty( "", "Timer", "interval",ShowErrorDelay );
                    scene.setComponentProperty("", "startAuthClientByPassportMessage", "text", data.Error);
                    enableAndVisibleButtonsforInfoMessage(true,"startAuthClientByPassportMessage","passportScene");
                    scene.executeComponentMethod("", "Timer", "restart", "" );
                }
                else
                {
                    numberOfPassport = "";
                    scene.switchScene("welcome.xml");
                }
            }
        }
    }
    if( name === "Timer" && dataName === "onTriggered" )
    {
        scene.executeComponentMethod("", "Timer", "stop", "" );
        numberOfPassport = "";
        scene.switchScene("welcome.xml");
    }

    if ( name === "passportEdit" && dataName === "onClicked" )
    {
        scene.executeComponentMethod("", "Timer", "restart", "" );
        scene.setComponentProperty("", "VirtualKeyboard", "visible", true);
    }
}
