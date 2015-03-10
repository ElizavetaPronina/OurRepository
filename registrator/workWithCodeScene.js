function workWithCodeScene(name, dataName, data)
{
    if( dataName === "onLoaded" )
    {
        isPreRegistration = true;
        scene.setComponentProperty("", "codeEdit", "text",numberOfPreRegistration);
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
            numberOfPreRegistration = numberOfPreRegistration.substring(numberOfPreRegistration.length-1,0);
            scene.setComponentProperty("", "codeEdit", "text", numberOfPreRegistration);

            break;

        case "ok":
            if ( numberOfPreRegistration.length === NUMBER_PREREGISTRATION_MAX )
            {
                scene.setComponentProperty("", "VirtualKeyboard", "visible", false);
                scene.setComponentProperty("", "startAuthClientByCodeMessage", "text", startAuthClientByMessage);
                enableAndVisibleButtonsforInfoMessage(true,"startAuthClientByCodeMessage","codeScene");
                scene.executeComponentMethod( "", "TransportLayer","authenticateClient", {AuthType:"code",value:numberOfPreRegistration});
                numberOfPreRegistration = "";
            }
            break;

        default:
            if(data !== "." &&  numberOfPreRegistration.length < NUMBER_PREREGISTRATION_MAX )
            {
                numberOfPreRegistration += data;
                scene.setComponentProperty("", "codeEdit", "text", numberOfPreRegistration);
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
                clientForRegistration["serviceId"] = data.Data["serviceId"];
                scene.executeComponentMethod( "", "TransportLayer","registerClient",clientForRegistration);
            }
            else
            {  if( showWrongCodeMessage )
                {

                    var ShowErrorDelay = getParameter("ShowErrorDelay")*1000;
                    scene.setComponentProperty( "", "Timer", "interval",ShowErrorDelay );
                    scene.setComponentProperty("", "startAuthClientByCodeMessage", "text", data.Error);
                    enableAndVisibleButtonsforInfoMessage(true,"startAuthClientByCodeMessage","codeScene");
                    scene.executeComponentMethod("", "Timer", "restart", "" );
                }
                else
                {
                    numberOfPreRegistration = "";
                    scene.switchScene("welcome.xml");
                }
            }
        }
    }
    if( name === "Timer" && dataName === "onTriggered" )
    {
        scene.executeComponentMethod("", "Timer", "stop", "" );
        numberOfPreRegistration = "";
        scene.switchScene("welcome.xml");
    }

    if ( name === "codeEdit" && dataName === "onClicked" )
    {
        scene.executeComponentMethod("", "Timer", "restart", "" );
        scene.setComponentProperty("", "VirtualKeyboard", "visible", true);
    }
    if( name === "TransportLayer" && dataName === "onClientRegistered" )
    {
        retrieveTransportLayerSignalOfRegistration(data);
    }
}
