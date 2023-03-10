import { mediaPicture } from "./mediaPicture.js";
import { mediaVideo } from "./mediaVideo.js";

export function mediaFactory(data,type) {

    if(type === "image"){
        return mediaPicture(data);
    }
    else if (type === "video") {
        return mediaVideo(data);
    } else {
        throw "Unknown type format : image ou video accepté"
    }
}