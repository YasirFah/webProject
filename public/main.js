const apiUrl = 'http://localhost:5000/api/products';

document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

// Get form elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let createBtn = document.getElementById('createbtn');
let search = document.getElementById('search');
let productsTable = document.getElementById('itemsList');
let deleteAllBtn = document.getElementById('deletebtn');
let mood = 'create';
let tmpId;



// Calculate total price
function findTotal() {
    if (price.value !== '') {
        let vat = (+price.value + +ads.value) * (+taxes.value / 100);
        let discountAmount = (+price.value + +ads.value + +vat) * (+discount.value / 100);
        let result = (+price.value + +ads.value + +vat) - discountAmount;
        total.innerHTML = result.toFixed(2);
        total.style.backgroundColor = 'darkgreen';
    } else {
        total.style.backgroundColor = 'brown';
        total.innerHTML = '';
    }
}

// Attach event listeners to auto-update total
price.addEventListener('input', findTotal);
ads.addEventListener('input', findTotal);
taxes.addEventListener('input', findTotal);
discount.addEventListener('input', findTotal);

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Add or Update product
async function saveProduct() {
    let product = {
        title: title.value,
        price: +price.value,
        ads: +ads.value,
        taxes: +taxes.value,
        discount: +discount.value,
        total: parseFloat(total.innerHTML),
        count: +count.value,
        category: category.value
    };
    
    if (mood === 'create') {
        for (let i = 0; i < product.count; i++) {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
        }
    } else {
        await fetch(`${apiUrl}/${tmpId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        mood = 'create';
        count.style.display = 'block';
        createBtn.innerText = 'Create';
    }
    clearForm();
    fetchProducts();
}

// Delete product
async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchProducts();
}

// Delete all products
async function deleteAllProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    for (let product of products) {
        await deleteProduct(product._id);
    }
}

// Display products in table
function displayProducts(products) {
    if (!productsTable) return;
    
    productsTable.innerHTML = ''; // Clear the table
    products.forEach((product, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.ads}</td>
            <td>${product.taxes}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button onclick="editProduct('${product._id}', '${product.title}', ${product.price}, ${product.ads}, ${product.taxes}, ${product.discount}, '${product.category}')">Update</button></td>
            <td><button onclick="deleteProduct('${product._id}')">Delete</button></td>
        </tr>`;
        productsTable.innerHTML += row;
    });
    deleteAllBtn.innerHTML = `Delete All Product (${products.length})`;
    if(products.length>0){
        deleteAllBtn.style.display = 'block';
    }else{
        deleteAllBtn.style.display = 'none';
    }
}

// Edit product
function editProduct(id, titleVal, priceVal, adsVal, taxesVal, discountVal, categoryVal) {
    title.value = titleVal;
    price.value = priceVal;
    ads.value = adsVal;
    taxes.value = taxesVal;
    discount.value = discountVal;
    category.value = categoryVal;
    findTotal();
    mood = 'update';
    createBtn.innerText = 'Update';
    count.style.display = 'none';
    tmpId = id;
}

// Defult search mode 
let searchMode = 'title';

// Function to set search mode
function GetSearchMood(mode) {
    searchMode = mode;
    search.placeholder = `Search By ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
    search.focus();
    search.value = ''; 
    fetchProducts(); 
}

// Search functionality
function searchProducts() {
    let keyword = search.value.toLowerCase();
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            let filtered = products.filter(p => {
                if (searchMode === 'title') {
                    return p.title.toLowerCase().includes(keyword);
                } else {
                    return p.category.toLowerCase().includes(keyword);
                }
            });
            displayProducts(filtered);
        });
}

// Clear form
function clearForm() {
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.backgroundColor = 'brown';
}

// Event Listeners
createBtn.onclick = saveProduct;
deleteAllBtn.onclick = deleteAllProducts;
search.onkeyup = searchProducts;

