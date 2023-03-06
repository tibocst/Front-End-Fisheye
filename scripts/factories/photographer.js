export function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // ne pas oublier les alt et aria-label
        const article = document.createElement( 'article' );
        const a = document.createElement( 'a' );
        a.href = "photographer.html?id=" + id;
        const img = getUserPictureDOM();
        
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", " + country;
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;

        const pPrice = getUserPriceDOM();
        
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }

    function getUserPictureDOM() {
        // ne pas oublier les alt et aria-label
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", tagline)

        return (img);
    }

    function getUserInfoDOM() {
        // ne pas oublier les alt et aria-label
        const div = document.createElement( 'div' );
        
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", " + country;

        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;

        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(pTagline);

        return (div);
    }

    function getUserPriceDOM() {
        
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + "€/jour";
        
        return (pPrice);
    }


    return { name, id, city, country, tagline, price, portrait, getUserCardDOM, getUserPictureDOM
  , getUserInfoDOM, getUserPriceDOM }
}