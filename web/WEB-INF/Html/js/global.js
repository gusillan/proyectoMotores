/****** Funciones comunes ******/



$("document").ready(function(){


    /*hacer mayusculas*/
    $(".inputtxt").blur(function(){
        this.value = this.value.toUpperCase();
    });
    $(".inputtxt").keyup(function(){
        this.value = this.value.toUpperCase();
    });


    /*comprueba las validaciones html*/
    $("#alta").click(function(){ 
        var value = true
        $( ".inputtxt" ).each(function( index ) {
            if( !this.validity.valid ){
                console.log("Hay algun campo incorrecto");
                value = false;
                return false;
            }
        });
        if (value){
            console.log("Todo OK"); 
        }
    });

});

