function toggleDropdown(element) {
    var menuItem = element.parentElement;

    // Kiểm tra nếu mục này đã có class "active" không
    if (menuItem.classList.contains('active')) {
        menuItem.classList.remove('active'); // Ẩn menu nếu đã hiển thị
    } else {
        menuItem.classList.add('active'); // Hiển thị menu
    }
}