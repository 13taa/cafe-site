import { useState, useEffect } from 'react';
import './index.css';

const defaultCategories = [
  { 
    id: 1, name: 'Burgerlar', bgText: 'B', bgImage: './bg-burger.png',
    items: [
      { id: 101, name: 'Klasik Cheeseburger', desc: '150g ev yapımı dana köfte, cheddar, karamelize soğan', price: '250 ₺', image: '' },
      { id: 102, name: 'Truffle Burger', desc: 'Trüf mayonez, ızgara mantar, emmental peyniri', price: '320 ₺', image: '' }
    ]
  },
  { 
    id: 2, name: 'Makarnalar', bgText: 'M', bgImage: './bg-pasta.png',
    items: [
      { id: 201, name: 'Fettuccine Alfredo', desc: 'Krema soslu, taze mantar ve parmesanlı', price: '280 ₺', image: '' },
      { id: 202, name: 'Penne Arrabbiata', desc: 'Acılı domates sos, siyah zeytin, taze fesleğen', price: '240 ₺', image: '' }
    ]
  },
  { 
    id: 3, name: 'Salatalar', bgText: 'S', bgImage: './bg-salad.png',
    items: [
      { id: 301, name: 'Tavuklu Sezar', desc: 'Izgara tavuk dilimleri, kruton, özel sezar sos', price: '220 ₺', image: '' },
      { id: 302, name: 'Akdeniz Yeşillikleri', desc: 'Ezine peyniri, ceviz, nar ekşisi, zeytinyağı', price: '190 ₺', image: '' }
    ]
  },
  { 
    id: 4, name: 'Tatlılar', bgText: 'T', bgImage: './bg-dessert.png',
    items: [
      { id: 401, name: 'San Sebastian', desc: 'Akışkan Belçika çikolatası ile servis edilir', price: '180 ₺', image: '' },
      { id: 402, name: 'Sıcak Brownie', desc: 'Vanilyalı dondurma ve kavrulmuş fındık', price: '160 ₺', image: '' }
    ]
  },
  { 
    id: 5, name: 'İçecekler', bgText: 'İ', bgImage: './bg-beverage.png',
    items: [
      { id: 501, name: 'Iced Caramel Macchiato', desc: 'Double espresso, karamel, soğuk süt', price: '120 ₺', image: '' },
      { id: 502, name: 'Orman Meyveli Frozen', desc: 'Taze orman meyveleri ve kırık buz', price: '140 ₺', image: '' }
    ]
  },
];

