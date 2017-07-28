$(document).ready(function() {



    var Parent = $('.main-view');
    var DOMParent = document.getElementsByClassName("main-view")[0];

    var EnquiryPane = null;
    var ChatPane = null;
    var ReplyPane = null;

    /////////////////////////// Intern Frame Declaration/Desing ///////////////////////

    function initInternalPane(title, width, height) {
        //var InternalPaneContainer = document.createElement('div');
        var InternalPaneContainer = $("<div></div>");
        //var InternalPaneTabBar = document.createElement('div');
        var InternalPaneTabBar = $("<div></div>");
        InternalPaneTabBar.on('mousedown', function(e) {
            Parent.children().css({ "z-index": "1" });
            $(this).parent().css({ "z-index": "3" });
        });
        // var InternalPaneBody = document.createElement('div');
        var InternalPaneBody = $("<div></div>");

        //var TabBarTitle = document.createElement('label');
        var TabBarTitle = $("<label></label>");
        TabBarTitle.text(title);
        var closeBtn = $("<button></button>");
        var closeBtnIcon = $("<i>close</i>")

        closeBtn.on('click', function(e) {
            InternalPaneContainer.remove();
        });
        closeBtnIcon.addClass("material-icons");
        closeBtn.append(closeBtnIcon);
        closeBtn.addClass("TabBarClose");
        InternalPaneTabBar.append(TabBarTitle);
        InternalPaneTabBar.append(closeBtn);
        InternalPaneContainer.append(InternalPaneTabBar);
        InternalPaneContainer.append(InternalPaneBody);
        InternalPaneContainer.addClass("InternalPaneContainer");
        InternalPaneBody.addClass("InternalPaneBody");
        InternalPaneTabBar.addClass("InternalPaneTabBar");
        InternalPaneContainer.draggable({ cancel: '.InternalPaneContainer > .InternalPaneBody , .InternalPaneContainer > .InternalPaneTabBar > .TabBarClose', containment: Parent });

        if (width == null || width == "") {
            InternalPaneContainer.css({ "width": "300px" });
        } else {
            InternalPaneContainer.css({ "width": "" + width + "px" });
        }
        if (height == null || height == "") {
            InternalPaneContainer.css({ "height": "400px" });
            InternalPaneBody.css({ "height": "374px" });
        } else {
            InternalPaneContainer.css({ "height": "" + height + "px" });
            InternalPaneBody.css({ "height": "" + (height - 26) + "px" });
        }

        return InternalPaneContainer;
    }

    function initEnquiryPane(title, width, height) {
        var MainPane = initInternalPane(title, width, height);
        var StudUpdaterWrapper = $("<div class=\"StudUpdaterWrapper\"></div>");
        var StudUpdaterContainer = $("<div class=\"StudUpdaterContainer\"></div>");
        var StudTable = $("<table class=\"Enq-Stud-Table\"></table>");
        ///////////////////// Table Inputs //////////////////////
        var StudIdInput = $("<tr><td><input type=\"text\" placeholder=\"Student ID\"\></td></tr>");
        StudIdInput.children().children().val("Bread");
        var StudFnameInput = $("<tr><td><input type=\"text\" placeholder=\"First Name\"\></td></tr>");
        var StudLnameInput = $("<tr><td><input type=\"text\" placeholder=\"Last Name\"\></td></tr>");
        var StudEmailInput = $("<tr><td><input type=\"text\" placeholder=\"Email\"\></td></tr>");
        var StudBalInput = $("<tr><td><input type=\"text\" placeholder=\"Balance $0\"\></td></tr>");
        var StudTelInput = $("<tr><td><input type=\"text\" placeholder=\"Tel: 1 (876) \"\></td></tr>");
        var StudClrInput = $("<tr><td><input type=\"text\" placeholder=\"Clearance Status\"\></td></tr>");
        var UpdateBtn = $("<tr><td><button>Update</button></td></tr>");
        //var Btn = $("<tr><td><button>Update</button></td></tr>");
        StudTable.append(StudIdInput).append(StudFnameInput).append(StudLnameInput).append(StudEmailInput).append(StudBalInput).append(StudTelInput).append(StudClrInput).append(UpdateBtn);
        ///////////////////// Table Inputs //////////////////////

        ///////////////////// Enquiry Viewer //////////////////////
        var EnquiryViewWrapper = $("<div class\"EnquiryViewWrapper\"></div>");
        var EnquiryViewContaner = $("<div class\"EnquiryViewContainer\"></div>");
        var EnquiryContaner = $("<div class\"EnquiryContainer\"></div>");
        var Query = $("<label></label>");

        ///////////////////// Enquiry Viewer //////////////////////

        MainPane.children(".InternalPaneBody").append(StudTable);

        return MainPane;
    }

    function initChatPane() {

    }

    function initReplyPane() {

    }


    $('#enqBtn').on('click', function(e) {
        if (!Parent.has(EnquiryPane).length) {
            EnquiryPane = initEnquiryPane("Enquiry Pane", 800, 575);
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




    /////////////////////////// Intern Frame Declaration/Desing ///////////////////////
    var speed = 350;
    $('#user-pp').on('click', function(e) {
        $('.user-info-container').animate({ height: 'toggle' }, speed);
    });

    $('#user').on('click', function(e) {
        $('.user-info-container').animate({ height: 'toggle' }, speed);
    });

});