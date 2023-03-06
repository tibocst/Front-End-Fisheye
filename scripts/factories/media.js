export function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    const picture = `assets/sample photos/${image}`;

    function getMediaDOM() {
        // ne pas oublier les alt et aria-label
        const div = document.createElement( 'div' );

        const img = getMediaPictureDOM();

        const divTitre = document.createElement( 'div' );
        
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        
        const pLikes = getMediaLikeDOM();
        
        div.appendChild(img);
        div.appendChild(divTitre);
        divTitre.appendChild(h2);
        divTitre.appendChild(pLikes);

        return (div);
    }

    function getMediaPictureDOM() {
        // ne pas oublier les alt et aria-label
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", title)

        return (img);
    }

    function getMediaLikeDOM() {
        
        const plikes = document.createElement( 'p' );
        plikes.textContent = likes;
        
        return (plikes);
    }


    return { id, photographerId, title, image, likes, date, price, 
        getMediaDOM, getMediaPictureDOM, getMediaLikeDOM }
}