const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");


let editIndex = -1;

// Load existing jobs when page loads
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const company = document.getElementById("company").value;
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (editIndex === -1) {
        // ADD new job
        jobs.push({ company, role, status });
    } else {
        // UPDATE existing job
        jobs[editIndex] = { company, role, status };
        editIndex = -1; // reset
    }

    localStorage.setItem("jobs", JSON.stringify(jobs));

    displayJobs();
    form.reset();
});


// Display jobs based on filter
function displayJobs() {
    jobList.innerHTML = "";

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const selected = filter.value;

    const filteredJobs = selected === "All"
        ? jobs
        : jobs.filter(job => job.status === selected);

    filteredJobs.forEach((job, index) => {
    addJobToTable(job, index);
});
}

 const filter = document.getElementById("filter");

filter.addEventListener("change", function() {
    displayJobs();
}); 


// Save to localStorage
function saveJob(job) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

// Load jobs from localStorage
function loadJobs() {
    displayJobs();
}

// Add job to UI
function addJobToTable(job, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${job.company}</td>
        <td>${job.role}</td>
        <td>${job.status}</td>
        <td>
            <button onclick="editJob(${index})">Edit</button>
            <button onclick="deleteJob(${index})">Delete</button>
        </td>
    `;

    jobList.appendChild(row);
}

// Edit job
function editJob(index) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const job = jobs[index];

    document.getElementById("company").value = job.company;
    document.getElementById("role").value = job.role;
    document.getElementById("status").value = job.status;

    editIndex = index;
}

// Delete job
function deleteJob(index) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    jobs.splice(index, 1);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    displayJobs();
}