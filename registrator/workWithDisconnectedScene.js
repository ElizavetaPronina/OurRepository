function  workWithDisconnectedScene(name, dataName, data)
{
    if(Boolean(getParameter("infoMessageConnectToSUO")))
           {
                   scene.setComponentProperty( "", "SimpleImage", "visible", true );
                   scene.executeComponentMethod( "", "SimpleImage", "startRotating", IMAGE_PARAMETERS );
           }

    if( name === "TransportLayer"  && dataName === "onConnected" )
    {
        isServerConnected = true;
        logger.info("Связь с сервером установлена!");
        scene.setComponentProperty( "", "SimpleImage", "visible", false );
        scene.switchScene("welcome.xml");
    }
}
