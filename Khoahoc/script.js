// Chức năng chuyển sang hiển thị danh mục
function showCategory() {
    document.getElementById('categoryContainer').style.display = 'block';
    document.getElementById('courseContainer').style.display = 'none';
    renderCategoryTable();
}

// Chức năng chuyển sang hiển thị khóa học
function showCourse() {
    document.getElementById('categoryContainer').style.display = 'none';
    document.getElementById('courseContainer').style.display = 'block';
    renderCourseTable();
}


let data = [
    { id: 1, name: 'DANH MỤC 1', description: 'Tristique libero interdum sit molestie', status: 1, scope: 'Toàn hệ thống' },
    { id: 2, name: 'DANH MỤC 2', description: 'Elementum justo, cras proin molestie', status: 7, scope: 'DS Tài khoản' },
    { id: 3, name: 'DANH MỤC 3', description: 'Vitae sit sit tempor elementum', status: 10, scope: 'Không chia sẻ' },
    { id: 4, name: 'DANH MỤC 4', description: 'Neque tellus habitant eu id', status: 2, scope: 'DS Tài khoản' },
    { id: 5, name: 'DANH MỤC 5', description: 'Tortor in quam jaculis libero semper a', status: 5, scope: 'Toàn hệ thống' },
    { id: 6, name: 'DANH MỤC 6', description: 'Feugiat et ante vulputate adipiscing convallis lacus', status: 11, scope: 'Toàn hệ thống' },
    { id: 7, name: 'DANH MỤC 7', description: 'Sit dictum amet convallis cras auctor tortor', status: 12, scope: 'DS Tài khoản' },
    { id: 8, name: 'DANH MỤC 8', description: 'Sit dictum amet convallis cras auctor tortor', status: 1, scope: 'Miễn phí' },
];
let editingIndex = null;

const tbody = document.getElementById('dataTable');
const editForm = document.getElementById('editForm');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const statusInput = document.getElementById('status');
const scopeInput = document.getElementById('scope');

