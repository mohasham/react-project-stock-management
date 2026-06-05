import { useState, useEffect } from 'react';
import './admin-categories.styles.scss';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ title: '', imageUrl: '' });
  const [formError, setFormError] = useState(null);
  const [imageFile, setImageFile] = useState(null); // ✅ for file upload
  const [imagePreview, setImagePreview] = useState(null); // ✅ for preview
  const [isUploading, setIsUploading] = useState(false); // ✅ upload loading state

  const getToken = () => localStorage.getItem('adminToken');

  // ===============================
  // Fetch Categories
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
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ===============================
  // Handle Image File Change
  // ===============================
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // ✅ local preview before upload
    setFormData({ ...formData, imageUrl: '' }); // ✅ clear URL if file selected
  };

  // ===============================
  // Handle Image URL Change
  // ===============================
  const handleImageUrlChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.value });
    setImageFile(null); // ✅ clear file if URL entered
    setImagePreview(null);
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
      return data.url; // ✅ return ImageKit URL
    } finally {
      setIsUploading(false);
    }
  };

  // ===============================
  // Validate Form
  // ✅ validate required fields before submitting
  // ===============================
  const validate = () => {
    if (!formData.title.trim()) {
      return 'Category title is required';
    }
    if (formData.title.trim().length < 2) {
      return 'Category title must be at least 2 characters';
    }
    // ✅ check if title already exists (only for new categories)
    if (!editingCategory) {
      const exists = categories.find(
        cat => cat.title.toLowerCase() === formData.title.trim().toLowerCase()
      );
      if (exists) {
        return 'Category with this title already exists';
      }
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

      const url = editingCategory
        ? `http://localhost:5000/api/admin/categories/${editingCategory._id}`
        : 'http://localhost:5000/api/admin/categories';

      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ ...formData, imageUrl })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      await fetchCategories();
      resetForm();
    } catch (error) {
      setFormError(error.message);
    }
  };

  // ===============================
  // Handle Delete
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      await fetchCategories();
    } catch (error) {
      setError(error.message);
    }
  };

  // ===============================
  // Handle Toggle isActive
  // ===============================
  const handleToggle = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/categories/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      await fetchCategories();
    } catch (error) {
      setError(error.message);
    }
  };

  // ===============================
  // Handle Edit
  // ===============================
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ title: category.title, imageUrl: category.imageUrl || '' });
    setImagePreview(category.imageUrl || null);
    setImageFile(null);
    setShowForm(true);
  };

  // ===============================
  // Reset Form
  // ===============================
  const resetForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ title: '', imageUrl: '' });
    setFormError(null);
    setImageFile(null);
    setImagePreview(null);
  };

  if (isLoading) return <div className='admin-categories__loading'>Loading categories...</div>;
  if (error) return <div className='admin-categories__error'>Error: {error}</div>;

  return (
    <div className='admin-categories'>
      <div className='admin-categories__header'>
        <h1 className='admin-categories__title'>Categories</h1>
        <button
          className='admin-categories__add-btn'
          onClick={() => setShowForm(true)}
        >
          + Add Category
        </button>
      </div>

      {/* ===============================
          Add / Edit Form
      =============================== */}
      {showForm && (
        <div className='admin-categories__form-overlay'>
          <div className='admin-categories__form'>
            <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>

            <form onSubmit={handleSubmit}>
              <div className='admin-categories__form-field'>
                <label>Title</label>
                <input
                  type='text'
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder='Category title'
                />
              </div>

              {/* ✅ Image URL input */}
              <div className='admin-categories__form-field'>
                <label>Image URL</label>
                <input
                  type='text'
                  value={formData.imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder='https://...'
                  disabled={!!imageFile} // ✅ disable if file selected
                />
              </div>

              {/* ✅ OR divider */}
              <div className='admin-categories__or'>
                <span>OR</span>
              </div>

              {/* ✅ File upload input */}
              <div className='admin-categories__form-field'>
                <label>Upload Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageFileChange}
                />
              </div>

              {/* ✅ image preview */}
              {(imagePreview || formData.imageUrl) && (
                <div className='admin-categories__preview'>
                  <img
                    src={imagePreview || formData.imageUrl}
                    alt='preview'
                  />
                </div>
              )}

              {/* ✅ show validation or server error */}
              {formError && <p className='admin-categories__form-error'>{formError}</p>}

              <div className='admin-categories__form-buttons'>
                <button
                  type='submit'
                  className='admin-categories__save-btn'
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : editingCategory ? 'Update' : 'Add'}
                </button>
                <button
                  type='button'
                  className='admin-categories__cancel-btn'
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
          Categories Table
      =============================== */}
      <div className='admin-categories__table-wrapper'>
        <table className='admin-categories__table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className='admin-categories__table-img'
                    />
                  ) : (
                    <span className='admin-categories__no-image'>No image</span>
                  )}
                </td>
                <td>{category.title}</td>
                <td>
                  <span
                    className={`admin-categories__status ${
                      category.isActive
                        ? 'admin-categories__status--active'
                        : 'admin-categories__status--inactive'
                    }`}
                  >
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className='admin-categories__actions'>
                    <button
                      className='admin-categories__edit-btn'
                      onClick={() => handleEdit(category)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className={`admin-categories__toggle-btn ${
                        category.isActive
                          ? 'admin-categories__toggle-btn--deactivate'
                          : 'admin-categories__toggle-btn--activate'
                      }`}
                      onClick={() => handleToggle(category._id)}
                    >
                      {category.isActive ? '🔴 Deactivate' : '🟢 Activate'}
                    </button>
                    <button
                      className='admin-categories__delete-btn'
                      onClick={() => handleDelete(category._id)}
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

export default AdminCategories;