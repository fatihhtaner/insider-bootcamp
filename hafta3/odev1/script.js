const studentData = [
  { name: "Fatih", class: "10A" },
  { name: "Taner", class: "9B" },
];

const tbody = document.getElementById("studentTableBody");
const form = document.getElementById("studentForm");

function renderStudents() {
  tbody.innerHTML = "";

  studentData.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.class}</td>
      <td><button onclick="deleteStudent(${index})">Sil</button></td>
    `;
    tbody.appendChild(row);
  });

  $("tr")
    .off("click")
    .on("click", function () {
      $(this).toggleClass("selected");
    });
}

function deleteStudent(index) {
  studentData.splice(index, 1);
  renderStudents();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentClass = document.getElementById("class").value.trim();

  if (name && studentClass) {
    studentData.push({ name, class: studentClass });
    renderStudents();
    form.reset();
  }
});

renderStudents();
