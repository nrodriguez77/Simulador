

function post(opt_options) {
    var options = opt_options || {};
    var url = options['url'] || '';
    var headers = options['headers'] || {};
    var data = options['data'] || {};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": headers,
        "processData": false,
        "data": JSON.stringify(data)
    };

     $.ajax(settings).done(function(response) {
        var trama = {};
        trama = response.resultado.split("?");

        $("#contenedorLog .panel-body").prepend("<div class='row trama-response "+(trama[1]!=="ok"?"log_error":"")+"'>"+trama[0]+"</div>");
    });
    
}