const translations = {
  tr: {
    about: "Hakkımızda",
    menu: "Menü",
    subtitle: "Premium Taste & Vibe",
    contactLocation: "İletişim & Konum",
    address: "Adres:",
    reservation: "Rezervasyon:",
    goBack: "Geri Dön",
    carefullySelected: "Özenle Seçilmiş Lezzetler",
    ourMenu: "Menümüz",
    startExploring: "Keşfetmeye Başlayın",
    ourStory: "Hikayemiz",
    passionFlavors: "Tutkuyla Hazırlanan Lezzetler",
    storyText1: "2010 yılından bu yana, şehrin kalbinde en taze malzemeleri özel tariflerle buluşturuyoruz. Amacımız sadece yemek yapmak değil, misafirlerimize unutulmaz bir gastronomi deneyimi ve sıcak bir atmosfer sunmak.",
    storyText2: "Modern dokunuşlarla hazırladığımız dünya mutfağından seçkiler, ödüllü baristalarımızın elinden çıkan nitelikli kahveler ve özenle tasarlanmış şık mekanımızla sizi ağırlamaktan mutluluk duyuyoruz.",
    yearsExp: "Yıllık Tecrübe",
    specialFlavors: "Özel Lezzet",
    customerSat: "Müşteri Memnuniyeti",
    adminLogin: "Yönetici Girişi",
    adminLoginTitle: "Yönetici Girişi",
    enterPassword: "Şifreyi Giriniz",
    wrongPassword: "Hatalı Şifre!",
    loginBtn: "Giriş Yap",
    addProduct: "Ürün Ekle",
    manageProduct: "Ürün Yönetimi",
    siteSettings: "Site Ayarları",
    selectCategory: "Kategori Seçin:",
    productImage: "Ürün Görseli (İsteğe Bağlı):",
    productName: "Ürün Adı:",
    productDesc: "Ürün Açıklaması:",
    price: "Fiyat:",
    addProductBtn: "Ürünü Ekle",
    noProducts: "Bu kategoride ürün yok.",
    newPrice: "Yeni Fiyat",
    updateBtn: "Güncelle",
    deleteBtn: "Sil",
    cafeAddressLabel: "Kafenin Adresi:",
    reservationLabel: "Rezervasyon Numarası:",
    saveChangesBtn: "Değişiklikleri Kaydet",
    securitySettings: "Güvenlik Ayarları",
    currentPassword: "Mevcut Şifre:",
    newPassword: "Yeni Şifre:",
    changePasswordBtn: "Şifreyi Değiştir",
    alertFillAll: "Lütfen tüm alanları doldurun!",
    alertPwSuccess: "Şifreniz başarıyla değiştirildi!",
    alertPwWrong: "Mevcut şifrenizi yanlış girdiniz!",
    alertAddSuccess: "Ürün başarıyla eklendi!",
    alertDeleteConfirm: "Bu ürünü silmek istediğinize emin misiniz?",
    alertPriceUpdated: "Fiyat güncellendi!",
    alertSettingsUpdated: "Site ayarları başarıyla güncellendi!"
  },
  en: {
    about: "About Us",
    menu: "Menu",
    subtitle: "Premium Taste & Vibe",
    contactLocation: "Contact & Location",
    address: "Address:",
    reservation: "Reservation:",
    goBack: "Go Back",
    carefullySelected: "Carefully Selected Flavors",
    ourMenu: "Our Menu",
    startExploring: "Start Exploring",
    ourStory: "Our Story",
    passionFlavors: "Flavors Prepared with Passion",
    storyText1: "Since 2010, we have been bringing the freshest ingredients together with special recipes in the heart of the city. Our goal is not just to cook, but to offer our guests an unforgettable gastronomic experience and a warm atmosphere.",
    storyText2: "We are happy to welcome you with our selections from world cuisine prepared with modern touches, qualified coffees made by our award-winning baristas, and our carefully designed stylish venue.",
    yearsExp: "Years of Experience",
    specialFlavors: "Special Flavors",
    customerSat: "Customer Satisfaction",
    adminLogin: "Admin Login",
    adminLoginTitle: "Admin Login",
    enterPassword: "Enter Password",
    wrongPassword: "Wrong Password!",
    loginBtn: "Login",
    addProduct: "Add Product",
    manageProduct: "Manage Products",
    siteSettings: "Site Settings",
    selectCategory: "Select Category:",
    productImage: "Product Image (Optional):",
    productName: "Product Name:",
    productDesc: "Product Description:",
    price: "Price:",
    addProductBtn: "Add Product",
    noProducts: "No products in this category.",
    newPrice: "New Price",
    updateBtn: "Update",
    deleteBtn: "Delete",
    cafeAddressLabel: "Cafe Address:",
    reservationLabel: "Reservation Number:",
    saveChangesBtn: "Save Changes",
    securitySettings: "Security Settings",
    currentPassword: "Current Password:",
    newPassword: "New Password:",
    changePasswordBtn: "Change Password",
    alertFillAll: "Please fill all fields!",
    alertPwSuccess: "Your password has been changed successfully!",
    alertPwWrong: "You entered your current password incorrectly!",
    alertAddSuccess: "Product added successfully!",
    alertDeleteConfirm: "Are you sure you want to delete this product?",
    alertPriceUpdated: "Price updated!",
    alertSettingsUpdated: "Site settings updated successfully!"
  },
  fr: {
    about: "À Propos",
    menu: "Menu",
    subtitle: "Goût et ambiance premium",
    contactLocation: "Contact et Localisation",
    address: "Adresse:",
    reservation: "Réservation:",
    goBack: "Retour",
    carefullySelected: "Saveurs soigneusement sélectionnées",
    ourMenu: "Notre Menu",
    startExploring: "Commencer à explorer",
    ourStory: "Notre Histoire",
    passionFlavors: "Des saveurs préparées avec passion",
    storyText1: "Depuis 2010, nous réunissons les ingrédients les plus frais avec des recettes spéciales au cœur de la ville. Notre objectif n'est pas seulement de cuisiner, mais d'offrir à nos invités une expérience gastronomique inoubliable et une ambiance chaleureuse.",
    storyText2: "Nous sommes heureux de vous accueillir avec nos sélections de la cuisine du monde préparées avec des touches modernes, des cafés qualifiés préparés par nos baristas primés et notre lieu élégant soigneusement conçu.",
    yearsExp: "Années d'expérience",
    specialFlavors: "Saveurs Spéciales",
    customerSat: "Satisfaction du client",
    adminLogin: "Connexion Admin",
    adminLoginTitle: "Connexion Admin",
    enterPassword: "Mot de passe",
    wrongPassword: "Mot de passe incorrect!",
    loginBtn: "Connexion",
    addProduct: "Ajouter un produit",
    manageProduct: "Gérer les produits",
    siteSettings: "Paramètres du site",
    selectCategory: "Sélectionner la catégorie:",
    productImage: "Image du produit (Optionnel):",
    productName: "Nom du produit:",
    productDesc: "Description du produit:",
    price: "Prix:",
    addProductBtn: "Ajouter le produit",
    noProducts: "Aucun produit dans cette catégorie.",
    newPrice: "Nouveau prix",
    updateBtn: "Mettre à jour",
    deleteBtn: "Supprimer",
    cafeAddressLabel: "Adresse du café:",
    reservationLabel: "Numéro de réservation:",
    saveChangesBtn: "Enregistrer",
    securitySettings: "Paramètres de sécurité",
    currentPassword: "Mot de passe actuel:",
    newPassword: "Nouveau mot de passe:",
    changePasswordBtn: "Changer le mot de passe",
    alertFillAll: "Veuillez remplir tous les champs!",
    alertPwSuccess: "Votre mot de passe a été modifié avec succès!",
    alertPwWrong: "Vous avez mal saisi votre mot de passe actuel!",
    alertAddSuccess: "Produit ajouté avec succès!",
    alertDeleteConfirm: "Êtes-vous sûr de vouloir supprimer ce produit?",
    alertPriceUpdated: "Prix mis à jour!",
    alertSettingsUpdated: "Paramètres du site mis à jour avec succès!"
  }
};

