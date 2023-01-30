let peticion_movimientos = new XMLHttpRequest() //creo un objeto de tipo XMLHttpRequest()
let peticion_alta = new XMLHttpRequest()//esto es para alta

function peticion_alta_handler(){
    if(this.readyState === 4){
        if(this.status === 201 ){
               //deficion de metodo get y ruta para devolucion de datos
                peticion_movimientos.open("GET","http://localhost:5000/api/v1.0/all",true);
                //llamar a la funcion peticion_movimientos_handler
                peticion_movimientos.onload = peticion_movimientos_handler
                //mostrar un error si es que lo hay al realizar la consulta
                peticion_movimientos.onerror = function(){alert("No se ha podido completar la peticion de movimientos")};
                //enviar la consulta como tal
                peticion_movimientos.send();

                document.getElementById("date").value="";
                document.getElementById("concept").value="";
                document.getElementById("quantity").value="";

        }else{
            alert("Se ha producido un error en la consulta");
        }
    }
}        
//funcion para validar y enviar formulario por post
function altaMovimiento(event){
    event.preventDefault();

    //caputar los valores de los inputs en variables 
    const date = document.getElementById("date").value;
    const concept = document.getElementById("concept").value;
    const quantity = document.getElementById("quantity").value;

  
   
    if( concept === ""){
        alert("Debes agregar un concepto");
        return
    }
    if( quantity ==='0' || quantity ===""){
        alert("Debes agregar una cantidad positiva o negativa");
        return
    }

    const hoy = new Date().toISOString().split('T')[0];
    if( !date || date > hoy){
        alert("Debe agregar una fecha menor o igual a hoy");
        return
    }

    peticion_alta.open("POST","http://localhost:5000/api/v1.0/new",true);
    peticion_alta.onload = peticion_alta_handler;
    peticion_alta.onerror = function(){alert("No se ha podido completar la peticion de movimientos")};
    peticion_alta.setRequestHeader("Content-Type","application/json");

    //definir la enstructura json a enviar
    const data_json = JSON.stringify( {           
        date: date,
        concept: concept,
        quantity: quantity
        })
    peticion_alta.send(data_json);


}


//funcion para capturar elementos de respuesta a la consulta get
function peticion_movimientos_handler(){
    if(this.readyState === 4){
        if(this.status === 200 ){
            //alert( this.responseText);//string
            //parsar de string a json
            const datos = JSON.parse(this.responseText);//definir un objeto json
            const tabla = document.getElementById("movements_table");//variable tabla que representa a mi tabla en html
            
            //datos =[{obj1},{obj2}]
            //datos ={data:[{obj1},{obj2}],status:"OK"}
            const movimientos = datos.data;

            for (let i = 0; i < movimientos.length; i++) {
                const fila = document.createElement("tr")

                const celda_date= document.createElement("td")
                celda_date.innerHTML = movimientos[i].date
                fila.appendChild(celda_date)

                const celda_concept= document.createElement("td")
                celda_concept.innerHTML = movimientos[i].concept
                fila.appendChild(celda_concept)

                const celda_quantity= document.createElement("td")
                celda_quantity.innerHTML = movimientos[i].quantity
                fila.appendChild(celda_quantity)
                
                tabla.appendChild(fila)
            }

            
            




        }else{
            alert("Se ha producido un error en la consulta");
        }
    }
}



//funcion para mostar el formulario oculto
function viewForm(event){
    document.getElementById("movements_detail").style.display="block";
}
//funcion para ocultar el formulario una vez visualizado
function hideForm(event){
    document.getElementById("movements_detail").style.display="none";
}

window.onload = function(){//esto se ejecuta cuando todos los elementos de html estan cargados
    let guardar = document.getElementById("btn_guardar");
    guardar.addEventListener("click",altaMovimiento)
    
    let crear = document.getElementById("btn_crear");
    crear.addEventListener("click",viewForm);


    let cerrar = document.getElementById("btn_cerrar");
    cerrar.addEventListener("click",hideForm);

    //deficion de metodo get y ruta para devolucion de datos
    peticion_movimientos.open("GET","http://localhost:5000/api/v1.0/all",true);
    //llamar a la funcion peticion_movimientos_handler
    peticion_movimientos.onload = peticion_movimientos_handler
    //mostrar un error si es que lo hay al realizar la consulta
    peticion_movimientos.onerror = function(){alert("No se ha podido completar la peticion de movimientos")};
    //enviar la consulta como tal
    peticion_movimientos.send();

}