function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var Deporte = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var alumno = {
            id, //matricula:id    id:id
            nombre,//nombre:nombre
            correo,
            Deporte,
        }

        var lista_Deportistas=JSON.parse(localStorage.getItem("Deportistas"));

        if(lista_Deportistas==null)
        { 
            var lista_Deportistas = [];
        }
        
        const existe = lista_Deportistas.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_Deportistas=lista_Deportistas.filter(alumno=>alumno.id!=id);

            }
                
            lista_Deportistas.push(alumno);
            var temporal = lista_Deportistas.sort((a,b) => a.id-b.id);
            localStorage.setItem("Deportistas", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de alumno","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_Deportistas = JSON.parse(localStorage.getItem("Deportistas"));
    
     
    if(lista_Deportistas)
    {
        lista_Deportistas.forEach((alumno)=>printRow(alumno));
    }
}


function printRow(alumno){
    
    if(alumno!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = alumno.id;
        cell2.innerHTML = alumno.nombre; 
        cell3.innerHTML = alumno.correo;
        cell4.innerHTML = alumno.Deporte; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${alumno.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+alumno.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_Deportistas = JSON.parse(localStorage.getItem("Deportistas"));
    var temporal=lista_Deportistas.filter(alumno=>alumno.id!=id);
    localStorage.setItem("Deportistas", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Deportistas");
    }
  
    read();
    
}

function seekR(id){

    const lista_Deportistas = JSON.parse(localStorage.getItem("Deportistas"));
    var alumno=lista_Deportistas.filter(alumno=>alumno.id==id);
    //console.log(alumno[0]);
    updateR(alumno[0]);
}

function updateR(alumno){
    if(alumno!=null)
    {
        document.getElementById("Input1").value=alumno.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=alumno.nombre;
        document.getElementById("Input3").value=alumno.correo;
        document.getElementById("Input4").value=alumno.Deporte;
    }
}


//Para consulta de Deporte
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_Deportistas = JSON.parse(localStorage.getItem("Deportistas"));
    var DeportistasC=lista_Deportistas.filter(alumno=>alumno.Deporte==c);
    if(DeportistasC)
    {
        DeportistasC.forEach((alumno)=>printRowQ(alumno));
    }
    //console.log(DeportistasC)

}


function printRowQ(alumno){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = alumno.id;
    cell2.innerHTML = alumno.nombre; 
    cell3.innerHTML = alumno.correo;
    cell4.innerHTML = alumno.Deporte; 
   
}