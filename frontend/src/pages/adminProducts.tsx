import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Product } from '@/components/ui/ProductCard';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import styles from '@/styles/Admin.module.css';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const [isAddingNewSubCat, setIsAddingNewSubCat] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', subtitle: '', price: 0, image: '', category: 'Coffee', subCategory: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', subtitle: '', price: 0, image: '', category: 'Coffee', subCategory: '' });
    setIsAddingNewSubCat(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.image,
      category: product.category,
      subCategory: product.subCategory
    });
    setIsAddingNewSubCat(false);
    setIsModalOpen(true);
  };

  const handleRemove = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        showToast('Product removed successfully!');
      } else {
        showToast('Failed to remove product.');
      }
    } catch (error) {
      showToast('Error occurred.');
    }
  };

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default image if none provided
    const payload = {
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updatedProduct = await res.json();
          setProducts(products.map(p => p.id === editingId ? updatedProduct : p));
          showToast('Product updated successfully!');
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const newProduct = await res.json();
          setProducts([newProduct, ...products]);
          showToast('New product added successfully!');
        }
      }
    } catch (error) {
      showToast('Error saving product.');
    }

    setIsModalOpen(false);
    setFormData({ name: '', subtitle: '', price: 0, image: '', category: 'Coffee', subCategory: '' });
  };

  const availableSubCategories = Array.from(
    new Set(
      products
        .filter(p => p.category === formData.category)
        .map(p => p.subCategory)
        .filter(Boolean)
    )
  ) as string[];

  // Group products by category, then by subCategory
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {};
    }
    const subCat = product.subCategory || 'General';
    if (!acc[product.category][subCat]) {
      acc[product.category][subCat] = [];
    }
    acc[product.category][subCat].push(product);
    return acc;
  }, {} as Record<string, Record<string, Product[]>>);

  return (
    <AdminLayout title="Products">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Products</h1>
          <p className={styles.pageSub}>Manage your inventory organized by categories and sub-categories.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`${styles.btnAdmin} ${styles.btnPrimary}`} onClick={openAddModal}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '1rem' }}>
        {Object.entries(groupedProducts).map(([category, subCategories]) => (
          <div key={category} className={styles.sectionBlock} style={{ padding: '2.5rem' }}>
            
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--brown-dark)', marginBottom: '2rem', borderBottom: '2px solid var(--brown-dark)', paddingBottom: '0.75rem' }}>
              {category}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {Object.entries(subCategories).map(([subCat, items]) => (
                <div key={subCat}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {subCat} <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.2rem 0.6rem', background: 'var(--brown-dark)', color: 'white', borderRadius: '99px' }}>{items.length} items</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {items.map(product => (
                      <div key={product.id} style={{ display: 'flex', flexDirection: 'column' }}>
                        
                        {/* Square Image Container */}
                        <div style={{ 
                          position: 'relative', 
                          width: '100%', 
                          aspectRatio: '1/1', 
                          border: '1px solid var(--brown-dark)', 
                          borderRadius: '4px',
                          overflow: 'hidden',
                          backgroundColor: 'white'
                        }}>
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            style={{ objectFit: 'cover' }} 
                            unoptimized
                          />
                          
                          {/* Hover Actions */}
                          <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', flexDirection: 'column', gap: '0.4rem', zIndex: 10 }}>
                            <button 
                              title="Edit Product"
                              onClick={() => openEditModal(product)}
                              style={{ background: 'white', border: '1px solid var(--brown-dark)', borderRadius: '4px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--brown-dark)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              title="Remove Product"
                              onClick={() => handleRemove(product.id)}
                              style={{ background: 'white', border: '1px solid var(--brown-dark)', borderRadius: '4px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--orange-dark)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Details below card */}
                        <div style={{ marginTop: '0.75rem' }}>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--brown-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={product.name}>
                            {product.name}
                          </h3>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--brown-mid)', marginTop: '0.1rem' }}>
                            ₹{product.price}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', border: '1px solid var(--brown-dark)', padding: '2.5rem', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brown-dark)' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--brown-dark)', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <form onSubmit={handleLaunch} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Product Name</label>
                  <input required type="text" className={styles.searchBar} style={{ width: '100%' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Price (₹)</label>
                  <input required type="number" className={styles.searchBar} style={{ width: '100%' }} value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Subtitle / Short Description</label>
                <input required type="text" className={styles.searchBar} style={{ width: '100%' }} value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Primary Category</label>
                  <select 
                    className={styles.searchBar} 
                    style={{ width: '100%' }} 
                    value={formData.category} 
                    onChange={e => {
                      setFormData({...formData, category: e.target.value, subCategory: ''});
                      setIsAddingNewSubCat(false);
                    }}
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Matcha">Matcha</option>
                    <option value="Organic">Organic</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Sub-Category</label>
                  {(!isAddingNewSubCat && availableSubCategories.length > 0) ? (
                    <select
                      required
                      className={styles.searchBar}
                      style={{ width: '100%' }}
                      value={availableSubCategories.includes(formData.subCategory || '') ? formData.subCategory : ''}
                      onChange={e => {
                        if (e.target.value === '__NEW__') {
                          setIsAddingNewSubCat(true);
                          setFormData({...formData, subCategory: ''});
                        } else {
                          setFormData({...formData, subCategory: e.target.value});
                        }
                      }}
                    >
                      <option value="" disabled>Select a sub-category</option>
                      {availableSubCategories.map(sc => (
                        <option key={sc} value={sc}>{sc}</option>
                      ))}
                      <option value="__NEW__">+ Add New Sub-Category</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        required 
                        type="text" 
                        className={styles.searchBar} 
                        style={{ flex: 1 }} 
                        placeholder="Type new sub-category" 
                        value={formData.subCategory} 
                        onChange={e => setFormData({...formData, subCategory: e.target.value})} 
                      />
                      {availableSubCategories.length > 0 && (
                        <button 
                          type="button" 
                          onClick={() => {
                            setIsAddingNewSubCat(false);
                            setFormData({...formData, subCategory: availableSubCategories[0]});
                          }}
                          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '4px', padding: '0 0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--brown-mid)' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Product Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input 
                    required={!formData.image}
                    type="file" 
                    accept="image/*"
                    className={styles.searchBar} 
                    style={{ flex: 1, padding: '0.4rem 1rem' }} 
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setFormData({...formData, image: url});
                      }
                    }} 
                  />
                  {formData.image && (
                    <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--brown-dark)', flexShrink: 0 }}>
                      <Image src={formData.image} alt="Preview" width={40} height={40} style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className={styles.btnAdmin} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={`${styles.btnAdmin} ${styles.btnPrimary}`}>
                  {editingId ? 'Save Changes' : '🚀 Launch Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
