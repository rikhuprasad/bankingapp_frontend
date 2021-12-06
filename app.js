document.querySelector('form').addEventListener('submit', handleSubmitForm);

function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '') {
        resetAuditlogs();
        getAuditDataForApplication(input.value);
    }
    input.value = '';
}

function getAuditDataForApplication(appName) {
    fetch('http://localhost:3000/configurationChangesForApplication?name=' + appName)
        .then(response => response.json())
        .then(data => populateAuditLogs(data))
}

function resetAuditlogs(){
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()});
}

function populateAuditLogs(auditLogs) {
    var metadata = new Array();
    var technicalData = new Array();
    for (let i = 0; i < auditLogs.length; i++) {
        for (const [key, value] of Object.entries(auditLogs[i])) {
            if (key == 'metaData') {
                metadata.push(value);
            } else {
                technicalData.push(value);
            }
        }
    }
    populateMetadata(metadata);
    populateTechnicalData(technicalData);
}

function populateMetadata(data) {
    let table = document.getElementById('metaDataTable');
    let tBody = table.getElementsByTagName('tbody')[0];
    for (let i = 0; i < data.length; i++) {
        var row = tBody.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        cell1.innerHTML = i + 1;
        cell2.innerHTML = data[i]['owner'];
        cell3.innerHTML = data[i]['configurationManager'];
    }
}

function populateTechnicalData(data) {
    let table = document.getElementById('technicalDataTable');
    let tBody = table.getElementsByTagName('tbody')[0];
    for (let i = 0; i < data.length; i++) {
        var row = tBody.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        cell1.innerHTML = i + 1;
        cell2.innerHTML = data[i]['roles'];
    }
 }