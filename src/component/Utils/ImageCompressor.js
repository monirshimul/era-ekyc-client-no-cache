import { NotificationManager } from "react-notifications";
import imageCompression from 'browser-image-compression';
import { largeTime } from './notificationTime'

export const ImageCompressor = async (event, threshold = 0.1) => {
    if (event.target.files[0]) {
        const imageFile = event.target.files[0];
        //console.log("Type", imageFile.type)
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        const options = {
            maxSizeMB: threshold,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
            //
            let blobTobase = await imageCompression.getDataUrlFromFile(compressedFile)
            let base64Image = blobTobase.split(',')[1];
            //console.log("Blob to Base", base64Image)
            // this.props.handleState("signature", base64Image);
            // this.props.handleState('signatureType', imageFile.type)
            return base64Image
        } catch (error) {
            console.log(error);
            NotificationManager.warning("Click to remove the message", "The file given is not an image", largeTime)
        }
    }
}