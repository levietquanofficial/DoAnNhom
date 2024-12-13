// Tìm kiếm
document.getElementById('searchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('#dataTable tr');
    rows.forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      row.style.display = name.includes(searchValue) ? '' : 'none';
    });
  });
  
  // Thêm danh mục
  document.getElementById('addButton').addEventListener('click', function () {
    const table = document.getElementById('dataTable');
    const newRow = `
      <tr>
        <td class="py-2 px-4 border-b">${table.children.length + 1}</td>
        <td class="py-2 px-4 border-b">Danh mục mới</td>
        <td class="py-2 px-4 border-b">Khối mới</td>
        <td class="py-2 px-4 border-b">1</td>
        <td class="py-2 px-4 border-b text-green-500">Toàn hệ thống</td>
        <td class="py-2 px-4 border-b">
          <i class="fas fa-edit text-gray-500 mr-2 edit"></i>
          <i class="fas fa-trash text-gray-500 delete"></i>
        </td>
      </tr>
    `;
    table.insertAdjacentHTML('beforeend', newRow);
    attachEventHandlers();
  });
  
  // Sửa và Xóa
  function attachEventHandlers() {
    document.querySelectorAll('.edit').forEach(editBtn => {
      editBtn.onclick = function () {
        const row = this.closest('tr');
        const name = row.cells[1];
        name.textContent = prompt('Nhập tên mới:', name.textContent) || name.textContent;
      };
    });
  
    document.querySelectorAll('.delete').forEach(deleteBtn => {
      deleteBtn.onclick = function () {
        if (confirm('Bạn có chắc chắn muốn xóa?')) {
          this.closest('tr').remove();
        }
      };
    });
  }
  attachEventHandlers();
  