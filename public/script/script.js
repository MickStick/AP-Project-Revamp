$(document).ready(function() {


    //Declaring Parent element main
    var Parent = $('.main-view');
    //var DOMParent = document.getElementsByClassName("main-view")[0];

    //Decalring Internal Views
    var EnquiryPane = null; 
    var ChatPane = null;
    var ReplyPane = null;

    /////////////////////////// Intern Frame Declaration/Desing ///////////////////////

    //Creates the Intrnal Pane/Frame
    function initInternalPane(title, width, height) {
        //var InternalPaneContainer = document.createElement('div');
        var InternalPaneContainer = $("<div></div>");//Declaring the main container of the Internal frame
        //var InternalPaneTabBar = document.createElement('div');
        var InternalPaneTabBar = $("<div></div>");//Declaring Tab bar for the frame
        InternalPaneTabBar.on('mousedown', function(e) {//Pushing the specific frame to the front of all other frames
            Parent.children().css({ "z-index": "1" });
            $(this).parent().css({ "z-index": "3" });
        });
        // var InternalPaneBody = document.createElement('div');
        var InternalPaneBody = $("<div></div>");//Declaring the body of the frame

        //var TabBarTitle = document.createElement('label');
        var TabBarTitle = $("<label></label>");//Declaring the title of the frame
        TabBarTitle.text(title);//Setting title
        var closeBtn = $("<button><i class=\"material-icosn\">close</i></button>");//The Close button

        closeBtn.on('click', function(e) {
            InternalPaneContainer.remove();
        });
        closeBtn.addClass("TabBarClose");
        InternalPaneTabBar.append(TabBarTitle);                     //
        InternalPaneTabBar.append(closeBtn);                        //
        InternalPaneContainer.append(InternalPaneTabBar);           //Adding elements to their specific parent elements
        InternalPaneContainer.append(InternalPaneBody);             //
        InternalPaneContainer.addClass("InternalPaneContainer");
        InternalPaneBody.addClass("InternalPaneBody");
        InternalPaneTabBar.addClass("InternalPaneTabBar");
        //Allowing the Internal Frame to be draggable
        InternalPaneContainer.draggable({ cancel: '.InternalPaneContainer > .InternalPaneBody , .InternalPaneContainer > .InternalPaneTabBar > .TabBarClose'/*Sets That the body and close buttons can't be used to drag the frame*/, 
        containment: Parent });//Sets that the fram can only be draggable around in the Parent main

        if (width == null || width == "") {
            InternalPaneContainer.css({ "width": "300px" });
        } else {
            InternalPaneContainer.css({ "width": "" + width + "px" });                      //
        }                                                                                   //Setting the width and height of
        if (height == null || height == "") {                                               //the Inetrnal Frame Container
            InternalPaneContainer.css({ "height": "400px" });                               //and the body
            InternalPaneBody.css({ "height": "374px" });                                    //
        } else {
            InternalPaneContainer.css({ "height": "" + height + "px" });
            InternalPaneBody.css({ "height": "" + (height - 26) + "px" });
        }

        return InternalPaneContainer;
    }

    //Creates the Element that holds all the necessary parts of the query
    function createEnquiry(query, subject, sender, date, file){ 
        var EnquiryContainer = $("<div class=\"EnquiryContainer\"></div>");
        var Query = $("<p id=\"query\"></p>");
        var Subject = $("<p id=\"subject\"></p>");
        var Sender = $("<p id=\"Qsender\"></p>");
        var Qdate = $("<p id=\"Qdate\"></p>");
        var QFile = $("<p id=\"QFile\"></p>");  
        Query.text(query);
        Query.on("click", function(){
            if(Query.css("height") == "16px"){
                Query.animate({ height: Query.get(0).scrollHeight});        //
            }else{                                                          //Allows viewing of the query in full using a click
                Query.animate({ height:"16px"});                            //
            }
            
        });
        Subject.text(subject);
        Sender.text(sender);
        Qdate.text(date.toDateString()); //Saving the date as a string
        QFile.text(file);  
        EnquiryContainer.append(Sender);
        EnquiryContainer.append(Qdate);
        EnquiryContainer.append(Subject);
        EnquiryContainer.append(QFile);
        EnquiryContainer.append(Query);

        return EnquiryContainer;
    }

    //Creates the Enquiry Viewer Pane/Frame

    function initEnquiryPane(title, width, height) {
        var MainPane = initInternalPane(title, width, height);
        var StudUpdaterWrapper = $("<div class=\"StudUpdaterWrapper\"></div>");
        var StudUpdaterContainer = $("<div class=\"StudUpdaterContainer\"></div>");
        var StudTable = $("<table class=\"Enq-Stud-Table\"></table>");
        ///////////////////// Table Inputs //////////////////////
        var StudIdInput = $("<tr><td><input type=\"text\" placeholder=\"Student ID\"\></td></tr>");
        var StudFnameInput = $("<tr><td><input type=\"text\" placeholder=\"First Name\"\></td></tr>");
        var StudLnameInput = $("<tr><td><input type=\"text\" placeholder=\"Last Name\"\></td></tr>");
        var StudEmailInput = $("<tr><td><input type=\"text\" placeholder=\"Email\"\></td></tr>");
        var StudBalInput = $("<tr><td><input type=\"text\" placeholder=\"Balance $0\"\></td></tr>");
        var StudTelInput = $("<tr><td><input type=\"text\" placeholder=\"Tel: 1 (876) \"\></td></tr>");
        var StudClrInput = $("<tr><td><input type=\"text\" placeholder=\"Clearance Status\"\></td></tr>");
        var UpdateBtn = $("<tr><td><button id=\"updateStud\">Update</button></td></tr>");
        //var Btn = $("<tr><td><button>Update</button></td></tr>");
        StudTable.append(StudIdInput).append(StudFnameInput).append(StudLnameInput).append(StudEmailInput).append(StudBalInput).append(StudTelInput).append(StudClrInput).append(UpdateBtn);
        StudUpdaterContainer.append(StudTable);
        ///////////////////// Table Inputs //////////////////////

        ///////////////////// Student Search //////////////////////
        var StudSearchContainer = $("<div class=\"StudSearchContainer\"></div>");
        var SearchStud = $("<input id=\"SearchStud\" type=\"text\" placeholder=\"Seach Student\">");
        var SearchStudBtn = $("<button id=\"SearchStudBtn\"><i class=\"material-icons\">search</i></button>");
        StudSearchContainer.append(SearchStud).append(SearchStudBtn);
        ///////////////////// Student Search //////////////////////

        StudUpdaterWrapper.append(StudSearchContainer).append(StudUpdaterContainer);

        ///////////////////// Enquiry Viewer //////////////////////
        var EnquiryViewWrapper = $("<div class=\"EnquiryViewWrapper\"></div>");

        ////////////////////////// Viewer /////////////////////////
        var EnquiryViewContainer = $("<div class=\"EnquiryViewContainer\"></div>");
        var d = new Date();
        var EnquiryContainer = createEnquiry("This is a query. A query retreived from the database would be held here." 
                                            +"Just adding extra text so to test out the \"text wrap\". "
                                            +"So ummm..... Idk what else to add to this really but I kinda need it to be longer."
                                            +" Yeah good enough now. Bye.","Test Query","4004040",d,"File Here");
        /*if(!EnquiryViewContainer.has(EnquiryContainer).length){
            alert("empty"); 
        }else{
           console.log(EnquiryViewContainer.children());
        }*/
        EnquiryViewContainer.append(EnquiryContainer);
        ////////////////////////// Viewer /////////////////////////  
        
        /////////////////////// Enquiry Search ////////////////////// 
        var EnquirySearchContainer = $("<div class=\"EnquirySearchContainer\"></div>");
        var SearchEnquiry = $("<select id=\"SearchEnquiry\" placeholder=\"Enquiry Options\">"
                                    +"<option>Refunds</option>"
                                    +"<option>Financial Clearance</option>"
                                    +"<option>Semester Fee Statement</option>"
                                    +"<option>Monies Owed</option>"
                                    +"<option>Account Balance</option>"
                            +"</select>");
        var SearchEnqBtn = $("<button id=\"SearchEnqBtn\"><i class=\"material-icons\">play_arrow</i></button>");
        EnquirySearchContainer.append(SearchEnquiry).append(SearchEnqBtn);
        /////////////////////// Enquiry Search //////////////////////

        EnquiryViewWrapper.append(EnquirySearchContainer).append(EnquiryViewContainer);

        ///////////////////// Enquiry Viewer //////////////////////

        MainPane.children(".InternalPaneBody").append(StudUpdaterWrapper).append(EnquiryViewWrapper);

        return MainPane;
    }

    function initChatPane() {

    }

    function initReplyPane() {

    }

//////////////////////////////////////////////////////// Header Buttons Event Handlers ///////////////////////////////////////////
    $('#enqBtn').on('click', function(e) {
        if (!Parent.has(EnquiryPane).length) {
            EnquiryPane = initEnquiryPane("Enquiry Pane", 700, 575);
            Parent.append(EnquiryPane);
        } else {
            alert("Can't Open Multiple Instances of This");
        }
    });

    $('#repBtn').on('click', function(e) {
        if (!Parent.has(ReplyPane).length) {
            ReplyPane = initInternalPane("Reply Pane", 400, 300);
            Parent.append(ReplyPane);
        } else {
            alert("Can't Open Multiple Instances of This");
        }
    });

    $('#chatBtn').on('click', function(e) {
        if (!Parent.has(ChatPane).length) {
            ChatPane = initInternalPane("Chat Pane", 400, 400);
            Parent.append(ChatPane);
        } else {
            alert("Can't Open Multiple Instances of This");
        }
    });

//////////////////////////////////////////////////////// Header Buttons Event Handlers ///////////////////////////////////////////


    /////////////////////////// Intern Frame Declaration/Desing ///////////////////////
    var speed = 350;
    $('#user-pp').on('click', function(e) {
        $('.user-info-container').animate({ height: 'toggle' }, speed);
    });

    $('#user').on('click', function(e) {
        $('.user-info-container').animate({ height: 'toggle' }, speed);
    });

});