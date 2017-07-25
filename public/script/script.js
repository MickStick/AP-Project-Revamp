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
       // var InternalPaneBody = document.createElement('div');
        var InternalPaneBody = $("<div></div>");
        
        //var TabBarTitle = document.createElement('label');
        var TabBarTitle = $("<label></label>");
        TabBarTitle.text(title);
        var closeBtn = $("<button></button>");
        var closeBtnIcon = $("<i>close</i>")

        closeBtn.on('click', function(e){
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
        InternalPaneContainer.draggable({cancel: '.InternalPaneContainer > .InternalPaneBody , .InternalPaneContainer > .InternalPaneTabBar > .TabBarClose', containment: Parent});

        if(width == null || width == ""){
            InternalPaneContainer.css({"width":"300px"});
        }else{
            InternalPaneContainer.css({"width": "" + width + "px"});
        }
        if(height == null || height == ""){
            InternalPaneContainer.css({"height": "400px"});
            InternalPaneBody.css({"height": "374px"});
        }else{
            InternalPaneContainer.css({"height": "" + height + "px"});
            InternalPaneBody.css({"height": "" + (height - 26) + "px"});
        }

        return InternalPaneContainer;
    }

    $('#enqBtn').on('click', function(e){
        if(!Parent.has(EnquiryPane).length){
           EnquiryPane = initInternalPane("Enquiry Pane",400,500);           
           Parent.append(EnquiryPane);
        }else{
            alert("Can't Open Multiple Instances of This");
        }
    });

    $('#repBtn').on('click', function(e){
        if(!Parent.has(ReplyPane).length){
           ReplyPane = initInternalPane("Reply Pane",400,300);
           Parent.append(ReplyPane);
        }else{
            alert("Can't Open Multiple Instances of This");
        }
    });

    $('#chatBtn').on('click', function(e){
        if(!Parent.has(ChatPane).length){
           ChatPane = initInternalPane("Chat Pane",400,400);
           Parent.append(ChatPane);
        }else{
            alert("Can't Open Multiple Instances of This");
        }
    });

    
  

    /////////////////////////// Intern Frame Declaration/Desing ///////////////////////

    $('#user-pp').on('click', function(e) {
        $('.user-info-container').animate({ height: 'toggle' }, 200);
    });

    $('#user').on('click', function(e) {
        $('.user-info-container').animate({ height: 'toggle' }, 200);
    });

});