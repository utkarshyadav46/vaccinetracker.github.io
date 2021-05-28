var geocoder;
var vaccinedata;

function addCellColor(tr, val,val_1) {
      var td = document.createElement('td');
  
      if(val == "NA")
  {
    td.style.backgroundColor='#dddddd';
    td.innerHTML = '<b> NA </b>';
  
  }
       if(val>10)
       {td.style.backgroundColor = '#93e371';
       td.innerHTML = '<b> '+val+' <br> '+val_1+' </b>';
      }
      if(val>0 && val<=10)
      {td.style.backgroundColor = '#f2ed46';
      td.innerHTML = '<b> '+val+' <br> '+val_1+' </b>';
    }
      if(val == 0)
      {td.style.backgroundColor='#f58a87';
      td.innerHTML = '<b> Booked <br> '+val_1+' </b>';
  }
  
  
  
  tr.appendChild(td)
    }
    function addCell(tr, val) {
      var td = document.createElement('td');
      td.innerHTML = '<b>'+val+'</b>';
      tr.appendChild(td)
    }
    function addRow(tbl, val_1, val_2, val_3,val_4,val_5,val_6,val_7,val_8) {
      var tr = document.createElement('tr');
  
      addCell(tr, val_1);
      addCell(tr, val_3);
      addCellColor(tr, val_4,val_2);
      addCellColor(tr, val_5,val_2);
      addCellColor(tr, val_6,val_2);
      addCellColor(tr, val_7,val_2);
      addCellColor(tr, val_8,val_2);
  
  
      tbl.appendChild(tr)
    }
  function getDistanceBetween(val1,val2){
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
          console.log(this.responseText);
      }
  });
  
  xhr.open("GET", "https://distance-calculator.p.rapidapi.com/v1/one_to_one?start_point=(42.335321%2C-71.023516)&end_point=(47.373535%2C8.541109)&unit=kilometers");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-rapidapi-key", "undefined");
  xhr.setRequestHeader("x-rapidapi-host", "distance-calculator.p.rapidapi.com");
  
  xhr.send(data);
  
    }
    
    function filterAgeGroup(){
    var input, filter, table, tr, td, i;
    input = document.getElementById("ageGroup").value;
    table = document.getElementById("vaccine_slot");
    tr = table.getElementsByTagName("tr");
   // console.log(tr[1]);
    for (i = 0; i < tr.length; i++) {
     
      td = tr[i].getElementsByTagName("td")[1];
      
      if (td) {

        var td1=td.getElementsByTagName('b')[0];
        // console.log(td.getElementsByTagName('b')[0]);
        txtValue = td1.textContent || td1.innerText;
        if (input == '60') {
          tr[i].style.display = "";
        }
       else if (txtValue == input) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
      }
    }

    function filterVaccineNames(){
      var input, filter, table, tr, td, i;
      input = document.getElementById("vaccineName").value;
      table = document.getElementById("vaccine_slot");
      tr = table.getElementsByTagName("tr");
     // console.log(tr[1]);
      for (i = 0; i < tr.length; i++) {
       
        td = tr[i].getElementsByTagName("td")[2];
        
        if (td) {
  
          var td1=td.getElementsByTagName('b')[0];
          // console.log(td.getElementsByTagName('b')[0]);
          txtValue = td1.textContent || td1.innerText;
          if (txtValue.toUpperCase().indexOf(input) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
        }
      }


   function dateFormat(value){
  
    var dd = value.getDate();
          var mm = value.getMonth() + 1;
          var yyyy = value.getFullYear();
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          return dd + " "+ months[mm-1]+" "+yyyy;
   }
    function abc()
    { var table = document.getElementById("vaccine_slot");
      var footer = document.getElementById("footer");
    footer.innerHTML='';
      document.getElementById("vaccine_slot").style.height="500px";
      document.getElementById("vaccine_slot").style.overflow="scroll";
      document.getElementById("vaccine_slot").innerHTML="";
        //  document.getElementById("vaccine_slot").innerHTML += '<input type="text" id="myInput" class="input-res" onkeyup="searchFunction()" placeholder="Search for names/pincode" title="Type in a name"   style="float: right">';
         document.getElementById("form").innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;<select id='ageGroup' onchange='filterAgeGroup()'><option value='60'  selected>Select Age Group</option><option value='18'>18 - 45 years </option><option value='45'>Above 45</option></select>";
         document.getElementById("form").innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;<select id='vaccineName' onchange='filterVaccineNames()' ><option value=''  selected>Select Vaccine</option><option value='COVISHIELD'>COVISHIELD</option><option value='COVAXIN'>COVAXIN</option></select>";

         //  document.getElementById("vaccine_slot").innerHTML += "<button onclick='getLocation()''> Location</button>";

         var district = document.forms["vaccineForm"]["citySelect"].value;
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth() + 1;
          var yyyy = today.getFullYear();
          if (dd < 10) {
              dd = '0' + dd;
          }
          if (mm < 10) {
              mm = '0' + mm;
          }
          var today = dd + '-' + mm + '-' + yyyy;
          
          // console.log(today);
          // alert("Hello Guys, it will fetch states for vaccination .");
          var url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+district+"&date="+today+"";
          console.log(url);
          let request = new XMLHttpRequest();
          request.open("GET",url);
          request.send();
          request.onload = () => 
          {      
           
            table.innerHTML+="";
              if(request.status==200)
              {
                var a="NA";
                var b="NA";
                var c="NA";
                var d="NA";
                var e="NA";
                      // console.log(request.response);
                       vaccinedata=JSON.parse(request.response);
                      console.log(vaccinedata.centers);
                      console.log(vaccinedata.centers[1].sessions['0'].vaccine);
                      table.innerHTML +="<table id='tbl'class='table table-borderless'><tr><th> Center Name <br><input type='text' id='myInput'  onkeyup='searchFunction()' placeholder='Search for names/pincode' title='Type in a name'/> </th><th>Age Group</th><th>"+dateFormat(new Date)+"</th><th>"+dateFormat(new Date(yyyy, mm-1, dd+1))+"</th><th>"+dateFormat(new Date(yyyy, mm-1, dd+2))+"</th><th>"+dateFormat( new Date(yyyy, mm-1, dd+3)) +"</th><th>"+dateFormat( new Date(yyyy, mm-1, dd+4))+"</th></tr>";
                       // console.log(vaccinedata.centers[1].sessions);
                      tbl1 = document.getElementById('tbl');
                      for (var i = 0; i <vaccinedata.centers.length; i++) 
                       {  var locateadd = vaccinedata.centers[i].name +" "+vaccinedata.centers[i].address +" "+vaccinedata.centers[i].district_name +","+vaccinedata.centers[i].pincode;
                      //  console.log(locateadd);
                       //  LocateAddress(locateadd);
                         if(vaccinedata.centers[i].sessions.length == 1)
                         addRow(tbl1,vaccinedata.centers[i].name +" , "+vaccinedata.centers[i].pincode , vaccinedata.centers[i].sessions['0'].vaccine, vaccinedata.centers[i].sessions['0'].min_age_limit, vaccinedata.centers[i].sessions['0'].available_capacity ,b,c,d,e);
                         if(vaccinedata.centers[i].sessions.length == 2)
                         addRow(tbl1,vaccinedata.centers[i].name +" , "+vaccinedata.centers[i].pincode , vaccinedata.centers[i].sessions['0'].vaccine, vaccinedata.centers[i].sessions['0'].min_age_limit, vaccinedata.centers[i].sessions['0'].available_capacity ,vaccinedata.centers[i].sessions['1'].available_capacity,c,d,e);
                         if(vaccinedata.centers[i].sessions.length == 3)
                         addRow(tbl1,vaccinedata.centers[i].name +" , "+vaccinedata.centers[i].pincode , vaccinedata.centers[i].sessions['0'].vaccine, vaccinedata.centers[i].sessions['0'].min_age_limit, vaccinedata.centers[i].sessions['0'].available_capacity ,vaccinedata.centers[i].sessions['1'].available_capacity,vaccinedata.centers[i].sessions['2'].available_capacity,d,e);
                         if(vaccinedata.centers[i].sessions.length == 4)
                         addRow(tbl1,vaccinedata.centers[i].name +" , "+vaccinedata.centers[i].pincode , vaccinedata.centers[i].sessions['0'].vaccine, vaccinedata.centers[i].sessions['0'].min_age_limit, vaccinedata.centers[i].sessions['0'].available_capacity ,vaccinedata.centers[i].sessions['1'].available_capacity,vaccinedata.centers[i].sessions['2'].available_capacity,vaccinedata.centers[i].sessions['3'].available_capacity,e);
                         if(vaccinedata.centers[i].sessions.length == 5)
                         addRow(tbl1,vaccinedata.centers[i].name +" , "+vaccinedata.centers[i].pincode , vaccinedata.centers[i].sessions['0'].vaccine, vaccinedata.centers[i].sessions['0'].min_age_limit, vaccinedata.centers[i].sessions['0'].available_capacity ,vaccinedata.centers[i].sessions['1'].available_capacity,vaccinedata.centers[i].sessions['2'].available_capacity,vaccinedata.centers[i].sessions['3'].available_capacity,vaccinedata.centers[i].sessions['4'].available_capacity);
                      } table.innerHTML+="</tbody>></table>";
              }
              else
              {
                  console.log(`error ${request.status} ${request.statusText}`);
                  document.getElementById("vaccine_slot").innerHTML = "<h2> No slot available now .Please try again later </h2>";
              }
              
            footer.innerHTML +='<br><a class="btn btn-default read-more" style="background:#3399ff;color:white" href="https://utkarshyadav46.github.io/vaccinetracker.github.io/?#vaccine_slot">Return to home</a>';
  
          }
    }
    function showcities(){
      document.getElementById('citySelect').innerText = "";
      const cityNameSet = new Set();
      const cityidSet = new Set();
      var stateValue=document.getElementById('mySelect').value;
        let found;
      for(i=0;i<756;i++)
      {
      if(csvdata[i].state_id == stateValue)
      {
       // console.log(csvdata[i]['district name']);
        cityNameSet.add(csvdata[i]['district name']);
        cityidSet.add(csvdata[i]['district id']);
       } }
      var citiesName=Array.from(cityNameSet);
      var citiesid=Array.from(cityidSet);
  
      const selectBox= document.querySelector('#citySelect');
  
        for(i=0;i<citiesName.length;i++)
       {
         const newOption = document.createElement('option');
         const optionText = document.createTextNode(citiesName[i]);
         newOption.appendChild(optionText);
         newOption.setAttribute('value',citiesid[i]);
        selectBox.appendChild(newOption);
      } 
    }
    function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("vaccine_slot");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }









  
  //To show location coordinate on console
  // var x = document.getElementById("demo");
  function initMap(){
    console.log('HI');
    // geocoder = new google.maps.Geocoder();
  }

  function getLocation() {
    document.getElementById("vaccine_slot").innerHTML="";
        var x= document.getElementById('vaccine_slot');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position1) {
    var locationCoordinate = "Latitude: " + position1.coords.latitude + 
    " \nLongitude: " + position1.coords.longitude;
    console.log(locationCoordinate);
    const myLatLng = { lat: position1.coords.latitude, lng: position1.coords.longitude };
    const map = new google.maps.Map(document.getElementById("vaccine_slot"), {
    zoom: 15,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
  }
  