
//Creamos la instacia de nuestra caja de archivos
//box es obligatorio
//extensions es opcional, definimos los tipos de archivos permitidos, en caso de no añadir la opción todos los tipos de archivos son permitidos
const cargadorArchivos = new Cargar({
    box:'containerBox',
    extensions:  ['xlsx', 'pdf', 'xml']
});


//Obtener los archivos de la caja
document.getElementById('show_files').onclick = ()=>{
    const files = cargadorArchivos.returnFiles();
    console.table(files);
    
    //Ejemplo de como se pueden añadir a un formulario
    // Object.keys(files).forEach(e=>{
    //     data.append('archivos', files[e]);
    // });
}

//Limpiar los archivos de la caja
document.getElementById('clean_files').onclick = ()=> cargadorArchivos.cleanFiles();

//Si por alguna razón queremos limpiar los addeventlistener(se utilizan para detectar los clicks a eliminar un archivo)
//cargadorArchivos.destroy();

//Sí se quiere cargar algun archivo de forma externa
// let resp = await fetch(url);
// resp = await resp.blob();
//cargadorArchivos.uploadFile(new File([resp], 'nombre'));