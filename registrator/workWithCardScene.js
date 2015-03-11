function workWithCardScene(name, dataName, data)
{
    if( dataName === "onLoaded" )
    {
        var resetInterval = getParameter("resetInterval")*1000;
        scene.setComponentProperty( "", "Timer", "interval",resetInterval);
        scene.executeComponentMethod("", "Timer", "start", "" );
        scene.executeComponentMethod( "", "TransportLayer","authenticateClient", {"AuthType":"card", "*cardId": "5136910974669331","*cardTrack": "513691","cardBIN": "180212","cardUserName": "POCHTACARD"});
    }

    if( name === "TransportLayer" && dataName === "onClientAuthentificated" )
    {
        showArray(data);
        if ( data.Result &&  !( "Error" in data ))
        {
            authorizedСlient = data.Data;
             getTreeNode(authorizedСlient);
             setSceneAndTimerStop("services.xml");
        }
        if ( "Error" in data )
            setSceneAndTimerStop("welcome.xml");
    }
    if( name === "Timer" && dataName === "onTriggered" )
    {
        setSceneAndTimerStop("welcome.xml");
    }
    if ( name === "Ict3k5CardReader" && dataName === "onCardInserted" )
    {
     scene.executeComponentMethod("", "Timer", "InitializeCommand", "" );
    }
    if( name === "" && dataName === "onData" )
    {
        showArray(data);
    }

}
