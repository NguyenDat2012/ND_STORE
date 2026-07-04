document.addEventListener('DOMContentLoaded', () => {

    // 1.CHẾ ĐỘ DARK MODE
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            if (isDark) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    function enableDarkMode() {
        htmlElement.classList.add('dark');
        htmlElement.classList.remove('light');
        htmlElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<span class="material-symbols-outlined text-2xl">light_mode</span>';
        }
    }

    function disableDarkMode() {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        htmlElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<span class="material-symbols-outlined text-2xl">dark_mode</span>';
        }
    }

    // 2.GIỎ HÀNG MINI
    let cart = [];
    const cartCountEl = document.getElementById('cartCount');
    const cartItemsListEl = document.getElementById('cartItemsList');
    const cartTotalPriceEl = document.getElementById('cartTotalPrice');
    const btnAddCarts = document.querySelectorAll('.btn-add-cart');

    btnAddCarts.forEach(button => {
        button.addEventListener('click', (e) => {
            // Tìm phần tử cha chứa thông tin sản phẩm
            const productBox = e.target.closest('.product-item-box');
            if (!productBox) return;

            const id = productBox.getAttribute('data-id');
            const name = productBox.getAttribute('data-name');
            const price = parseInt(productBox.getAttribute('data-price'), 10);

            // Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCartUI();
            showToast(`Đã thêm ${name} vào giỏ hàng!`);
        });
    });

    function updateCartUI() {
        // Cập nhật số lượng tổng trên badge icon
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountEl) cartCountEl.innerText = totalItems;

        // Cập nhật danh sách hiển thị trong dropdown
        if (cartItemsListEl) {
            if (cart.length === 0) {
                cartItemsListEl.innerHTML = 'Chưa có sản phẩm.';
            } else {
                cartItemsListEl.innerHTML = cart.map(item => `
                    <div class="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                        <div>
                            <p class="font-semibold text-primary dark:text-white">${item.name}</p>
                            <p class="text-[11px] text-gray-400">${item.price.toLocaleString('vi-VN')}đ x ${item.quantity}</p>
                        </div>
                        <span class="font-bold text-error">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                `).join('');
            }
        }

        // Cập nhật tổng tiền
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalPriceEl) cartTotalPriceEl.innerText = `${totalPrice.toLocaleString('vi-VN')}đ`;
    }

    // 3.DANH SÁCH YÊU THÍCH
    let wishlist = [];
    const wishlistCountEl = document.getElementById('wishlistCount');
    const wishlistItemsListEl = document.getElementById('wishlistItemsList');
    const btnAddWishlists = document.querySelectorAll('.btn-add-wishlist');

    btnAddWishlists.forEach(button => {
        button.addEventListener('click', (e) => {
            const productBox = e.target.closest('.product-item-box');
            if (!productBox) return;

            const id = productBox.getAttribute('data-id');
            const name = productBox.getAttribute('data-name');

            if (!wishlist.includes(name)) {
                wishlist.push(name);
                updateWishlistUI();
                showToast(`Đã thêm ${name} vào mục yêu thích!`);
            } else {
                showToast(`${name} đã có trong mục yêu thích.`);
            }
        });
    });

    function updateWishlistUI() {
        if (wishlistCountEl) wishlistCountEl.innerText = wishlist.length;
        if (wishlistItemsListEl) {
            if (wishlist.length === 0) {
                wishlistItemsListEl.innerHTML = 'Chưa có mục yêu thích.';
            } else {
                wishlistItemsListEl.innerHTML = wishlist.map(name => `
                    <div class="py-1 border-b border-gray-100 dark:border-slate-700 text-primary dark:text-black font-medium">
                        ♥ ${name}
                    </div>
                `).join('');
            }
        }
    }
    // --- 2. Các phần tử DOM ---
    const newsletterForm = document.getElementById('newsletterForm');
    const subscribeResult = document.getElementById("subscribeResult");
    const btnSubscribe = document.getElementById('btnSubscribe');

    // --- 3. Hàm logic kiểm tra dữ liệu ---
    function checkUserInDatabase(name, email, phone) {
        
         if(name.length < 2){
            
            subscribeResult.classList.remove('hidden');
            subscribeResult.innerText = "Tên không hợp lệ";
            return false;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            subscribeResult.classList.remove('hidden');
            subscribeResult.innerText = "Email không hợp lệ";
            return false;
        }

        const phoneRegex =
            /^(0|\+84)\d{9}$/;

        if(phone && !phoneRegex.test(phone)){
            subscribeResult.classList.remove('hidden');
            subscribeResult.innerText = "Số điện thoại không hợp lệ";
            return false;
        }
        return true;
    }

    // --- 4. Xử lý các sự kiện tương tác ---
    //Xử lý nút đăng ký
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById("subscriberName").value.trim();
            const email = document.getElementById("subscriberEmail").value.trim();
            const phone = document.getElementById("subscriberPhone").value.trim();
            
            if (name ===""|| email === "" || phone === "") {
                subscribeResult.classList.remove('hidden');
                subscribeResult.innerText = "Vui lòng điền đầy đủ thông tin.";
                return;
            }

            if (checkUserInDatabase(name, email, phone)) {
                try {

                    await fetch("https://hook.eu1.make.com/m244fpotsr8ehnrs2nv5sn3tiw6px3hm", {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            name,
                            email,
                            phone,

                            subscribeTime: new Date().toISOString(),

                            page: window.location.href

                        })

                    });
                    showToast("Đăng ký nhận tin thành công!");

                    newsletterForm.reset();
                } catch (error) {
                    subscribeResult.classList.remove('hidden');
                    subscribeResult.innerText = "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.";
                }
            }else{
                subscribeResult.classList.remove('hidden');
                subscribeResult.innerText = "Thông tin không hợp lệ. Vui lòng kiểm tra lại.";
            }
        });

    //HIỂN THỊ TOAST THÔNG BÁO (HÀNH VI NGƯỜI DÙNG)
    function showToast(message) {
        const toast = document.getElementById('behaviorToast');
        const toastMsg = document.getElementById('toastMessage');
        
        if (toast && toastMsg) {
            toastMsg.innerHTML = `
                <span class="material-symbols-outlined text-on-tertiary-container animate-pulse">sensors</span>
                <p class="text-sm font-medium">${message}</p>
            `;
            toast.classList.remove('hidden');
            toast.style.transform = 'translateY(0)';
            
            // Tự động ẩn thông báo sau 4 giây
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 4000);
        }
    }
});
// Xử lý đóng mở Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    // Đóng menu khi nhấn vào link trong menu
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}