function workWithTicketScene(name, dataName, data)
{
    if( dataName === "onLoaded" )
    {
        scene.setComponentProperty( "", "ticket", "text", clientNumber);
        var  requestConfirmation = getParameter("requestConfirmation");
        if ( requestConfirmation )
        {
            setStartSceneTimer(getParameter("ShowMessageDelay")*1000);
            enableAndVisibleButtonsforQuestionMessage(true);
        }
        else
        {
            setStartSceneTimer(getParameter("resetInterval")*1000);
            printCheck( dataOfClientRegistration, serviceNameForRegistration);
        }
    }
    if( dataName === "onClicked" )
    {
        setStartSceneTimer(getParameter("resetInterval")*1000);
        isButtonClicked = true;
        switch( name )
        {
        case "okButtonWithQuestion":
            enableAndVisibleButtonsforQuestionMessage(false);
            printCheck( dataOfClientRegistration, serviceNameForRegistration);
            break;
        case "cancelButtonWithQuestion":
            enableAndVisibleButtonsforQuestionMessage(false);
            break;
        }
    }
    if( name === "Timer" && dataName === "onTriggered" )
    {
        if( requestConfirmation && !isButtonClicked )
        {
            enableAndVisibleButtonsforQuestionMessage(false);
            setStartSceneTimer(getParameter("resetInterval")*1000);
            printCheck( dataOfClientRegistration, serviceNameForRegistration);
            isButtonClicked = true;
        }
        else
        {
            if( typeOfRegistration === "code" )
            {
                setSceneAndTimerStop("welcome.xml");
                typeOfRegistration = "";
            }
            else
            {
                goHome();
                setSceneAndTimerStop("services.xml");
            }
        }

    }
    if( name === "Printer" && dataName === "PrinterConnected" )
    {
        printerConnected = true;
    }

}
