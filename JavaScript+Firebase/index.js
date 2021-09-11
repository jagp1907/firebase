var firebaseConfig = {
    apiKey: "AIzaSyBwJa3w0Ix3nVb1y7Y8cDWv5_YO-6SzGUU",
  authDomain: "proyecto1-e8515.firebaseapp.com",
  databaseURL: "https://proyecto1-e8515-default-rtdb.firebaseio.com",
  projectId: "proyecto1-e8515",
  storageBucket: "proyecto1-e8515.appspot.com",
  messagingSenderId: "862045029429",
  appId: "1:862045029429:web:a7da0cb08edac056a61d7c",
  measurementId: "G-3CMWBBDY1R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var celular = document.getElementById("Input3").value;
    var Deporte = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var deportista = {
            id, //matricula:id
            nombre,
            celular,
            Deporte,
        }

        //console.log(deportista);

        firebase.database().ref('deportistas/' + id).update(deportista).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('deportistas').push().key;
    //data[`deportistas/${key}`]= deportista;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('deportistas');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(deportista){
    
    if(deportista!=null){
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
        cell1.innerHTML = deportista.id;
        cell2.innerHTML = deportista.nombre; 
        cell3.innerHTML = deportista.celular;
        cell4.innerHTML = deportista.Deporte; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${deportista.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+deportista.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('deportistas/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('deportistas/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(deportista){
    if(deportista!=null)
    {
        document.getElementById("Input1").value=deportista.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=deportista.nombre;
        document.getElementById("Input3").value=deportista.celular;
        document.getElementById("Input4").value=deportista.Deporte;
    }
}


//Para consulta de Deporte
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("deportistas");
    ref.orderByChild("Deporte").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(deportista){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = deportista.id;
    cell2.innerHTML = deportista.nombre; 
    cell3.innerHTML = deportista.celular;
    cell4.innerHTML = deportista.Deporte; 
   
}