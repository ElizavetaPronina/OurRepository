function workWithTicketScene(name, dataName, data)
{
    if( dataName === "onLoaded" )
    {
        scene.setComponentProperty( "", "ticket", "text", clientNumber);
        var  requestConfirmation = getParameter("requestConfirmation");
        if ( requestConfirmation )
        {
            var ShowMessageDelay = getParameter("ShowMessageDelay")*1000;
            scene.setComponentProperty( "", "Timer", "interval",ShowMessageDelay);
            scene.executeComponentMethod("", "Timer", "start", "" );
            enableAndVisibleButtonsforQuestionMessage(true);
        }

    }
    if( dataName === "onClicked" )
    {
        switch( name )
        {
        case "okButtonWithQuestion":
            isButtonClicked = true;
            enableAndVisibleButtonsforQuestionMessage(false);
            scene.setComponentProperty( "", "Timer", "interval",intervalForTicketScene);
            scene.executeComponentMethod("", "Timer", "start", "" );
            printCheck( dataOfClientRegistration, serviceNameForRegistration);
            break;
        case "cancelButtonWithQuestion":
            isButtonClicked = true;
            enableAndVisibleButtonsforQuestionMessage(false);
            scene.setComponentProperty( "", "Timer", "interval",intervalForTicketScene);
            scene.executeComponentMethod("", "Timer", "start", "" );
            break;
        }
    }
    if( name === "Timer" && dataName === "onTriggered" )

    {   if ( !isButtonClicked )
        {
            enableAndVisibleButtonsforQuestionMessage(false);
            scene.setComponentProperty( "", "Timer", "interval",intervalForTicketScene);
            scene.executeComponentMethod("", "Timer", "start", "" );
            printCheck( dataOfClientRegistration, serviceNameForRegistration);
            isButtonClicked = true;
        }
        else
        {
            scene.executeComponentMethod("", "Timer", "stop", "" );
            goHome();
            if( isPreRegistration )
            {
                scene.switchScene("welcome.xml");
                isPreRegistration = false;
            }
            else
                scene.switchScene("services.xml");
        }
    }

    if( name === "Printer" && dataName === "PrinterConnected" )
    {
        printerConnected = true;
    }

}
