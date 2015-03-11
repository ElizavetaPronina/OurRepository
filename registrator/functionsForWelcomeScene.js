function getRunRowText()
{
    var result = "";

    if(isServerConnected )
    {

        if( !settingsFromServer )
        {
            result = DEFAULT_PARAMETERS.runrowText;
            logger.debug("settingsFromServer = " + settingsFromServer );
        }
        else
        {
            result = getParameter("runrowText");
        }
    }
    else
    {
        result = getParameter("errorMessageSuoNotFound");
    }

    return result;
}
