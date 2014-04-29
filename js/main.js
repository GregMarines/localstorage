var ListView = function(el){
    this.el = $(el);
};

ListView.prototype.refreshList = function(items){
    this.el.html('');
    this.el.hide();
    this.addItems(items);
    this.el.fadeIn('slow');
};

ListView.prototype.addItems = function(items) {
    $.each(items,$.proxy(function(i,item){
        this.addItem(item);
    },this));
};

ListView.prototype.addItem = function(item){
    this.el.append($("<li/>").html(item.TITLE));
}

var App = (function(){
    var db = localStorage;

    function initialize() {	
        studiosListView = new ListView(".main ul");
        bindEvents();
        populateStudiosList(getStudiosFromLocalStorage());

        this.getStudios = getStudiosFromLocalStorage;
        this.sync = sync;
        this.clear = clear;
    }

    function bindEvents() {
        $("a#sync").on('click',sync);
        $("a#clear").on('click',clear);
    }

    function populateStudiosList(studios) {
        studiosListView.refreshList(studios);
    }
    
    function getStudiosFromLocalStorage() {
        return JSON.parse(db.getItem("studios")) || [];
    }

    function clear() {
        resetLocalStorage();
        populateStudiosList(getStudiosFromLocalStorage());
    }

    function sync() {
		var url = "http://www.laudisi.com/retjson/test1.cfm"	
        $.getJSON(url, function(studios){
            storeStudiosInLocalStorage(studios);
            populateStudiosList(studios);
        });
    }

    function resetLocalStorage() {
        db.setItem("studios", JSON.stringify({ studios: [] }));
    }

    function storeStudiosInLocalStorage(studios) {
     db.setItem("studios", JSON.stringify(studios));
    };

    return {
        initialize: initialize
    }
})();