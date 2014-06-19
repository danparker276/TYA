(function (global) {
    var AssetDetailsViewModel,
        app = global.app = global.app || {};

    AssetDetailsViewModel = kendo.data.ObservableObject.extend({
        adAssetId: "",
        data2: "",
        assetDetails: "",
        adError: "",
        cryptoId: "",
        lastTradesDataSource: "",
        dayTradesDataSource: "",
        adLinksDataSource: "",
        scheme: "Bearer",
        userLoggedIn: false,
        updateNotesTxt: "",
        tbAddLinkTxt: "",
        tbAddLinkNameTxt: "",
        updateTrust:0,
        updateCategory:0,
        updateDividends: 0,
        updateStatus: 0,
        pageLoading: true,
        errorLoading: false,

        categoryDD: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://trustyourassets.com/api/Admin/CategoryDD",
                    dataType: "jsonp"
                }
            }
        }),
        dividendDD: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://trustyourassets.com/api/Admin/DividendDD",
                    dataType: "jsonp"
                }
            }
        }),
        statusDD: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://trustyourassets.com/api/Admin/StatusDD",
                    dataType: "jsonp"
                }
            }
        }),




        fillLastTrades: function (inAssetId) {

            var that = this;
            var dataSource = "";
            kendo.data.ObservableObject.fn.init.apply(that, []);
            dataSource = new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "myTradeId"
                    }
                },
                batch: true,

                transport: {

                    read: {

                        url: 'http://trustyourassets.com/api/Asset/LastTrades?assetId=' + inAssetId,
                        dataType: "jsonp", type: "GET"
                    }

                },


                error: function (e) {
                    that.set("errorMsg", "Error: Check Connection ");
                    dataSource.cancelChanges();

                }
            });

            dataSource.read();
            that.set("lastTradesDataSource", dataSource);

        },
        
        fillLinks: function (inAssetId) {
            var that = this;
            var dataSourceLinks = "";

            dataSourceLinks = new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "link"
                    }
                },
                batch: true,

                transport: {

                    read: {

                        url: 'http://trustyourassets.com/api/Asset/AssetLinks?assetId=' + inAssetId,
                        dataType: "jsonp", type: "GET"
                    }

                },


                error: function (e) {
                    that.set("errorMsg", "Error: Check Connection ");
                    dataSource.cancelChanges();

                }
            });

            dataSourceLinks.read();
            that.set("adLinksDataSource", dataSourceLinks);

        },
        fillDayTrades: function (inAssetId) {
            var that = this;
            var dataSourceDT = "";

            dataSourceDT = new kendo.data.DataSource({

                batch: true,

                transport: {

                    read: {

                        url: 'http://trustyourassets.com/api/Asset/DayTradesAvg?assetId=' + inAssetId,
                        dataType: "json", type: "GET"
                    }

                },


                error: function (e) {
                    that.set("errorMsg", "Error: Check Connection ");
                    dataSourceDT.cancelChanges();

                }
            });

            dataSourceDT.read();
            that.set("dayTradesDataSource", dataSourceDT);

        },

        fillAssetId: function (inAssetId) {
   
            var that = this;
            that.set("adAssetId", inAssetId);


            $.ajax({
                url: 'http://trustyourassets.com/api/Asset/AssetDetails?assetId=' + inAssetId,
                type: 'GET',
                dataType: 'jsonp',


                success: function (data, textStatus, xhr) {

                     //   var jsonObject = JSON.parse(xhr.responseText);
                     //   that.set("assetDetails", jsonObject.assetDetails);

                   /* that.set("assetDetails", data.assetDetails);
                    that.set("cryptoId", data.assetDetails.cryptoId);*/

                    that.set("assetDetails", data);
                    that.set("updateNotesTxt", data.tyaReview);
                    
                    that.set("cryptoId", data.cryptoId);

                    that.set("updateTrust", data.trustLevel);
                    that.set("updateCategory", data.categoryId);
                    that.set("updateDividends", data.dividendId);
                    that.set("updateStatus", data.assetStatusId);
                    that.set("pageLoading", false);
                    

             
                },
                error: function (xhr, textStatus, errorThrown) {
                //    var jsonObject = JSON.parse(xhr.responseText);
                   // that.set("adError", jsonObject.errorMsg);
                    //app.masterService.viewModel.setError("AsseError:" + jsonObject.errorMsg);
                    that.set("errorLoading", true);
                    that.set("adError", errorThrown);


                }
            });



        }

    });

    app.assetDetailsService = {
        viewModel: new AssetDetailsViewModel()
    };
})(window);