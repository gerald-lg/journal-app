import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers";

cloudinary.config({
    cloud_name: 'g3raldev',
    api_key: '258449965233279',
    api_secret: 'kL4-NT6u3NJrbq35KTVQgJUJIjc',
    secure: true,
})

describe('Pruebas en fileUpload', () => { 
    test('Debe de subir el archivo correctamente a cloudinary', async () => {

        const imgUrl = `https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg`;
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();

        const file = new File([blob], 'wallpaper.jpg');

        const url = await fileUpload( file );
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        await cloudinary.api.delete_resources([imageId]);
    });
    
    test('Debe de retornal null', async () => {

        const file = new File([], 'wallpaper.jpg');

        const url = await fileUpload( file );
        expect(url).toBeNull();
    })
    
});