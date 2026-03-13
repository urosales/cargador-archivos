class Cargar{

    constructor(data){
        this.box = document.querySelector(`#${data.box}`);
        this.input_file = this.box.querySelector('input[type="file"]');
        this.contenedorListaArchivos = this.box.querySelector('.container-files');
        this.btnFake = this.box.querySelector('span'); //Botón que activa el input file
        this.files = {};//Almacenamos los archivos que se mandaran en el formulario
        this.extensions = (data && data.extensions) || [];//Tipo de extensiones permitidas

        //Al dar click en el botón falso llamamos al real
        this.btnFake.onclick = ()=>this.input_file.click();
    
        //Detectamos cambios en el input_file
        this.input_file.onchange = (e)=>{
            for(let i=0;i<e.target.files.length;i++ )
                this.uploadFile(e.target.files[i]);
            this.input_file.value = '';
        };

       //Efecto de arrastrar sobre la caja
        this.box.ondragover = (e)=>{
            e.preventDefault();
            e.stopPropagation();
            this.box.classList.add('dragover');
        };

        //Efecto de soltar sobre la caja
        this.box.ondrop = (e)=>{
            e.preventDefault();
            e.stopPropagation();
            this.box.classList.remove('dragover');
            for(let i=0;i<e.dataTransfer.items.length;i++ ){
                if (e.dataTransfer.items[i].kind === "file") {
                    const file = e.dataTransfer.items[i].getAsFile();
                    this.uploadFile(file);
                }
            }
        };

        //Efecto de dejar la caja
        this.box.ondragleave = (e)=>{
            e.preventDefault();
            e.stopPropagation();
            this.box.classList.remove('dragover');
        };

         //Guardamos la referencia y asegura que `this` siga apuntando a la instancia de la clase
        this.eventListenerClick = this.eventListenerClick.bind(this);

        this.contenedorListaArchivos.addEventListener('click', this.eventListenerClick);

    }

    eventListenerClick(e){
        if (e.target.matches('i.fa-close')) {
            //const id = e.target.closest('[data-id]').dataset.id
            const id = e.target.getAttribute('data-id');
            this.deleteFile(e, id);
            console.log('eliminado');
        }
    }

    //Si por alguna razón se necesitan eliminar los addEventListener (tal vez el uso de un one page por ejemplo para evitar eventos duplicados)
    destroy() {
        this.contenedorListaArchivos.removeEventListener('click', this.eventListenerClick);
    }

    //Cargamos el archivo a la caja
    uploadFile(file){

        //Si extensions está vacia entonces permitimos cualquier tipo de archivo
        if(this.extensions.length > 0){
            let nameFile = file.name;
            //Sólo aceptamos el formato que se defina
            const regex = new RegExp(`\\.(${this.extensions.join('|')})$`, 'i');
            if (!regex.test(nameFile.toLowerCase())) 
                return;
        }
       
        //Generamos un id para poder identificar el archivo en caso de que se quiera eliminar
        const id = Math.floor(Math.random() * 100000); 

        //Guardamos la lista de archivos que posteriormente se van a guardar
        this.files[id] = file;

        //Añadimos al final
        this.contenedorListaArchivos.insertAdjacentHTML('beforeend',
            `<label style="margin-bottom:10px;position:relative;">
                <i class="fa fa-close fa-2x" style="position:absolute;top:3px;right:3px;cursor:pointer;color:#dd4b39;padding:4px;" data-id="${id}"></i>
                <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding:0 20px;">${file.name}</div>
                <div>Tamaño: ${Cargar.formatBytes(file.size)}</div>
            </label>`
        );
    }


    //Eliminamos el archivo seleccionado
    deleteFile(e,id){
        delete this.files[id];//Eliminación real
        e.target.parentElement.remove();//Eliminación visual
    }

    //Calculamos el peso del archivo
    static formatBytes(bytes, decimals = 2) {

        if (bytes === 0) 
            return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    //Retornamos los archivos que esten en la caja
    returnFiles(){
        return this.files;
    }

    //Limpiamos la caja de arrastre
    cleanFiles(){
        this.files = {};//Eliminación real
        this.contenedorListaArchivos.innerHTML = '';//Eliminación visual
    }

    
}
