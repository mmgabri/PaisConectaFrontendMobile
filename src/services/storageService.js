import { firebase } from '@react-native-firebase/storage';
import uuid from 'uuid';

const uploadImage = (image) => {
    console.log('--- uploadImage ---')
    return new Promise((resolve, reject) => {

        const id = uuid();
        const storageRef = firebase.storage().refFromURL('gs://paisconecta-44403.appspot.com/');

        //informando o caminho do butcket e nome da imagem, no caso sera um ID único
        const fileName = `Images/${id}.jpg`
        console.log(fileName)
        storageRef.child(`Images/${id}.jpg`).putString(image, 'base64', {
            contentType: 'image/jpeg',
        })
            .then(snapshot => {
                //criando o link da URL que sera retornado
                firebase.storage().ref().child(fileName).getDownloadURL()
                    .then((imageUrl) => {
                        resolve(imageUrl);
                    })
                    .catch(error => {
                        console.log('Erro no getDownloadURL:', error)
                        deleteImage(fileName);
                    })
            })
            .catch(error => {
                console.log('Erro no upload:', error)
                deleteImage(fileName)
                reject(error);
            })
    })
}

const deleteImage = (image) => {
    console.log('--- deleteImage --- ', image)

    const storageRef = firebase.storage().refFromURL('gs://paisconecta-44403.appspot.com/');
    storageRef.child(image).delete()
        .then(() => {
            console.log('Imagem deletada com sucesso')
        })
        .catch(error => {
            console.log('Erro no delete da imnagem:', error)
        })

    return;

}

export {
    uploadImage,
    deleteImage
};