const categoryTranslations = {
  "Burgerlar": { en: "Burgers", fr: "Burgers" },
  "Makarnalar": { en: "Pastas", fr: "Pâtes" },
  "Salatalar": { en: "Salads", fr: "Salades" },
  "Tatlılar": { en: "Desserts", fr: "Desserts" },
  "İçecekler": { en: "Beverages", fr: "Boissons" }
};

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('cafe_language') || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('cafe_language', language);
  }, [language]);

  const t = translations[language];

  const translateCategory = (name) => {
    if (language === 'tr') return name;
    return categoryTranslations[name]?.[language] || name;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('cafe_settings');
    if (saved) return JSON.parse(saved);
    return {
      address: 'Caferağa Mah. Moda Cad. No: 123\nKadıköy / İstanbul',
      phone: '+90 555 123 45 67'
    };
  });

  useEffect(() => {
    localStorage.setItem('cafe_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Categories State
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('cafe_categories');
    if (saved) return JSON.parse(saved);
    return defaultCategories;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cafe_categories', JSON.stringify(categories));
    } catch (e) {
      alert("Hafıza dolu! Lütfen çok büyük boyutlu görseller yüklemeyin.");
    }
  }, [categories]);

  // Admin States
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [adminTab, setAdminTab] = useState('add'); 

  // Security State
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('cafe_admin_pw') || '1234';
  });
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // New Item Form State
  const [newItemCategory, setNewItemCategory] = useState(1);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemImage, setNewItemImage] = useState('');

  // Editing State
  const [editingItemPrice, setEditingItemPrice] = useState({});

  useEffect(() => {
    if (isMenuOpen || isAboutOpen || isAdminLoginOpen || isAdminDashboardOpen || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isAboutOpen, isAdminLoginOpen, isAdminDashboardOpen, selectedImage]);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setActiveCategory(null), 500); 
  };

  const selectedCategory = categories.find(c => c.id === activeCategory);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setPasswordError(false);
      setIsAdminLoginOpen(false);
      setIsAdminDashboardOpen(true);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPasswordInput || !newPasswordInput) {
      alert(t.alertFillAll);
      return;
    }
    if (currentPasswordInput === adminPassword) {
      setAdminPassword(newPasswordInput);
      localStorage.setItem('cafe_admin_pw', newPasswordInput);
      alert(t.alertPwSuccess);
      setCurrentPasswordInput('');
      setNewPasswordInput('');
    } else {
      alert(t.alertPwWrong);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItemImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;

    const newItem = {
      id: Date.now(),
      name: newItemName,
      desc: newItemDesc,
      price: newItemPrice + (newItemPrice.includes('₺') ? '' : ' ₺'),
      image: newItemImage
    };

    setCategories(prev => 
      prev.map(cat => cat.id === Number(newItemCategory) ? { ...cat, items: [...cat.items, newItem] } : cat)
    );

    setNewItemName('');
    setNewItemDesc('');
    setNewItemPrice('');
    setNewItemImage('');
    // Reset file input visually
    document.getElementById('image-upload-input').value = '';
    alert(t.alertAddSuccess);
  };

  const handleDeleteItem = (categoryId, itemId) => {
    if(window.confirm(t.alertDeleteConfirm)) {
      setCategories(prev => prev.map(cat => {
        if(cat.id === categoryId) {
          return { ...cat, items: cat.items.filter(item => item.id !== itemId) };
        }
        return cat;
      }));
    }
  };

  const handlePriceChange = (itemId, value) => {
    setEditingItemPrice(prev => ({...prev, [itemId]: value}));
  };

  const handleUpdatePrice = (categoryId, itemId) => {
    const newPrice = editingItemPrice[itemId];
    if(!newPrice) return;

    setCategories(prev => prev.map(cat => {
      if(cat.id === categoryId) {
        return {
          ...cat, 
          items: cat.items.map(item => item.id === itemId ? { ...item, price: newPrice + (newPrice.includes('₺') ? '' : ' ₺') } : item)
        };
      }
      return cat;
    }));
    alert(t.alertPriceUpdated);
  };

  return (
    <>
      <main className="hero-section">
        <div className="top-menu-container">
          <button className="hamburger-btn" onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}>
            &#9776;
          </button>
          <div className={`top-dropdown ${isTopMenuOpen ? 'active' : ''}`}>
            <button className="dropdown-about-btn" onClick={() => { setIsTopMenuOpen(false); setIsAboutOpen(true); }}>
              {t.about}
            </button>
            <div className="dropdown-divider"></div>
            <div className="dropdown-langs">
              <button onClick={() => { setLanguage('tr'); setIsTopMenuOpen(false); }} className={language === 'tr' ? 'active' : ''} title="Türkçe">TR</button>
              <button onClick={() => { setLanguage('en'); setIsTopMenuOpen(false); }} className={language === 'en' ? 'active' : ''} title="English">EN</button>
              <button onClick={() => { setLanguage('fr'); setIsTopMenuOpen(false); }} className={language === 'fr' ? 'active' : ''} title="Français">FR</button>
            </div>
          </div>
        </div>

        <button className="admin-btn" onClick={() => setIsAdminLoginOpen(true)} title={t.adminLoginTitle}>&#x1F512;</button>
        
        <div className="hero-content">
          <h1 className="cafe-title">Lezzet Cafe</h1>
          <p className="cafe-subtitle">{t.subtitle}</p>
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>{t.menu}</button>
        </div>
      </main>

      {/* Footer / Konum & İletişim */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">{t.contactLocation}</h3>
            <p className="footer-address">
              <strong>{t.address}</strong><br />
              {siteSettings.address.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
            </p>
            <p className="footer-phone">
              <strong>{t.reservation}</strong> <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}>{siteSettings.phone}</a>
            </p>
          </div>
          <div className="footer-map">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(siteSettings.address.replace('\n', ' '))}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="250" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen 
              loading="eager"  
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </footer>

      {/* Menü Bölümü */}
      <section className={`menu-section ${isMenuOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={handleCloseMenu}>&#x2715;</button>
        <div className="menu-header">
          {activeCategory ? (
            <>
              <button className="back-btn" onClick={() => setActiveCategory(null)}>&#x2190; {t.goBack}</button>
              <h2 className="menu-title">{translateCategory(selectedCategory.name)}</h2>
              <p className="menu-subtitle">{t.carefullySelected}</p>
            </>
          ) : (
            <>
              <h2 className="menu-title">{t.ourMenu}</h2>
              <p className="menu-subtitle">{t.startExploring}</p>
            </>
          )}
        </div>

        {!activeCategory ? (
          <div className="categories-grid">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="category-card" 
                onClick={() => setActiveCategory(category.id)}
                style={{ 
                  backgroundImage: category.bgImage ? `url(${category.bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="category-overlay"></div>
                <span className="category-bg-text">{category.bgText}</span>
                <h3 className="category-title">{translateCategory(category.name)}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="items-list">
            {selectedCategory.items.map((item, index) => (
              <div key={item.id} className="item-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="item-content-wrapper">
                  {item.image && (
                    <div className="item-image-container" onClick={() => setSelectedImage(item.image)}>
                      <img src={item.image} alt={item.name} className="item-image" />
                    </div>
                  )}
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-desc">{item.desc}</p>
                  </div>
                </div>
                <div className="item-price">{item.price}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hakkımızda Bölümü */}
      <section className={`about-section ${isAboutOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={() => setIsAboutOpen(false)}>&#x2715;</button>
        <div className="about-content">
          <h2 className="menu-title">{t.ourStory}</h2>
          <p className="menu-subtitle">{t.passionFlavors}</p>
          <div className="about-text-container">
            <p className="about-text">{t.storyText1}</p>
            <p className="about-text">{t.storyText2}</p>
          </div>
          <div className="about-stats">
            <div className="stat-box"><span className="stat-number">10+</span><span className="stat-label">{t.yearsExp}</span></div>
            <div className="stat-box"><span className="stat-number">50+</span><span className="stat-label">{t.specialFlavors}</span></div>
            <div className="stat-box"><span className="stat-number">%100</span><span className="stat-label">{t.customerSat}</span></div>
          </div>
        </div>
      </section>

      {/* Admin Giriş Modal */}
      <div className={`modal-overlay ${isAdminLoginOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="close-btn" onClick={() => {setIsAdminLoginOpen(false); setPasswordError(false); setPasswordInput('');}}>&#x2715;</button>
          <h2 className="modal-title">{t.adminLoginTitle}</h2>
          <form onSubmit={handleAdminLogin} className="admin-form">
            <input type="password" placeholder={t.enterPassword} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className={`admin-input ${passwordError ? 'error' : ''}`} autoFocus />
            {passwordError && <span className="error-text">{t.wrongPassword}</span>}
            <button type="submit" className="admin-submit-btn">{t.loginBtn}</button>
          </form>
        </div>
      </div>

      {/* Admin Dashboard Modal */}
      <div className={`modal-overlay ${isAdminDashboardOpen ? 'active' : ''}`}>
        <div className="modal-content dashboard-content">
          <button className="close-btn" onClick={() => setIsAdminDashboardOpen(false)}>&#x2715;</button>
          
          <div className="admin-tabs">
            <button className={`admin-tab ${adminTab === 'add' ? 'active' : ''}`} onClick={() => setAdminTab('add')}>{t.addProduct}</button>
            <button className={`admin-tab ${adminTab === 'manage' ? 'active' : ''}`} onClick={() => setAdminTab('manage')}>{t.manageProduct}</button>
            <button className={`admin-tab ${adminTab === 'settings' ? 'active' : ''}`} onClick={() => setAdminTab('settings')}>{t.siteSettings}</button>
          </div>
          
          {adminTab === 'add' && (
            <form onSubmit={handleAddItem} className="admin-form">
              <div className="form-group">
                <label>{t.selectCategory}</label>
                <select value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)} className="admin-input">
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>{t.productImage}</label>
                <input id="image-upload-input" type="file" accept="image/*" onChange={handleImageUpload} className="admin-input file-input" />
                {newItemImage && <img src={newItemImage} alt="Önizleme" className="image-preview" />}
              </div>
              <div className="form-group">
                <label>{t.productName}</label>
                <input type="text" placeholder="Örn: Karamel Frappe" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="admin-input" required />
              </div>
              <div className="form-group">
                <label>{t.productDesc}</label>
                <input type="text" placeholder="Örn: Bol buzlu, karamel şuruplu..." value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} className="admin-input" />
              </div>
              <div className="form-group">
                <label>{t.price}</label>
                <input type="text" placeholder="Örn: 150" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} className="admin-input" required />
              </div>
              <button type="submit" className="admin-submit-btn add-btn">{t.addProductBtn}</button>
            </form>
          )}

          {adminTab === 'manage' && (
            <div className="admin-manage-list">
              {categories.map(category => (
                <div key={category.id} className="manage-category-group">
                  <h4 className="manage-category-title">{category.name}</h4>
                  {category.items.length === 0 ? <p className="no-items">{t.noProducts}</p> : null}
                  {category.items.map(item => (
                    <div key={item.id} className="manage-item-row">
                      <div className="manage-item-info">
                        <span className="manage-item-name">{item.name}</span>
                        <span className="manage-item-current-price">{item.price}</span>
                      </div>
                      <div className="manage-item-actions">
                        <input 
                          type="text" 
                          placeholder={t.newPrice}
                          className="admin-input small-input"
                          value={editingItemPrice[item.id] || ''}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        />
                        <button className="action-btn update-btn" onClick={() => handleUpdatePrice(category.id, item.id)}>{t.updateBtn}</button>
                        <button className="action-btn delete-btn" onClick={() => handleDeleteItem(category.id, item.id)}>{t.deleteBtn}</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {adminTab === 'settings' && (
            <div className="admin-form">
              <div className="form-group">
                <label>{t.cafeAddressLabel}</label>
                <textarea 
                  className="admin-input" 
                  rows="3"
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>
              <div className="form-group">
                <label>{t.reservationLabel}</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                />
              </div>
              <button 
                className="admin-submit-btn update-btn" 
                onClick={(e) => {e.preventDefault(); alert(t.alertSettingsUpdated);}}
              >
                {t.saveChangesBtn}
              </button>

              <hr className="admin-divider" />
              <h3 className="settings-subtitle">{t.securitySettings}</h3>
              <div className="form-group">
                <label>{t.currentPassword}</label>
                <input 
                  type="password" 
                  className="admin-input" 
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>{t.newPassword}</label>
                <input 
                  type="password" 
                  className="admin-input" 
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                />
              </div>
              <button 
                className="admin-submit-btn update-btn" 
                onClick={handleChangePassword}
              >
                {t.changePasswordBtn}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <div 
        className={`lightbox-overlay ${selectedImage ? 'active' : ''}`} 
        onClick={() => setSelectedImage(null)}
      >
        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>&#x2715;</button>
        {selectedImage && <img src={selectedImage} alt="Büyük Görsel" className="lightbox-image" />}
      </div>
    </>
  );
}

export default App;
