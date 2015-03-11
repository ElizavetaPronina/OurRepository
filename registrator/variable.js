var fileCheck =  "check.html";

var treeServices = {};
var suoParameters = {};
var authorizedСlient = {};
var clientForRegistration = {languageId:"1",serviceId:"10000",segment:"vip"};

var rootNode = {languageId:"1",parentId:"10000", segment:"vip",allItems:"0",clientCode:""};

var treeNode = rootNode;

var parentIdArray = [];
var dataOfClientRegistration = [];
var  DEFAULT_PARAMETERS = {
    takePhoto:true,
    photoPath:"C:/ProgramData/DoCash/Q2/Photos/",
    requestConfirmation:true,
    ShowMessageDelay:7,
    ShowErrorDelay:7,
    runrowText : "Регистратор",
    resetInterval:10,
    infoMessageConnectToSUO : "true",
    errorMessageSuoNotFound : "Сервер не найден!",
    welcomeContentType : "slideshow"
};
var IS_FOLDER = "1";
var IS_SERVICE = "0";
var CONST_COUNT = "5";
var IS_CLIENT = "103326";
var NUMBER_PASSPORT_MAX = 10;
var NUMBER_PREREGISTRATION_MAX = 6;

var clientNumber = "";
var ticket = "";
var numberOfPassport = "";
var numberOfPreRegistration = "";
var serviceNameForRegistration = "";

//var intervalForTicketScene = 7000;

var extension = ".png";

var printCheckToTheAndroid = false;
var isButtonClicked = false;
var printerConnected = false;
var settingsFromServer = true;

var showWrongCodeMessage = true;
var showWrongCardMessage = true;
var showWrongPassportMessage = true;
var registrateClientWithoutPaper = true;
var isServerConnected = false;

var startAuthClientByMessage = "Подождите, идет автоpизация...";
var typeOfRegistration = "";
var welcomeText = "Здравствуйте!<br/>Пожалуйста, выберите способ регистрации в очереди:";
var IMAGE_PARAMETERS = { direction : "clockwise", duration : 1000 };

