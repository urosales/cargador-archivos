# Drag & Drop File Component

Un componente ligero en **HTML, CSS y JavaScript** para subir archivos mediante **drag & drop** o seleccionándolos desde el explorador de archivos.

No requiere dependencias ni frameworks.  
Simplemente instancias el componente y puedes obtener los archivos seleccionados para enviarlos en un formulario.

## Características

- Arrastrar archivos a una zona (drag & drop)
- Seleccionar archivos con botón
- Eliminar archivos individualmente
- Obtener los archivos cargados
- Limpiar la caja eliminando todos los archivos
- Sin dependencias
- Fácil de integrar en cualquier proyecto

---

## Instalación

Clona el repositorio o descarga los archivos.

```bash
git clone https://github.com/urosales/cargador-archivos

En el archivo HTML añadimos (En caso de necesitar más cajas sólo se van cambiando el nombre del id="containerBox"):

<div id="containerBox" class="uploader">
        <input type="file" multiple>
        <label>
            <div class="start">
                <i class="fa fa-download"></i>
                <div>Selecciona un archivo o arrastra dentro de la caja</div>
                <span class="btn btn-primary">Selecciona un archivo</span>
            </div>
            <div class="container-files"></div>
        </label>
    </div>

En el archivo Js instanciamos de la siguiente forma:

const cargadorArchivos = new Cargar({
    box:'containerBox',
    extensions:  ['xlsx', 'pdf', 'xml'] //extensions es opcional, definimos los tipos de archivos permitidos, en caso de no añadir la opción todos los tipos de archivos son permitidos
});

cargadorArchivos.returnFiles();//Obtenemos los archivos
cargadorArchivos.cleanFiles();//Limpiamos la caja eliminando todos los archivos
cargadorArchivos.uploadFile(new File([resp], 'nombre'));//Cargamos algún archivo de manera externa(sin tener que arrastrar o utilizar el explorador de archivos)
cargadorArchivos.destroy();//En caso e utilizar alguna plantilla one page podemos eliminar el addEventListener



