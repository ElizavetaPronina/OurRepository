function workWithWelcomeScene(name, dataName, data)
{
    if( dataName === "onLoaded" )
    {
    }
    if(dataName === "onClicked" )
    {
        switch(name)
        {
        case "authClientByPassButton":
            scene.switchScene("passport.xml");
            break;
        case "authClientByCardButton":
            scene.switchScene("card.xml");
            break;
        case "authClientByCodeButton":
            scene.switchScene("code.xml");
            break;
        }
    }
    if( name === "TransportLayer" && dataName === "onParameters" )
    {
        suoParameters = ( data.Result && settingsFromServer ) ? data.Parameters : {};
        //showArray(suoParameters);
    }
}
