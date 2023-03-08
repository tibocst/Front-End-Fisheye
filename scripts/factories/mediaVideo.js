export function mediaVideo(data) {
    // en gros la il faut gerer le constructeur quand c'est une image ou une vidéo
    
    const { id, photographerId, title, video, likes, date, price } = data;

    const videoPath = `assets/sample photos/${video}`;

    function getMediaDOM() {
        // ne pas oublier les alt et aria-label
        const div = document.createElement( 'div' );

        const video = getMediaVideoDOM();

        const divTitre = document.createElement( 'div' );
        
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        
        const pLikes = getMediaLikeDOM();
        
        div.appendChild(video);
        div.appendChild(divTitre);
        divTitre.appendChild(h2);
        divTitre.appendChild(pLikes);

        return (div);
    }

    function getMediaVideoDOM() {
        // ne pas oublier les alt et aria-label
        
        const video = document.createElement( 'video' );
        const source = document.createElement( 'source' );
        
        video.setAttribute("controls","");
        source.setAttribute("src", videoPath);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        return (video);
    }

    function getMediaLikeDOM() {
        
        const plikes = document.createElement( 'p' );
        plikes.textContent = likes;
        
        return (plikes);
    }


    return { id, photographerId, title, video, likes, date, price, 
        getMediaDOM, getMediaVideoDOM, getMediaLikeDOM }
}