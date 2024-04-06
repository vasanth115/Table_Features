const data=[
    {id:1, Name:"vasanth",Phone:9876543210,email:"vasanthk@ksrce.ac.in",Status:"Approved",Submitted:"07/13/22 7.30 PM"},
    {id:2, Name:"Sutharsan",Phone:9876123456,email:"sutharsan@ksrce.ac.in",Status:"Approved",Submitted:"07/28/24 11.30 PM"},
    {id:3, Name:"pradeep",Phone:9876234512,email:"pradeep@ksrce.ac.in",Status:"Applied",Submitted:"11/13/22 7.33 AM"},
    {id:4, Name:"vimal",Phone:9876345123,email:"vimal@ksrce.ac.in",Status:"Applied",Submitted:"07/13/23 3.30 PM"},
    {id:5, Name:"vimal Raj",Phone:9876451234,email:"vimalraj@ksrce.ac.in",Status:"Approved",Submitted:"05/20/04 2.31 PM"},
    {id:6, Name:"prithiv",Phone:9876567345,email:"prithiv@ksrce.ac.in",Status:"Applied",Submitted:"07/13/22 7.30 AM"},
    {id:7, Name:"jayadev",Phone:9876673456,email:"jayadev@ksrce.ac.in",Status:"Approved",Submitted:"07/13/22 7.30 PM"},
    {id:8, Name:"subash",Phone:9876784567,email:"subash@ksrce.ac.in",Status:"Applied",Submitted:"07/13/22 7.30 PM"},
    {id:9, Name:"Ranjith",Phone:9876895678,email:"ranjith@ksrce.ac.in",Status:"Applied",Submitted:"07/13/22 7.30 PM"},
    {id:10, Name:"jeeva",Phone:9876906789,email:"jeeva@ksrce.ac.in",Status:"Approved",Submitted:"07/13/22 7.30 AM"},
    {id:11, Name:"vijay",Phone:9876017890,email:"vijay@ksrce.ac.in",Status:"Applied",Submitted:"07/13/22 7.30 PM"},
    {id:12, Name:"sakthivel",Phone:9876128901,email:"sakthivel@ksrce.ac.in",Status:"Approved",Submitted:"07/13/22 7.30 PM"},
    {id:13, Name:"Nishanth",Phone:9876340123,email:"nishanth@ksrce.ac.in",Status:"Approved",Submitted:"07/23/22 7.30 PM"},
    {id:14, Name:"praveen",Phone:9876239012,email:"praveen@ksrce.ac.in",Status:"Applied",Submitted:"07/13/22 7.30 AM"},
    {id:15, Name:"kumar",Phone:9876451234,email:"kumar@ksrce.ac.in",Status:"Applied",Submitted:"07/03/24 7.30 PM"},
    {id:16, Name:"sathyaseelan",Phone:9876562345,email:"sathyaseelan@ksrce.ac.in",Status:"Applied",Submitted:"07/13/22 7.30 PM"},
    {id:17, Name:"venkatesh",Phone:9876673456,email:"venkatesh@ksrce.ac.in",Status:"Approved",Submitted:"07/13/22 7.30 AM"},
    {id:18, Name:"vicky",Phone:9876784567,email:"vicky@ksrce.ac.in",Status:"Applied",Submitted:"12/20/24 7.30 PM"},
    {id:19, Name:"david",Phone:9876895678,email:"david@ksrce.ac.in",Status:"Approved",Submitted:"07/13/22 7.30 PM"},
    {id:20, Name:"mathan",Phone:9876906789,email:"mathan@ksrce.ac.in",Status:"Applied",Submitted:"07/13/22 7.30 AM"}
]

var currentPage=1;
var rowsPerPage=5;

function renderTable(data) {
  let tablebody = document.querySelector("tbody");
  tablebody.innerHTML = '';

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  paginatedData.forEach((row,index)=> {
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.Name}</td>
          <td>${row.Phone}</td>
          <td>${row.email}</td>
          <td>${row.Status}</td>
          <td>${row.Submitted}</td> 
          <td> <button class="deletebtn" id="${row.id}" onclick="DataDelete(event)">Delete</Button></td> `;
          tr.id=`${row.id}`
      tablebody.appendChild(tr);
  })
}



// Function to handle search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = data.filter(row =>
      row.Name.toLowerCase().includes(searchTerm) ||
      row.email.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderTable(filteredData);
    renderPagination(filteredData);
  });

  //pagesrender

  function renderPagination(data) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const totalPages = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('span');
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            renderTable(data); 
            renderPagination(data);
        });
        paginationDiv.appendChild(pageLink);
    }
}


function DataDelete(event) {
  let dataid = parseInt(event.target.id);
  let index = data.findIndex(row => row.id === dataid);
  if (index !== -1) {
    data.splice(index, 1);
    //renderTable(data);
    switch (document.getElementById('optionfilter').value) {
      case 'All':
        for (let i = index; i < data.length; i++) {
          data[i].id = i + 1;
        }
        renderTable(data);
        renderPagination(data);
        break;
      case 'Applied':
        const appliedData = data.filter(item => item.Status === 'Applied');
        for (let i = 0; i < appliedData.length; i++) {
          appliedData[i].id = i + 1;
        }
        renderTable(appliedData);
        renderPagination(appliedData);
        break;
      case 'Approved':
        const approvedData = data.filter(item => item.Status === 'Approved');
        for (let i = 0; i < approvedData.length; i++) {
          approvedData[i].id = i + 1;
        }
        renderTable(approvedData);
        renderPagination(approvedData);
        break;
      default:
        break;
    }
  }
}


// filters selection
let selectElement = document.getElementById('optionfilter');
selectElement.addEventListener('change', function(event) {
    let selectedValue = event.target.value;
    switch (selectedValue) {
      case 'All':
        for (let i = 0; i < data.length; i++) {
          data[i].id = i + 1;
      }
        renderTable(data);
        renderPagination(data);
        break;
        case 'Applied':
          const filtered=data.filter((item)=> item.Status==='Applied')
          for(let i=0;i<filtered.length;i++)
          {
            filtered[i].id=i+1;
          }
         renderTable(filtered);
         renderPagination(filtered);
          break;
          case 'Approved':
            const filtereditem=data.filter((item)=> item.Status==='Approved')
            for(let i=0;i<filtereditem.length;i++)
            {
              filtereditem[i].id=i+1;
            }
           renderTable(filtereditem);
           renderPagination(filtereditem);
            break;
      default:
        break;
    }
});



  renderTable(data)
  renderPagination(data)