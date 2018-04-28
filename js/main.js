
$(function() {
    //OVERFLOW X SCROLL CSS
    $("#ignicionvalue").on("change", function(e) {
        var ignicion22 = $("#ignicionid").val();
        var ignicion22 = $(e.target.selectedOptions).attr("value");
        if (ignicion22 == '0') {
            $("#velocidad11").val('0');
            $('#velocidad11').attr('readonly', true);
        } else if (ignicion22 == '1') {
            $('#velocidad11').attr('readonly', false);
        }
    });

    $('#datetimepicker2').datetimepicker({
        //format: 'DD-MM-YYYY HH:mm:ss',
        format: 'DD/MM/YYYY hh:mm:ss a',
        defaultDate: new Date()
    });

    $("#cbo_evento").on("change", function(e) {
        var seleccionado = $(e.target.selectedOptions).attr("accion");
        if (seleccionado == 'ninguno') {
            $("#row_campos-adicionales").css('display', 'none');
            $("#campos-adicionales").css('display', 'none');
        } else {
            $("#row_campos-adicionales").css('display', 'block');
            $("#campos-adicionales").css('display', 'block');
            $("#row_campos-adicionales").children('div').css('display', 'none');
            $("#" + seleccionado).css('display', 'block');
        }
    });

    $("#btnActualizar").click(function() {
        var fecha = $('#datetimepicker2').data("DateTimePicker");
        fecha.date(new Date());
    });

    $(document).on('keyup', '#tipo_safe', function(event) {
        let max = parseInt(this.max);
        let valor = parseInt(this.value);
        if (valor > max) {
            this.value = max;
        }
    });

    //valores de 0 a su max
    $(document).on('keyup', '#rumbo1,#direccion,#fuerzaY,#fuerzaZ,#fuerzaX', function(event) {
        let max = parseInt(this.max);

        let valor = parseInt(this.value);
        if (valor > max) {
            this.value = max;
        }
    });

    //valores de 1 a su max
    $(document).on('keyup', '#reglaId,#numero,#cantidadCombustible,#numerodeInput,#parametroId,#valor', function(event) {
        let max = parseInt(this.max);
        let min = parseInt(this.min);
        let valor = parseInt(this.value);
        if (valor < min) {
            this.value = min;
        } else if (valor > max) {
            this.value = max;
        }
    });
});
//Servicios
function enviar() {
    var urlSrv = properties.url + "trama/svr/enviar";

    var ip = $("#ipservidor").val();
    var puertoservidor = $("#puertoservidor").val();
    var obc1 = $("#obc1").val();
    var fecha = $('#datetimepicker2').data("DateTimePicker").date().add(5, "hours").format("YYMMDDHHmmss");
    var cbo_evento1 = $("#cbo_evento").val();
    var velocidad1 = $("#velocidad11").val();
    var ignicionid1 = $("#ignicionid").val();
    var latitud1 = $("#latitud1").val();
    var longitud1 = $("#longitud1").val();
    var rumbo1 = $("#rumbo1").val();
    var ondometro1 = $("#ondometro1").val();
    var altitud1 = $("#altitud1").val();
    var adicionales_cont = $("#row_campos-adicionales").children('div');
    var adicionales = {};

    adicionales_cont.each(function(i, el) {
        if (el.style.display === 'block') {
            var hijoA = $(el).children('div');
            var jsonAttr = "{";
            hijoA.each(function(j, e) {
                var nietoA = $(e).children('div');
                var campo;
                nietoA.each(function(k, en) {
                    if (k % 2 != 0) {
                        campo = hijoA[j].children[k].children[0];
                        jsonAttr = jsonAttr + '"' + campo.id + '":"' + campo.value + '",';
                    }
                });
            });
            jsonAttr = jsonAttr + "}";
            //  console.log(jsonAttr.replace(',}',"}"));
            adicionales = JSON.parse(jsonAttr.replace(',}', "}"));
        }
    });
    var data = {
        ip: ip,
        port: puertoservidor,
        OBC: obc1,
        tiempo1: fecha,
        evento: cbo_evento1,
        velocidad: velocidad1,
        ignicion: ignicionid1,
        latitud: latitud1,
        longitud: longitud1,
        rumbo: rumbo1,
        odometro: ondometro1,
        altitud: altitud1,
        adicionales: adicionales
    };

    post({
        "url": urlSrv,
        "headers": {
            "content-type": "application/json;charset=UTF-8"
        },
        "data": data
    });
}

$("#enviardato").click(function(event) {
    $("#btnVerLog").removeClass("btn btn-primary").addClass("btn btn-primary active-button-log");
    $("#btnFlecha").removeClass("glyphicon glyphicon-chevron-up").addClass("glyphicon glyphicon-chevron-down");
    $("#contenedorLog").removeClass("panel panel-primary").addClass("panel panel-primary active-log");

});

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$(document).ready(function() {
    $("#guardar").click(function() {

        var tramas = "";
        var panel_body = document.querySelectorAll("#contenedorLog .panel-body");
        var hijos = panel_body[0].children;
        var anchor = document.querySelector("#guardar");

        for (var hijo of hijos) {
            tramas += hijo.innerText + "\r\n";
        }
        if (tramas != "") {
            download("trama.csv", tramas);
        } else {
            alert(" error");
        }
    });

    $("#limpiar_campo").click(function(event) {
        $("#contenedor_log").empty();
    });

});
