function Leer() {
    const peli = document.getElementById("input").value;
    //obtain an apikey on this web
    //http://www.omdbapi.com/apikey.aspx
    const key='04a924ebfb04057dd2c51345c6db2e52';
    const api_url=`http://api.openweathermap.org/data/2.5/weather?q=${peli}&appid=${key}&units=metric`

    buscar3(api_url);
}
     
const buscar3=async(api_url)=>{

    const respuesta= await fetch(api_url);
    const Search = await respuesta.json();
    console.log(respuesta.data);
    
    console.log(Search);

    
    if(Search!=null)
    {
        document.getElementById("lista").innerHTML='';
        
       
        document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                </div>`;
                document.getElementById("lista").innerText=Search.main.temp_max + "°C";
    

    }

}    
