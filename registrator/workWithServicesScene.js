function workWithServicesScene(name, dataName, data)
{
    if( dataName === "onLoaded" )
    {
        scene.executeComponentMethod("", "TransportLayer", "getNodeServices",treeNode);
        settingsFromServer = scene.getComponentProperty("", "TransportLayer",  "applysuosettings" );
        scene.executeComponentMethod("", "PhotoCapture", "start","");
        var resetInterval = getParameter("resetInterval")*1000;
        scene.setComponentProperty( "", "Timer", "interval",resetInterval);
        scene.executeComponentMethod("", "Timer", "start", "" );
    }

    if ( name === "TransportLayer" && dataName === "onNodeServices" )
    {
        showArray(data.Data);
        if( data["Result"] )
        {
            var service  = data.Services;
            var arrayButtons = [];
            for( var i=0; i < service.length; i++ )
            {
                if( "isFolder" in service[i] )
                {
                    var arrayButtonsOne = {};
                    arrayButtonsOne.itemId = service[i]["id"];
                    arrayButtonsOne.itemName = service[i]["name"];
                    arrayButtons.push(arrayButtonsOne);
                    treeServices[service[i]["id"]] = service[i];
                }
            }
            scene.executeComponentMethod( "", "ButtonsPageList","appenditems", arrayButtons );
            enableButtonsforTreeNode(true);
            var hasNext = scene.executeComponentMethod( "", "ButtonsPageList", "hasnext", "" );
            var hasPrevios = scene.executeComponentMethod( "", "ButtonsPageList", "hasprevious", "" );
            scene.setComponentProperty( "", "nextTemplates", "enabled",hasNext );
            scene.setComponentProperty( "","previousTemplates", "enabled", hasPrevios );

            //      for ( var j=0; j<arrayButtons.length; j++)
            //        showArray(arrayButtons[j]);
        }
    }
    if(  name === "ButtonsPageList" && dataName === "onItemClicked" )
    {
        scene.executeComponentMethod("", "Timer", "restart", "" );
        processServiceButton(data);
        enableButtonsforTreeNode(false);
    }
    if( name === "TransportLayer" && dataName === "onClientRegistered" )
    {
       retrieveTransportLayerSignalOfRegistration(data);
    }
      if( dataName === "onClicked" )
    {
        scene.executeComponentMethod("", "Timer", "restart", "" );
        switch( name )
        {
        case "nextTemplates":
            logger.info( "Нажата кнопка 'ЕЩЕ ШАБЛОНЫ'." );
            scene.executeComponentMethod( "", "ButtonsPageList", "next","");
            var hasNext = scene.executeComponentMethod( "", "ButtonsPageList", "hasNext", "" );
            scene.setComponentProperty( "", "nextTemplates", "enabled", hasNext );
            scene.setComponentProperty( "", "previousTemplates", "enabled", true );
            break;

        case  "previousTemplates":
            logger.info( "Нажата кнопка 'ПРЕДЫДУЩИЕ ШАБЛОНЫ'." );
            scene.executeComponentMethod( "", "ButtonsPageList", "previous","");
            var hasPrevious = scene.executeComponentMethod( "", "ButtonsPageList", "hasPrevious", "" );
            scene.setComponentProperty( "", "previousTemplates", "enabled", hasPrevious );
            scene.setComponentProperty( "", "nextTemplates", "enabled", true );
            break;
        case "backButton":
            goBack();
            break;

        case "homeButton":
            scene.switchScene("welcome.xml");
            break;
        }
    }
    if( name === "Timer" && dataName === "onTriggered" )
    {
        scene.executeComponentMethod("", "Timer", "stop", "" );
        scene.switchScene("welcome.xml");
    }

}
