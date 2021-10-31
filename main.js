const DataBase = [];

const Render = () => {


    let content = App();
    let root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(content);

}

const InputFunction = () => {
    let input = document.createElement('input');
    return input;
}

const createFolderButton = () => {
    let button = document.createElement('button');
        button.setAttribute('id','FolderButton')
    button.appendChild(document.createTextNode('Создать папку'));
    return button;
}

const createFileButton = () => {
    let button = document.createElement('button');
        button.setAttribute('id','FileButton')
    button.appendChild(document.createTextNode('Создать файл'));
    return button;

}

const FormEquipment = () => {
    let input = InputFunction();
    let folderButton = createFolderButton();
    let fileButton = createFileButton();
    let formBlockEquipment = document.createElement('div');
    formBlockEquipment.setAttribute('id', 'formBlockEquipment');
    formBlockEquipment.appendChild(input)
    formBlockEquipment.appendChild(folderButton)
    formBlockEquipment.appendChild(fileButton)
    folderButton.addEventListener('click', function () {
        const parent_id = new URLSearchParams(window.location.search).get('id');

        let Data = new Date();
        let FolderAndFileObject = {
            id: Data.getTime(),
            message: input.value,
            type: 'Folder',
            parent_id
        }

        DataBase.push(FolderAndFileObject);
        console.log(DataBase)
        Render();
    })
    fileButton.addEventListener('click', function () {
        let Data = new Date();
        const parent_id = new URLSearchParams(window.location.search).get('id');
        let FolderAndFileObject = {
            id: Data.getTime(),
            message: input.value,
            type: 'File',
            parent_id,
            area: ''
            
        }

        DataBase.push(FolderAndFileObject);
        console.log(DataBase)
         
        Render();
         
    })
    return formBlockEquipment;
}

const FileCreate = () => {
    let file = document.createElement('div');
    file.setAttribute('class', 'file');
    let img = document.createElement('img');
    img.setAttribute('src', 'https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png')
    img.style.display = 'block';

    file.appendChild(img);


    return file;
}
const FolderCreate = () => {
    let folder = document.createElement('div');
    folder.setAttribute('id', 'folder');

    let img = document.createElement('img');
    img.setAttribute('src', ' https://toppng.com/uploads/preview/folder-icon-png-transparent-black-and-white-folder-ico-11563228350ymivezqs50.png');

    let p = document.createElement('p')
    folder.appendChild(img);
    folder.appendChild(p)

    return folder;
}

const newArray = () => {
    let newArrayBlock = document.createElement('div');
    newArrayBlock.setAttribute('id', 'newBlock');
    DataBase.map(function (name, key) {
        let urlParent = new URLSearchParams(window.location.search).get('id');
        if (name.parent_id == urlParent) {
            if (name.type == 'File') {
                let file = FileCreate();
                file.setAttribute('id', `${name.id}`)
                let fileText = name.message;
                let textAr = name.area;

                
                
//                   if(name.id || name.type == 'File'){
//                       let urlParent = new URLSearchParams(window.location.search).get('id');
//                   
//                        if(urlParent != null){
//                        
//                            
//                        let text = document.createElement('textarea')
//                            text.setAttribute('id','text')
//                            
//                       if(name.area != ''){
//                        text.appendChild(document.createTextNode(`${name.area}`))    
//                        }
//                        file.appendChild(text);    
//                               let button = document.createElement('button')
//                       button.addEventListener('click',function(){
//                          DataBase.map(function(name,key){
//                            name.area = text.value;
//                            console.log(DataBase)  
//                          })
//                                           
//                       })
//                       button.appendChild(document.createTextNode('сохранить'))
////                            button.setAttribute('id','Save')
//                        file.appendChild(button)
//                            
//                        
//                    }   
//                        }
                
                        
                     
                file.addEventListener('dblclick', function () {
                    history.pushState({}, name.message, window.location.pathname + '?id=' + name.id);

                    Render()
               
                })
                
                file.appendChild(document.createTextNode('Это ваш файл: ' + `${fileText}`))
//                file.appendChild(document.createTextNode(`${name.area}`))
                         
                
                
               
                newArrayBlock.appendChild(file)
            } else if (name.type == 'Folder') {
                let folder = FolderCreate();
                folder.setAttribute('id', `${name.id}`)
                folder.addEventListener('dblclick', function () {
                    history.pushState({}, name.message, window.location.pathname + '?id=' + name.id)
                    
                    Render()
                })

                let folderText = name.message;
                folder.appendChild(document.createTextNode('Это ваша папка: ' + `${folderText}`))
                newArrayBlock.appendChild(folder)
                //            newArrayBlock.appendChild(folderText)
                console.log(folder);
            }
        }
    })
    return newArrayBlock;
}

const App = () => {
    window.addEventListener('popstate', function () {
        Render();
    });
    window.addEventListener('pushstate', function () {
        Render();
    })

   
    let currentItem = DataBase.filter(function (item) {
        const parent_id = new URLSearchParams(window.location.search).get('id');
        if (item.id == parent_id) {
            return true;
        }
    })[0];
   
    
    let Applicatinon = document.createElement('div');
    Applicatinon.setAttribute('id', 'Applicatinon');
  let form = FormEquipment();
    Applicatinon.appendChild(form);
      let FileAndFolder = newArray(); 
    
    Applicatinon.appendChild(FileAndFolder);
     for (let name of DataBase) {
         

         if (name.type == 'File') {
             
             console.log(form)
             form.parentNode.removeChild(form)
             let urlParent = new URLSearchParams(window.location.search).get('id');

             if (urlParent != null) {


                 let text = document.createElement('textarea')
                 text.setAttribute('id', 'text')

                 if (name.area != '') {
                     text.appendChild(document.createTextNode(`${name.area}`))
                 }
                 FileAndFolder.appendChild(text);
                 let button = document.createElement('button')
                 button.addEventListener('click', function () {
                     DataBase.map(function (name, key) {
                         name.area = text.value;
                         console.log(DataBase)
                     })

                 })
                 button.appendChild(document.createTextNode('сохранить'))
                 //                            button.setAttribute('id','Save')
                 FileAndFolder.appendChild(button)

                 
             }else if(name.type == 'Folder'){
                 console.log(form)
             }
         }

     }
    
   
    
    
    return Applicatinon;
}
Render();