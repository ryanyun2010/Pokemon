class Popup {
    constructor() {
        this.queue = [];
    }
    showText(texttoshow, func, arg1, arg2, arg3) {
        func = func || function() {};
        arg1 = arg1 || "None";
        arg2 = arg2 || "None";
        arg3 = arg3 || "None";
        if (P("#popuptext").elems[0].innerHTML === "ERROR!") {
            this.showPopup();
            P("#popuptext").html(texttoshow);
            var popupthis = this;
            func(arg1, arg2, arg3);
            P("#popupimg").click(function() {
                P("#popuptext").html("ERROR!");
                if (popupthis.queue.length > 0) {
                    var curqueue = popupthis.queue[0];
                    popupthis.queue.pop();
                    popupthis.showText();
                } else {
                    popupthis.closePopup();
                }
            });
        } else {
            this.queue.push({ "text": texttoshow, "func": func || function() {}, "arg1": arg1 || "None", "arg2": arg2 || "None", "arg3": arg3 || "None" });

        }
    }
    showPopup() {
        P("#popupimg").show();
        P("#popuptext").show();
        showmoves = false;
    }
    closePopup() {
        P("#popupimg").hide();
        P("#popuptext").hide();
        showmoves = true;
    }
}
var popupController = new Popup();