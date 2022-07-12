
let pantallaVacia = document.getElementById('pantallaVacia');
let pantallaAgregando  = document.getElementById('pantallaAgregando');      /* cada una de las cuatro pantallas */
let pantallaListado = document.getElementById('pantallaListado');
let pantallaDetalle = document.getElementById('pantallaDetalle');

let formProducto = document.getElementById('formProducto');
let formCategoria = document.getElementById('formCategoria');               /* una variable para cada una de las opciones del form */
let formComentario = document.getElementById('formComentario');

let btnAnadir = document.getElementById('btnAnadir');
let btnAgregar = document.getElementById('btnAgregar');                      /* boton principal agregar */        
let btnAgregarListado = document.getElementById('btnAgregarListado');
let btnDetalle = document.getElementById('btnDetalle');                   /* boton que te lleva al detalle del producto */
let btnEliminarItem = document.getElementById('btnEliminarItem');
let btnVolver = document.getElementById('btnVolver');  


let cerrarDetalle = document.getElementById('cerrarDetalle');

let listado = document.getElementById('listado');                       
let detalle = document.getElementById('detalle');

let detalleCategoria      = document.getElementById("detalleCategoria") ;
let detalleProducto       = document.getElementById("detalleProducto") ;
let detalleComentario     = document.getElementById("detalleComentario") ;


let mostrarInicio = () =>{
    pantallaVacia.style.display = 'block';
    pantallaListado.style.display ='none';
    pantallaAgregando.style.display = 'none';
    pantallaDetalle.style.display ='none;';
}

let mostrarAgregando = () =>{    
    pantallaVacia.style.display = 'none';  
    pantallaListado.style.display='none';  
    pantallaDetalle.style.display='none';   
    pantallaAgregando.style.display = 'block';
} 

let mostrarListado = ()=>{
    pantallaAgregando.style.display='none';   
    pantallaVacia.style.display='none';
    pantallaDetalle.style.display='none';
    pantallaListado.style.display='block';

}

let mostrarDetalle = (categoria,producto,comentario)=>{
    detalleCategoria.setAttribute("src",`${categoria}`);
    detalleProducto.innerHTML = producto;
    detalleComentario.innerHTML = comentario;
    pantallaDetalle.style.display = 'block';
    pantallaListado.style.display = 'none';
}


btnAgregar.addEventListener('click',mostrarAgregando);
btnAgregarListado.addEventListener('click',mostrarAgregando);


let actualizarEstadoListado = () => {
    var estado = localStorage.getItem('estadoListado');
    listado.innerHTML = JSON.parse(estado)
    if (listado.innerHTML === ""){
        mostrarInicio();
    }else{
        mostrarListado();
    }
}

actualizarEstadoListado();

let eliminarItem = (elemento) => {    
    elemento.parentNode.parentNode.remove();
    localStorage.setItem('estadoListado',JSON.stringify(listado.innerHTML))
    actualizarEstadoListado();
}

btnAnadir.addEventListener("click", () => {
    let producto = formProducto.value;
    let categoria = formCategoria.value;                        /* tomo los valores del form ingresados x el usario */
    let comentario = formComentario.value;                       /* modelo = copio el modelo html de como quiero que se vea la lista al onclick le paso los parametros actuales*/
    
    if (categoria != "Categoria" && categoria != "" && producto != "" && comentario != ""){    
        var item = document.createElement('li') 
        item.innerHTML = `  <img src="${categoria}" alt="${producto}">                                                 
                            <p>${producto}</p> 
                            <div class="conteinerBotonesListado">
                            <button onclick="eliminarItem(this)" id="btnEliminarItem">
                            <img src="images/iconos/png/basura.png" alt="" id="pngBasura">
                            </button>                                                                               
                            <button onclick="mostrarDetalle('${categoria}','${producto}','${comentario}')" id="btnDetalle">   
                            <img src="images/iconos/png/flecha" alt="">
                            </button>
                            </div> `;                                 
                        
        listado.appendChild(item);    /* agrego a lavariable listado el nuevo item */       
        localStorage.setItem('estadoListado',JSON.stringify(listado.innerHTML))
        actualizarEstadoListado();
        formProducto.value="";
        formCategoria.value="";
        formComentario.value="";
        mostrarListado();  
        }else{  
            alert("Completa el formulario");
            mostrarAgregando();      
        }     
})

cerrarDetalle.addEventListener("click",() =>{
    mostrarListado();
})