function workWithWelcomeScene(name, dataName, data)
{
    var arrayButtonsName =
            [
                {itemId : "showAuthBankClientButton",itemName : "Я являюсь клиентом банка"},
                {itemId : "showAuthNotBankClientButton",itemName : "Я не клиент банка"},
                {itemId : "showAuthClientByPassButton",itemName : "Регистрация по паспорту"},
                {itemId : "showAuthClientByCardButton",itemName : "Регистрация по карте"},
                {itemId : "showAuthClientByCodeButton",itemName: "Предварительная регистрация"},
                {itemId : "textAuthClientByPhoneButton",itemName : "Регистрация по номеру телефона"}

            ];
    var flagOfArrayButtons =
            {
        showAuthBankClientButton: false,
        showAuthNotBankClientButton : true,
        showAuthClientByPassButton : true,
        showAuthClientByCardButton : true,
        showAuthClientByCodeButton : true,
        textAuthClientByPhoneButton : true
    };

    if( dataName === "onLoaded" )
    {


        //        function enableAndVisibleButtonsforQuestionMessage(enable)
        //        {
        //            scene.setComponentProperty( "","BackGround","enabled", enable );
        //            scene.setComponentProperty( "","questionOfPrintTicket","enabled", enable );
        //            scene.setComponentProperty( "","okButtonWithQuestion","enabled", enable );
        //            scene.setComponentProperty( "","cancelButtonWithQuestion","enabled", enable );
        //            scene.setComponentProperty( "","BackGround","visible", enable );
        //            scene.setComponentProperty( "","questionOfPrintTicket","visible", enable );
        //            scene.setComponentProperty( "","okButtonWithQuestion","visible", enable );
        //            scene.setComponentProperty( "","cancelButtonWithQuestion","visible", enable );
        //            scene.setComponentProperty( "","ticket","enabled", !enable );
        //            scene.setComponentProperty( "","title","enabled", !enable );
        //        }
        scene.setComponentProperty("", "welcomeText", "text", welcomeText );


        for( var i = 0; i < arrayButtonsName.length; i++)
        {
            for (var key in flagOfArrayButtons)
            {
                if( key === arrayButtonsName[i].itemId && flagOfArrayButtons[key] === false  )
                {
                    delete arrayButtonsName[i].itemId;
                    scene.executeComponentMethod( "", "ButtonsPageList","appenditems", arrayButtonsName );
                }
            }
        }
        // enableButtonsforTreeNode(true);
        var hasNext = scene.executeComponentMethod( "", "ButtonsPageList", "hasnext", "" );
        var hasPrevios = scene.executeComponentMethod( "", "ButtonsPageList", "hasprevious", "" );
        scene.setComponentProperty( "", "nextTemplates", "enabled",hasNext );
        scene.setComponentProperty( "","previousTemplates", "enabled", hasPrevios );

        for ( var j=0; j<arrayButtonsName.length; j++)
            showArray(arrayButtonsName[j]);

        logger.info("welcomeContentType=" + getParameter("welcomeContentType"));

        //        if ( getParameter("welcomeContentType") === "video" )
        //        {
        //            scene.executeComponentMethod( "", "VideoPlayer", "visible", true );
        //            scene.executeComponentMethod( "", "SlideShow", "visible", false );
        //        }
        //        if ( getParameter("welcomeContentType") === "slideshow" )
        //        {

        //            scene.executeComponentMethod( "", "VideoPlayer", "visible", false );
        //            scene.executeComponentMethod( "", "SlideShow", "visible", true );
        //            scene.executeComponentMethod( "", "SlideShow", "start", "");

    }

    if(dataName === "onClicked" )
    {
        switch(name)
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
        }
    }
    if( name === "TransportLayer" && dataName === "onParameters" )
    {
        scene.executeComponentMethod( "", "TransportLayer", "getNextVideo" );
        suoParameters = ( data.Result && settingsFromServer ) ? data.Parameters : {};
        showArray(suoParameters);
    }

    if( name === "RunRow"  && dataName === "onCycleStart")
    {
        var currentRow = scene.getComponentProperty("", "RunRow", "text");
        var result = getRunRowText();
        logger.debug("currentRow = "+ currentRow +  "  result=" + result );
        if(result !== currentRow)
            scene.setComponentProperty("", "RunRow", "text", result);
    }
    if( name === "TransportLayer"  && dataName === "onConnected" )
    {
        isServerConnected = true;
        logger.info("Связь с сервером установлена!");

    }
    if( name === "TransportLayer" && dataName ==="onDisconnected"  )
    {
        isServerConnected = false;
        logger.info("Связь с сервером потеряна!");
        scene.switchScene("disconnected.xml");
    }
    if( name === "TransportLayer" && dataName === "getNextVideo")
    {
        showArray(data.Parameters);
        logger.debug("onNextVideo: " + data );
        scene.setComponentProperty("", "VideoPlayer", "mediaListFile",  data["Source"] );
        scene.executeComponentMethod( "", "VideoPlayer", "play", "" );
    }

    if( name === "TransportLayer" && dataName === "onVideoListChanged" )
    {
        logger.debug( "Список видео изменился = " +  data["Video"] );
        var playerData = scene.executeComponentMethod( "", "VideoPlayer", "getData", {} );
        if( playerData.playbackState === "stopped" )
            scene.executeComponentMethod( "", "TransportLayer", "getNextVideo" );
    }

    if( name === "VideoPlayer" && dataName === "onStop")
    {
        scene.executeComponentMethod( "", "TransportLayer", "getNextVideo" );
    }
    if(  name === "ButtonsPageList" && dataName === "onItemClicked" )
    {

        switch(data)
        {
        case "showAuthClientByPassButton":
            setSceneAndTimerStop("passport.xml");
            break;
        case "showAuthClientByCardButton":
            setSceneAndTimerStop("card.xml");
            break;
        case "showAuthClientByCodeButton":
            setSceneAndTimerStop("code.xml");
            break;
        case "showAuthBankClientButton":
            setSceneAndTimerStop(".xml");
            break;
        case "showAuthNotBankClientButton":
            setSceneAndTimerStop("notClient.xml");
            break;
        case "textAuthClientByPhoneButton":
            setSceneAndTimerStop(".xml");
            break;
        }
        // enableButtonsforTreeNode(false);
    }
}

