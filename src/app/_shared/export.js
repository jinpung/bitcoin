'use strict';

angular.module('inspinia')
    .service('exportService', function (APIENDPOINT) {
        function CsvGeneretor(dataArray, fileName) {
            this.dataArray = dataArray;
            this.fileName = fileName;
            this.getDownloadLink = function () {
                return this.downloadLink = this.downloadLink || 'data:text/csv;charset=utf-8,%EF%BB%BF' + (this.dataArray.map(function (row) {
                    var str = "";
                    for(var i=0;i<row.length;i++){
                        if(i != 0){
                            str += ",";
                        }
                        str += "\"" + (typeof row[i] == "undefined"?"":row[i]) + "\"";
                    }
                    return str;
                })).join("%0D%0A");
            };
            this.getLinkElement = function (linkText) {
                var downloadLink = this.getDownloadLink();
                return this.linkElement = this.linkElement || $('<a>' + (linkText || '') + '</a>', {
                    href: downloadLink,
                    download: this.fileName
                });
            };
            // call with removeAfterDownload = true if you want the link to be removed after downloading
            this.download = function (removeAfterDownload) {
                this.getLinkElement().css('display', 'none').appendTo('body');
                this.getLinkElement()[0].click();
                if (removeAfterDownload) {
                    this.getLinkElement().remove();
                }
            };
        }
        this.downloadAsCsv = function (dataArray, fileName) {
            dataArray = dataArray || [];
            fileName = fileName || "my_csv.csv";
            var csvGenerator = new CsvGeneretor(dataArray, fileName);
            csvGenerator.download(true);
        };

    });
