async function loadCategory(category) {
    try {
        const response = await fetch('productos.json');
        const data = await response.json();
        const categoryData = data[category];

        // Cargar las imágenes destacadas si existen
        const productImagesDiv = document.getElementById('product-images');
        productImagesDiv.innerHTML = '';
        
        if (categoryData.imagenes_destacadas && categoryData.imagenes_destacadas.length > 0) {
            categoryData.imagenes_destacadas.forEach(imagePath => {
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Imagen destacada de ${category}`;
                productImagesDiv.appendChild(img);
            });
        }

        // Cargar las descripciones de los productos
        const productDescriptionsDiv = document.getElementById('product-descriptions');
        productDescriptionsDiv.innerHTML = '';

        if (categoryData.productos && categoryData.productos.length > 0) {
            categoryData.productos.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product-description';

                const textDiv = document.createElement('div');
                textDiv.className = 'product-text';
                
                const title = document.createElement('h3');
                title.textContent = product.nombre;
                
                const description = document.createElement('p');
                description.textContent = product.descripcion;

                textDiv.appendChild(title);
                textDiv.appendChild(description);

                const priceButtonsDiv = document.createElement('div');
                priceButtonsDiv.className = 'price-buttons';

                // Botón de precio base
                const baseButton = document.createElement('button');
                baseButton.textContent = `$${product.precio_base}`;
                priceButtonsDiv.appendChild(baseButton);

                // Contenedor para precios extras
                const extraPricesDiv = document.createElement('div');
                extraPricesDiv.className = 'extra-prices';

                // Agregar precio con papas si existe
                if (product.precio_con_papa) {
                    const comboButton = document.createElement('button');
                    comboButton.textContent = `Con papa $${product.precio_con_papa}`;
                    extraPricesDiv.appendChild(comboButton);
                }

                // Agregar precio para dos personas si existe
                if (product.precio_para_dos) {
                    const paraDosButton = document.createElement('button');
                    paraDosButton.textContent = `Para dos $${product.precio_para_dos}`;
                    extraPricesDiv.appendChild(paraDosButton);
                }

                // Agregar precio para tres personas si existe
                if (product.precio_para_tres) {
                    const paraTresButton = document.createElement('button');
                    paraTresButton.textContent = `Para tres $${product.precio_para_tres}`;
                    extraPricesDiv.appendChild(paraTresButton);
                }

                // Agregar precio con huevo si existe
                if (product.precio_con_Huevo) {
                    const huevoButton = document.createElement('button');
                    huevoButton.textContent = `Con huevo $${product.precio_con_Huevo}`;
                    extraPricesDiv.appendChild(huevoButton);
                }

                // Agregar precio con aros si existe
                if (product.precio_con_ArosDeCebolla) {
                    const arosButton = document.createElement('button');
                    arosButton.textContent = `Con aros $${product.precio_con_ArosDeCebolla}`;
                    extraPricesDiv.appendChild(arosButton);
                }

                // Solo agregar el contenedor de precios extras si tiene elementos
                if (extraPricesDiv.children.length > 0) {
                    priceButtonsDiv.appendChild(extraPricesDiv);
                }

                productDiv.appendChild(textDiv);
                productDiv.appendChild(priceButtonsDiv);

                productDescriptionsDiv.appendChild(productDiv);
            });
        }

        // Inicializar los botones del carrito después de cargar los productos
        initializeCartButtons();

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Cargar la categoría de sandwiches por defecto
document.addEventListener('DOMContentLoaded', () => {
    loadCategory('sandwiches');
});
