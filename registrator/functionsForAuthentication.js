function correctNumberOfPassport(numberOfPassport)
{
    var result = numberOfPassport.substr(0,2)+" "+numberOfPassport.substr(2,2)+ " "+numberOfPassport.substr(4,3)+ " "+numberOfPassport.substr(7,3);
    return result;
}

function enableAndVisibleButtonsforInfoMessage(enable,message,name)
{
    scene.setComponentProperty( "","BackGround","enabled", enable );
    scene.setComponentProperty( "","BackGround","visible", enable );
    scene.setComponentProperty( "",message,"enabled", enable );
    scene.setComponentProperty( "",message,"visible", enable );
    if( name === "passportScene" )
    {
        scene.setComponentProperty( "","passportEdit","enabled", !enable );
        scene.setComponentProperty( "","VirtualKeyboard","enabled", !enable );
        scene.setComponentProperty( "","passportNumber","enabled", !enable );
    }
    if( name === "codeScene" )
    {
        scene.setComponentProperty( "","codeEdit","enabled", !enable );
        scene.setComponentProperty( "","VirtualKeyboard","enabled", !enable );
        scene.setComponentProperty( "","codeWithPreRegistration","enabled", !enable );
    }
}
