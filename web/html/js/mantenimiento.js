/* Listener
 * *******************************************************/

$(function() {



    $("tbody tr:visible:odd").addClass("striped");

    $(".g-table-mantenimiento th.btn").click(function(){
        var newClass = "success";
        var filterClass = "h-"+$(this).html();
        $( $("th")[4] ).html()
        if ( $(this).hasClass(newClass) ){
            $(".g-table-mantenimiento th.btn").removeClass(newClass);
            $( "tbody tr").show();   
        }else{
            $(".g-table-mantenimiento th.btn").removeClass(newClass);   
            $(this).addClass(newClass);
            $( "tbody tr").hide();
            $( "td."+filterClass+":contains('X')" ).parents("tbody tr").show();
        }
        $("tbody tr").removeClass("striped");
        $("tbody tr:visible:odd").addClass("striped");
    });


    //Columnas sobre categorias de recambio a mostrar 
    $(".h-columnsFilter").click(function(){      
        var checked = $(this).prop("checked");
        if (checked) {
            $("thead th.h-"+this.value).show();
            $("tbody td.h-"+this.value).show();
        }else{
            $("thead th.h-"+this.value).hide();
            $("tbody td.h-"+this.value).hide();
        }
    });


    $("th.h-checkboxFilter").mouseover(function(){
        var value = $(this).children("input").val();
        $("#diferenciaTiempo").text("3A4m");
        $("#diferenciaKm").text("15430");
    });
    $("th.h-checkboxFilter").mouseout(function(){
        $("#diferenciaTiempo").text("");
        $("#diferenciaKm").text("");
    });


});

/* Funciones Básicas Botones
 **********************************************************/
