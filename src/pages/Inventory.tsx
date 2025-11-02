import { useState } from 'react';
import { Plus, X, Trash2, Edit2, ShoppingCart, Search, Package, DollarSign, AlertTriangle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  expiryDate: string;
  manufacturer: string;
  batchNumber: string;
}

interface BillingItem {
  product: Product;
  quantity: number;
}

interface Patient {
  id: number;
  name: string;
  phone: string;
}

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 25,
      stock: 500,
      expiryDate: '2026-12-31',
      manufacturer: 'PharmaCorp',
      batchNumber: 'PC2024001'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotic',
      price: 120,
      stock: 200,
      expiryDate: '2025-06-30',
      manufacturer: 'MedLife',
      batchNumber: 'ML2024002'
    },
    {
      id: 3,
      name: 'Insulin Glargine',
      category: 'Diabetes',
      price: 850,
      stock: 50,
      expiryDate: '2025-12-31',
      manufacturer: 'DiabeCare',
      batchNumber: 'DC2024003'
    },
    {
      id: 4,
      name: 'Amlodipine 5mg',
      category: 'Blood Pressure',
      price: 45,
      stock: 300,
      expiryDate: '2026-03-15',
      manufacturer: 'CardioHealth',
      batchNumber: 'CH2024004'
    }
  ]);

  const patients: Patient[] = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 9940025603' },
    { id: 2, name: 'Priya', phone: '+91 9876543211' },
    { id: 3, name: 'Amit Singh', phone: '+91 9876543212' },
    { id: 4, name: 'Roopan Vishnu', phone: '+91 9677055602' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedProductForBilling, setSelectedProductForBilling] = useState<number>(0);
  const [billingQuantity, setBillingQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    expiryDate: '',
    manufacturer: '',
    batchNumber: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      expiryDate: '',
      manufacturer: '',
      batchNumber: ''
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      expiryDate: formData.expiryDate,
      manufacturer: formData.manufacturer,
      batchNumber: formData.batchNumber
    };
    setProducts([...products, newProduct]);
    setIsAddModalOpen(false);
    resetForm();
    showToast('Product added successfully!');
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id 
        ? {
            ...p,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            expiryDate: formData.expiryDate,
            manufacturer: formData.manufacturer,
            batchNumber: formData.batchNumber
          }
        : p
    );
    setProducts(updatedProducts);
    setIsEditModalOpen(false);
    setEditingProduct(null);
    resetForm();
    showToast('Product updated successfully!');
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      showToast('Product deleted successfully!');
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      expiryDate: product.expiryDate,
      manufacturer: product.manufacturer,
      batchNumber: product.batchNumber
    });
    setIsEditModalOpen(true);
  };

  const addToBilling = () => {
    const product = products.find(p => p.id === selectedProductForBilling);
    if (!product) return;
    
    if (billingQuantity > product.stock) {
      showToast('Insufficient stock!');
      return;
    }

    const existing = billingItems.find(item => item.product.id === product.id);
    if (existing) {
      setBillingItems(billingItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + billingQuantity }
          : item
      ));
    } else {
      setBillingItems([...billingItems, { product, quantity: billingQuantity }]);
    }
    
    setBillingQuantity(1);
    setSelectedProductForBilling(0);
    showToast('Item added to bill!');
  };

  const removeFromBilling = (productId: number) => {
    setBillingItems(billingItems.filter(item => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return billingItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const generateBill = () => {
    if (!selectedPatient || billingItems.length === 0) {
      showToast('Please select a patient and add items!');
      return;
    }

    // Update stock
    const updatedProducts = products.map(product => {
      const billingItem = billingItems.find(item => item.product.id === product.id);
      if (billingItem) {
        return { ...product, stock: product.stock - billingItem.quantity };
      }
      return product;
    });
    setProducts(updatedProducts);

    // Generate bill text
    const billText = `
Pharmacy Bill
Date: ${new Date().toLocaleDateString()}

Patient: ${selectedPatient.name}
Phone: ${selectedPatient.phone}

Items:
${billingItems.map(item => `${item.product.name} x ${item.quantity} = ₹${item.product.price * item.quantity}`).join('\n')}

Total: ₹${calculateTotal()}

Thank you for your purchase!
    `;

    alert(billText);
    
    // Reset billing
    setBillingItems([]);
    setSelectedPatient(null);
    setIsBillingModalOpen(false);
    showToast('Bill generated successfully!');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLowStock = (stock: number) => stock < 100;

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 text-sm mt-1">Manage products and generate bills</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => setIsBillingModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Create Bill</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products by name, category, or manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Products</p>
              <p className="text-3xl font-bold mt-1">{products.length}</p>
            </div>
            <Package className="w-12 h-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Stock Value</p>
              <p className="text-3xl font-bold mt-1">₹{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(0)}</p>
            </div>
            <DollarSign className="w-12 h-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Low Stock Items</p>
              <p className="text-3xl font-bold mt-1">{products.filter(p => isLowStock(p.stock)).length}</p>
            </div>
            <AlertTriangle className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.manufacturer}</p>
                      <p className="text-xs text-gray-400">Batch: {product.batchNumber}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">₹{product.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${isLowStock(product.stock) ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                      {isLowStock(product.stock) && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{product.expiryDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => { setIsAddModalOpen(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => { setIsAddModalOpen(false); resetForm(); }} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
              <button onClick={() => { setIsEditModalOpen(false); setEditingProduct(null); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleEditProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => { setIsEditModalOpen(false); setEditingProduct(null); resetForm(); }} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Billing Modal */}
      {isBillingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Generate Bill</h2>
              <button onClick={() => setIsBillingModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Patient Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                <select
                  value={selectedPatient?.id || ''}
                  onChange={(e) => {
                    const patient = patients.find(p => p.id === parseInt(e.target.value));
                    setSelectedPatient(patient || null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Choose a patient...</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.phone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Items */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Add Items to Bill</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <select
                      value={selectedProductForBilling}
                      onChange={(e) => setSelectedProductForBilling(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="0">Select product...</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ₹{product.price} (Stock: {product.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={billingQuantity}
                      onChange={(e) => setBillingQuantity(parseInt(e.target.value))}
                      placeholder="Quantity"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addToBilling}
                  disabled={!selectedProductForBilling}
                  className="mt-3 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Bill</span>
                </button>
              </div>

              {/* Billing Items */}
              {billingItems.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Bill Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Qty</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {billingItems.map((item) => (
                          <tr key={item.product.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.product.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">₹{item.product.price}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">₹{item.product.price * item.quantity}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => removeFromBilling(item.product.id)}
                                className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Total */}
                  <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-purple-600">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Generate Bill Button */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsBillingModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={generateBill}
                  disabled={!selectedPatient || billingItems.length === 0}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 z-50">
          <Package className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}