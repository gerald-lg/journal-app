export const fileUpload = async (file) => {

    // if(! file ) throw new Error('El archivo es obligatorio');
    if(! file ) return null;

    const cloudURL = 'https://api.cloudinary.com/v1_1/g3raldev/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });
        
        if( !resp.ok ) throw new Error('No se pudo subir la imagen');
        const cloudResp = await resp.json();
        
        return cloudResp.secure_url;

    } catch (error) {
        // console.error(error);
        return null;
        // throw new Error(error.message);
    }
}