// Render table rows
function renderTable() {
    tbody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        const scopeColor = getScopeColor(item.scope);
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.status }</td>
        <td style="color: ${scopeColor}; font-weight: bold;">${item.scope}</td>
        <td>
            <i class="fas fa-eye" onclick="viewRow(${index})" title="Xem"></i>
            <i class="fas fa-trash" onclick="deleteRow(${index})" title="Xóa"></i>
            <div class="action-menu">
                <button>...</button>
                <div class="dropdown-content">
                    <button onclick="viewRow(${index})">Xem</button>
                    <button onclick="editRow(${index})">Sửa</button>
                    <button onclick="deleteRow(${index})">Xóa</button>
                    <button onclick="copyRow(${index})">Sao chép</button>
                </div>
            </div>
        </td>
    `;
    tbody.appendChild(row);
    });
}
// Function to determine color based on scope value
function getScopeColor(scope) {
    switch (scope) {
        case 'Toàn hệ thống':
            return 'greenyellow'; // Xanh
        case 'Không chia sẻ':
            return 'red'; // Đỏ
        case 'Miễn phí':
            return 'green'; // Xanh
        default:
            return 'black'; // Mặc định màu đen
    }
}
// Add new row
function addNewRow() {
    editingIndex = null;
    editForm.style.display = 'block';
    document.getElementById('formTitle').innerText = 'Thêm danh mục';
    nameInput.value = '';
    descriptionInput.value = '';
    statusInput.value = '1';
    scopeInput.value = 'Toàn hệ thống';
}

// Edit row
function editRow(index) {
    editingIndex = index;
    const item = data[index];
    editForm.style.display = 'block';
    document.getElementById('formTitle').innerText = 'Chỉnh sửa danh mục';
    nameInput.value = item.name;
    descriptionInput.value = item.description;
    statusInput.value = item.status;
    scopeInput.value = item.scope;
}

// Save row (add or edit)
function saveRow() {
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const status = parseInt(statusInput.value, 10);
    const scope = scopeInput.value;

    if (!name || !description) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    const newItem = { id: Date.now(), name, description, status, scope };

    if (editingIndex === null) {
        // Add new row
        data.push(newItem);
    } else {
        // Update existing row
        data[editingIndex] = newItem;
    }

    editForm.style.display = 'none';
    renderTable();
}

// Delete row
function deleteRow(index) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
        data.splice(index, 1);
        renderTable();
    }
}

// Cancel edit
function cancelEdit() {
    editForm.style.display = 'none';
}
// View row details
function viewRow(index) {
    const item = data[index];
    alert(`Xem chi tiết:\nTên danh mục: ${item.name}\nMô tả: ${item.description}`);
}

// Copy row
function copyRow(index) {
    const item = data[index];
    const newItem = { ...item, id: Date.now(), name: item.name + ' - Sao chép' };
    data.push(newItem);
    renderTable();
    alert('Danh mục đã được sao chép!');
}


// Dữ liệu mẫu
const courses = [
    { id: 2112, name: "Học cùng Cây thuốc Bkids", description: "Giới thiệu về các loại cây thuốc và tác dụng của chúng." },
    { id: 2113, name: "Ôn thi Kỳ II", description: "Ôn thi cuối kỳ môn Toán lớp 11." },
    { id: 2114, name: "Ôn thi cuối kỳ", description: "Ôn thi cuối kỳ Nâng Cao cho Phụ Huynh yêu cầu." }
];

// Hàm hiển thị danh sách khóa học
function renderCourseList() {
    const courseList = document.getElementById("courseItems");
    courseList.innerHTML = ""; // Clear the list before re-rendering

    courses.forEach(course => {
        const li = document.createElement("li");
        li.classList.add("course-item");
        li.innerHTML = `
            <span>#${course.id} ${course.name}</span>
            <div class="course-actions">
                <button class="view-btn" onclick="viewCourse(${course.id})">Xem</button>
                <button class="edit-btn" onclick="editCourse(${course.id})">Chỉnh sửa</button>
                <button class="copy-btn" onclick="copyCourse(${course.id})">Sao chép</button>
                <button class="delete-btn" onclick="deleteCourse(${course.id})">Xóa</button>
            </div>
        `;
        courseList.appendChild(li);
    });
}

// Hàm xem chi tiết khóa học
function viewCourse(courseId) {
    const course = courses.find(course => course.id === courseId);
    if (course) {
        alert(`Chi tiết khóa học: ${course.name}\nMô tả: ${course.description}`);
    }
}

// Hàm chỉnh sửa khóa học
function editCourse(courseId) {
    const course = courses.find(course => course.id === courseId);
    if (course) {
        document.getElementById("course-name").value = course.name;
        document.getElementById("course-desc").value = course.description;
    }
}

// Hàm sao chép khóa học
function copyCourse(courseId) {
    const course = courses.find(course => course.id === courseId);
    if (course) {
        const newCourse = { ...course, id: courses.length + 1 };
        courses.push(newCourse);
        renderCourseList(); // Re-render the list
    }
}

// Hàm xóa khóa học
function deleteCourse(courseId) {
    const index = courses.findIndex(course => course.id === courseId);
    if (index !== -1) {
        courses.splice(index, 1); // Remove the course
        renderCourseList(); // Re-render the list
    }
}

// Hàm xử lý form chỉnh sửa
document.getElementById("courseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const courseName = document.getElementById("course-name").value;
    const courseDesc = document.getElementById("course-desc").value;

    // Giả sử bạn muốn chỉnh sửa khóa học đầu tiên trong danh sách (có thể điều chỉnh theo ID nếu cần)
    courses[0].name = courseName;
    courses[0].description = courseDesc;

    renderCourseList(); // Re-render the list
});

// Hiển thị danh sách khóa học ngay khi tải trang
window.onload = renderCourseList;


// Initial render
renderTable();



