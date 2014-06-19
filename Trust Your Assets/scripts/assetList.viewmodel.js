(function (global) {
    var AssetListViewModel,
        app = global.app = global.app || {};

    AssetListViewModel = kendo.data.ObservableObject.extend({
        assetListDataSource: "",
        aboveTrades: 0,
        aboveTrust: -1,
        showNonTrades: false,
        showScams: false,
        categoryId:0,
        minTrust:0,
        forProfit: 0,

        getAboveTrades: function () {
            var that = this;
            if (that.showNonTrades == true) {
                that.set("aboveTrades", -2);
            }

            else {
                that.set("aboveTrades", 0);

            }

        },
        setShowScams: function () {
            var that = this;
            if (that.showScams == true) {
                that.set("aboveTrust", -2);
            }

            else {
                that.set("aboveTrust", -1);

            }

        },

        loadList: function () {
            var that = this;
            var dataSource = "";
           
            that.set("aboveTrades", 0);
            that.set("aboveTrust", -1);
            
          //  kendo.data.ObservableObject.fn.init.apply(that, []);
            dataSource = new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "assetId"
                    }
                },
                batch: true,

                transport: {

                    read: {
 
                        url:function() {
                            return 'http://trustyourassets.com/api/Asset/BasicAssets?aboveTrades=' + that.aboveTrades + '&categoryId=' + that.categoryId + '&minTrust=' + that.aboveTrust + '&forProfit=' + that.forProfit;
                        },

                           
                        dataType: "jsonp", type: "GET",

                    }

                },


                error: function (e) {
                    that.set("errorMsg", "Error: Check Connection ");
                    dataSource.cancelChanges();

                }
            });

          //  dataSource.read();
            that.set("assetListDataSource", dataSource);

        }

    });

    app.assetListService = {
        viewModel: new AssetListViewModel()
    };
})(window);