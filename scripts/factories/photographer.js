function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait,  } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // ne pas oublier les alt et aria-label
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", tagline)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", " + country;
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}