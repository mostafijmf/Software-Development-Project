const searchProduct = () => {
    const search = document.getElementById('searchInput');

    fetch(`https://dummyjson.com/products/search?q=${search.value}`)
        .then(res => res.json())
        .then(data => displayProduct(data.products || []))
        .catch(err => console.log(err))
}


const displayProduct = (products) => {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    const err = document.getElementById('error-message');

    if (products.length === 0) {
        return err.classList.remove('d-none')
    }
    err.classList.add('d-none');

    products.slice(0, 20).forEach(product => {
        const div = document.createElement('div');
        div.classList.add('col-lg-4', 'col-md-6', 'col-12');
        div.innerHTML = `
            <div class="card w-100 h-100">
                <img src="${product.thumbnail || 'https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'}" class="card-img-top" alt="..." height="200">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text mb-3">Price : ${product.price}</p>
                    <button class="btn btn-primary w-100" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="productDetails(${product.id})">View Details</button>
                </div>
            </div>
        `
        productContainer.appendChild(div);
    });
}


const productDetails = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            console.log(product);
            const pd = document.getElementById('product-details');
            let stars = '';
            for (let i = 0; i < Math.floor(product.rating); i++) {
                stars += '&#9733;';
            }
            pd.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <img src="${product.thumbnail || 'https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'}" alt="" class="img-thumbnail">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-2"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <h4>${stars}</h4>
                        <p class="m-1 mt-3"><strong class="d-inline-block me-3">Price :</strong>${product.price}</p>
                        <p class="m-1"><strong class="d-inline-block me-3">Offer Price :</strong>${product.discountPercentage}</p>
                        <p class="m-1"><strong class="d-inline-block me-3">Brand :</strong>Brand</p>
                        <p class="m-1 mt-2"><strong class="d-inline-block me-3">Description :</strong><br>
                            An apple mobile which is nothing like apple
                        </p>
                    </div>
                    <div class="modal-footer border-0 justify-content-between">
                        <span class="fs-6 fw-medium text-success">Stock Available</span>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            `
        })
        .catch(err => console.log(err));
}