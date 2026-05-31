import { useState, useEffect } from 'react';
import './admin-products.styles.scss';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    costPrice: '',
    description: '',
    imageUrl: '',
    isActive: true,
    sizes: [],
    colors: [],
    colorStock: [],
  });

  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newColorQty, setNewColorQty] = useState('');

  const getToken = () => localStorage.getItem('adminToken');

  // ===============================
  // Fetch Products
  // ===============================
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/products', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // Fetch Categories for dropdown
  // ===============================
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ===============================
  // Handle Image File Change
  // ===============================
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, imageUrl: '' });
  };

  // ===============================
  // Upload Image to ImageKit
  // ===============================
  const uploadImage = async () => {
    if (!imageFile) return formData.imageUrl;
    setIsUploading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('image', imageFile);
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formDataObj,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.url;
    } finally {
      setIsUploading(false);
    }
  };

  // ===============================
  // Add Size
  // ===============================
  const handleAddSize = () => {
    if (!newSize.trim()) return;
    if (formData.sizes.includes(newSize.trim())) return;
    setFormData({ ...formData, sizes: [...formData.sizes, newSize.trim()] });
    setNewSize('');
  };

  const handleRemoveSize = (size) => {
    setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
  };

  // ===============================
  // Add Color with Quantity
  // ===============================
  const handleAddColor = () => {
    if (!newColor.trim() || !newColorQty) return;
    if (formData.colors.includes(newColor.trim())) return;

    setFormData({
      ...formData,
      colors: [...formData.colors, newColor.trim()],
      colorStock: [
        ...formData.colorStock,
        { color: newColor.trim(), quantity: parseInt(newColorQty), soldQuantity: 0 }
      ],
    });
    setNewColor('');
    setNewColorQty('');
  };

  const handleRemoveColor = (color) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(c => c !== color),
      colorStock: formData.colorStock.filter(cs => cs.color !== color),
    });
  };

  // ===============================
  // Validate Form
  // ✅ validate all required fields before submitting
  // ===============================
  const validate = () => {
    if (!formData.name.trim()) {
      return 'Product name is required';
    }
    if (!formData.categoryId) {
      return 'Please select a category';
    }
    if (!formData.price || Number(formData.price) <= 0) {
      return 'Price must be greater than 0';
    }
    if (!formData.costPrice || Number(formData.costPrice) <= 0) {
      return 'Cost price must be greater than 0';
    }
    // ✅ business logic — cost price should be less than selling price
    if (Number(formData.costPrice) >= Number(formData.price)) {
      return 'Cost price must be less than selling price';
    }
    if (formData.sizes.length === 0) {
      return 'Please add at least one size';
    }
    if (formData.colorStock.length === 0) {
      return 'Please add at least one color with quantity';
    }
    return null; // ✅ no error
  };

  // ===============================
  // Handle Form Submit (Add / Edit)
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // ✅ validate before submitting
    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      // ✅ upload image first if file selected
      const imageUrl = await uploadImage();

      // ✅ calculate total stockQuantity from colorStock
      const stockQuantity = formData.colorStock.reduce(
        (total, cs) => total + cs.quantity, 0
      );

      const url = editingProduct
        ? `http://localhost:5000/api/admin/products/${editingProduct._id}`
        : 'http://localhost:5000/api/admin/products';

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ ...formData, imageUrl, stockQuantity })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      await fetchProducts();
      resetForm();
    } catch (error) {
      setFormError(error.message);
    }
  };

  // ===============================
  // Handle Delete
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  // ===============================
  // Handle Toggle isActive
  // ===============================
  const handleToggle = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  // ===============================
  // Handle Edit — populate form with existing data
  // ===============================
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId?._id || product.categoryId,
      price: product.price,
      costPrice: product.costPrice,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      isActive: product.isActive,
      sizes: product.sizes || [],
      colors: product.colors || [],
      colorStock: product.colorStock || [],
    });
    setImagePreview(product.imageUrl || null);
    setImageFile(null);
    setShowForm(true);
  };

  // ===============================
  // Reset Form
  // ===============================
  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      categoryId: '',
      price: '',
      costPrice: '',
      description: '',
      imageUrl: '',
      isActive: true,
      sizes: [],
      colors: [],
      colorStock: [],
    });
    setImageFile(null);
    setImagePreview(null);
    setFormError(null);
    setNewSize('');
    setNewColor('');
    setNewColorQty('');
  };

  // ===============================
  // Filter products by category
  // ✅ fixed: use toString() for consistent comparison
  // bcz categoryId can be object {_id, title} or just a string
  // ===============================
  const filteredProducts = filterCategory === 'all'
    ? products
    : products.filter(p => {
        const catId = p.categoryId?._id || p.categoryId;
        return catId?.toString() === filterCategory;
      });

  // ===============================
  // Count products per category
  // ===============================
  const getProductCountByCategory = (categoryId) => {
    return products.filter(p => {
      const catId = p.categoryId?._id || p.categoryId;
      return catId?.toString() === categoryId;
    }).length;
  };

  if (isLoading) return <div className='admin-products__loading'>Loading products...</div>;
  if (error) return <div className='admin-products__error'>Error: {error}</div>;

  return (
    <div className='admin-products'>

      {/* ===============================
          Header
      =============================== */}
      <div className='admin-products__header'>
        <h1 className='admin-products__title'>Products</h1>
        <button
          className='admin-products__add-btn'
          onClick={() => setShowForm(true)}
        >
          + Add Product
        </button>
      </div>

      {/* ===============================
          Category Filter + Count
      =============================== */}
      <div className='admin-products__filter'>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className='admin-products__filter-select'
        >
          {/* ✅ show total count in All Categories option */}
          <option value='all'>All Categories ({products.length})</option>
          {categories.map(cat => (
            // ✅ show count per category in dropdown
            <option key={cat._id} value={cat._id}>
              {cat.title} ({getProductCountByCategory(cat._id)})
            </option>
          ))}
        </select>

        {/* ✅ show filtered count */}
        <p className='admin-products__count'>
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* ===============================
          Add / Edit Form
      =============================== */}
      {showForm && (
        <div className='admin-products__form-overlay'>
          <div className='admin-products__form'>
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className='admin-products__form-field'>
                <label>Name</label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder='Product name'
                  required
                />
              </div>

              {/* Category dropdown */}
              <div className='admin-products__form-field'>
                <label>Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value=''>Select category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.title}</option>
                  ))}
                </select>
              </div>

              {/* Price & Cost Price side by side */}
              <div className='admin-products__form-row'>
                <div className='admin-products__form-field'>
                  <label>Price ($)</label>
                  <input
                    type='number'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder='0.00'
                    required
                    min='0'
                  />
                </div>
                <div className='admin-products__form-field'>
                  <label>Cost Price ($)</label>
                  <input
                    type='number'
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    placeholder='0.00'
                    required
                    min='0'
                  />
                </div>
              </div>

              {/* Description */}
              <div className='admin-products__form-field'>
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder='Product description...'
                  rows={3}
                />
              </div>

              {/* Sizes — add by typing and pressing Enter or clicking Add */}
              <div className='admin-products__form-field'>
                <label>Sizes</label>
                <div className='admin-products__tags'>
                  {formData.sizes.map((size, idx) => (
                    <span key={idx} className='admin-products__tag'>
                      {size}
                      <button type='button' onClick={() => handleRemoveSize(size)}>×</button>
                    </span>
                  ))}
                </div>
                <div className='admin-products__add-row'>
                  <input
                    type='text'
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder='e.g. S, M, L, XL or 40, 41'
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
                  />
                  <button type='button' onClick={handleAddSize} className='admin-products__add-tag-btn'>
                    Add
                  </button>
                </div>
              </div>

              {/* Colors with Quantity — each color has its own stock */}
              <div className='admin-products__form-field'>
                <label>Colors & Quantity</label>
                <div className='admin-products__color-stock'>
                  {formData.colorStock.map((cs, idx) => (
                    <div key={idx} className='admin-products__color-item'>
                      {/* color swatch */}
                      <span
                        className='admin-products__color-swatch'
                        style={{ backgroundColor: cs.color.toLowerCase() }}
                      />
                      <span>{cs.color}</span>
                      <span>Qty: {cs.quantity}</span>
                      <button type='button' onClick={() => handleRemoveColor(cs.color)}>×</button>
                    </div>
                  ))}
                </div>
                <div className='admin-products__add-color-row'>
                  <input
                    type='text'
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder='Color name'
                  />
                  <input
                    type='number'
                    value={newColorQty}
                    onChange={(e) => setNewColorQty(e.target.value)}
                    placeholder='Qty'
                    min='0'
                  />
                  <button type='button' onClick={handleAddColor} className='admin-products__add-tag-btn'>
                    Add
                  </button>
                </div>
              </div>

              {/* Image Upload */}
              <div className='admin-products__form-field'>
                <label>Upload Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageFileChange}
                />
              </div>

              {/* Image Preview */}
              {(imagePreview || formData.imageUrl) && (
                <div className='admin-products__preview'>
                  <img src={imagePreview || formData.imageUrl} alt='preview' />
                </div>
              )}

              {/* isActive checkbox */}
              <div className='admin-products__form-field admin-products__form-field--checkbox'>
                <label>
                  <input
                    type='checkbox'
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              {/* ✅ show validation or server error */}
              {formError && <p className='admin-products__form-error'>{formError}</p>}

              <div className='admin-products__form-buttons'>
                <button
                  type='submit'
                  className='admin-products__save-btn'
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : editingProduct ? 'Update' : 'Add'}
                </button>
                <button
                  type='button'
                  className='admin-products__cancel-btn'
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===============================
          Products Table
      =============================== */}
      <div className='admin-products__table-wrapper'>
        <table className='admin-products__table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Cost Price</th>
              <th>Stock per Color</th>
              <th>Total Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='admin-products__table-img'
                    />
                  ) : (
                    <span className='admin-products__no-image'>No image</span>
                  )}
                </td>
                <td>{product.name}</td>
                {/* ✅ show category title from populated field */}
                <td>{product.categoryId?.title || 'N/A'}</td>
                <td>${product.price}</td>
                <td>${product.costPrice}</td>

                {/* ✅ show stock per color */}
                <td>
                  <div className='admin-products__color-stock-display'>
                    {product.colorStock?.map((cs, idx) => (
                      <div key={idx} className='admin-products__color-stock-item'>
                        <span
                          className='admin-products__color-swatch'
                          style={{ backgroundColor: cs.color.toLowerCase() }}
                        />
                        <span>{cs.color}: {cs.quantity}</span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* ✅ show total stock */}
                <td>{product.stockQuantity}</td>

                <td>
                  <span className={`admin-products__status ${
                    product.isActive
                      ? 'admin-products__status--active'
                      : 'admin-products__status--inactive'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className='admin-products__actions'>
                    <button
                      className='admin-products__edit-btn'
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className={`admin-products__toggle-btn ${
                        product.isActive
                          ? 'admin-products__toggle-btn--deactivate'
                          : 'admin-products__toggle-btn--activate'
                      }`}
                      onClick={() => handleToggle(product._id)}
                    >
                      {product.isActive ? '🔴 Deactivate' : '🟢 Activate'}
                    </button>
                    <button
                      className='admin-products__delete-btn'
                      onClick={() => handleDelete(product._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;