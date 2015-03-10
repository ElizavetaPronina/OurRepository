function printCheck (data, name)
{
    var fullFileCheck = scene.getTemplateDirectory() + "/data/"+ fileCheck;
    ticket =data.Data.ticketTemplate;
    if(data.Result)
    {
        for( var i=0; i<ticket.length; i++)
        {
            ticket = ticket.replace("quote;","\"");
            ticket = ticket.replace("quote,","\"");
            ticket = ticket.replace("_"," ");
            ticket = ticket.replace("percent;","%");
            ticket = ticket.replace("percent,","%");
            ticket = ticket.replace("equal;","=");
            ticket = ticket.replace("equal,","=");
            ticket = ticket.replace("%host%","C:/ProgramData/DoCash/Q2/");
        }
    }
    utils.writeToFile( fullFileCheck, ticket );

    if( !printCheckToTheAndroid )
    {
        var htmlObject = {};
        htmlObject.htmlText =ticket;
        htmlObject.styleSheet = "";
        scene.executeComponentMethod( "", "Printer", "printformattedhtmltext", htmlObject );
    }
    else
    {
        if ( printerConnected )
        {

            var node ='\x1B\x61\x31'
            scene.executeComponentMethod("", "Printer", "executeCommand", node);
            // scene.executeComponentMethod( mainScene, "Printer", "printimage", image);
            scene.executeComponentMethod("", "Printer", "executeCommand", node);
            node =' ' + data.Data.name + '\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            node ='\x1D\x21\x20';
            scene.executeComponentMethod( "", "Printer", "executeCommand", node);
            node ='\x1B\x21\x00';
            scene.executeComponentMethod( "", "Printer", "executeCommand", node);
            node = name + '\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            node ='\x1B\x21\x08';
            scene.executeComponentMethod( "", "Printer", "executeCommand", node);
            node ='\x1D\x21\x00';
            scene.executeComponentMethod( "", "Printer", "executeCommand", node);
            node ='Перед вами ' + CONST_COUNT + ' человек\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            node ='Планируемое время ожидания ' +CONST_COUNT + ' мин.\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            node ='\x1B\x21\x00';
            scene.executeComponentMethod( "", "Printer", "executeCommand", node);
            node ='\x1B\x61\x31';
            scene.executeComponentMethod( "", "Printer", "executeCommand", node);
            node ='Адрес отделения\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            node ='Телефон отделения\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            var date =getDate(data.Data.dtRegistration);
            node =  date[1] + '                                ' + date[0] +'\n' + '\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            node ='\n\n\n\n\n';
            scene.executeComponentMethod( "", "Printer", "print", node);
            node ='\x1D\x56\x00';
            scene.executeComponentMethod( "", "Printer", "executeCommand", node);
        }
        //scene.showMessage( "",  "info", "Внимание", "идет печать талона", [], 20, 20, 10 ); //show message and return exit code
    }
}

function getDate(date)
{
    date = date.split(" ");
    return date;
}

