function getTreeNode(authorizedСlient)
{
    treeNode.segment = authorizedСlient.segment;
    treeNode.clientCode = authorizedСlient.clientCode;
    treeNode.parentId = IS_CLIENT;
}

function enableButtonsforTreeNode(enable)
{
    scene.setComponentProperty( "", "ButtonsPageList", "enabled", enable );
    scene.setComponentProperty( "", "home", "enabled", enable );
    scene.setComponentProperty( "", "ago", "enabled", enable );
    scene.setComponentProperty( "", "nextTemplates", "enabled", enable );
    scene.setComponentProperty( "", "previousTemplates", "enabled", enable );
}
function enableAndVisibleButtonsforQuestionMessage(enable)
{
    scene.setComponentProperty( "","BackGround","enabled", enable );
    scene.setComponentProperty( "","questionOfPrintTicket","enabled", enable );
    scene.setComponentProperty( "","okButtonWithQuestion","enabled", enable );
    scene.setComponentProperty( "","cancelButtonWithQuestion","enabled", enable );
    scene.setComponentProperty( "","BackGround","visible", enable );
    scene.setComponentProperty( "","questionOfPrintTicket","visible", enable );
    scene.setComponentProperty( "","okButtonWithQuestion","visible", enable );
    scene.setComponentProperty( "","cancelButtonWithQuestion","visible", enable );
    scene.setComponentProperty( "","ticket","enabled", !enable );
    scene.setComponentProperty( "","title","enabled", !enable );
}

function getParameter( propertyObject )
{
    var result;
    if( propertyObject in suoParameters )
        result = suoParameters[propertyObject];
    else if( propertyObject in DEFAULTPARAMETERS )
        result = DEFAULTPARAMETERS[propertyObject];
    return result;
}

function goHome()
{
    logger.info( "Нажата кнопка домой" );
    if(parentIdArray.length === 0)
        treeNode =rootNode;
    else
    {
        treeNode["parentId"]=parentIdArray[0];
        parentIdArray.splice(0,parentIdArray.length);
    }
    loadNextServiceTree();
}

function goBack()
{
    logger.info( "Нажата кнопка назад" );
    if(parentIdArray.length === 0)
        treeNode =rootNode;
    else
    {
        treeNode["parentId"]=parentIdArray[parentIdArray.length -1];
        parentIdArray.pop();
    }
    loadNextServiceTree();
}

function processServiceButton(buttonId)
{
    for(var key in treeServices)
    {
        if( buttonId === key )
        {
            if(treeServices[key]["isFolder"] === IS_FOLDER )
            {
                parentIdArray.push(treeNode["parentId"]);
                treeNode["parentId"] = treeServices[key]["id"];
                loadNextServiceTree();
            }
            else
            {
                clientForRegistration["serviceId"] = treeServices[key]["id"];
                serviceNameForRegistration = treeServices[key]["name"];
                scene.executeComponentMethod( "", "TransportLayer","registerClient",clientForRegistration);
            }
        }
    }
}

function loadNextServiceTree()
{
    scene.executeComponentMethod("", "ButtonsPageList","clear","");
    scene.executeComponentMethod("", "TransportLayer", "getNodeServices",treeNode);
}
function retrieveTransportLayerSignalOfRegistration(data)
{
    clientNumber = data.Data.name;
    dataOfClientRegistration = data;
    showArray(data.Data);
    var takePhoto =  getParameter("takePhoto");
    var photoPath =  getParameter("photoPath");

    if( takePhoto !== undefined && takePhoto && photoPath !== undefined )
        scene.executeComponentMethod("", "PhotoCapture", "capture", photoPath + clientNumber + extension );

    scene.switchScene("ticket.xml");
}

